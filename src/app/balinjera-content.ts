export type BalinjeraLang = "he" | "en";

export type BalinjeraPageKey =
  | "home"
  | "about"
  | "menu"
  | "events"
  | "blog"
  | "accessibility";

export type BalinjeraFooterLine =
  | string
  | {
      href: string;
      label: string;
    };

export type BalinjeraBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  body: readonly string[];
};

export type BalinjeraMenuItem = {
  name: string;
  description?: string;
  price: string;
};

export type BalinjeraMenuSection = {
  title: string;
  items: readonly BalinjeraMenuItem[];
};

export const BALINJERA_ORDER_HREF =
  "https://wolt.com/he/isr/tel-aviv/restaurant/balinjera";
export const BALINJERA_PHONE_DISPLAY = "03-525-2527";
export const BALINJERA_PHONE_HREF = "tel:+97235252527";
export const BALINJERA_EMAIL = "fantaprada25@gmail.com";
export const BALINJERA_ACCESSIBILITY_HREF = "/accessibility";
export const SITEKEPT_URL = "https://www.sitekept.com";

export const languageLabels: Record<
  BalinjeraLang,
  { current: string; switchTo: string; switchLabel: string; dir: "rtl" | "ltr" }
> = {
  he: {
    current: "עברית",
    switchTo: "EN",
    switchLabel: "Switch to English",
    dir: "rtl",
  },
  en: {
    current: "English",
    switchTo: "עברית",
    switchLabel: "החלפה לעברית",
    dir: "ltr",
  },
};

export function resolveLang(value?: string | string[]): BalinjeraLang {
  const raw = Array.isArray(value) ? value[0] : value;

  return raw === "en" ? "en" : "he";
}

export function hrefWithLang(href: string, lang: BalinjeraLang) {
  const [basePath, hash] = href.split("#");
  const path = basePath || "/";
  const separator = path.includes("?") ? "&" : "?";

  return `${path}${separator}lang=${lang}${hash ? `#${hash}` : ""}`;
}

