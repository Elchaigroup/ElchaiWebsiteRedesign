# WordPress integration

The site reads blog content from WordPress and pushes lead-form submissions
into WordPress as a custom post type. Both are **opt-in** — with the WP env
vars unset, the site falls back to the static registries and nothing breaks.

## Overview

| Capability         | Where                                      | Falls back to                        |
| ------------------ | ------------------------------------------ | ------------------------------------ |
| Blog list page     | `src/app/blog-list/page.tsx`               | `src/lib/blog-posts.ts` (static)     |
| Blog post page     | `src/app/blog/[slug]/page.tsx`             | `src/lib/blog-posts.ts` (static)     |
| Sitemap blog URLs  | `src/app/sitemap.ts`                       | `src/lib/blog-content.ts` (static)   |
| Lead form sink     | `src/app/api/lead/route.ts`                | Internal `LEAD_WEBHOOK_URL` only     |
| Cache invalidation | `src/app/api/revalidate/route.ts`          | 5-minute ISR rebuild                 |

All requests go through `src/lib/wp/client.ts`, which reads env at request
time. Source files in `src/lib/wp/` are typed and self-contained.

## Environment variables

Copy `.env.example` to `.env.local`:

```bash
WP_BASE_URL=https://cms.elchaigroup.com        # no trailing slash
WP_APP_USER=site-bot                            # WP username
WP_APP_PASSWORD=xxxx xxxx xxxx xxxx xxxx xxxx   # Application Password
WP_LEAD_ENDPOINT=                               # optional override
REVALIDATE_SECRET=$(openssl rand -hex 32)       # any long random string
LEAD_WEBHOOK_URL=                               # optional Slack/Zapier hook
```

## WordPress setup

### 1. Generate an Application Password

`wp-admin → Users → Profile → Application Passwords` → name it `elchai-site`
→ copy the generated value into `WP_APP_PASSWORD`. Username goes into
`WP_APP_USER`. Standard passwords will NOT work with the REST API.

### 2. Posts work out of the box

The site reads `/wp-json/wp/v2/posts?_embed=wp:featuredmedia,wp:term`. No
plugins required. Standard WP categories map to the four allowed values:

| WP category slug          | BlogCategory             |
| ------------------------- | ------------------------ |
| `artificial-intelligence` | `Artificial Intelligence`|
| `blog`                    | `Blog`                   |
| `news`                    | `News`                   |
| `web3-news`               | `Web3 News`              |

Unknown category slugs fall back to `Blog`.

### 3. Lead-capture endpoint (MU plugin)

Drop the following into `wp-content/mu-plugins/elchai-leads.php`:

```php
<?php
/**
 * Elchai — lead capture CPT + REST endpoint.
 * Registers /wp-json/elchai/v1/leads (POST) and stores submissions as a
 * private "elchai_lead" custom post type so they show up in wp-admin.
 */

add_action('init', function () {
  register_post_type('elchai_lead', [
    'label'        => 'Leads',
    'public'       => false,
    'show_ui'      => true,
    'show_in_menu' => true,
    'menu_icon'    => 'dashicons-email-alt',
    'supports'     => ['title', 'editor', 'custom-fields'],
    'capability_type' => 'post',
  ]);
});

add_action('rest_api_init', function () {
  register_rest_route('elchai/v1', '/leads', [
    'methods'  => 'POST',
    'permission_callback' => function (\WP_REST_Request $req) {
      // Require an authenticated user (Application Password / nonce / JWT).
      return is_user_logged_in() && current_user_can('edit_posts');
    },
    'callback' => function (\WP_REST_Request $req) {
      $b = $req->get_json_params();
      if (!is_array($b)) return new \WP_Error('bad_request', 'invalid JSON', ['status' => 400]);

      $source = sanitize_text_field($b['source'] ?? 'unknown');
      $name   = sanitize_text_field($b['name']   ?? '');
      $email  = sanitize_email($b['email']       ?? '');
      $phone  = sanitize_text_field($b['phone']  ?? '');
      $dial   = sanitize_text_field($b['dial']   ?? '');
      $page   = sanitize_text_field($b['page']   ?? '');
      $msg    = wp_kses_post($b['message']       ?? '');

      $title = sprintf('[%s] %s', $source, $name ?: ($email ?: $phone));
      $id = wp_insert_post([
        'post_type'    => 'elchai_lead',
        'post_status'  => 'private',
        'post_title'   => $title,
        'post_content' => $msg,
        'meta_input'   => compact('source', 'name', 'email', 'phone', 'dial', 'page'),
      ], true);

      if (is_wp_error($id)) return $id;
      return ['ok' => true, 'id' => $id];
    },
  ]);
});
```

Override the URL with `WP_LEAD_ENDPOINT` if you prefer to route into
Contact Form 7, WPForms, or Gravity Forms instead.

### 4. Revalidate webhook (post save → Next.js)

In the same MU plugin (or a new one), tell WordPress to ping the Next.js
revalidate route whenever a post is published or updated:

```php
add_action('save_post_post', function ($post_id, $post, $update) {
  if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id)) return;
  if ($post->post_status !== 'publish') return;

  $url    = getenv('NEXT_REVALIDATE_URL'); // e.g. https://www.elchaigroup.com/api/revalidate
  $secret = getenv('NEXT_REVALIDATE_SECRET');
  if (!$url || !$secret) return;

  wp_remote_post($url, [
    'timeout' => 5,
    'headers' => [
      'content-type' => 'application/json',
      'x-revalidate-secret' => $secret,
    ],
    'body' => wp_json_encode([
      'tag'  => ['wp:posts', 'wp:post:' . $post->post_name],
      'path' => ['/blog-list', '/blog/' . $post->post_name],
    ]),
  ]);
}, 10, 3);
```

Set the two env vars on the WP server (`wp-config.php` or hosting panel):

```php
putenv('NEXT_REVALIDATE_URL=https://www.elchaigroup.com/api/revalidate');
putenv('NEXT_REVALIDATE_SECRET=<same value as REVALIDATE_SECRET in Next>');
```

## Verifying the integration

```bash
# Posts list (authenticated, returns published posts)
curl -u "$WP_APP_USER:$WP_APP_PASSWORD" \
  "$WP_BASE_URL/wp-json/wp/v2/posts?per_page=1&_embed"

# Lead endpoint
curl -u "$WP_APP_USER:$WP_APP_PASSWORD" \
  -X POST "$WP_BASE_URL/wp-json/elchai/v1/leads" \
  -H "content-type: application/json" \
  -d '{"source":"consultation","name":"Test","email":"t@example.com"}'

# Revalidate
curl -X POST "https://www.elchaigroup.com/api/revalidate" \
  -H "x-revalidate-secret: $REVALIDATE_SECRET" \
  -H "content-type: application/json" \
  -d '{"tag":"wp:posts"}'
```

## Caching model

- `GET /wp/v2/posts` is wrapped in Next 15 `fetch` with `next.revalidate: 300`
  and a `wp:posts` tag.
- Each post slug fetch carries `wp:post:<slug>` plus `wp:posts`.
- Mutations (POST) use `cache: "no-store"`.
- `/api/revalidate` calls `revalidateTag()` and/or `revalidatePath()` to
  invalidate selectively — preferred over wholesale `revalidatePath("/")`.

## Failure handling

- If WP times out or returns 5xx, the blog facade logs the error and serves
  the static registry. The site stays up.
- If WP returns 404 for a single post, the page falls back to the static
  registry for that slug, then to `notFound()`.
- The lead route forwards to WP and the internal webhook in parallel via
  `Promise.allSettled` — neither failure blocks the user-visible response.
