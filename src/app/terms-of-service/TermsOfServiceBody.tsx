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
  breadcrumb: "Terms of Service",
  title: "Terms of Service",
  subtitle: "Last updated: 2026-05-20. The rules governing your use of this site and any engagement with Elchai Group.",
  sections: [
    { n: "01", h: "Acceptance of Terms", html: "<p>By accessing or using elchaigroup.com (the \"Site\") or engaging Elchai Group (\"Elchai,\" \"we,\" \"us\") for any service, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree, do not use the Site or engage our services.</p>" },
    { n: "02", h: "Services", html: "<p>Elchai provides AI, blockchain, and software development consulting and engineering services. Specific scope, deliverables, fees, and timelines for each engagement are defined in a separate signed Statement of Work (\"SOW\") or Master Services Agreement (\"MSA\"), which controls in the event of conflict with these Terms.</p>" },
    { n: "03", h: "Intellectual Property", html: "<p>Site content — including text, graphics, code, designs, logos, and trade marks — is owned by Elchai or its licensors and protected by applicable IP laws. You may not copy, modify, redistribute, or create derivative works without prior written permission.</p><p>For paid engagements, custom deliverables transfer to the client on full payment, subject to retention of Elchai background IP and reusable tooling as set out in the applicable SOW or MSA.</p>" },
    { n: "04", h: "Acceptable Use", html: "<p>You agree not to use the Site or our services to:</p><ul><li>Violate any applicable law, regulation, or third-party right</li><li>Transmit malware, exploits, or content that disrupts the Site</li><li>Attempt unauthorized access to systems, data, or accounts</li><li>Reverse engineer or scrape the Site beyond reasonable use</li><li>Misrepresent your identity or affiliation with Elchai</li></ul>" },
    { n: "05", h: "Third-Party Services", html: "<p>Engagements may involve third-party platforms (cloud providers, model APIs, blockchain networks, audit firms). Use of those services is governed by their own terms, and Elchai is not liable for their availability, performance, or policy changes.</p>" },
    { n: "06", h: "Disclaimers", html: "<p>The Site is provided \"as is\" and \"as available\" without warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Site will be uninterrupted, error-free, or free of harmful components.</p>" },
    { n: "07", h: "Limitation of Liability", html: "<p>To the maximum extent permitted by law, Elchai will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, revenue, data, or goodwill, arising from your use of the Site. For engagement-related liability, the cap and exclusions in the applicable SOW or MSA apply.</p>" },
    { n: "08", h: "Indemnification", html: "<p>You agree to indemnify and hold harmless Elchai, its officers, employees, and affiliates from any claim or demand arising out of your breach of these Terms or your misuse of the Site or services.</p>" },
    { n: "09", h: "Governing Law", html: "<p>These Terms are governed by the laws of the United Arab Emirates and the Emirate of Dubai, without regard to conflict-of-laws principles. Any dispute will be resolved in the courts of the Dubai International Financial Centre (DIFC), unless an applicable SOW or MSA designates a different forum.</p>" },
    { n: "10", h: "Changes to These Terms", html: "<p>We may update these Terms periodically. Material changes will be communicated by updating the date below and, where appropriate, by email or a Site notice. Continued use of the Site after changes take effect constitutes acceptance.</p>" },
    { n: "11", h: "Contact", html: "<p>Questions about these Terms? Contact us at:</p><p><strong>Email:</strong> <a href=\"mailto:info@elchaigroup.com\">info@elchaigroup.com</a></p><p><strong>Address:</strong> 2008, Jumeirah Business Center 1 - Cluster G - Al Thanyah Fifth - Jumeirah Lakes Towers - Dubai - United Arab Emirates</p>" },
  ],
};