export const balinjeraCopy = {
  he: {
    navLabel: "תפריט ראשי",
    menuLabel: "פתיחת תפריט",
    orderLabel: "הזמינו",
    contactLabel: "צרו קשר",
    menuCta: "תפריט",
    moreInfo: "מידע נוסף",
    orderWolt: "הזמינו דרך Wolt",
    readyTitle: ["מוכנים לאכול?", "הזמינו שולחן עכשיו!"],
    madeBy: "נבנה על ידי Sitekept",
    footerTagline: "מסעדת באלינג׳רה,\nמטבח אתיופי מסורתי",
    footerColumns: [
      {
        title: "כתובת",
        lines: ["מל״ן 4 / הכובשים 39", "תל אביב"],
      },
      {
        title: "שמרו על קשר",
        lines: [
          { label: BALINJERA_PHONE_DISPLAY, href: BALINJERA_PHONE_HREF },
          { label: BALINJERA_EMAIL, href: `mailto:${BALINJERA_EMAIL}` },
          { label: "הצהרת נגישות", href: BALINJERA_ACCESSIBILITY_HREF },
        ],
      },
      {
        title: "שעות פתיחה",
        lines: ["ראשון-חמישי", "12:00-20:00", "שישי", "11:00-15:00"],
      },
    ],
    follow: "עקבו אחרינו",
    quick: {
      accessibility: "אפשרויות נגישות",
      actions: "פעולות מהירות",
      wolt: "הזמנה ב-Wolt",
      whatsapp: "WhatsApp",
    },
    nav: [
      { key: "home", label: "ראשי", href: "/" },
      { key: "about", label: "אודותינו", href: "/about" },
      { key: "menu", label: "תפריט", href: "/menu" },
      { key: "events", label: "אירועים", href: "/events" },
      { key: "blog", label: "בלוג", href: "/blog" },
      { key: "order", label: "הזמינו", href: BALINJERA_ORDER_HREF },
    ],
    hero: {
      eyebrow: "ביסטרו אתיופי כשר בכרם התימנים",
      title: "מסעדת באלינג׳רה,\nמטבח אתיופי\nמסורתי",
      body: "אנו מציעים חוויה אתיופית אמיתית. תוכלו למצוא אצלנו את המנות האתיופיות המוכרות כמו אינג׳רה לצד מנות שטרם יצא לכם להכיר. התפריט של ״באלינג׳רה״ מבוסס על חומרי גלם טריים בריאים וטבעיים עם תיבול אתיופי ייחודי שמתאים גם לחיך הישראלי.",
    },
    intro: {
      title: "מסעדה אתיופית כשרה בכרם התימנים",
      body: "קשה להסביר במילים את מה שאנחנו מציעים בבאלינג׳רה, אבל אם כבר הבנתם מהשם של המקום, אז כן, אנחנו מכינים אוכל אתיופי מסורתי, בריא, טעים ובעיקר עם מלא מלא צבע! זה בסדר לא נעלבנו אם תגידו לנו שזו הפעם הראשונה שאתם מגיעים אלינו, רק לפני כמה שנים החלטנו להרים את הכפפה או יותר נכון את הסירים ולחשוף לכולם את הטעמים והריחות של מסורת אתיופית/יהודית ארוכת שנים. ואם כבר אתיופי אז אין כמו אינג׳רה טרייה שאנחנו מכינים יום יום (ללא גלוטן). אתם מוזמנים להגיע לטעום ולחוות חוויה יוצאת דופן שכמוה עוד לא חוויתם, אחר כך כבר תחזרו לבד.",
    },
    featureCards: [
      {
        title: "אירועים",
        description:
          "אתם מוזמנים להגיע לטעום ולחוות חוויה יוצאת דופן שכמוה עוד לא חוויתם, אחר כך כבר תחזרו לבד.",
        href: "/events",
        media: "event",
      },
      {
        title: "מסעדה",
        description:
          "ביסטרו קליל וצעיר בפאתי שוק הכרמל המשמש כאכסניה חמה למטבח האתיופי.",
        href: "/about",
        media: "restaurant",
      },
      {
        title: "מוצרים מאתיופיה",
        description:
          "אנחנו מכינים אוכל אתיופי מסורתי, בריא, טעים ובעיקר עם מלא מלא צבע!",
        media: "products",
      },
    ],
    featureSeo: {
      eyebrow: "מסעדה אתיופית כשרה בתל אביב",
      title: "אינג׳רה טרייה ואוכל אתיופי מסורתי בכרם התימנים",
      body: [
        "באלינג׳רה היא מסעדה אתיופית כשרה בכרם התימנים, ליד שוק הכרמל בלב תל אביב. המטבח מגיש אינג׳רה טרייה מקמח טף, תבשילים מתובלים, מנות בשריות וטבעוניות ושולחן חם שנועד לאכילה משותפת.",
        "למי שמחפש אוכל אתיופי כשר בתל אביב, באלינג׳רה מחברת מסורת אתיופית-יהודית עם ביסטרו מקומי צעיר: צלחות צבעוניות, חומרי גלם טבעיים, אינג׳רה ללא גלוטן ואירוח לארוחה במסעדה, הזמנה ב-Wolt או אירוע קטן.",
      ],
    },
    name: {
      title: "איך בא לי אינג׳ירה",
      body: "משמעות השם של המקום הוא משחק מילים בין המילה אינג׳ירה שהוא הלחם האתיופי הלאומי, והמילה באלינג׳רה באמהרית שמשמעותה לאכול ביחד, הדרך המסורתית לאכול באתיופיה היא במשותף.",
    },
    quote: {
      body: "אחת מתחנות הביקור שלי בשוק הכרמל היתה מסקרנת במיוחד: ״באלינג׳רה״ מסעדה אתיופית שהוקמה ע״י פאנטה. התרגום של שם המסעדה הוא: ״ביחד״ וכך גם היתה התחושה שלי הן לגבי המקום והן לגבי הדרך שאוכלים כאן. זאת הפעם הראשונה שלי במסעדה אתיופית ואני שמח שניסיתי. טעמתי אוכל נהדר ומפתיע מאוד.",
      cite: "שאול לוי",
    },
    aboutPage: {
      eyebrow: "אודות באלינג׳רה",
      title: "בית קטן למטבח אתיופי מסורתי בלב תל אביב",
      body: "באלינג׳רה נולדה מתוך רצון לפתוח שולחן אתיופי אמיתי: אינג׳רה טרייה, תבשילים מתובלים, ירקות, קטניות, בשר וטעמים שמגיעים ממסורת משפחתית. המסעדה יושבת בפאתי שוק הכרמל וכרם התימנים, ומחברת בין אוכל ביתי, הכנסת אורחים וחוויה צבעונית שלא מנסה להיראות כמו שום דבר אחר.",
      highlights: [
        "אינג׳רה טרייה ללא גלוטן מקמח טף",
        "מנות בשריות וטבעוניות לפי המסורת האתיופית",
        "חוויה משפחתית של אכילה משותפת סביב שולחן אחד",
      ],
      storyTitle: "הסיפור של המקום",
      story:
        "רק לפני כמה שנים החלטנו להרים את הסירים ולחשוף לכולם את הטעמים והריחות של מסורת אתיופית/יהודית ארוכת שנים. בבאלינג׳רה לא רק מזמינים מנה, אלא פותחים את השולחן, קורעים אינג׳רה בידיים ואוכלים ביחד.",
    },
    eventsPage: {
      eyebrow: "אירועים בבאלינג׳רה",
      title: "אירוע קטן, צבעוני ומלא טעמים",
      body: "המסעדה מתאימה למפגשים משפחתיים, ימי הולדת, ארוחות צוות וחוויות טעימה סביב המטבח האתיופי. אנחנו שומרים על האופי החם של המקום, עם תפריט שמבוסס על אינג׳רה טרייה, תבשילים בשריים או טבעוניים ושולחן שמזמין לאכול ביחד.",
      options: [
        "ארוחות קבוצתיות סביב שולחן משותף",
        "טעימות היכרות עם המטבח האתיופי",
        "תפריט בשרי או טבעוני לפי אופי האירוע",
      ],
      ctaTitle: "רוצים לתכנן אירוע?",
      ctaBody:
        "שלחו לנו פרטים ונבנה יחד ארוחה שמתאימה לקבוצה, לשעה ולסגנון האירוח.",
      eventSeo: {
        eyebrow: "אירועים תיירותיים במסעדה אתיופית כשרה בתל אביב",
        title: "חוויה קולינרית אתיופית בכרם התימנים ההיסטורי",
        body: [
          "באלינג׳רה מארחת אירועים תיירותיים, ארוחות טעימה תרבותיות, ימי הולדת, מפגשים משפחתיים וארוחות צוות בכרם התימנים, אחת השכונות ההיסטוריות של תל אביב ליד שוק הכרמל. החוויה בנויה סביב אינג׳רה טרייה, מגשים משותפים, מסורת אתיופית-יהודית ואירוח מקומי חם.",
          "לקבוצות שמחפשות חוויית אוכל מיוחדת בתל אביב, באלינג׳רה מציעה אפשרויות טבעוניות ובשריות, תבשילים צבעוניים ושולחן שנועד לאכילה משותפת - תחנה טבעית למבקרים שרוצים לגלות מטבח אתיופי בתוך סביבה מקומית היסטורית.",
          "בנוסף לאירועים במסעדה, באלינג׳רה מציעה קייטרינג אתיופי לאירועים פרטיים בתל אביב: ימי הולדת, כנסים, ארוחות צוות ומפגשי משפחה. אנחנו מגיעים עם תפריט מלא, אינג׳רה טרייה ואווירה חמה שהופכת כל אירוע לחוויה ייחודית.",
        ],
      },
      form: {
        title: "ספרו לנו על האירוע",
        body: "מלאו את הפרטים ונחזור אליכם בהקדם כדי לתכנן יחד את האירוע.",
        submit: "שליחת פרטים",
        sending: "שולח…",
        success:
          "תודה! הפרטים נשלחו ונחזור אליכם בהקדם. אפשר גם להתקשר אלינו לכל שאלה.",
        error:
          "שליחת הטופס נכשלה. נסו שוב בעוד רגע או התקשרו אלינו ונשמח לעזור.",
        consent: "אני מאשר/ת שיחזרו אליי לגבי האירוע.",
        fields: {
          name: {
            label: "שם מלא",
            placeholder: "איך לפנות אליכם",
          },
          email: {
            label: "אימייל",
            placeholder: "name@example.com",
          },
          phone: {
            label: "טלפון",
            placeholder: "050-000-0000",
          },
          date: {
            label: "תאריך רצוי",
            placeholder: "בחרו תאריך",
          },
          guests: {
            label: "מספר משתתפים",
            placeholder: "לדוגמה 18",
          },
          message: {
            label: "מה חשוב שנדע?",
            placeholder:
              "סוג האירוע, שעה מועדפת, העדפות אוכל וכל פרט שיעזור לנו לחזור אליכם.",
          },
        },
      },
    },
    menuPage: {
      title: "התפריט, מסעדת באלינג׳רה",
      body: "באלינג׳רה מציעה מאכלי עדה אתיופיים מסורתיים מבוססי מנת האינג׳רה מלחם הטף. תבשילים צמחוניים, טבעוניים ותבשילים בשריים בטעמים אותנטיים.",
      sections: [
        {
          title: "תפריט אוכל",
          items: [
            {
              name: "סלט נפרו",
              description: "סלט חיטה, עם עשבי טיבול וחמוציות",
              price: "35 ₪",
            },
            {
              name: "סלט הבית",
              description:
                "חסה, בצל עגבניות, פטרוזיליה, כוסברה, נענע, ברוטב שמן זית וטחינת הבית",
              price: "40 ₪",
            },
            {
              name: "חציל בטחינה אתיופית",
              description: "טחינה אתיופית אורגנית, סלסה אתיופית",
              price: "32 ₪",
            },
            {
              name: "אינג׳ירה פירפיר",
              description: "סלט עם חתיכות אינג׳רה",
              price: "30 ₪",
            },
            {
              name: "פירפיר",
              description:
                "חתיכות אינג׳ירה מוקפצות עם בצל ובירברי, חריף אתיופי פיקנטי",
              price: "40 ₪",
            },
            {
              name: "צלוחית טחינה אתיופית אורגנית מתובלת",
              description: "תיבול ייחודי",
              price: "15 ₪",
            },
            {
              name: "דאבו",
              description: "לחם אתיופי",
              price: "10 ₪",
            },
            {
              name: "תוספת אינג׳ירה",
              price: "10 ₪",
            },
            {
              name: "מרק היום",
              description: "תוספת טיבעונית 10 ₪ / תוספת בשרית 22 ₪",
              price: "30 ₪",
            },
            {
              name: "באלינג׳רה שירו",
              description: "אינג׳רה עם שירו + פלפל חריף טרי",
              price: "35 ₪",
            },
            {
              name: "באלינג׳רה ליחיד",
              description:
                "4 תוספות טבעוניות לבחירה שמורכבות ממגוון של קטניות וירקות מבושלים",
              price: "50 ₪",
            },
            {
              name: "באלינג׳רה זוגית טבעונית",
              description:
                "7 תוספות טבעוניות שמורכבות ממגוון של קטניות וירקות מבושלים",
              price: "85 ₪",
            },
            {
              name: "באלינג׳רה זוגית בשרית",
              description:
                "2 סוגי בשר לבחירה, 2 אינג׳רות, 4 תוספות צמחוניות + סלט קטן + דאבו + טחינה",
              price: "115 ₪",
            },
            {
              name: "פסטיבל באלינג׳רה",
              description:
                "7 תוספות טבעוניות + 3 תוספות בשריות + סלט גדול + טחינה אתיופית + 3 אינג׳רות",
              price: "160 ₪",
            },
            {
              name: "טיבס באלינג׳רה",
              description:
                "נתח קצבים מוקפץ על מחבט עם תיבול ייחודי ובצל, מגיע עם 3 תוספות צמחוניות",
              price: "80 ₪",
            },
            {
              name: "סיגה וואט",
              description:
                "חריף / לא חריף. תבשיל בשר בקר עם בצל, שום ותיבול אתיופי + 3 תוספות צמחוניות",
              price: "60 ₪",
            },
            {
              name: "סיגה פירפיר",
              description:
                "חתיכות אינג׳רה עם חתיכות בשר ורוטב אדום + 3 תוספות צמחוניות",
              price: "55 ₪",
            },
            {
              name: "דורו וואט",
              description:
                "תבשיל עוף עם ביצה, בצל, שום ותיבול חריף פיקנטי + 3 תוספות צמחוניות",
              price: "55 ₪",
            },
          ],
        },
        {
          title: "באלינג׳רה עסקית",
          items: [
            {
              name: "באלינג׳רה יחיד טבעונית",
              description: "7 תוספות + סלט קטן",
              price: "55 ₪",
            },
            {
              name: "באלינג׳רה יחיד בשרית",
              description: "בשר לבחירה + 4 תוספות צמחוניות + סלט קטן",
              price: "55 ₪",
            },
          ],
        },
        {
          title: "שתייה קלה",
          items: [
            { name: "מים נביעות", price: "7 ₪" },
            { name: "קינלי סודה", price: "8 ₪" },
            { name: "לימונדה", price: "10 ₪" },
            { name: "פריגת תפוזים / פריגת אשכוליות", price: "9 ₪" },
            { name: "פיוזטי", price: "10 ₪" },
            { name: "קוקה קולה / זירו / דייט", price: "11 ₪" },
            { name: "פנטה", price: "11 ₪" },
            { name: "מלט בירה שחורה", price: "12 ₪" },
          ],
        },
        {
          title: "שתייה חמה",
          items: [
            { name: "בונה קפה", price: "7 ₪" },
            { name: "שי תה תבלינים", price: "10 ₪" },
            { name: "תה תבלינים + ג׳ינג׳ר", price: "12 ₪" },
            { name: "קנקן בונה - קפה אתיופי", price: "25 ₪" },
          ],
        },
        {
          title: "יינות",
          items: [
            { name: "בקבוק יין אדום", price: "110 ₪" },
            { name: "בקבוק יין לבן", price: "110 ₪" },
          ],
        },
        {
          title: "ערק",
          items: [
            { name: "צ׳ייסר ערק", price: "15 ₪" },
            { name: "כוס ערק", price: "25 ₪" },
          ],
        },
        {
          title: "בירות",
          items: [
            { name: "בירה מהחבית - קלסברג", price: "28/23 ₪" },
            { name: "בקבוק - טובורג / בירות אתיופיות", price: "23 ₪" },
            { name: "סמרסבי - סיידר תפוחים אלכוהולי", price: "27 ₪" },
          ],
        },
      ],
    },
    blogPage: {
      eyebrow: "בלוג באלינג׳רה",
      title: "סיפורים, טעמים ומסורת מהמטבח האתיופי",
      body: "הבלוג נותן מקום לסיפורים שמאחורי האוכל: אינג׳רה, טף, אכילה משותפת והטעמים שמחברים בין מסורת אתיופית לחיים בתל אביב.",
      articleEyebrow: "מאמר מהבלוג",
      backLabel: "חזרה לבלוג",
      posts: [
        {
          slug: "injera-heart-of-meal",
          title: "מה הופך אינג׳רה ללב הארוחה?",
          excerpt:
            "אינג׳רה היא לא רק הלחם של הארוחה האתיופית, אלא הבסיס שעליו נבנים הטעמים, הקצב והחוויה המשותפת סביב השולחן.",
          body: [
            "אינג׳רה היא אחד הסמלים המוכרים ביותר של המטבח האתיופי, אבל מי שפוגש אותה רק כעוד לחם ליד המנה מפספס את התפקיד האמיתי שלה. היא הבסיס של הארוחה, המשטח שעליו מניחים את התבשילים, הכלי שבעזרתו אוספים כל ביס, וגם הדרך שבה כולם מתחברים לאותו מגש.",
            "הייחוד של אינג׳רה מתחיל בקמח הטף. הטף הוא דגן קטן, עשיר ומזין, שמלווה את המטבח האתיופי במשך דורות. ממנו נוצרת בלילה עדינה שעוברת תהליך תסיסה טבעי, ולכן לאינג׳רה יש חמיצות קלה, עומק טעם ומרקם אוורירי שמחזיק היטב תבשילים רכים, רטבים ותבלינים.",
            "בבאלינג׳רה אנחנו מכינים אינג׳רה טרייה מקמח טף, ללא גלוטן, מתוך רצון לשמור על התחושה הביתית של אוכל שמתחיל מהבסיס. אינג׳רה טובה לא משתלטת על המנה, אלא מאזנת אותה: היא מרככת חריפות, סופגת תבשילים עשירים ומדגישה את הטעמים של קטניות, ירקות ובשר.",
            "הדרך שבה אוכלים אינג׳רה משנה גם את הקצב של הארוחה. לא משתמשים בה רק כדי לטעום, אלא כדי להשתתף. קורעים חתיכה ביד, אוספים איתה תבשיל, חוזרים למגש המרכזי וממשיכים את השיחה. כך הארוחה הופכת לפחות רשמית ויותר קרובה, פחות אישית ויותר משותפת.",
            "במסורת האתיופית, המגש המשותף הוא לא רק צורת הגשה. הוא מבטא הכנסת אורחים, אמון וקירבה. כשאוכלים מאותו מרכז, כל אחד מרגיש חלק מהשולחן. זו אחת הסיבות שאינג׳רה נשארת לב הארוחה גם כשהיא מוגשת בלב תל אביב, ליד שוק הכרמל וכרם התימנים.",
            "לכן אצלנו כל שולחן מתחיל באינג׳רה. היא מחברת בין חומר גלם עתיק, טכניקה מסורתית וחוויה פשוטה של אנשים שיושבים יחד. מי שמגיע לבאלינג׳רה בפעם הראשונה מגלה מהר מאוד שאינג׳רה היא לא תוספת. היא הדרך שבה הארוחה מתחילה, נפתחת ונזכרת.",
          ],
        },
        {
          slug: "eat-together-balinjera",
          title: "איך אוכלים ביחד בבאלינג׳רה",
          excerpt:
            "באלינג׳רה נבנתה סביב רעיון של שולחן פתוח: מגש משותף, ידיים סביב האוכל ושיחה שמתקדמת בקצב טבעי.",
          body: [
            "השם באלינג׳רה מחזיק בתוכו את הרעיון המרכזי של המקום: לאכול ביחד. בארוחה אתיופית מסורתית האוכל לא בנוי ממנות נפרדות לכל סועד, אלא ממגש שנפתח במרכז השולחן ומזמין את כולם להשתתף בו.",
            "כשמגש כזה מגיע לשולחן, כל אחד רואה את אותם צבעים וטעמים: תבשילי קטניות, ירקות מתובלים, רטבים עשירים, מנות בשריות או טבעוניות ואינג׳רה טרייה שמחזיקה את הכל. הבחירה מה לקחת, איך לשלב טעמים ומתי לחזור לעוד ביס מתרחשת תוך כדי שיחה.",
            "החוויה הזו משנה את מערכת היחסים עם האוכל. במקום צלחת אישית שמפרידה בין הסועדים, יש מרכז משותף שמקרב אותם. הידיים נעות סביב אותו מגש, הביסים משתנים מאדם לאדם, והארוחה מרגישה פחות כמו סדר קבוע ויותר כמו מפגש חי.",
            "אצלנו בבאלינג׳רה חשוב לשמור על הקצב הזה גם במסעדה. אנחנו רוצים שאנשים ירגישו בנוח לשאול, לטעום, לחלוק ולהכיר טעמים חדשים. מי שלא מכיר אוכל אתיופי יכול להתחיל לאט, לקחת ביס קטן, להבין את החריפות, את החמיצות ואת העומק, ואז לבנות לעצמו שילוב אישי.",
            "האכילה המשותפת מתאימה במיוחד למפגשים משפחתיים, לארוחות חברים, לקבוצות שמגיעות לטעום משהו חדש וגם לאנשים שמגיעים לבד ורוצים להרגיש חלק ממקום חם. האוכל צבעוני, אבל החוויה היא לא רק צבע. היא נבנית מהדרך שבה השולחן נפתח ומהאופן שבו אנשים מגיבים אליו.",
            "בלב תל אביב, ליד שוק הכרמל וכרם התימנים, אנחנו מנסים לשמור על התחושה הזו של בית פתוח. באלינג׳רה היא מסעדה קטנה, אבל השולחן שלה רחב: מסורת אתיופית, חומרי גלם טבעיים, אינג׳רה טרייה ואירוח שמזכיר שאוכל טוב לא רק משביע, אלא גם מחבר.",
          ],
        },
      ],
    },
    accessibilityPage: {
      eyebrow: "הצהרת נגישות",
      title: "הצהרת נגישות",
      body: "באלינג׳רה ו-Sitekept מאמינים כי האינטרנט צריך להיות זמין ונגיש לכל אדם, ללא קשר לנסיבות וליכולת.",
      actionLabel: "קראו את ההצהרה",
      wcagHref: "https://www.isoc.org.il/files/w3c-wai/guidelines.html",
      wcagLabel: "המלצות להנגשת תכני אתרי אינטרנט WCAG 2.0",
      intro: [
        "אנו מאמינים כי האינטרנט צריך להיות זמין ונגיש לכל אדם, ללא קשר לנסיבות וליכולת. כדי לממש זאת, אנו שואפים לדבוק ככל האפשר בהנחיות הנגישות לתוכן ברשת ברמת AA. עמידה בהנחיות אלו מסייעת לנו להבטיח כי האתר נגיש לקהל רחב, כולל אנשים עיוורים, אנשים עם לקויות מוטוריות, ליקויי ראייה, אפילפסיה, עיוורון צבעים, מוגבלות קוגניטיבית ועוד.",
        "האתר של מסעדת באלינג׳רה פותח ומתוחזק על ידי Sitekept מתוך כוונה להיות מותאם לכל משתמש בהתאם לדרישות תקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע״ג 2013, ובהתאם להמלצות להנגשת תכני אתרי אינטרנט.",
      ],
      sections: [
        {
          title: "התאמות שבוצעו באתר",
          paragraphs: [
            "האתר כתוב בצורה סמנטית, עם תגיות HTML מקובלות והיררכיית תוכן ברורה. בנוסף, מוטמעות באתר תכונות ARIA במקומות שבהם הן נדרשות, כדי לסייע למשתמשים הנעזרים בקורא מסך לקרוא, להבין ולהשתמש בפונקציות האתר.",
          ],
          list: [
            "תמונות משמעותיות כוללות תגיות ALT המספקות מידע בהיר ופשוט על תוכן התמונה, ואלמנטים דקורטיביים מוסתרים מקוראי מסך כאשר הדבר מתאים.",
            "אנו שואפים להתאמה לקוראי מסך פופולריים, כולל JAWS ו-NVDA.",
            "האתר מותאם לניווט במקלדת, כולל מעבר בין קישורים ופקדים באמצעות Tab ו-Shift + Tab, והפעלת קישורים וכפתורים באמצעות Enter או מקש הרווח לפי סוג הרכיב.",
            "סימן הפוקוס בעת שימוש במקלדת ברור ובולט.",
            "קישורים מובחנים באמצעות צבע, משקל טקסט או קו תחתי במקומות שבהם הדבר נדרש.",
            "ניגודיות הטקסטים באתר נבחרה כדי להקל על הקריאה עבור משתמשים עם ליקויי ראייה.",
            "באתר לא מופעל שמע אוטומטי.",
            "כאשר יש באתר קטעי וידאו לצפייה, אנו שואפים לצרף להם גם הסברים טקסטואליים עבור כבדי שמיעה.",
          ],
        },
        {
          title: "תאימות דפדפן ותמיכה טכנולוגית",
          paragraphs: [
            "אנו שואפים לתמוך במערך רחב של דפדפנים וטכנולוגיות מסייעות ככל האפשר, כדי שמשתמשי האתר יוכלו לבחור בכלים המתאימים ביותר עבורם עם כמה שפחות מגבלות.",
            "האתר נועד לעבוד בדפדפנים נפוצים, כולל Google Chrome, Mozilla Firefox, Apple Safari, Opera ו-Microsoft Edge, וכן עם קוראי מסך נפוצים כגון JAWS ו-NVDA במערכות Windows ו-Mac.",
          ],
        },
        {
          title: "נגישות המבנה",
          paragraphs: ["אין קבלת קהל במשרדי Sitekept."],
        },
        {
          title: "הערות, פניות ומשוב",
          paragraphs: [
            "למרות המאמצים הרבים בהם נקטנו כדי לאפשר לכל אחד להשתמש באתר בנוחות, עדיין עשויים להיות דפים או קטעים שאינם נגישים במלואם, שנמצאים בתהליך הנגשה או שחסר עבורם פתרון טכנולוגי הולם.",
            "אם מצאת תקלה, אם אתה מתקשה להשתמש בהיבט כלשהו באתר או אם יש לך רעיונות לשיפור, נשמח לשמוע ממך.",
          ],
        },
      ],
      contactLabel: "לפנייה בנושא נגישות:",
      emailLabel: "דוא״ל",
      phoneLabel: "טלפון",
      updated: "תאריך עדכון אחרון: 17/06/2026",
    },
  },
  en: {
    navLabel: "Main navigation",
    menuLabel: "Open menu",
    orderLabel: "Order",
    contactLabel: "Contact us",
    menuCta: "Menu",
    moreInfo: "More info",
    orderWolt: "Order with Wolt",
    readyTitle: ["Ready to eat?", "Reserve your table now"],
    madeBy: "Made By Sitekept",
    footerTagline: "Balinjera Restaurant,\ntraditional Ethiopian cuisine",
    footerColumns: [
      {
        title: "Address",
        lines: ["Malan 4 / HaKovshim 39", "Tel Aviv"],
      },
      {
        title: "Stay in touch",
        lines: [
          { label: BALINJERA_PHONE_DISPLAY, href: BALINJERA_PHONE_HREF },
          { label: BALINJERA_EMAIL, href: `mailto:${BALINJERA_EMAIL}` },
          { label: "Accessibility", href: BALINJERA_ACCESSIBILITY_HREF },
        ],
      },
      {
        title: "Opening hours",
        lines: ["Sunday-Thursday", "12:00-20:00", "Friday", "11:00-15:00"],
      },
    ],
    follow: "Follow us",
    quick: {
      accessibility: "Accessibility options",
      actions: "Quick actions",
      wolt: "Order on Wolt",
      whatsapp: "WhatsApp",
    },
    nav: [
      { key: "home", label: "Home", href: "/" },
      { key: "about", label: "About", href: "/about" },
      { key: "menu", label: "Menu", href: "/menu" },
      { key: "events", label: "Events", href: "/events" },
      { key: "blog", label: "Blog", href: "/blog" },
      { key: "order", label: "Order", href: BALINJERA_ORDER_HREF },
    ],
    hero: {
      eyebrow: "Kosher Ethiopian bistro in Kerem HaTeimanim",
      title: "Balinjera Restaurant,\ntraditional\nEthiopian cuisine",
      body: "We offer a true Ethiopian experience. You will find familiar Ethiopian dishes such as injera alongside dishes you may not have met before. Balinjera's menu is based on fresh, healthy and natural ingredients with unique Ethiopian seasoning that also suits the Israeli palate.",
    },
    intro: {
      title: "A kosher Ethiopian restaurant in Kerem HaTeimanim",
      body: "It is hard to explain in words what we offer at Balinjera, but the name already gives a clue: we prepare traditional Ethiopian food that is healthy, tasty and full of color. A few years ago we decided to lift the pots and share the tastes and aromas of a long Ethiopian-Jewish tradition. And if it is Ethiopian, nothing beats fresh injera that we make every day from teff flour, naturally gluten free.",
    },
    featureCards: [
      {
        title: "Events",
        description:
          "Come taste and experience something different, warm and memorable. After the first visit, you will know your way back.",
        href: "/events",
        media: "event",
      },
      {
        title: "Restaurant",
        description:
          "A light, young bistro on the edge of Carmel Market and a warm home for Ethiopian cuisine.",
        href: "/about",
        media: "restaurant",
      },
      {
        title: "Ethiopian products",
        description:
          "We prepare traditional Ethiopian food that is healthy, tasty and especially full of color.",
        media: "products",
      },
    ],
    featureSeo: {
      eyebrow: "Kosher Ethiopian restaurant in Tel Aviv",
      title: "Fresh injera and traditional Ethiopian food in Kerem HaTeimanim",
      body: [
        "Balinjera is a kosher Ethiopian restaurant in Kerem HaTeimanim, next to Carmel Market in Tel Aviv. The kitchen serves fresh injera made from teff flour, slow-seasoned stews, meat and vegan dishes, and a warm table built for sharing.",
        "For anyone looking for kosher Ethiopian food in Tel Aviv, Balinjera brings Ethiopian-Jewish tradition into a young local bistro: colorful plates, natural ingredients, gluten-free injera and hosting for lunch, dinner, Wolt orders and small events.",
      ],
    },
    name: {
      title: "Craving injera",
      body: "The restaurant name is a play on the word injera, Ethiopia's national bread, and the Amharic word Balinjera, meaning to eat together. Traditionally, Ethiopian food is shared around the same table.",
    },
    quote: {
      body: "One of my visits near Carmel Market was especially intriguing: Balinjera, an Ethiopian restaurant founded by Fanta. The restaurant name means together, and that was exactly the feeling I had in the place and in the way people eat here. It was my first time in an Ethiopian restaurant and I am glad I tried it. I tasted wonderful and surprising food.",
      cite: "Shaul Levy",
    },
    aboutPage: {
      eyebrow: "About Balinjera",
      title: "A small home for traditional Ethiopian cuisine in Tel Aviv",
      body: "Balinjera was born from the wish to open a true Ethiopian table: fresh injera, seasoned stews, vegetables, legumes, meat and flavors rooted in family tradition. The restaurant sits by Carmel Market and Kerem HaTeimanim, connecting homemade food, hospitality and a colorful experience with its own identity.",
      highlights: [
        "Fresh gluten-free injera made from teff flour",
        "Meat and vegan dishes from Ethiopian tradition",
        "A shared family-style meal around one table",
      ],
      storyTitle: "The story of the place",
      story:
        "A few years ago we decided to lift the pots and reveal the flavors and aromas of a long Ethiopian-Jewish tradition. At Balinjera you do not only order a dish. You open the table, tear injera by hand and eat together.",
    },
    eventsPage: {
      eyebrow: "Events at Balinjera",
      title: "Small, colorful events full of flavor",
      body: "The restaurant is suited for family gatherings, birthdays, team meals and tasting experiences around Ethiopian cuisine. We keep the warm character of the place, with a menu based on fresh injera, meat or vegan stews and a table that invites everyone to eat together.",
      options: [
        "Group meals around a shared table",
        "Introductory tastings of Ethiopian cuisine",
        "Meat or vegan menu according to the event style",
      ],
      ctaTitle: "Planning an event?",
      ctaBody:
        "Send us the details and we will shape a meal that fits the group, timing and hosting style.",
      eventSeo: {
        eyebrow: "Tourist events at a kosher Ethiopian restaurant in Tel Aviv",
        title:
          "A cultural Ethiopian dining experience in historic Kerem HaTeimanim",
        body: [
          "Balinjera hosts tourist events, cultural tasting meals, birthdays, family gatherings and team lunches in Kerem HaTeimanim, one of Tel Aviv's most historic neighborhoods beside Carmel Market. The experience is built around fresh injera, shared platters, Ethiopian-Jewish tradition and warm local hospitality.",
          "For groups looking for a memorable food experience in Tel Aviv, Balinjera offers vegan and meat options, colorful stews and a table designed for eating together, making it a natural stop for visitors who want to discover Ethiopian cuisine in a historic local setting.",
          "Beyond hosting at the restaurant, Balinjera offers Ethiopian catering for private events in Tel Aviv: birthdays, conferences, corporate dinners, and family gatherings. We arrive with a full menu, fresh injera, and the warm atmosphere that turns every event into a memorable experience.",
        ],
      },
      form: {
        title: "Tell us about the event",
        body: "Fill in the details and we'll get back to you shortly to plan the event together.",
        submit: "Send details",
        sending: "Sending…",
        success:
          "Thank you! Your details were sent and we'll get back to you shortly. Feel free to call us with any question.",
        error:
          "Something went wrong. Please try again in a moment or call us and we'll be glad to help.",
        consent: "I agree to be contacted about this event request.",
        fields: {
          name: {
            label: "Full name",
            placeholder: "How should we address you?",
          },
          email: {
            label: "Email",
            placeholder: "name@example.com",
          },
          phone: {
            label: "Phone",
            placeholder: "050-000-0000",
          },
          date: {
            label: "Preferred date",
            placeholder: "Choose a date",
          },
          guests: {
            label: "Group size",
            placeholder: "For example 18",
          },
          message: {
            label: "What should we know?",
            placeholder:
              "Event type, preferred time, food preferences and anything that will help us respond.",
          },
        },
      },
    },
    menuPage: {
      title: "The menu, Balinjera Restaurant",
      body: "Balinjera serves traditional Ethiopian dishes built around injera, the teff-flour bread at the heart of the meal. The menu includes vegetarian, vegan and meat stews with authentic Ethiopian flavors.",
      sections: [
        {
          title: "Food menu",
          items: [
            {
              name: "Nefro salad",
              description: "Wheat salad with herbs and cranberries",
              price: "35 ₪",
            },
            {
              name: "House salad",
              description:
                "Lettuce, onion, tomatoes, parsley, cilantro, mint, olive oil dressing and house tahini",
              price: "40 ₪",
            },
            {
              name: "Eggplant with Ethiopian tahini",
              description: "Organic Ethiopian tahini and Ethiopian salsa",
              price: "32 ₪",
            },
            {
              name: "Injera firfir",
              description: "Salad with pieces of injera",
              price: "30 ₪",
            },
            {
              name: "Firfir",
              description:
                "Pieces of injera sauteed with onion and berbere, a spicy Ethiopian seasoning",
              price: "40 ₪",
            },
            {
              name: "Seasoned organic Ethiopian tahini bowl",
              description: "Unique Balinjera seasoning",
              price: "15 ₪",
            },
            {
              name: "Dabo",
              description: "Ethiopian bread",
              price: "10 ₪",
            },
            {
              name: "Extra injera",
              price: "10 ₪",
            },
            {
              name: "Soup of the day",
              description: "Vegan add-on 10 ₪ / meat add-on 22 ₪",
              price: "30 ₪",
            },
            {
              name: "Balinjera shiro",
              description: "Injera with shiro and fresh hot pepper",
              price: "35 ₪",
            },
            {
              name: "Balinjera for one",
              description:
                "Choose 4 vegan sides made from legumes and cooked vegetables",
              price: "50 ₪",
            },
            {
              name: "Vegan Balinjera for two",
              description:
                "7 vegan sides made from legumes and cooked vegetables",
              price: "85 ₪",
            },
            {
              name: "Meat Balinjera for two",
              description:
                "Choose 2 meats, 2 injeras, 4 vegetarian sides, small salad, dabo and tahini",
              price: "115 ₪",
            },
            {
              name: "Balinjera Festival",
              description:
                "7 vegan sides, 3 meat sides, large salad, Ethiopian tahini and 3 injeras",
              price: "160 ₪",
            },
            {
              name: "Balinjera tibs",
              description:
                "Butcher's cut sauteed with unique seasoning and onion, served with 3 vegetarian sides",
              price: "80 ₪",
            },
            {
              name: "Siga wat",
              description:
                "Spicy or mild beef stew with onion, garlic and Ethiopian seasoning, served with 3 vegetarian sides",
              price: "60 ₪",
            },
            {
              name: "Siga firfir",
              description:
                "Pieces of injera with meat and red sauce, served with 3 vegetarian sides",
              price: "55 ₪",
            },
            {
              name: "Doro wat",
              description:
                "Chicken stew with egg, onion, garlic and spicy seasoning, served with 3 vegetarian sides",
              price: "55 ₪",
            },
          ],
        },
        {
          title: "Business menu",
          items: [
            {
              name: "Vegan Balinjera business for one",
              description: "7 sides + small salad",
              price: "55 ₪",
            },
            {
              name: "Meat Balinjera business for one",
              description: "Choice of meat + 4 vegetarian sides + small salad",
              price: "55 ₪",
            },
          ],
        },
        {
          title: "Soft drinks",
          items: [
            { name: "Neviot water", price: "7 ₪" },
            { name: "Kinley soda", price: "8 ₪" },
            { name: "Lemonade", price: "10 ₪" },
            { name: "Prigat orange / Prigat grapefruit", price: "9 ₪" },
            { name: "Fuzetea", price: "10 ₪" },
            { name: "Coca-Cola / Zero / Diet", price: "11 ₪" },
            { name: "Fanta", price: "11 ₪" },
            { name: "Malt black beer", price: "12 ₪" },
          ],
        },
        {
          title: "Hot drinks",
          items: [
            { name: "Buna coffee", price: "7 ₪" },
            { name: "Shai spiced tea", price: "10 ₪" },
            { name: "Spiced tea + ginger", price: "12 ₪" },
            { name: "Buna pot - Ethiopian coffee", price: "25 ₪" },
          ],
        },
        {
          title: "Wines",
          items: [
            { name: "Red wine bottle", price: "110 ₪" },
            { name: "White wine bottle", price: "110 ₪" },
          ],
        },
        {
          title: "Arak",
          items: [
            { name: "Arak chaser", price: "15 ₪" },
            { name: "Glass of arak", price: "25 ₪" },
          ],
        },
        {
          title: "Beers",
          items: [
            { name: "Draft beer - Carlsberg", price: "28/23 ₪" },
            { name: "Bottle - Tuborg / Ethiopian beers", price: "23 ₪" },
            { name: "Somersby - alcoholic apple cider", price: "27 ₪" },
          ],
        },
      ],
    },
    blogPage: {
      eyebrow: "Balinjera Blog",
      title: "Stories, flavors and tradition from the Ethiopian kitchen",
      body: "The blog makes room for the stories behind the food: injera, teff, shared eating and the flavors that connect Ethiopian tradition with life in Tel Aviv.",
      articleEyebrow: "From the blog",
      backLabel: "Back to the blog",
      posts: [
        {
          slug: "injera-heart-of-meal",
          title: "Why injera is the heart of the meal",
          excerpt:
            "Injera is not only the bread of an Ethiopian meal. It is the base that carries the flavors, the rhythm and the shared experience around the table.",
          body: [
            "Injera is one of the most recognizable symbols of Ethiopian cooking, but anyone who meets it only as bread on the side misses its real role. It is the base of the meal, the surface that holds the stews, the tool used to gather every bite and the reason everyone connects to the same platter.",
            "Its character begins with teff flour. Teff is a small, nourishing grain that has shaped Ethiopian kitchens for generations. It becomes a delicate batter that naturally ferments, giving injera its gentle tang, layered flavor and airy texture that can hold soft stews, sauces and spices.",
            "At Balinjera we prepare fresh injera from teff flour, naturally gluten free, because we want the meal to begin from the same home-style foundation. Good injera does not compete with the food. It balances heat, absorbs rich stews and brings out the flavor of legumes, vegetables and meat.",
            "The way people eat injera also changes the pace of the meal. You do not only taste with it. You take part. You tear a piece by hand, gather a stew, return to the shared platter and keep the conversation moving. The meal becomes less formal and more intimate, less individual and more collective.",
            "In Ethiopian tradition, the shared platter is more than a serving style. It expresses hospitality, trust and closeness. When everyone eats from the same center, everyone feels part of the table. That is why injera remains the heart of the meal even when it is served in Tel Aviv, near Carmel Market and Kerem HaTeimanim.",
            "For us, every table starts with injera. It connects an ancient ingredient, a traditional technique and the simple experience of people sitting together. First-time guests quickly discover that injera is not a side dish. It is how the meal begins, opens up and stays in memory.",
          ],
        },
        {
          slug: "eat-together-balinjera",
          title: "How people eat together at Balinjera",
          excerpt:
            "Balinjera is built around the idea of an open table: a shared platter, hands around the food and conversation that moves at a natural pace.",
          body: [
            "The name Balinjera carries the central idea of the place: eating together. In a traditional Ethiopian meal, the food is not built as separate plates for each guest, but as a platter opened in the center of the table and shared by everyone.",
            "When a platter arrives, everyone sees the same colors and flavors: legume stews, seasoned vegetables, rich sauces, meat or vegan dishes and fresh injera holding everything together. Choosing what to take, how to combine flavors and when to return for another bite happens naturally through conversation.",
            "That experience changes the relationship with the food. Instead of individual plates that separate the diners, there is one shared center that brings them closer. Hands move around the same platter, each bite is a little different, and the meal feels less like a fixed order and more like a living encounter.",
            "At Balinjera, keeping that rhythm matters to us. We want guests to feel comfortable asking, tasting, sharing and discovering new flavors. Someone who is new to Ethiopian food can begin slowly, take a small bite, understand the heat, the tang and the depth, and then build a personal combination.",
            "Shared eating works especially well for family meals, friends, groups who want to try something new and even solo guests who want to feel part of a warm place. The food is colorful, but the experience is not only about color. It is built by the way the table opens and by how people respond to it.",
            "In the heart of Tel Aviv, near Carmel Market and Kerem HaTeimanim, we try to keep the feeling of an open home. Balinjera is a small restaurant, but its table is wide: Ethiopian tradition, natural ingredients, fresh injera and hospitality that reminds us that good food does more than satisfy. It brings people together.",
          ],
        },
      ],
    },
    accessibilityPage: {
      eyebrow: "Accessibility Statement",
      title: "Accessibility",
      body: "Balinjera and Sitekept believe that the internet should be available and accessible to everyone, regardless of circumstances or ability.",
      actionLabel: "Read the statement",
      wcagHref: "https://www.isoc.org.il/files/w3c-wai/guidelines.html",
      wcagLabel: "WCAG 2.0 recommendations for accessible web content",
      intro: [
        "We believe that the internet should be available and accessible to everyone, regardless of circumstances or ability. To support this, we strive to follow the Web Content Accessibility Guidelines at AA level as closely as possible. Following these guidelines helps us make the site accessible to a broad audience, including people who are blind, people with motor disabilities, low vision, epilepsy, color blindness, cognitive disabilities and more.",
        "The Balinjera Restaurant website was developed and is maintained by Sitekept with the intention of being suitable for every user, in line with the Israeli Equal Rights for Persons with Disabilities regulations for service accessibility from 2013 and the recommendations for accessible web content.",
      ],
      sections: [
        {
          title: "Accessibility Adjustments On The Site",
          paragraphs: [
            "The site is written semantically, with standard HTML tags and a clear content hierarchy. ARIA attributes are also used where needed, so users who rely on screen readers can read, understand and use the site's functions.",
          ],
          list: [
            "Meaningful images include ALT text that provides clear and simple information about the image content, while decorative elements are hidden from screen readers where appropriate.",
            "We aim to support popular screen readers, including JAWS and NVDA.",
            "The site supports keyboard navigation, including moving between links and controls with Tab and Shift + Tab, and activating links and buttons with Enter or Space according to the element type.",
            "The keyboard focus indicator is clear and prominent.",
            "Links are emphasized with color, text weight or underline where needed.",
            "Text contrast on the site was chosen to make reading easier for users with visual impairments.",
            "No audio plays automatically on this site.",
            "When video content is available on the site, we aim to provide accompanying text explanations for people who are hard of hearing.",
          ],
        },
        {
          title: "Browser Compatibility And Technology Support",
          paragraphs: [
            "We aim to support a broad range of browsers and assistive technologies wherever possible, so site users can choose the tools that work best for them with as few limitations as possible.",
            "The site is intended to work in common browsers, including Google Chrome, Mozilla Firefox, Apple Safari, Opera and Microsoft Edge, as well as common screen readers such as JAWS and NVDA on Windows and Mac.",
          ],
        },
        {
          title: "Physical Accessibility",
          paragraphs: ["Sitekept's offices do not receive visitors."],
        },
        {
          title: "Comments, Requests And Feedback",
          paragraphs: [
            "Despite the many efforts we have made to allow everyone to use the site comfortably, some pages or sections may still not be fully accessible, may be in the process of being made accessible, or may lack an appropriate technological solution.",
            "If you found an issue, if you have difficulty using any part of the site or if you have ideas for improvement, we would be glad to hear from you.",
          ],
        },
      ],
      contactLabel: "For accessibility inquiries:",
      emailLabel: "Email",
      phoneLabel: "Phone",
      updated: "Last updated: 17/06/2026",
    },
  },
} as const;

export function getBlogPostSlugs(): string[] {
  return balinjeraCopy.he.blogPage.posts.map((post) => post.slug);
}

export function getBlogPost(
  lang: BalinjeraLang,
  slug: string
): BalinjeraBlogPost | undefined {
  return balinjeraCopy[lang].blogPage.posts.find((post) => post.slug === slug);
}
