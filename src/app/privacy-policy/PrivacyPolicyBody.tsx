"use client";

import Link from "next/link";
import parse from "html-react-parser";
import { Reveal } from "@/components/primitives/Reveal";
import { useLocale } from "@/lib/i18n";

type Section = { n: string; h: string; html: string };
type Copy = {
  home: string;
  breadcrumb: string;
  title: string;
  subtitle: string;
  sections: Section[];
};

const EN: Copy = {
  home: "Home",
  breadcrumb: "Privacy Policy",
  title: "Privacy Policy",
  subtitle: "Last updated: 2026-05-12. This policy explains how Elchai Group handles your personal data.",
  sections: [
    { n: "01", h: "Introduction", html: "<p>Elchai (\"we,\" \"us,\" or \"our\") values your privacy and is committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website or use our services.</p>" },
    { n: "02", h: "Data Collected", html: "<h3>Personal Information</h3><ul><li>Name</li><li>Email address</li><li>Contact number</li><li>Company details (if provided)</li></ul><h3>Usage Information</h3><ul><li>Browser type and version</li><li>Device type</li><li>IP address</li><li>Pages visited on our website</li><li>Date and time of visits</li></ul><h3>Information Provided Voluntarily</h3><ul><li>Data submitted through contact forms or subscriptions</li><li>Information provided during inquiries, support requests, or feedback</li></ul>" },
    { n: "03", h: "How Data is Used", html: "<p>We use the information collected to:</p><ul><li>Provide and enhance our services</li><li>Respond to your inquiries and customer service requests</li><li>Communicate updates, news, promotional materials, or other information you've opted into</li><li>Analyze website usage to improve user experience</li><li>Ensure compliance with applicable laws and regulations</li></ul>" },
    { n: "04", h: "Cookies & Tracking", html: "<p>Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user interactions.</p><h3>Types of cookies we use</h3><ul><li><strong>Necessary Cookies:</strong> Essential for website functionality</li><li><strong>Analytics Cookies:</strong> Help us understand user interactions to improve our website</li><li><strong>Preference Cookies:</strong> Remember your settings and preferences</li></ul><p>You can control cookie settings through your browser preferences. Disabling cookies may impact your user experience.</p>" },
    { n: "05", h: "User Rights", html: "<p>You have the following rights regarding your data:</p><ul><li><strong>Access:</strong> Request access to your personal data</li><li><strong>Rectification:</strong> Request correction of inaccurate or incomplete data</li><li><strong>Deletion:</strong> Request deletion of your personal data</li><li><strong>Objection:</strong> Object to processing or use of your data</li><li><strong>Withdrawal:</strong> Withdraw your consent to data processing at any time</li></ul><p>To exercise any of these rights, please contact us at <a href=\"mailto:info@elchaigroup.com\">info@elchaigroup.com</a>.</p>" },
    { n: "06", h: "Data Retention", html: "<p>We retain your personal information only as long as necessary to provide our services or fulfill purposes outlined in this policy. Additionally, we may retain and use your information to comply with legal obligations, resolve disputes, or enforce agreements.</p>" },
    { n: "07", h: "Security of Your Data", html: "<p>We implement robust security measures designed to protect your personal information from unauthorized access, disclosure, alteration, or destruction. We regularly update our security protocols to ensure compliance with industry standards.</p>" },
    { n: "08", h: "Third-Party Links", html: "<p>Our website may include links to external sites not operated by us. We are not responsible for third-party privacy practices. We recommend reviewing the privacy policies of any external websites you visit.</p>" },
    { n: "09", h: "Changes to This Privacy Policy", html: "<p>We reserve the right to update or modify this Privacy Policy at any time. We will notify you about significant changes through email or by prominently posting a notice on our website. We encourage regular review of this policy for the latest information on our privacy practices.</p>" },
    { n: "10", h: "Contact for Privacy Questions", html: "<p>If you have any questions, concerns, or requests regarding our Privacy Policy or the handling of your data, please contact us at:</p><p><strong>Email:</strong> <a href=\"mailto:info@elchaigroup.com\">info@elchaigroup.com</a></p><p><strong>Address:</strong> 2008, Jumeirah Business Center 1 - Cluster G - Al Thanyah Fifth - Jumeirah Lakes Towers - Dubai - United Arab Emirates</p>" },
  ],
};