const AR: Copy = {
  home: "الرئيسية",
  breadcrumb: "شروط الخدمة",
  title: "شروط الخدمة",
  subtitle: "آخر تحديث: 2026-05-20. القواعد التي تحكم استخدامك لهذا الموقع وأي تعامل مع مجموعة Elchai.",
  sections: [
    { n: "01", h: "قبول الشروط", html: "<p>من خلال الوصول إلى موقع elchaigroup.com (\"الموقع\") أو استخدامه أو التعامل مع Elchai Group (\"Elchai\" أو \"نحن\" أو \"لنا\") في أي خدمة، فإنك توافق على الالتزام بشروط الخدمة هذه وسياسة الخصوصية الخاصة بنا. إذا كنت لا توافق، فلا تستخدم الموقع أو تستعن بخدماتنا.</p>" },
    { n: "02", h: "الخدمات", html: "<p>توفر Elchai خدمات استشارات وهندسة في مجال الذكاء الاصطناعي وسلاسل الكتل وتطوير البرمجيات. يتم تحديد النطاق والتسليمات والرسوم والجداول الزمنية المحددة لكل مشاركة في بيان عمل منفصل موقع (\"SOW\") أو اتفاقية الخدمات الرئيسية (\"MSA\")، والتي تتحكم في حالة التعارض مع هذه الشروط.</p>" },
    { n: "03", h: "الملكية الفكرية", html: "<p>محتوى الموقع — بما في ذلك النصوص والرسومات والكود والتصميمات والشعارات والعلامات التجارية — مملوك لشركة Elchai أو الجهات المرخصة التابعة لها، وهو محمي بموجب قوانين الملكية الفكرية المعمول بها. لا يجوز لك نسخ أو تعديل أو إعادة توزيع أو إنشاء أعمال مشتقة دون الحصول على إذن كتابي مسبق.</p><p>بالنسبة للمشاركات المدفوعة، يتم نقل التسليمات المخصصة إلى العميل عند الدفع الكامل، مع مراعاة الاحتفاظ بالملكية الفكرية الخلفية لشركة Elchai والأدوات القابلة لإعادة الاستخدام كما هو منصوص عليه في بيان العمل أو MSA المعمول به.</p>" },
    { n: "04", h: "الاستخدام المقبول", html: "<p>أنت توافق على عدم استخدام الموقع أو خدماتنا من أجل:</p><ul><li>انتهاك أي قانون أو لائحة معمول بها أو حقوق طرف ثالث</li><li>نقل برامج ضارة أو عمليات استغلال أو محتوى يعطل الموقع</li><li>محاولة الوصول غير المصرح به إلى الأنظمة أو البيانات أو الحسابات</li><li>الهندسة العكسية للموقع أو استخراجه بما يتجاوز الاستخدام المعقول</li><li>تحريف هويتك أو انتمائك إلى Elchai</li></ul>" },
    { n: "05", h: "خدمات الطرف الثالث", html: "<p>قد تتضمن المشاركات منصات خارجية (مزودي خدمات سحابية، واجهات برمجة تطبيقات نموذجية، شبكات بلوكتشين، شركات تدقيق). يخضع استخدام هذه الخدمات لشروطها الخاصة، ولا تتحمل Elchai مسؤولية توفرها أو أدائها أو تغييرات سياستها.</p>" },
    { n: "06", h: "إخلاء المسؤولية", html: "<p>يتم توفير الموقع \"كما هو\" و\"كما هو متاح\" دون ضمانات من أي نوع، صريحة كانت أم ضمنية، بما في ذلك ضمانات القابلية للتسويق والملاءمة لغرض معين وعدم الانتهاك. نحن لا نضمن أن الموقع سيكون دون انقطاع، أو خاليًا من الأخطاء، أو خاليًا من المكونات الضارة.</p>" },
    { n: "07", h: "حدود المسؤولية", html: "<p>إلى الحد الأقصى الذي يسمح به القانون، لن تكون Elchai مسؤولة عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية أو تأديبية، أو أي خسارة في الأرباح أو الإيرادات أو البيانات أو الشهرة تنشأ عن استخدامك للموقع. بالنسبة للمسؤولية المتعلقة بالمشاركة، يطبق الحد الأقصى والاستثناءات الواردة في بيان العمل أو MSA المعمول به.</p>" },
    { n: "08", h: "التعويض", html: "<p>إنك توافق على تعويض Elchai ومسؤوليها وموظفيها والشركات التابعة لها وحمايتها من أي مطالبة أو طلب ينشأ عن انتهاكك لهذه الشروط أو سوء استخدامك للموقع أو الخدمات.</p>" },
    { n: "09", h: "القانون الحاكم", html: "<p>تخضع هذه الشروط لقوانين دولة الإمارات العربية المتحدة وإمارة دبي، بصرف النظر عن مبادئ تنازع القوانين. سيتم حل أي نزاع في محاكم مركز دبي المالي العالمي (DIFC)، ما لم يحدد بيان العمل أو MSA المعمول به منتدى مختلفًا.</p>" },
    { n: "10", h: "التغييرات على هذه الشروط", html: "<p>يجوز لنا تحديث هذه الشروط بشكل دوري. سيتم الإبلاغ عن التغييرات الجوهرية عبر تحديث التاريخ أدناه، وإذا كان ذلك مناسبًا، عبر البريد الإلكتروني أو إشعار الموقع. إن الاستمرار في استخدام الموقع بعد سريان التغييرات يشكل قبولًا.</p>" },
    { n: "11", h: "التواصل", html: "<p>هل لديك أسئلة بخصوص هذه الشروط؟ اتصل بنا على:</p><p><strong>البريد الإلكتروني:</strong> <a href=\"mailto:info@elchaigroup.com\">info@elchaigroup.com</a></p><p><strong>العنوان:</strong> 2008، مركز جميرا للأعمال 1 - كلاستر G - الثنية الخامسة - أبراج بحيرات جميرا - دبي - الإمارات العربية المتحدة</p>" },
  ],
};

