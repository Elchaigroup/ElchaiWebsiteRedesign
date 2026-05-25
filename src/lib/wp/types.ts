/**
 * Subset of the WordPress REST API response shapes we actually use.
 *
 * Reference: https://developer.wordpress.org/rest-api/reference/posts/
 *
 * Only the fields needed by the blog facade are typed — adding more fields
 * later is a non-breaking change.
 */

export interface WPRendered {
  rendered: string;
  protected?: boolean;
}

export interface WPMediaSize {
  source_url: string;
  width: number;
  height: number;
  mime_type?: string;
}

export interface WPMedia {
  id: number;
  source_url: string;
  alt_text?: string;
  media_details?: {
    sizes?: Record<string, WPMediaSize>;
  };
}

export interface WPTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

export interface WPPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  link: string;
  title: WPRendered;
  excerpt: WPRendered;
  content: WPRendered;
  featured_media: number;
  categories: number[];
  tags?: number[];
  _embedded?: {
    "wp:featuredmedia"?: WPMedia[];
    "wp:term"?: WPTerm[][];
  };
}

export interface WPError {
  code: string;
  message: string;
  data?: { status?: number };
}