const AR: Copy = {
  home: "الرئيسية",
  breadcrumb: "سياسة الخصوصية",
  title: "سياسة الخصوصية",
  subtitle: "آخر تحديث: 2026-05-12. تشرح هذه السياسة كيفية تعامل مجموعة Elchai مع بياناتك الشخصية.",
  sections: [
    { n: "01", h: "مقدمة", html: "<p>Elchai (\"نحن\" أو \"نا\" أو \"خاصتنا\") تقدّر خصوصيتك وتلتزم بحماية معلوماتك الشخصية. توضح سياسة الخصوصية هذه كيفية جمع بياناتك واستخدامها وحمايتها عند زيارتك لموقعنا الإلكتروني أو استخدام خدماتنا.</p>" },
    { n: "02", h: "البيانات التي يتم جمعها", html: "<h3>المعلومات الشخصية</h3><ul><li>الاسم</li><li>عنوان البريد الإلكتروني</li><li>رقم الاتصال</li><li>تفاصيل الشركة (إذا قُدمت)</li></ul><h3>معلومات الاستخدام</h3><ul><li>نوع المتصفح وإصداره</li><li>نوع الجهاز</li><li>عنوان IP</li><li>الصفحات التي تمت زيارتها على موقعنا</li><li>تاريخ ووقت الزيارات</li></ul><h3>المعلومات المقدمة طوعًا</h3><ul><li>البيانات المقدمة من خلال نماذج الاتصال أو الاشتراكات</li><li>المعلومات المقدمة أثناء الاستفسارات أو طلبات الدعم أو التعليقات</li></ul>" },
    { n: "03", h: "كيف يتم استخدام البيانات", html: "<p>نستخدم المعلومات التي تم جمعها من أجل:</p><ul><li>تقديم خدماتنا وتحسينها</li><li>الرد على استفساراتك وطلبات خدمة العملاء</li><li>إرسال التحديثات أو الأخبار أو المواد الترويجية أو المعلومات الأخرى التي اشتركت فيها</li><li>تحليل استخدام موقع الويب لتحسين تجربة المستخدم</li><li>التأكد من الامتثال للقوانين واللوائح المعمول بها</li></ul>" },
    { n: "04", h: "ملفات تعريف الارتباط والتتبع", html: "<p>يستخدم موقعنا ملفات تعريف الارتباط وتقنيات التتبع المشابهة لتحسين تجربة التصفح لديك، وتحليل حركة مرور الموقع، وفهم تفاعلات المستخدم.</p><h3>أنواع ملفات تعريف الارتباط التي نستخدمها</h3><ul><li><strong>ملفات تعريف الارتباط الضرورية:</strong> ضرورية لوظائف موقع الويب</li><li><strong>ملفات تعريف الارتباط التحليلية:</strong> تساعدنا على فهم تفاعلات المستخدم لتحسين موقعنا</li><li><strong>ملفات تعريف الارتباط المفضلة:</strong> تتذكر إعداداتك وتفضيلاتك</li></ul><p>يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال تفضيلات المتصفح. قد يؤثر تعطيل ملفات تعريف الارتباط على تجربة المستخدم لديك.</p>" },
    { n: "05", h: "حقوق المستخدم", html: "<p>لديك الحقوق التالية فيما يتعلق ببياناتك:</p><ul><li><strong>الوصول:</strong> طلب الوصول إلى بياناتك الشخصية</li><li><strong>التصحيح:</strong> طلب تصحيح البيانات غير الدقيقة أو غير الكاملة</li><li><strong>الحذف:</strong> طلب حذف بياناتك الشخصية</li><li><strong>الاعتراض:</strong> الاعتراض على معالجة أو استخدام بياناتك</li><li><strong>السحب:</strong> سحب موافقتك على معالجة البيانات في أي وقت</li></ul><p>لممارسة أيٍّ من هذه الحقوق، يرجى الاتصال بنا على <a href=\"mailto:info@elchaigroup.com\">info@elchaigroup.com</a>.</p>" },
    { n: "06", h: "الاحتفاظ بالبيانات", html: "<p>نحن نحتفظ بمعلوماتك الشخصية فقط للمدة اللازمة لتقديم خدماتنا أو تحقيق الأغراض الموضحة في هذه السياسة. بالإضافة إلى ذلك، يجوز لنا الاحتفاظ بمعلوماتك واستخدامها للامتثال للالتزامات القانونية أو حل النزاعات أو تنفيذ الاتفاقيات.</p>" },
    { n: "07", h: "أمان بياناتك", html: "<p>نُنفذ إجراءات أمنية قوية مصممة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو الإفصاح عنها أو تغييرها أو إتلافها. نقوم بتحديث بروتوكولات الأمان لدينا بانتظام لضمان الامتثال لمعايير الصناعة.</p>" },
    { n: "08", h: "روابط الطرف الثالث", html: "<p>قد يتضمن موقعنا الإلكتروني روابط لمواقع خارجية لا نقوم بإدارتها. نحن لسنا مسؤولين عن ممارسات الخصوصية للأطراف الثالثة. نوصي بمراجعة سياسات الخصوصية لأي مواقع خارجية تزورها.</p>" },
    { n: "09", h: "التغييرات على سياسة الخصوصية هذه", html: "<p>نحتفظ بالحق في تحديث أو تعديل سياسة الخصوصية هذه في أي وقت. سنخطرك بالتغييرات المهمة عبر البريد الإلكتروني أو من خلال نشر إشعار بشكل بارز على موقعنا. نشجعك على المراجعة المنتظمة لهذه السياسة للحصول على أحدث المعلومات حول ممارسات الخصوصية لدينا.</p>" },
    { n: "10", h: "التواصل بشأن أسئلة الخصوصية", html: "<p>إذا كانت لديك أي أسئلة أو استفسارات أو طلبات بخصوص سياسة الخصوصية أو التعامل مع بياناتك، يرجى الاتصال بنا على:</p><p><strong>البريد الإلكتروني:</strong> <a href=\"mailto:info@elchaigroup.com\">info@elchaigroup.com</a></p><p><strong>العنوان:</strong> 2008، مركز جميرا للأعمال 1 - كلاستر G - الثنية الخامسة - أبراج بحيرات جميرا - دبي - الإمارات العربية المتحدة</p>" },
  ],
};