const IT: Copy = {
  home: "Home",
  breadcrumb: "Termini di Servizio",
  title: "Termini di Servizio",
  subtitle: "Ultimo aggiornamento: 20/05/2026. Le regole che regolano l'utilizzo di questo sito e qualsiasi rapporto con Elchai Group.",
  sections: [
    { n: "01", h: "Accettazione dei Termini", html: "<p>Accedendo o utilizzando elchaigroup.com (il \"Sito\") o coinvolgendo Elchai Group (\"Elchai\", \"noi\", \"ci\") per qualsiasi servizio, accetti di essere vincolato dai presenti Termini di Servizio e dalla nostra Informativa sulla Privacy. Se non sei d'accordo, non utilizzare il Sito né richiedere i nostri servizi.</p>" },
    { n: "02", h: "Servizi", html: "<p>Elchai fornisce servizi di consulenza e ingegneria in ambito AI, blockchain e sviluppo software. L'ambito specifico, i deliverable, le tariffe e le tempistiche per ciascun incarico sono definiti in uno Statement of Work (\"SOW\") o in un Master Services Agreement (\"MSA\") firmato separatamente, che prevale in caso di conflitto con i presenti Termini.</p>" },
    { n: "03", h: "Proprietà Intellettuale", html: "<p>Il contenuto del sito — inclusi testo, grafica, codice, design, loghi e marchi commerciali — è di proprietà di Elchai o dei suoi licenzianti ed è protetto dalle leggi sulla proprietà intellettuale applicabili. Non è consentito copiare, modificare, ridistribuire o creare opere derivate senza previa autorizzazione scritta.</p><p>Per gli incarichi retribuiti, i deliverable personalizzati vengono trasferiti al cliente a pagamento completato, fermo restando il diritto di Elchai a conservare la propria background IP e gli strumenti riutilizzabili come stabilito nel SOW o MSA applicabile.</p>" },
    { n: "04", h: "Uso Accettabile", html: "<p>Accetti di non utilizzare il Sito o i nostri servizi per:</p><ul><li>Violare qualsiasi legge, regolamento o diritto di terzi applicabile</li><li>Trasmettere malware, exploit o contenuti che interrompono il Sito</li><li>Tentare l'accesso non autorizzato a sistemi, dati o account</li><li>Eseguire reverse engineering o scraping del Sito oltre un uso ragionevole</li><li>Travisare la tua identità o affiliazione con Elchai</li></ul>" },
    { n: "05", h: "Servizi di Terze Parti", html: "<p>Gli incarichi possono coinvolgere piattaforme di terze parti (fornitori di cloud, API di modelli, reti blockchain, società di audit). L'utilizzo di tali servizi è regolato dai relativi termini ed Elchai non è responsabile della loro disponibilità, prestazioni o modifiche di policy.</p>" },
    { n: "06", h: "Esclusioni di Responsabilità", html: "<p>Il Sito è fornito \"così com'è\" e \"come disponibile\" senza garanzie di alcun tipo, esplicite o implicite, comprese le garanzie di commerciabilità, idoneità per uno scopo particolare e non violazione. Non garantiamo che il Sito sarà ininterrotto, privo di errori o privo di componenti dannosi.</p>" },
    { n: "07", h: "Limitazione di Responsabilità", html: "<p>Nella misura massima consentita dalla legge, Elchai non sarà responsabile per eventuali danni indiretti, incidentali, speciali, consequenziali o punitivi, o per qualsiasi perdita di profitti, ricavi, dati o avviamento derivante dall'utilizzo del Sito. Per la responsabilità relativa agli incarichi, si applicano il limite massimo e le esclusioni previste dal SOW o MSA applicabile.</p>" },
    { n: "08", h: "Indennizzo", html: "<p>Accetti di indennizzare e tenere indenne Elchai, i suoi funzionari, dipendenti e affiliati da qualsiasi reclamo o richiesta derivante dalla violazione dei presenti Termini o dall'uso improprio del Sito o dei servizi.</p>" },
    { n: "09", h: "Legge Applicabile", html: "<p>I presenti Termini sono regolati dalle leggi degli Emirati Arabi Uniti e dell'Emirato di Dubai, indipendentemente dai principi sul conflitto di leggi. Qualsiasi controversia verrà risolta nei tribunali del Dubai International Financial Centre (DIFC), salvo che un SOW o MSA applicabile designi un foro diverso.</p>" },
    { n: "10", h: "Modifiche ai Termini", html: "<p>Possiamo aggiornare periodicamente i presenti Termini. Le modifiche sostanziali verranno comunicate aggiornando la data riportata di seguito e, se del caso, tramite email o avviso sul Sito. L'uso continuato del Sito dopo l'entrata in vigore delle modifiche costituisce accettazione.</p>" },
    { n: "11", h: "Contatti", html: "<p>Domande sui presenti Termini? Contattaci a:</p><p><strong>Email:</strong> <a href=\"mailto:info@elchaigroup.com\">info@elchaigroup.com</a></p><p><strong>Indirizzo:</strong> 2008, Jumeirah Business Center 1 - Cluster G - Al Thanyah Fifth - Jumeirah Lakes Towers - Dubai - Emirati Arabi Uniti</p>" },
  ],
};

const COPY: Record<"EN" | "AR" | "IT", Copy> = { EN, AR, IT };

export function TermsOfServiceBody() {
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
            <h1 className="mt-8 font-[var(--font-display)] font-bold leading-[1.04] tracking-[-0.025em] text-[clamp(36px,5vw,72px)]">
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