const IT: Copy = {
  home: "Home",
  breadcrumb: "Informativa sulla Privacy",
  title: "Informativa sulla Privacy",
  subtitle: "Ultimo aggiornamento: 2026-05-12. Questa informativa spiega come Elchai Group gestisce i tuoi dati personali.",
  sections: [
    { n: "01", h: "Introduzione", html: "<p>Elchai (\"noi\", \"ci\" o \"nostro\") valorizza la tua privacy e si impegna a proteggere le tue informazioni personali. La presente Informativa sulla privacy descrive il modo in cui raccogliamo, utilizziamo e tuteliamo i tuoi dati quando visiti il nostro sito web o utilizzi i nostri servizi.</p>" },
    { n: "02", h: "Dati raccolti", html: "<h3>Informazioni personali</h3><ul><li>Nome</li><li>Indirizzo email</li><li>Numero di contatto</li><li>Dati aziendali (se forniti)</li></ul><h3>Informazioni sull'utilizzo</h3><ul><li>Tipo e versione del browser</li><li>Tipo di dispositivo</li><li>Indirizzo IP</li><li>Pagine visitate sul nostro sito web</li><li>Data e ora delle visite</li></ul><h3>Informazioni fornite volontariamente</h3><ul><li>Dati inviati tramite moduli di contatto o iscrizioni</li><li>Informazioni fornite durante domande, richieste di supporto o feedback</li></ul>" },
    { n: "03", h: "Come vengono utilizzati i dati", html: "<p>Utilizziamo le informazioni raccolte per:</p><ul><li>Fornire e migliorare i nostri servizi</li><li>Rispondere alle tue domande e richieste al servizio clienti</li><li>Comunicare aggiornamenti, notizie, materiale promozionale o altre informazioni che hai scelto</li><li>Analizzare l'utilizzo del sito web per migliorare l'esperienza utente</li><li>Garantire la conformità alle leggi e ai regolamenti applicabili</li></ul>" },
    { n: "04", h: "Cookie e tracciamento", html: "<p>Il nostro sito web utilizza cookie e tecnologie di tracciamento simili per migliorare la tua esperienza di navigazione, analizzare il traffico del sito web e comprendere le interazioni degli utenti.</p><h3>Tipi di cookie che utilizziamo</h3><ul><li><strong>Cookie necessari:</strong> essenziali per la funzionalità del sito web</li><li><strong>Cookie analitici:</strong> ci aiutano a comprendere le interazioni degli utenti per migliorare il nostro sito</li><li><strong>Cookie di preferenza:</strong> ricordano le tue impostazioni e preferenze</li></ul><p>Puoi controllare le impostazioni dei cookie attraverso le preferenze del tuo browser. La disabilitazione dei cookie potrebbe influire sulla tua esperienza utente.</p>" },
    { n: "05", h: "Diritti dell'utente", html: "<p>Hai i seguenti diritti riguardo ai tuoi dati:</p><ul><li><strong>Accesso:</strong> richiedere l'accesso ai tuoi dati personali</li><li><strong>Rettifica:</strong> richiedere la correzione di dati inesatti o incompleti</li><li><strong>Cancellazione:</strong> richiedere la cancellazione dei tuoi dati personali</li><li><strong>Opposizione:</strong> opporsi al trattamento o all'utilizzo dei tuoi dati</li><li><strong>Revoca:</strong> revocare il tuo consenso al trattamento dei dati in qualsiasi momento</li></ul><p>Per esercitare uno qualsiasi di questi diritti, ti preghiamo di contattarci all'indirizzo <a href=\"mailto:info@elchaigroup.com\">info@elchaigroup.com</a>.</p>" },
    { n: "06", h: "Conservazione dei dati", html: "<p>Conserviamo le tue informazioni personali solo per il tempo necessario a fornire i nostri servizi o adempiere agli scopi delineati nella presente informativa. Inoltre, potremmo conservare e utilizzare le tue informazioni per rispettare obblighi legali, risolvere controversie o far rispettare accordi.</p>" },
    { n: "07", h: "Sicurezza dei tuoi dati", html: "<p>Implementiamo solide misure di sicurezza progettate per proteggere le tue informazioni personali da accesso, divulgazione, alterazione o distruzione non autorizzati. Aggiorniamo regolarmente i nostri protocolli di sicurezza per garantire la conformità agli standard del settore.</p>" },
    { n: "08", h: "Collegamenti di terze parti", html: "<p>Il nostro sito web può includere collegamenti a siti esterni non gestiti da noi. Non siamo responsabili delle pratiche sulla privacy di terze parti. Ti consigliamo di rivedere le politiche sulla privacy di tutti i siti web esterni che visiti.</p>" },
    { n: "09", h: "Modifiche alla presente Informativa sulla privacy", html: "<p>Ci riserviamo il diritto di aggiornare o modificare la presente Informativa sulla privacy in qualsiasi momento. Ti informeremo sui cambiamenti significativi tramite email o pubblicando in modo visibile un avviso sul nostro sito. Incoraggiamo la revisione regolare di questa informativa per le informazioni più recenti sulle nostre pratiche sulla privacy.</p>" },
    { n: "10", h: "Contatto per domande sulla privacy", html: "<p>Se hai domande, dubbi o richieste riguardanti la nostra Informativa sulla privacy o il trattamento dei tuoi dati, contattaci all'indirizzo:</p><p><strong>Email:</strong> <a href=\"mailto:info@elchaigroup.com\">info@elchaigroup.com</a></p><p><strong>Indirizzo:</strong> 2008, Jumeirah Business Center 1 - Cluster G - Al Thanyah Fifth - Jumeirah Lakes Towers - Dubai - Emirati Arabi Uniti</p>" },
  ],
};

const COPY: Record<"EN" | "AR" | "IT", Copy> = { EN, AR, IT };

export function PrivacyPolicyBody() {
  const { locale } = useLocale();
  const t = COPY[locale] ?? COPY.EN;

  return (
    <main className="relative" style={{ zIndex: 1 }}>
      <section
        className="relative pt-32 pb-8 lg:pt-36 lg:pb-12"
        aria-label={t.title}
      >
        <div className="section-box mx-auto max-w-[1080px] px-6 sm:px-12 lg:px-16 py-16 lg:py-20">
          <Reveal>
            <nav
              aria-label="Breadcrumb"
              className="font-[var(--font-mono)] text-[11px] uppercase tracking-[0.22em] text-white/45 flex flex-wrap items-center gap-2"
            >
              <Link href="/" className="hover:text-brand-sky transition-colors">
                {t.home}
              </Link>
              <span aria-hidden="true" className="text-white/30">/</span>
              <span className="text-brand-sky">{t.breadcrumb}</span>
            </nav>
          </Reveal>
          <Reveal delay={0.10}>
            <h1
              className="mt-8 font-[var(--font-display)] font-bold leading-[1.04]
                         tracking-[-0.025em] text-[clamp(36px,5vw,72px)]"
            >
              {t.title}
            </h1>
          </Reveal>
          <Reveal delay={0.20}>
            <p className="mt-6 text-[15px] leading-[1.65] text-white/65 max-w-[640px]">
              {t.subtitle}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="relative py-10 lg:py-14">
        <div className="section-box mx-auto max-w-[1080px] px-6 sm:px-12 lg:px-16 py-16 lg:py-20">
          <div className="space-y-12 lg:space-y-16">
            {t.sections.map((s) => (
              <Reveal key={s.n}>
                <article className="grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-6 lg:gap-12">
                  <div>
                    <span className="font-[var(--font-mono)] text-[11px] tracking-[0.22em] text-brand-sky">
                      {s.n}
                    </span>
                  </div>
                  <div>
                    <h2 className="font-[var(--font-display)] font-bold leading-[1.10] tracking-[-0.015em] text-[clamp(22px,2.2vw,32px)]">
                      {s.h}
                    </h2>
                    <div className="policy-body mt-5 text-[15px] leading-[1.70] text-white/75 space-y-4">
                      {parse(s.html)}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
