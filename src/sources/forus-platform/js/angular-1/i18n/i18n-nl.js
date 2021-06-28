module.exports = {
    test: "{{name}} {{foo}}",
    permissions: require('./nl/permissions'),
    page_title: 'Platform Forus',
    page_state_titles: {
        home: 'Forus platform home',
        organizations: 'Organisaties',
        "organizations-create": 'Organisatie aanmaken',
        "organizations-edit": 'Organisatie bewerken',
        "organization-funds": "Fondsen",
        "organization-providers": 'Aanbieders',
        validators: 'Medewerkers',
        "validators-edit": 'Medewerker bewerken',
        "financial-dashboard": 'Financieel dashboard',
        offices: 'Vestingen',
        "offices-create": 'Vestiging toevoegen',
        "offices-edit": 'Vestiging bewerken',
        funds: 'Fondsen',
        "funds-create": 'Fonds aanmaken',
        "funds-show": 'Beschikbare fondsen',
        "funds-edit": 'Fonds bewerken',
        transactions: 'Transacties',
        transaction: 'Transactie details',
        products: 'Aanbod',
        "products-create": 'Aanbod toevoegen',
        "products-edit": 'Aanbod bewerken',
        "products-show": 'Mijn aanbod',
        "sign-up": 'Aanmelden',
        "provider-funds": 'Deelgenomen fondsen',
        "provider-identities": 'Medewerkers',
        "provider-identity-create": 'Medewerker toevoegen',
        "provider-identity-edit": 'Medewerkers bewerken',
        "csv-validation": 'CSV Uploader',
        "validation-requests": 'Validatie verzoeken',
        "validation-request": 'Validatie verzoek',
        "restore-email": 'Inloggen via e-mail',
    },
    // MENU = menu-validator.pug, menu-provider.pug, menu-sponsor.pug
    menu: {
        organizational: 'Organisatie',
        implementation: 'Webshop',
        financial: 'Financieel',
        personal: 'Persoonlijk',
    },
    // MODALS
    modals: {
        modal_voucher_create: require('./nl/modals/modal-voucher-create.pug.i18n'),
        modal_voucher_physical_card: require('./nl/modals/modal-voucher-physical-card.pug.i18n'),
        modal_product_voucher_create: require('./nl/modals/modal-product-voucher-create.pug.i18n'),
        modal_voucher_qr_code: require('./nl/modals/modal-voucher-qr_code.pug.i18n'),
        modal_funds_offers: require('./nl/modals/modal-fund-offers.pug.i18n'),
        modal_business_add: require('./nl/modals/modal-business-add.pug.i18n'),
        modal_voucher_export: require('./nl/modals/modal-voucher-export.pug.i18n'),
        modal_transfer_organization_ownership: require('./nl/modals/modal-transfer-organization-ownership.pug.i18n'),
        modal_fund_criteria_description: require('./nl/modals/modal-fund-criteria-description.i18n'),
        danger_zone: {
            remove_external_validators: require('./nl/modals/danger-zone/remove-external-validator')
        },
    },
    // PAGES
    vouchers: require('./nl/pages/vouchers.pug.i18n'),
    product_vouchers: require('./nl/pages/product-vouchers.pug.i18n'),
    voucher_printable: require('./nl/pages/voucher-printable.pug.i18n'),

    components: require("./nl/i18n-components"),

    // MEAPP LANDINGSPAGE = index.pug
    meapp_index: {
        navbar: {
            municipality: "GEMEENTE",
            provider: "AANBIEDER",
            me: "ME",
            shop: "WEBSHOP",
        },
        header: {
            title_general: "Een profiel voor het Forus Platform",
            title_nijmegen: "Een profiel voor de Meedoen-regeling",
            title_zuidhorn: "Een profiel voor het Kindpakket",
            title_westerkwartier: "Een profiel voor het Kindpakket",
            title_forus: "Een profiel voor het Kerstpakket",
            description: "Een profiel om in te loggen, waarmee u tegoeden kan beheren en veilig kan betalen",
        },
        buttons: {
            join: "Aanmelden",
        },
        download: {
            ios: "Download Me voor iOS",
            android: "Download Me voor Android",
        },
        functions: {
            header: {
                title: "Functies",
            },
            profile: "Maak een profiel aan",
            pin: "U heeft de mogelijkheid om een profiel aan te maken en deze daarna te beveiligen met een pincode.",
            vouchers: "Tegoeden",
            criterion: "Als u aan gestelde criteria voldoet van een gemeente. Kunt u een tegoed aanvragen. Dit tegoed kunt u beheren in Me. Met Me kunt u veilig betalingen verrichten.",
            apply: "Aanmelden",
            webshop: "Meld u aan op de webshop met Me. Dit doet u door de QR-code te scannen met Me die de webshop presenteert.",
            profileb: "Profiel",
            app: "De app bewaart een profiel van de gebruiker, dit profiel maakt het mogelijk dat de gegevens hergebruikt kunnen worden voor het mee doen aan andere regelingen.",
        }
    },
    // PROVIDER HOME = home-provider.pug
    home_provider: {
        header: {
            default: {
                title: "Meld uw organisatie aan op het platform.",
                subtitle: "Dit is het start scherm om uzelf aan te melden op het aanbieders dashboard.",
            },
            nijmegen: {
                title: "Meld u aan als dienstverlener",
                subtitle: "De gemeente geeft inwoners met een laag inkomen maximaal € 150,- voor culturele, sportieve en educatieve activiteiten. Dit heet de Meedoen-regeling.",
            },
            westerkwartier: {
                title: "Meld uw organisatie aan voor het Kindpakket",
                subtitle: "De gemeente geeft een bedrag van € 250,- per kind aan gezinnen met een laag inkomen.",
            },
            kerstpakket: {
                title: "Meld uw organisatie aan voor het Kerstpakket",
                subtitle: "Dit is het start scherm om uzelf aan te melden op het aanbieders dashboard.",
            },
            oostgelre: {
                title: "Meld uw organisatie aan voor de Kindregeling",
                subtitle: "Ondersteuning aan gezinnen met een laag inkomen.",
            },
            winterswijk: {
                title: "Meld uw organisatie aan voor de Kindregeling",
                subtitle: "Ondersteuning aan gezinnen met een laag inkomen.",
            },
            berkelland: {
                title: "Meld uw organisatie aan voor de Kindregeling",
                subtitle: "Ondersteuning aan gezinnen met een laag inkomen.",
            },
            noordoostpolder: {
                title: "Meld uw organisatie aan voor het Meedoenpakket",
                subtitle: "250,- per kind aan gezinnen met een laag inkomen.",
            }
        },
        labels: {
            partners: "Stichting Forus zoekt partners",
            description: "Een gemeente wil zijn budget op een bepaalde manier in de samenleving laten landen. Je kunt hen helpen bij dit doel.",
            join: "Doe mee aan een regeling",
            subdescription: "Een gemeente zet een bepaalt budget uit. Verdien geld door deel te nemen en inwoners te helpen met jouw aanbod.",
        },
        guide: {
            default: {
                title: "Aanmelden",
                description: "Uw organisatie is in het bezit van een smartphone, deze heeft u nodig om een mobiele applicatie te installeren die QR-codes kan scannen. Heeft u deze smartphone bij de hand? Regel het dan direct!",
                button: "Direct regelen",
            },
            nijmegen: {
                title: "Als uw organisatie een passend aanbod heeft, kunt u zich opgeven.",
                description: "Uw organisatie is in het bezit van een smartphone, deze heeft u nodig om een mobiele applicatie te installeren die QR-codes kan scannen. Heeft u deze smartphone bij de hand? Regel het dan direct!",
                button: "DIRECT REGELEN",
            },
            westerkwartier: {
                title: "Aanmelden",
                description: "Levert uw organisatie een aanbod in de volgende categorieën: zwem en sportlessen, (kinder-)kleding, luiers en babyvoeding, dierbenodigdheden, speelgoed en hobby-benodigdheden? Dan kunt u uw organisatie hiervoor aanmelden.<br /><br /> Om u aan te melden heeft u een smartphone nodig. Op de smartphone kunt u een applicatie installeren voor het scannen van QR-codes. Heeft u deze smartphone bij de hand? Regel het dan direct!",
                button: "Direct regelen",
            },
            noordoostpolder: {
                title: "Aanmelden",
                description: "Voor inwoners met een laag inkomen valt het niet mee om hun kind(eren) overal aan mee te laten doen. Deze gezinnen kunnen profiteren van de Kindregeling. De gemeente biedt diverse vergoedingen aan gezinnen met een laag inkomen. Op deze manier kunnen zij hun kind (-eren) overal aan mee te laten doen. Bijvoorbeeld aan een schoolreisje, sportactiviteiten, bezoek aan het theater of muziekles. Maar het gaat ook om een tegemoetkoming voor schoolkosten, zwemles of een huiswerkcomputer.<br/><br/>" +
                    "Levert uw organisatie een passend aanbod? Dan kunt u uw organisatie hiervoor aanmelden.<br/><br/>" +
                    "Om u aan te melden, heeft u een smartphone nodig. Op de smartphone kunt u een applicatie installeren voor het scannen van QR-codes. Heeft u deze smartphone bij de hand? Regel het dan direct!",
                button: "Direct regelen",
            },
            berkelland: {
                title: "",
                button: "DIRECT REGELEN",
                description: "Voor inwoners met een laag inkomen valt het niet mee om hun kind(eren) overal aan mee te laten doen. Deze gezinnen kunnen profiteren van de Kindregeling. De gemeente biedt diverse vergoedingen aan gezinnen met een laag inkomen. Op deze manier kunnen zij hun kind (-eren) overal aan mee te laten doen. Bijvoorbeeld aan een schoolreisje, sportactiviteiten, bezoek aan het theater of muziekles. Maar het gaat ook om een tegemoetkoming voor schoolkosten, zwemles of een huiswerkcomputer." +
                    "<br/><br/>Levert uw organisatie een passend aanbod? Dan kunt u uw organisatie hiervoor aanmelden." +
                    "<br/><br/>Om u aan te melden, heeft u een smartphone nodig. Op de smartphone kunt u een applicatie installeren voor het scannen van QR-codes. Heeft u deze smartphone bij de hand? Regel het dan direct!",
            },
            oostgelre: {
                title: "",
                button: "DIRECT REGELEN",
                description: "Voor inwoners met een laag inkomen valt het niet mee om hun kind(eren) overal aan mee te laten doen. Deze gezinnen kunnen profiteren van de Kindregeling. De gemeente biedt diverse vergoedingen aan gezinnen met een laag inkomen. Op deze manier kunnen zij hun kind (-eren) overal aan mee te laten doen. Bijvoorbeeld aan een schoolreisje, sportactiviteiten, bezoek aan het theater of muziekles. Maar het gaat ook om een tegemoetkoming voor schoolkosten, zwemles of een huiswerkcomputer." +
                    "<br/><br/>Levert uw organisatie een passend aanbod? Dan kunt u uw organisatie hiervoor aanmelden." +
                    "<br/><br/>Om u aan te melden, heeft u een smartphone nodig. Op de smartphone kunt u een applicatie installeren voor het scannen van QR-codes. Heeft u deze smartphone bij de hand? Regel het dan direct!",
            },
            winterswijk: {
                title: "",
                button: "DIRECT REGELEN",
                description: "Voor inwoners met een laag inkomen valt het niet mee om hun kind(eren) overal aan mee te laten doen. Deze gezinnen kunnen profiteren van de Kindregeling. De gemeente biedt diverse vergoedingen aan gezinnen met een laag inkomen. Op deze manier kunnen zij hun kind (-eren) overal aan mee te laten doen. Bijvoorbeeld aan een schoolreisje, sportactiviteiten, bezoek aan het theater of muziekles. Maar het gaat ook om een tegemoetkoming voor schoolkosten, zwemles of een huiswerkcomputer." +
                    "<br/><br/>Levert uw organisatie een passend aanbod? Dan kunt u uw organisatie hiervoor aanmelden." +
                    "<br/><br/>Om u aan te melden, heeft u een smartphone nodig. Op de smartphone kunt u een applicatie installeren voor het scannen van QR-codes. Heeft u deze smartphone bij de hand? Regel het dan direct!",
            }
        },
        faq: {
            title: "Veel gestelde vragen",
            faq_one: "Wat zijn de technische vereisten om mee te doen?",
            one: "Een smartphone op de locatie van uw organisatie. Android verreist: 4.3 en hoger. iOS vereist: 10.0 en hoger. Een computer met een willekeurige internet browser. Internet Explorer: 10 of hoger",
            faq_two: "Hoe gaat het met uitbetalen?",
            two: "Scan de QR-code van de inwoner. Vul vervolgens het bedrag van de betaling in en eventueel een omschrijving. Tot slot, bevestig de betaling in de app. Het geld wordt binnen drie werkdagen op de rekening bijgeschreven.",
            faq_three: "Hoe kan ik mijn transacties in zien?",
            three: "Naast de mobiele applicatie kunt u ook gebruik maken van de gebruikersomgeving voor organisaties. Hier kunt u het profiel van de organisatie beheren, transacties bijhouden en aanbod op de webshop plaatsen. Het gebruik maken van de gebruikersomgeving is optioneel.",

            winterswijk: {
                title: "Veelgestelde vragen",
                faq_one: "Wat zijn de technische vereisten om mee te doen?",
                one: "Een smartphone op de locatie van uw organisatie. Android vereist: versie 4.3 en hoger. iOS vereist: versie 10.0 en hoger. Een computer met een willekeurige internet browser. Internet Explorer: versie 10 of hoger",
                faq_two: "Hoe werkt het uitbetalen?",
                two: "Scan de QR-code van de inwoner. Vul vervolgens het bedrag van de betaling in en eventueel een omschrijving. Tot slot, bevestig de betaling in de app. Het geld wordt binnen drie werkdagen op de rekening bijgeschreven.",
                faq_three: "Hoe kan ik mijn transacties inzien?",
                three: "Naast de mobiele applicatie kunt u ook gebruik maken van de gebruikersomgeving voor organisaties. Hier kunt u het profiel van de organisatie beheren, transacties bijhouden en aanbod op de webshop plaatsen. Het gebruik maken van de gebruikersomgeving is optioneel.",
            },

            oostgelre: {
                title: "Veelgestelde vragen",
                faq_one: "Wat zijn de technische vereisten om mee te doen?",
                one: "Een smartphone op de locatie van uw organisatie. Android vereist: versie 4.3 en hoger. iOS vereist: versie 10.0 en hoger. Een computer met een willekeurige internet browser. Internet Explorer: versie 10 of hoger",
                faq_two: "Hoe werkt het uitbetalen?",
                two: "Scan de QR-code van de inwoner. Vul vervolgens het bedrag van de betaling in en eventueel een omschrijving. Tot slot, bevestig de betaling in de app. Het geld wordt binnen drie werkdagen op de rekening bijgeschreven.",
                faq_three: "Hoe kan ik mijn transacties inzien?",
                three: "Naast de mobiele applicatie kunt u ook gebruik maken van de gebruikersomgeving voor organisaties. Hier kunt u het profiel van de organisatie beheren, transacties bijhouden en aanbod op de webshop plaatsen. Het gebruik maken van de gebruikersomgeving is optioneel.",
            },
            berkelland: {
                title: "Veelgestelde vragen",
                faq_one: "Wat zijn de technische vereisten om mee te doen?",
                one: "Een smartphone op de locatie van uw organisatie. Android vereist: versie 4.3 en hoger. iOS vereist: versie 10.0 en hoger. Een computer met een willekeurige internet browser. Internet Explorer: versie 10 of hoger",
                faq_two: "Hoe werkt het uitbetalen?",
                two: "Scan de QR-code van de inwoner. Vul vervolgens het bedrag van de betaling in en eventueel een omschrijving. Tot slot, bevestig de betaling in de app. Het geld wordt binnen drie werkdagen op de rekening bijgeschreven.",
                faq_three: "Hoe kan ik mijn transacties inzien?",
                three: "Naast de mobiele applicatie kunt u ook gebruik maken van de gebruikersomgeving voor organisaties. Hier kunt u het profiel van de organisatie beheren, transacties bijhouden en aanbod op de webshop plaatsen. Het gebruik maken van de gebruikersomgeving is optioneel.",
            },
        },
    },
    // SPONSOR HOME = home-sponsor.pug
    home_sponsor: {
        header: {
            title: "Gemeentelijk dashboard",
            subtitle: "Ondersteuning aan gezinnen met een laag inkomen.",
            description: "Een platform om gemeentelijke regelingen doelmatig, rechtmatig en efficient uit te geven aan inwoners.",
            oostgelre: {
                title: "Gemeentelijk dashboard",
                subtitle: "Meld u aan op het gemeentelijke dashboard.",
            },
            winterswijk: {
                title: "Gemeentelijk dashboard",
                subtitle: "Meld u aan op het gemeentelijke dashboard.",
            }
        },
        subject: {
            title: "Een innovatieve regeling",
            description: "Een programeerbare bankrekening resulteert in dat het budget bij iedere transactie gelijk over wordt gemaakt aan de aanbieder.",
            paragraph: "Bepaal zelf de bestedingsruimte",
            paragraphtwo: "Stel de hoogte van de uitgifte in en bepaal bij welke aanbieders het budget uitgegeven mag worden",
        },
        guide: {
            title: "Word onderdeel van een innovatieve beweging",
            join: "Doe mee aan ons platform door onderstaande stappen te volgen.",
            button: "Start uw reis ",
        },
        faq: {
            title: "Veelgestelde vragen",
            faq_one: "Wat zijn de technische vereisten om mee te doen?",
            one: "Een smartphone op de locatie van uw organisatie. Android verreist: 4.3 en hoger. iOS vereist: 10.0 en hoger. Een computer met een willekeurige internet browser. Internet Explorer: 10 of hoger",
            faq_two: "Hoe gaat het met uitbetalen?",
            two: "Als eerste scan de QR-code van de inwoner. Ten tweede vul het bedrag van de betaling in en eventueel een omschrijving. Als laatste bevestig de betaling in de app. Het geld wordt binnen drie werkdagen op de rekening bijgeschreven.",
            faq_three: "Hoe kan ik mijn transacties in zien?",
            three: "Naast de mobiele applicatie kunt u ook gebruik maken van de gebruikersomgeving voor organisaties. Hier kunt u het profiel van de organisatie beheren, transacties bijhouden en aanbod op de webshop plaatsen. Het gebruik maken van de gebruikersomgeving is optioneel.",

            winterswijk: {
                title: "Veelgestelde vragen",
                faq_one: "Wat zijn de technische vereisten om mee te doen?",
                one: "Een smartphone op de locatie van uw organisatie. Android vereist: versie 4.3 en hoger. iOS vereist: versie 10.0 en hoger. Een computer met een willekeurige internet browser. Internet Explorer: versie 10 of hoger.",
                faq_two: "Hoe werkt het uitbetalen?",
                two: "Scan de QR-code van de inwoner. Vul vervolgens het bedrag van de betaling in en eventueel een omschrijving. Tot slot, bevestig de betaling in de app. Het geld wordt binnen drie werkdagen op de rekening bijgeschreven.",
                faq_three: "Hoe kan ik mijn transacties inzien?",
                three: "Naast de mobiele applicatie kunt u ook gebruik maken van de gebruikersomgeving voor organisaties. Hier kunt u het profiel van de organisatie beheren, transacties bijhouden en aanbod op de webshop plaatsen. Het gebruik maken van de gebruikersomgeving is optioneel.",
            },

            oostgelre: {
                title: "Veelgestelde vragen",
                faq_one: "Wat zijn de technische vereisten om mee te doen?",
                one: "Een smartphone op de locatie van uw organisatie. Android vereist: versie 4.3 en hoger. iOS vereist: versie 10.0 en hoger. Een computer met een willekeurige internet browser. Internet Explorer: versie 10 of hoger",
                faq_two: "Hoe werkt het uitbetalen?",
                two: "Scan de QR-code van de inwoner. Vul vervolgens het bedrag van de betaling in en eventueel een omschrijving. Tot slot, bevestig de betaling in de app. Het geld wordt binnen drie werkdagen op de rekening bijgeschreven.",
                faq_three: "Hoe kan ik mijn transacties inzien?",
                three: "Naast de mobiele applicatie kunt u ook gebruik maken van de gebruikersomgeving voor organisaties. Hier kunt u het profiel van de organisatie beheren, transacties bijhouden en aanbod op de webshop plaatsen. Het gebruik maken van de gebruikersomgeving is optioneel.",
            },
        },
    },
    // VALIDATOR HOME = home-validator.pug
    // DON'T TRANSLATE , THE VALIDATOR WILL NOT HAVE A LANDINGSPAGE

    // CSV-VALIDATION = csv-validation.pug
    csv_validation: {
        header: {
            title: "Aanvragers toevoegen",
        },
        buttons: {
            choose: "Kies een ander fonds",
        }
    },
    // FINANCIAL DASHBOARD = financial-dashboard-transaction.pug
    financial_dashboard: {
        header: {
            title: "Financieel statistieken",
        },
        labels: {
            product: "Fietsen, Computers",
            quarter: "Kwartaal",
            month: "Maand",
            week: "Week",
            all: "Jaar",
            total: "Huidig saldo",
            spend: "Totaal gestort",
            used: "Totaal uitgegeven bedrag in %",
            usage: "uitgegeven",
            payed: "Uitgegeven bij",
            shops: "Aanbieders",
            activation: "aantal verstrekte tegoeden",
            citizen: "Totaal in omloop",
            provider: "Aanbieders",
            transactions: "transacties",
            service_costs: "Servicekosten",
            transaction_costs: "Transactiekosten",
            no_statistics: "Er zijn geen financiele statistieken om weer te geven.",
            no_funds_available: "Helaas, geen fondsen beschikbaar",
            select_fond: "Selecteer een fonds",
        },
        buttons: {
            choose: "Kies een andere regeling",
            previous: "Vorige",
            next: "Volgende",
        }
    },
    // FINANCIAL DASHBOARDS TRANSACTIONS = financial-dashboard-transactions.pug
    financial_dashboard_transaction: {
        labels: {
            payment: "Transactie",
            details: "Transactie details",
            id: "ID",
            bunq_id: "ID bunq",
            statement: "Naam begunstigde",
            bunq: "Transactiekosten",
            fee: "€ 0.10",
            date: "Datum",
        },
    },

    financial_dashboard_overview: {
        header: {
            title: "Financieel overzicht",
        },
        labels: {
            funds: "Fonds",
            fund_name: "Fondsnaam",
            total_budget: "Totaal gestort",
            current_budget: "Huidig saldo",
            used_budget: "Uitgaven",
            transaction_costs: "Transactiekosten",
            total: "Totaal",
            active: "Actief",
            inactive: "Inactief",
            used: "Uitgaven",
            left: "Restant",
            total_percentage: "Totaal percentage",
            total_count: "Totaalaantal"
        },
        buttons: {
            export: "Exporteren"
        }
    },

    // EDIT IMPLEMENTATION = implementation-edit.pug
    implementation_edit: {
        header: {
            title: "Webshop instellingen",
        },
        labels: {
            header_title: "Header titel",
            header_description: "Header omschrijving",
            title: "Titel",
            description: "Uitlegpagina content",
            communication: "Aanspreekvorm",

            provider: "Aanbiederpagina content",
            privacy: "Privacy content",
            explanation: "Uitleg pagina content",
            accessibility: "Toegankelijkheidsverklaring",
            terms_and_conditions: "Algemene voorwaarden",

            provider_url: "Aanbiederpagina content",
            privacy_url: "Privacy content",
            explanation_url: "Externe uitleg URL",
            accessibility_url: "Toegankelijkheidsverklaring",
            terms_and_conditions_url: "Algemene voorwaarden",

            footer_contact_details: "Footer contact content",
            footer_opening_times: "Footer openingstijden content",

        },
        placeholders: {
            provider: "Aanbiederpagina content",
            privacy: "bijv. http://uwgemeente.nl/privacyverklaring",
            explanation: "bijv. http://uwgemeente.nl/uitleg-regeling",
            accessibility: "bijv. http://uwgemeente.nl/toegankelijkheid",
            terms_and_conditions: "bijv. http://uwgemeente.nl/algemene-voorwaarden",
        },
        tooltips: {
            provider: "Plaats hier de informatie voor aanbieders. Deze tekst staat op de aanbieder uitleg pagina. De algemene tekst is zichtbaar als beide opties uit staan.",
            privacy: "Plaats een link naar de privacy tekst of vul een eigen tekst in. De algemene tekst is zichtbaar als beide opties uit staan.",
            explanation: "Plaats hier de informatie voor inwoners. Deze tekst staat op de uitleg pagina. De algemene tekst is zichtbaar als beide opties uit staan.",
            accessibility: "Plaats een link naar de toegankelijkheidsverklaring of vul een eigen tekst in. De algemene tekst is zichtbaar als beide opties uit staan.",
            terms_and_conditions: "Wanneer dit veld leeg gelaten wordt, worden de standaard blokken van de pagina weergegeven.",
        
            footer_contact_details: "Vul hier de contactinformatie van uw organisatie in. De tekst staat in de footer op de homepagina.",
            footer_opening_times: "Vul hier de openingstijden van uw organisatie in. De tekst staat in de footer op de homepagina.",
        },
        buttons: {
            cancel: "Annuleren",
            confirm: "Bevestigen",
        }
    },

    // EDIT FUNDS = funds-edit.pug
    funds_edit: {
        header: {
            title_add: "Fonds toevoegen",
            title_edit: "Fonds aanpassen",
        },
        labels: {
            name: "Naam",
            description: "Omschrijving",
            products: "Aanbod",
            status: "Status",
            start: "Startdatum",
            end: "Einddatum",
            notification_amount: "Aanvulherinnering grens €"
        },
        buttons: {
            cancel: "Annuleren",
            confirm: "Bevestigen",
        }
    },

    // SHOW FUNDS = funds-show.pug
    funds_show: {
        criterion: "Criteria's (3)",
    },

    // FUNDS = funds.pug
    funds_pug: {
        title: "Fondsen",
    },

    // HOME = home.pug
    home: {
        buttons: {
            login: "Log in",
            cancel: "Annuleren",
        }
    },

    // EDIT OFFICES = offices-edits.pug
    offices_edit: {
        header: {
            title_add: "Vestiging toevoegen",
            title_edit: "Vestiging aanpassen"
        },
        labels: {
            address: "Adres",
            phone: "Telefoonnummer",
            mail: "E-mail",
            hours: "Openingstijden",
            business_type: "Organisatie type"
        },
        buttons: {
            add_office: "Voeg een nieuwe vestiging toe",
            cancel: "Annuleren",
            confirm: "Bevestigen",
        },
    },

    // OFFICES = offices.pug
    offices: {
        buttons: {
            adjust: "Bewerk",
            add: "Voeg een nieuwe vestiging toe",
            map: "Bekijk op de kaart",
            delete: "Verwijderen"
        },
        labels: {
            mail: "E-mail",
            categories: "Categorieën",
            nocategories: "Geen categorieën",
            none: "Geen data",
            phone: "Telefoonnummer",
            hours: "Openingstijden:",
            offices: "Vestigingen ",
            business_type: "Organisatie type"
        },
        confirm_delete: {
            title: "Weet u zeker dat u deze vestiging wilt verwijderen?",
            description: "Wanneer u de vestiging verwijderd kunt u dit niet ongedaan maken. Bedenk daarom goed of u deze actie wilt verrichten."
        }
    },

    // ORGANIZATION PROVIDERS = organization-providers.pug
    organization_providers: {
        header: {
            title: "Aanbieders"
        },
        status: {
            accepted: "Geaccepteerd",
            rejected: "Geweigerd",
            hold: "Wacht op goedkeuring",
        },
        state: 'Status',
        labels: {
            mail: "E-mail",
            phone: "Telefoonnummer",
            website: "Website",
            kvk: "KVK",
            categories: "Categorieën",
            business_type: "Organisatie type",
            nocategories: "Geen categorieën",
            no_business_type: "Geen organisatie type",
            join: "Aanmelding voor fonds",
            accept_budget: "Accepteer budget",
            accept_all_offers: "Accepteer al het aanbod"
        },
        buttons: {
            reject: "Weigeren",
            accept: "Accepteren",
            view_request: "Bekijk aanvraag",
            export_csv: "Exporteer als .CSV",
            export_xls: "Exporteer als .XLS",
        },
    },

    // ORGANIZATION VALIDATORS = organization-validators.pug
    organization_validators: {
        labels: {
            address: "Adres",
            email: "E-mailadres",
            actions: "Acties",
        },
        buttons: {
            adjust: "Aanpassen",
            delete: "Verwijderen",
            add: "Medewerker toevoegen",
        },
    },

    //EDIT ORGANIZATIONS = organization-edit.pug
    organization_edit: {
        header: {
            title_add: "Organisatie aanmaken",
            title_edit: "Organisatie aanpassen",
        },
        labels: {
            name: "Bedrijfsnaam",
            bank: "IBAN-nummer",
            mail: "E-mailadres van organisatie",
            phone: "Telefoonnummer",
            kvk: "KvK-nummer",
            tax: "BTW-nummer",
            website: "Website",
            business_type: "Organisatie type",
            optional: "Optioneel",
            make_public: "Toon openbaar op website",
            photo_description: 'De afbeelding dient vierkant te zijn met een afmeting van bijvoorbeeld 400x400px.<br/>Toegestaande  formaten: JPG, PNG',
            schedule: "Openingstijden",
            weekdays_same_hours: "Alle doordeweekse dagen hebben dezelfde tijden",
            weekends_same_hours: "Zaterdag en zondag hebben dezelfde tijden",
            closed: "gesloten",
            day: "Dag",
            open: "OPEN",
            start: "START",
            end: "EIND",
            break: "Pauze",
            not_specified: "Niet ingevuld",
            description: "Omschrijving"
        },
        buttons: {
            cancel: "Annuleren",
            create: "Bevestig",
            save_location: "Vestiging opslaan",
            add_location: "Voeg nog een vestiging toe",
            edit_location: "Wijzigen",
            delete_location: "Verwijderen",
            add_employee: "Toevoegen"
        }
    },

    // ORGANIZATIONS = organizations.pug
    organizations: {
        header: {
            title: "Kies een organisatie om in te loggen",
        },
        labels: {
            without: "Zonder organisatie",
        },
        buttons: {
            add: "Organisatie toevoegen",
            edit: "Organisatie instellingen",
            notifications_preferences: "Notificatievoorkeuren",
        }
    },

    // EDIT PRODUCTS = product-edit.pug
    product_edit: {
        header: {
            title_add: "Aanbod toevoegen",
            title_edit: "Aanbod aanpassen",
        },
        labels: {
            name: "Titel van aanbod",
            description: "Omschrijving",
            new: "Aanbiedingsprijs €",
            old: "Originele prijs €",
            total: "Aantal",
            reserved: "Gereserveerd",
            sold: "Verkocht",
            stock: "Nog te koop / Totaal",
            stock_amount: "Nog te koop",
            stock_unlimited: "Onbeperkt aanbod",
            category: "Categorie",
            expire: "Vervaldatum van aanbod",
            available_offers: "Resterend aanbod",
            unlimited: "Onbeperkt"
        },
        buttons: {
            cancel: "Annuleren",
            confirm: "Bevestig",
            close: "Sluit"
        },
        errors: {
            already_added: 'U heeft het limiet bereikt. U kunt niet meer aanbod toevoegen.'
        },
        confirm_create: {
            title: 'Een aanbod toevoegen.',
            description: 'U staat op het punt een aanbod op de webshop toe te voegen. Uw aanbod wordt van de webshop verwijderd als de vervaldatum bereikt is.'
        },
        confirm_price_change: {
            title: 'Er is een lopende actie',
            description: 'Er is een actie gemaakt van deze aanbieding. Een wijziging heeft invloed op deze actie en de prijs. De aanbieding dient daarom opnieuw te worden goedgekeurd voordat de actie weer op de website zichtbaar is.'
        }
    },

    // SHOW PRODUCTS = product-show.pug
    //TRANSLATION NOT FINISHED -> PAGE NOT DONE
    products_show: {
        header: {
            title: "Transacties",
        },
        labels: {
            price: "BEDRAG",
            description: "BESCHRIJVING",
            customer: "KLANT",
            date: "DATUM",
            action: "ACTIE",
            refund: "Terugbetalen",
            chargeid: "Kopieer het transactienummer",
            connections: "CONNECTIE",
            details: "Bekijk transactiedetails",
            results: "x resultaten",
        },
        buttons: {
            previous: "Vorige",
            next: "Volgende",
        },
        paginator: {
            one: "1",
            two: "2",
            three: "3",
        }
    },

    // PRODUCTS = product.pug
    products: {
        offers: "Aanbod",
        add: "Voeg aanbod toe",
        cannot_delete: 'Let op! Wanneer uw product of dienst geplaatst is moet u dit aanbod kunnen leveren. Bedenk dus goed hoeveel aanbod en daarmee reserveringen u wilt uitgeven. U kunt uw aanbod altijd ophogen maar niet meer verlagen.',
        confirm_delete: {
            title: 'Weet u zeker dat u dit aanbod wilt verwijderen?',
            description: 'Als u het aanbod verwijderd, wordt het aanbod uit de webshop gehaald. Ook verdwijnt het aanbod uit uw dashboard. U kunt uw gereserveerd aanbod dan niet meer inzien. Reeds gemaakte reserveringen blijven actief en kunnen nog opgehaald worden.'
        }
    },

    // FUNDS AVAILABLE FOR PROVIDERS = provider-funds-available.pug
    provider_funds_available: {
        title: "Fondsen",
        applied_for_fund: {
            title: "Uw aanvraag is ontvangen.",
            description: "De gemeente zal uw verzoek behandelen, dit kan maximaal twee weken duren. Zodra de gemeente uw aanvraag heeft behandeld wordt er een e-mail toegestuurd. Daarnaast kunt u de status ook volgen op het dashboard."
        },
        error_apply: {
            title: 'U heeft nog geen vestigingen aangemaakt!',
            description: 'U heeft tenminste één vestiging nodig om uw organisatie aan te melden voor {{fund_name}}'
        }
    },

    // PROVIDER FUNDS = provider-funds.pug
    provider_funds: {
        title: "Fondsen",
    },

    // PROVIDER IDENTITIES = provider-identities.pug
    provider_identities: {
        labels: {
            address: "Adres",
            mail: "E-mail",
            actions: "Acties",
        },
        buttons: {
            adjust: "Aanpassen",
            delete: "Verwijderen",
            add: "Medewerker toevoegen",
        }
    },

    // EDIT PROVIDER IDENTITIES = provider-identity-edit.pug
    provider_identity_edit: {
        buttons: {
            adjust: "Beoordelaar aanpassen",
            add: "Beoordelaar toevoegen",
            cancel: "Annuleren",
            confirm: "Bevestigen",
        },
        labels: {
            mail: "E-mail",
        }
    },

    // SIGN UP FORM FOR PROVIDERS = provider-sign-up.pug
    sign_up_provider: {
        header: {
            main_header: "Aanmelden als aanbieder",
            go_back: "Terug",
            title_step_1: "Welkom",
            subtitle_step_1: "Meld uw organisatie aan door dit formulier in te vullen. Als aanbieder plaatst u aanbod en ontvangt u betalingen. Het invullen duurt ongeveer 15 minuten.",
            title_step_1_paragrah_1: "Hoe werkt het?",
            subtitle_step_1_point_1: "Doorloop de stappen in het aanmeldformulier.",
            subtitle_step_1_point_2: "Hierna komt u in de beheeromgeving. Plaats hier uw aanbod.",
            subtitle_step_1_point_3: "Gebruik de Me-app om betalingen te ontvangen. Deze app downloadt u in de volgende stappen.",
            title_step_1_paragrah_2: "Heeft u al een account?",
            subtitle_step_1_paragrah_2: "of rechts bovenin om in te loggen met een bestaand account.",
            title_step_1_paragrah_3: "Hulp nodig?",
            subtitle_step_1_paragrah_3: "Klik op het vraagteken rechtsonder in beeld. Hiermee opent u de helpdesk.",
            title_step_2: "Benodigdheden",
            subtitle_step_2: "U gaat de me app gebruiken om betalingen te ontvangen. In de volgende stap downloadt u de app. Aan het gebruik van de app zijn geen kosten verbonden. <br/><br/>" +
                "De Me app is beschikbaar voor Android en iOS telefoons en tablets.<br/><br/>" +
                "U heeft nodig:<br/><br/>" +
                "<ul>" +
                "<li>Mobiele telefoon of tablet met camera en internet</li>" +
                "<li>Bedrijfsgegevens van uw organisatie (contactgegevens, KvK en IBAN nummer)</li>" +
                "</ul>",
            title_step_3: "Me-app downloaden",
            subtitle_step_3: "",
            title_step_3_mail: "Op een later moment de Me-app installeren",
            title_step_3_mail_mobile: "Maak een account aan",
            title_step_4: "Kies of maak een organisatie",
            subtitle_step_4: "Aan uw e-mailadres zijn de volgende organisaties gekoppeld. Kies een bestaande organisatie of voeg een nieuwe organisatie toe.",
            title_step_5: "Maak een organisatie aan",
            subtitle_step_5: "Om deel te kunnen nemen gaat u een organisatie aanmaken. Vul hieronder de gegevens van uw organisatie in. Na aanmelding ontvangt u de betalingen automatisch op uw rekening, hier hoeft u verder niets voor te doen.",
            title_step_6: "Voeg uw vestiging(en) toe",
            subtitle_step_6: "Heeft uw organisatie meerdere vestigingen? Dan kunt u deze toevoegen. De vestigingen worden op een kaart op de webwinkel getoond.",
            title_step_7: "Voeg medewerkers toe",
            subtitle_step_7: "Heeft u medewerkers in dienst? U kunt deze medewerkers toevoegen zodat u niet afhankelijk bent van één kassa app. De medewerkers kunnen vervolgens ook betalingen verrichten met de Me-app. U heeft een overzicht van alle transacties op uw aanbieders webomgeving." + "<br/><br/>" +
                "Er wordt een uitnodiging met instructies verstuurd naar de e-mailadressen die u hieronder invult. Als u geen medewerkers wilt toevoegen kunt u deze stap overslaan.",
            title_step_8: "Meld u aan voor de regelingen",
            subtitle_step_8: "Meld u aan voor de regelingen. Uw aanvraag wordt zo spoedig mogelijk behandeld. U ontvangt hierover per e-mail een bevestiging.",

            title_step_9: "Aanvraag ontvangen",
            top_title_step_9: "Uw aanmelding is ontvangen",
            subtitle_step_9: "Uw aanmelding is in behandeling. Zodra uw aanvraag is behandeld ontvangt u een e-mail. U kunt de status van uw aanmelding ook op uw aanbieders webomgeving volgen.",

            title_step_9_mobile: "Aanmelding voltooid",
            top_title_step_9_mobile: "Uw aanmelding is ontvangen",
            subtitle_step_9_mobile: "Uw aanmelding is in behandeling. Dit kan maximaal twee weken duren. Zodra uw aanvraag is behandeld ontvangt u een e-mail. U kunt de status van uw aanmelding ook op het dashboard volgen.<br><br>Om betalingen te verichten heeft u de Me-app nodig. Download de app en meld u aan met uw e-mailadres:\n",
            download_step_9_mobile: "Applicatie downloaden",

            title_step_10: "Test betaling",
            subtitle_step_10: "Bijna klaar! Tot slot, oefen alvast hoe een betaling tussen u en een inwoner werkt. Scan onderstaande QR-code met de app en doe een test betaling.",
            title_step_11: "De test betaling is gelukt!",
            top_title_step_11: "De test betaling is gelukt!",
            subtitle_step_11: "Op dezelfde manier kunt u betalingen van klanten ontvangen. Met deze app scant u de QR-code van de klant.<br/><br/>" +
                "Het bedrag wordt direct naar u overgemaakt en staat binnen drie werkdagen op uw rekening.",
        },
        meapp_header: {
            title_step_1: "Installeer Me",
            subtitle_step_1: "Om betalingen te ontvangen heeft u een app nodig. Een transactie doet u door een QR-code te scannen en een bedrag in te vullen.",
            title_step_2: "Profiel aanmaken",
            subtitle_step_2: "Een persoonlijk profiel is nodig om betalingen te ontvangen. Later is het mogelijk om meerdere medewerkers toe te voegen.",
            title_step_3: "Stel de app <i>Me</i> in op uw telefoon",
            subtitle_step_3: "U heeft zojuist een profiel aangemaakt, daarom kunt u klikken op: ‘Ik heb een profiel’. Het instellen van uw profiel op de mobiele applicatie gebeurt door het invullen van een autorisatie code.",
            top_title_step_3: "Gebruik Me",
            top_subtitle_step_3: "Rond de installatie af door gebruik te maken van <i>Me</i>",
            title_step_4: "Het is gelukt! Het profiel van de organisatie is gekoppeld aan <i>Me</i>.",
            subtitle_step_4: "",
            top_title_step_4: "Gebruik Me",
            top_subtitle_step_4: "Rond de installatie af door gebruik te maken van <i>Me</i>",
            title_step_5: "Het is gelukt om een profiel aan te maken",
            subtitle_step_5: "Als u deel uit maakt van een organisatie, vraag de beheerder van uw organisatie om u toe te voegen als medewerker.",
        },
        labels: {
            mail: "Persoonlijk E-mailadres",
            mail_confirmation: 'Herhaal persoonlijk E-mailadres',
            name: "Voornaam",
            lastname: "Achternaam",
            bank_confirmation: "Herhaal IBAN-nummer",
            bank: "IBAN-nummber",
            smartphone: "Smartphone met camera",
            phone_number: "Uw Telefoonnummer",
            email: "Uw e-mailadres",
            organization_email: "E-mailadres van uw organisatie",
            organization_iban: "IBAN nummer van uw organisatie",
            room: "Kamer van Koophandel nummer",
            vat: "BTW-Nummer",
            employee_emails: "E-mailadressen van uw kassa medewerkers (optioneel)",
            mobile_number: "Vul uw mobiele telefoonnummer in",
        },
        buttons: {
            go_step_2: "Ga verder naar stap 2",
            back: "Vorige stap",
            next: "Volgende stap",
            reload_qr: 'Herlaad de code.',
            login: 'Login',
            skip: "Overslaan",
            skip_to_dashboard: 'Sla over en ga naar dashboard >',
            organization_add: 'Organisatie toevoegen',
            go_test_screen: "Doe een test betaling!",
            go_to_dashboard: "Ga naar uw dashboard",
        },
        step: {
            step_1: 'Stap 1',
            step_2: 'Stap 2',
            step_3: 'Stap 3',
            step_4: 'Stap 4',
            step_5: 'Stap 5',
            step_6: 'Stap 6',
            step_7: 'Stap 7'
        },
        download: {
            ios: 'Download Me voor iOS',
            android: 'Download Me voor Android',
            already_have_app: 'DE APP IS NU AAN HET DOWNLOADEN. / DE APP IS GEINSTALLEERD.',
            url_text: "Download de app <i>Me</i> op uw mobiele telefoon via de link:",
            url_address: "www.forus.io/DL",
            title: "De app installeren",
            description: "De app is beschikbaar voor iOS en Android telefoons. Vul uw telefoonnummer in om een download link via SMS te ontvangen of ga op uw telefoon naar <a href='www.forus.io/DL' target='_blank'>www.forus.io/DL</a>",
            download_link: "Verstuur sms",
            no_link_received_email: 'Geen e-mailbericht ontvangen? Controleer het ingevulde e-mailadres of ga via uw telefoon naar',
            no_link_received_sms: 'Geen SMS ontvangen? Controleer het ingevulde telefoonnummer of ga via uw telefoon naar',
            cannot_receive_sms: 'Kunt u geen SMS ontvangen? Ga op uw telefoon of tablet naar:',
            cannot_install_app: 'Op dit moment geen mogelijkheid om de app te installeren?'
        },
        filters: {
            labels: {
                organizations: 'Organisaties',
                tags: 'Labels'
            },
            options: {
                all_organizations: 'Alle organisaties',
                all_labels: 'Alle labels'
            }
        },
        qr_code: {
            title: "Scan de QR-code om verder te gaan",
            description: [
                '1. Open de link',
                '2. Installeer de app',
                '3. Open de app en meld u aan',
                '4. Druk op QR om de scanner te openen',
                '5. Scan de QR-code die rechts wordt weergegeven'
            ].join('<br>'),
        },
        app_instruction: {
            step_1: 'Open <i>Me</i>',
            step_2: 'Ik heb al een profiel',
            step_3: 'Inloggen met Autorisatie code',
            no_app: 'Ik kan nu nog geen app gebruiken >',
            create_profile: 'Bevestig',
        },
        no_app: {
            enter_email: 'U heeft de Me-app nodig om betalingen te ontvangen.',
            instructions: 'Op dit moment niet de app installeren? Het is mogelijk om met uw e-mailadres een account aan te maken. U installeert de Me-app op een later moment zodat u betalingen kunt ontvangen.',
            continue_app: 'Ga toch verder met de app >'
        },
        app_header: {
            title: 'Vul de code in op het invoerveld',
            subtitle: 'De code is te vinden in de mobiele applicatie, volg de bovenstaande stappen op om de code te kunnen aflezen.'
        },
        login: {
            title: 'Heeft u al een profiel aan gemaakt in <i>Me</i>?',
            description: 'Waneer u al een profiel heeft aangemaakt, biedt de onderstaande knop de mogelijkheid om direct in te loggen op dit profiel.',
            qr_description: 'Scan deze QR-code met de app <i>Me</i> als u al een profiel heeft aangemaakt.'
        },
        open_pc: {
            title: 'Deze pagina is niet mobiel te benaderen.',
            description: 'Aanmelden voor een fonds is alleen mogelijk via onze website op een vaste computer.'
        },
        sms: {
            body: 'Download Me makkelijk via de link: https://www.forus.io/DL',
            title: 'Download <i>Me</i> op uw mobiele telefoon',
            description: 'Vul uw telefoonnummer in het onderstaande invoerveld om een sms te ontvangen met de download link.',
            subdescription: 'Krijgt u geen sms dan kunt u <i>Me</i> downloaden via de link <b>www.forus.io/DL</b> op uw mobiele telefoon.',
            sent: 'Een sms-bericht is verstuurd.',
            sent_description: 'Heeft u geen bericht ontvangen? Download <i>Me</i> via de link <b>www.forus.io/DL</b> op uw mobiele telefoon.',
            button: {
                send: 'Versturen'
            },
            error: {
                try_later: 'Probeer later nog eens.'
            }
        },
        employee: {
            labels: {
                employee_add_header: "Bevestig uitnodiging",
                employee_add_message: "Wilt u medewerker met het e-mailadres <strong class='text-primary'>{{email}}</strong> uitnodigen? <br>Deze medewerker zal hier over een e-mail ontvangen.",
                accept: "Bevestig",
                cancel: "Annuleer"
            }
        }
    },
    // SIGN UP FORM FOR SPONSORS = sponsor-sign-up.pug
    sign_up_sponsor: {
        header: {
            main_header: "Aanmelden als sponsor",
            go_back: "Terug",
            title_step_1: "Welkom",
            subtitle_step_1: "Via dit online formulier kunt u uw organisatie aanmelden als sponsor. De volledige aanmeldprocedure duurt ongeveer 15 minuten. ",
            title_step_2: "Maak een account",
            title_step_3: "Vestiging kiezen",
            subtitle_step_3: "Kies een bestaande organisatie of voeg een nieuwe organisatie toe.",
            title_step_4: "Organisatie aanmaken",
            subtitle_step_4: "Vul hieronder de gegevens van uw organisatie in. De gegevens worden gebruikt om uw aanmelding te beoordelen en om gebruik te kunnen maken van het systeem. De gegevens kunt u na aanmelding aanpassen in de persoonlijke aanbieders webomgeving.",
            title_step_5: "Aanmelding voltooid",
            subtitle_step_5: "Uw aanmelding is voltooid",
        },
        meapp_header: {
            title_step_1: "Installeer Me",
            subtitle_step_1: "Om betalingen te ontvangen heeft u een app nodig. Een transactie doet u door een QR-code te scannen en een bedrag in te vullen.",
            title_step_2: "Profiel aanmaken",
            subtitle_step_2: "Een persoonlijk profiel is nodig om betalingen te ontvangen. Later is het mogelijk om meerdere medewerkers toe te voegen.",
            title_step_3: "Stel de app <i>Me</i> in op uw telefoon",
            subtitle_step_3: "U heeft zojuist een profiel aangemaakt, daarom kunt u klikken op: ‘Ik heb een profiel’. Het instellen van uw profiel op de mobiele applicatie gebeurt door het invullen van een autorisatie code.",
            top_title_step_3: "Gebruik Me",
            top_subtitle_step_3: "Rond de installatie af door gebruik te maken van <i>Me</i>",
            title_step_4: "Het is gelukt! Het profiel van de organisatie is gekoppeld aan <i>Me</i>.",
            subtitle_step_4: "",
            top_title_step_4: "Gebruik Me",
            top_subtitle_step_4: "Rond de installatie af door gebruik te maken van <i>Me</i>",
            title_step_5: "Het is gelukt om een profiel aan te maken",
            subtitle_step_5: "Als u deel uit maakt van een organisatie, vraag de beheerder van uw organisatie om u toe te voegen als medewerker.",
        },
        labels: {
            mail: "Persoonlijk E-mailadres",
            mail_confirmation: 'Herhaal persoonlijk E-mailadres',
            name: "Voornaam",
            lastname: "Achternaam",
            bank_confirmation: "Herhaal IBAN-nummer",
            bank: "IBAN-nummber",
            smartphone: "Smartphone met camera",
            phone_number: "Uw Telefoonnummer",
            email: "Uw e-mailadres",
            organization_email: "E-mailadres van uw organisatie",
            organization_iban: "IBAN nummer van uw organisatie",
            room: "Kamer van Koophandel nummer",
            vat: "BTW-Nummer",
            employee_emails: "E-mailadressen van uw kassa medewerkers (optioneel)",
            mobile_number: "Vul uw mobiele telefoonnummer in",
            confirm_email: "Bevestig uw e-mailadres",
            confirm_email_description: "Bevestig voordat we verder gaan uw e-mail adres. Klik op de link in de e-mail die is verzonden naar",
            terms: "",
        },
        buttons: {
            go_step_2: "Ga verder naar stap 2",
            back: "Vorige stap",
            next: "Volgende stap",
            reload_qr: 'Herlaad de code.',
            login: 'Login',
            skip: "Overslaan",
            skip_to_dashboard: 'Sla over en ga naar dashboard >',
            organization_add: 'Organisatie toevoegen',
            go_test_screen: "Doe een test betaling!",
            go_to_dashboard: "Ga naar uw dashboard",
        },
        step: {
            step_1: 'Stap 1',
            step_2: 'Stap 2',
            step_3: 'Stap 3',
            step_4: 'Stap 4',
            step_5: 'Stap 5',
            step_6: 'Stap 6',
            step_7: 'Stap 7'
        },
        download: {
            ios: 'Download Me voor iOS',
            android: 'Download Me voor Android',
            already_have_app: 'DE APP IS NU AAN HET DOWNLOADEN. / DE APP IS GEINSTALLEERD.',
            url_text: "Download de app <i>Me</i> op uw mobiele telefoon via de link:",
            url_address: "www.forus.io/DL",
            title: "De app installeren",
            description: "De app is beschikbaar voor iOS en Android telefoons. Vul uw telefoonnummer in om een download link via SMS te ontvangen of ga op uw telefoon naar <a href='www.forus.io/DL' target='_blank'>www.forus.io/DL</a>",
            download_link: "Verstuur download link",
            no_link_received: 'Heeft u geen link ontvangen? Ga dan op uw telefoon naar',
        },
        qr_code: {
            title: "Scan de QR-code om verder te gaan",
            description: "Maak in de app een persoonlijk profiel aan. Scan vervolgens de QR-code die naast deze tekst staat met de 'QR' scanner in de app."
        },
        app_instruction: {
            step_1: 'Open <i>Me</i>',
            step_2: 'Ik heb al een profiel',
            step_3: 'Inloggen met Autorisatie code',
            no_app: 'Ik kan nu nog geen app gebruiken >',
            create_profile: 'Bevestig',
        },
        no_app: {
            enter_email: 'Vul uw e-mail adres in om verder te gaan',
            instructions: 'Als u nu nog niet in staat bent om verder te gaan met de app. Is het ook mogelijk om met uw e-mail adres verder te gaan en later in te loggen op de app. Het is echter handiger om direct met de app verder te gaan.',
            continue_app: 'Ga toch verder met de app >',
            to_app: 'Ik wil inloggen met de me app >',
        },
        app: {
            title: "Login met de Me-app",
            description_top: [
                "Scan de QR-code aan de rechterzijde met de QR-scanner in de Me-app.",
            ].join("\n"),
            description_bottom: [
                "De Me-app wordt gebruikt om makkelijk en veilig in te loggen, betalingen te doen en tegoeden te beheren"
            ].join("\n"),
            no_app: "Ik wil inloggen met mijn e-mailadres >"
        },
        app_header: {
            title: 'Vul de code in op het invoerveld',
            subtitle: 'De code is te vinden in de mobiele applicatie, volg de bovenstaande stappen op om de code te kunnen aflezen.'
        },
        login: {
            title: 'Heeft u al een profiel aan gemaakt in <i>Me</i>?',
            description: 'Waneer u al een profiel heeft aangemaakt, biedt de onderstaande knop de mogelijkheid om direct in te loggen op dit profiel.',
            qr_description: 'Scan deze QR-code met de app <i>Me</i> als u al een profiel heeft aangemaakt.'
        },
        open_pc: {
            title: 'Deze pagina is niet mobiel te benaderen.',
            description: 'Aanmelden voor een fonds is alleen mogelijk via onze website op een vaste computer.'
        },
    },
    // SIGN UP FORM FOR VALIDATORS = validator-sign-up.pug
    sign_up_validator: {
        header: {
            main_header: "Aanmelden als beoordelaar",
            go_back: "Terug",
            title_step_1: "Welkom",
            subtitle_step_1: "Via dit online formulier kunt u uw organisatie aanmelden als beoordelaar. De volledige aanmeldprocedure duurt ongeveer 5 minuten. ",
            title_step_2: "Hoe werkt het?",
            subtitle_step_2: "Als beoordelaar gaat u controleren of aanvragers aan de voorwaarden voldoen die worden gesteld door de sponsor. ",
            title_step_3: "Maak een account",
            subtitle_step_3: "Vul uw e-mail adres in om verder te gaan",
            title_step_4: "Vestiging kiezen",
            subtitle_step_4: "Kies een bestaande organisatie of voeg een nieuwe organisatie toe.",
            title_step_5: "Organisatie aanmaken",
            subtitle_step_5: "Om deel te kunnen nemen gaat u een organisatie aanmaken. Vul hieronder de gegevens van uw organisatie in. Na aanmelding ontvangt u de betalingen automatisch op uw rekening, hier hoeft u verder niets voor te doen.",
            title_step_6: "Aanmelding voltooid",
            subtitle_step_6: "Uw aanmelding is voltooid",
        },
        meapp_header: {
            title_step_1: "Installeer Me",
            subtitle_step_1: "Om betalingen te ontvangen heeft u een app nodig. Een transactie doet u door een QR-code te scannen en een bedrag in te vullen.",
            title_step_2: "Profiel aanmaken",
            subtitle_step_2: "Een persoonlijk profiel is nodig om betalingen te ontvangen. Later is het mogelijk om meerdere medewerkers toe te voegen.",
            title_step_3: "Stel de app <i>Me</i> in op uw telefoon",
            subtitle_step_3: "U heeft zojuist een profiel aangemaakt, daarom kunt u klikken op: ‘Ik heb een profiel’. Het instellen van uw profiel op de mobiele applicatie gebeurt door het invullen van een autorisatie code.",
            top_title_step_3: "Gebruik Me",
            top_subtitle_step_3: "Rond de installatie af door gebruik te maken van <i>Me</i>",
            title_step_4: "Het is gelukt! Het profiel van de organisatie is gekoppeld aan <i>Me</i>.",
            subtitle_step_4: "",
            top_title_step_4: "Gebruik Me",
            top_subtitle_step_4: "Rond de installatie af door gebruik te maken van <i>Me</i>",
            title_step_5: "Het is gelukt om een profiel aan te maken",
            subtitle_step_5: "Als u deel uit maakt van een organisatie, vraag de beheerder van uw organisatie om u toe te voegen als medewerker.",
        },
        labels: {
            mail: "Persoonlijk E-mailadres",
            mail_confirmation: 'Herhaal persoonlijk E-mailadres',
            name: "Voornaam",
            lastname: "Achternaam",
            bank_confirmation: "Herhaal IBAN-nummer",
            bank: "IBAN-nummber",
            smartphone: "Smartphone met camera",
            phone_number: "Uw Telefoonnummer",
            email: "Uw e-mailadres",
            organization_email: "E-mailadres van uw organisatie",
            organization_iban: "IBAN nummer van uw organisatie",
            room: "Kamer van Koophandel nummer",
            vat: "BTW-Nummer",
            employee_emails: "E-mailadressen van uw kassa medewerkers (optioneel)",
            mobile_number: "Vul uw mobiele telefoonnummer in",
            confirm_email: "Bevestig uw e-mailadres",
            confirm_email_description: "Bevestig voordat we verder gaan uw e-mailadres. Klik op de link in de e-mail die is verzonden naar",
            terms: "",
        },
        buttons: {
            go_step_2: "Ga verder naar stap 2",
            back: "Vorige stap",
            next: "Volgende stap",
            reload_qr: 'Herlaad de code.',
            login: 'Login',
            skip: "Overslaan",
            skip_to_dashboard: 'Sla over en ga naar dashboard >',
            organization_add: 'Organisatie toevoegen',
            go_test_screen: "Doe een test betaling!",
            go_to_dashboard: "Ga naar uw dashboard",
        },
        step: {
            step_1: 'Stap 1',
            step_2: 'Stap 2',
            step_3: 'Stap 3',
            step_4: 'Stap 4',
            step_5: 'Stap 5',
            step_6: 'Stap 6',
            step_7: 'Stap 7'
        },
        download: {
            ios: 'Download Me voor iOS',
            android: 'Download Me voor Android',
            already_have_app: 'DE APP IS NU AAN HET DOWNLOADEN. / DE APP IS GEINSTALLEERD.',
            url_text: "Download de app <i>Me</i> op uw mobiele telefoon via de link:",
            url_address: "www.forus.io/DL",
            title: "De app installeren",
            description: "De app is beschikbaar voor iOS en Android telefoons. Vul uw telefoonnummer in om een download link via SMS te ontvangen of ga op uw telefoon naar <a href='www.forus.io/DL' target='_blank'>www.forus.io/DL</a>",
            download_link: "Verstuur download link",
            no_link_received: 'Heeft u geen link ontvangen? Ga dan op uw telefoon naar',
        },
        qr_code: {
            title: "Scan de QR-code om verder te gaan",
            description: "Maak in de app een persoonlijk profiel aan. Scan vervolgens de QR-code die naast deze tekst staat met de 'QR' scanner in de app."
        },
        app_instruction: {
            step_1: 'Open <i>Me</i>',
            step_2: 'Ik heb al een profiel',
            step_3: 'Inloggen met Autorisatie code',
            no_app: 'Ik kan nu nog geen app gebruiken >',
            create_profile: 'Bevestig',
        },
        no_app: {
            enter_email: 'Vul uw e-mailadres in om verder te gaan',
            instructions: 'Als u nu nog niet in staat bent om verder te gaan met de app. Is het ook mogelijk om met uw e-mailadres verder te gaan en later in te loggen op de app. Het is echter handiger om direct met de app verder te gaan.',
            continue_app: 'Ga toch verder met de app >',
            to_app: 'Ik wil inloggen met de me app >',
        },
        app: {
            title: "Login met de Me-app",
            description_top: [
                "Scan de QR-code aan de rechterzijde met de QR-scanner in de Me-app.",
            ].join("\n"),
            description_bottom: [
                "De Me-app wordt gebruikt om makkelijk en veilig in te loggen, betalingen te doen en tegoeden te beheren"
            ].join("\n"),
            no_app: "Ik wil inloggen met mijn e-mailadres >"
        },
        app_header: {
            title: 'Vul de code in op het invoerveld',
            subtitle: 'De code is te vinden in de mobiele applicatie, volg de bovenstaande stappen op om de code te kunnen aflezen.'
        },
        login: {
            title: 'Heeft u al een profiel aan gemaakt in <i>Me</i>?',
            description: 'Waneer u al een profiel heeft aangemaakt, biedt de onderstaande knop de mogelijkheid om direct in te loggen op dit profiel.',
            qr_description: 'Scan deze QR-code met de app <i>Me</i> als u al een profiel heeft aangemaakt.'
        },
        open_pc: {
            title: 'Deze pagina is niet mobiel te benaderen.',
            description: 'Aanmelden voor een fonds is alleen mogelijk via onze website op een vaste computer.'
        },
    },

    // Organization-employees.pug
    organization_employees: {
        labels: {
            email: "E-mailadres",
            roles: "Rollen",
            actions: "Actie",
            owner: "Eigenaar"
        },
        buttons: {
            adjust: "Aanpassen",
            delete: "Verwijderen",
            add: "Toevoegen",
            transfer_ownership: "Overdragen",
        }
    },

    // TRANSACTIONS = transaction.pug
    transactions: {
        header: {
            title: "Transacties",
        },
        labels: {
            price: "BEDRAG",
            description: "BESCHRIJVING",
            customer: "KLANT",
            date: "DATUM",
            action: "ACTIE",
            refund: "Terugbetalen",
            chargeid: "Kopieer het transactienummer",
            connections: "CONNECTIE",
            details: "Bekijk transactiedetails",
            results: "x resultaten",
            payment: "Betaling -",
            fund: "FONDS",
            status: "STATUS",
            provider: "AANBIEDER",
            search: "Zoeken",
            from: "Vanaf",
            to: "Tot en met",
            state: "Status",
            fund_state: "Status fonds",
            amount: "Bedrag",
            amount_min: "0",
            amount_max: "Alles",
            total_amount: "Som van transacties",
        },
        buttons: {
            previous: "Vorige",
            next: "Volgende",
            view: "Bekijk",
            export_csv: "Exporteer als .CSV",
            export_xls: "Exporteer als .XLS",
        },
        paginator: {
            one: "1",
            two: "2",
            three: "3",
        },
        export: {
            labels: {
                date: 'Datum',
                amount: 'Bedrag',
                fund: 'Fonds',
                provider: 'Aanbieder',
                payment_id: 'Betalingskenmerk',
                state: 'Status'
            }
        }
    },

    // RESERVATION = reservations.pug
    reservations: {
        header: {
            title: "Reserveringen",
        },
        filters: {
            fund: "Fonds",
            product: "Aanbod",
            status: "Status",
            search: "Zoeken",
            from: "Vanaf",
            to: "Tot en met",
            state: "Status",
        },
        labels: {
            number: "Nummer",
            product: "Aanbod",
            price: "Bedrag",
            reserved_at: "Aangemaakt op",
            description: "Beschrijving",
            customer: "Gegevens",
            fund: "Fonds",
            status: "Status",
            actions: "Opties",
        },
    },

    // VALIDATION REQUEST - validation-request.pug
    validation_request: {
        buttons: {
            accept: "Accepteren",
            refuse: "Weigeren",
        },
        labels: {
            bsn: "BSN",
        }
    },

    validation: {
        email_confirmation: 'Email verkeerde bevestiging',
        iban_confirmation: 'IBAN verkeerde bevestiging',
    },

    // OVERVIEW VALIDATIONS REQUESTS = validation-requests.pug
    validation_requests: {
        labels: {
            requests: "Openstaande aanvragen ({{ count }})",
            bsn: "BSN: ",
            type: "Type",
            value: "Eigenschap",
            date: "Datum, tijd",
            results: "{{ count }} resultaten",
            status: "Status",
            records: "Eigenschappen",
            actions: "Acties",
            search: "Zoeken",
            assigned_to: "Toegewezen",
            from: "Vanaf",
            to: "Tot",
            pending_since: "In behandeling sinds"
        },
        status: {
            hold: "Wachten",
            pending: 'Wachtend',
            declined: 'Geweigerd',
            approved: 'Geaccepteerd'
        },
        buttons: {
            show: "Bekijk eigenschappen",
            allaccept: "Accepteren",
            alldecline: "Weigeren",
            accept: "Valideren",
            decline: "Weigeren",
            clear_filter: "Wis filter",
            export_csv: "Exporteer als .CSV",
            export_xls: "Exporteer als .XLS",
        },
    },

    // EDIT VALIDATORS
    validators_edit: {
        labels: {
            mail: "E-mail",
        },
        buttons: {
            cancel: "Annuleren",
            confirm: "Bevestigen",
        }
    },

    // DIRECTIVES

    // CSV UPLOADER
    csv_upload: {
        buttons: {
            upload: "Upload",
        },
        labels: {
            swipe: "Sleep hier het *.CSV of *.TXT bestand",
            upload: "Upload .csv bestand",
            done: "Klaar",
        }
    },

    // EMPTY BLOCK = empty-block.pug
    // No translations needed

    // FUNDS FOR PROVIDERS = fund-card-available.pug
    fund_card_available_provider: {
        buttons: {
            join: "Aanmelden",
        },
        labels: {
            categories: "Categorieën",
            nocategories: "Geen Categorieën",
        },
    },
    // FUND CARD FOR PROVIDERS = fund-card-provider.pug
    fund_card_provider_finances: {
        status: {
            hold: "Wachten",
        },
        labels: {
            price: "Bedrag",
            date: "Datum",
            status: "Status",
        },
    },
    // FUND CARD FOR PROVIDERS = fund-card-provider.pug
    fund_card_provider: {
        status: {
            hold: "Wachten",
            accepted: "Geaccepteerd",
            reject: "Geweigerd",
            stopped: "Gestopt",
            accepted_only_products: "Geaccepteerd: alleen uw aanbod",
            accepted_only_specific_products: "Geaccepteerd: specifiek aanbod",
            pending: "Uitgenodigd",
            expired: "Verlopen",
            rejected: "Geweigerd"
        },
        labels: {
            categories: "Categorieën",
            nocategories: "Geen categorieën",
            date: "Begindatum / Einddatum",
            max_amount: "Maximaal tegoed per voucher",
            closed: "Gesloten",
            accept_invitation: "Accepteren",
            allow_budget: "Scan tegoed op voucher",
            allow_products: "Scan geplaatst aanbod",
            allow_some_products: "Scan specifiek aanbod",
            view_products: "Bekijk aanbod"
        },
        empty_block: {
            available: "Er zijn geen beschikbare fondsen waar u zich voor kunt aanmelden.",
            active: "Er zijn geen fondsen waar u actief voor bent.",
            invitations: "Er zijn geen openstaande uitnodigingen die u kunt accepteren.",
            expired_closed: "Er zijn geen verlopen uitnodigingen of gesloten fondsen waar u zich voor hebt aangemeld.",
            pending_rejected: "Er zijn geen fondsen waar u aanmeldingen voor bent.",
        },
        tabs: {
            active: 'Actief',
            invitations: 'Uitnodigingen',
            pending_rejected: "Aanmeldingen",
            available: 'Beschikbaar',
            expired: 'Archief',
        },
        title: {
            available: "Beschikbare fondsen",
            pending_rejected: "Aanmeldingen fondsen",
            active: "Actieve fondsen",
            invitations: "Uitnodigingen",
            expired_closed: "Archief",
        }
    },

    //FUND CARD FOR SPONSOR = fund-card-sponsor.pug
    fund_card_sponsor: {
        buttons: {
            join: "Aanmelden",
            close: "Sluit",
            restart: "Herstart",
            pause: "Pauze",
            add: "Budget toevoegen",
            delete: 'Verwijderen',
            invite_providers: 'Aanbieders'
        },
        status: {
            active: "Actief",
            paused: "Gepauzeerd",
            closed: "Gestopt",
        },
        labels: {
            categories: "Categorieën",
            nocategories: "Geen Categorieën",
            setting: "Instellingen",
            statistics: "Statistieken",
            price: "BEDRAG",
            description: "BESCHRIJVING",
            customer: "KLANT",
            date: "DATUM",
            action: "ACTIE",
            refund: "Terugbetalen",
            chargeid: "Kopieer het transactienummer",
            connections: "CONNECTIE",
            details: "Bekijk transactiedetails",
            results: "x resultaten",
            payment: "Betaling -",
            providers: "Aanbieders",
            your_employees: "Uw medewerkers",
            applicants: "Aanvragers",
            employees: "medewerkers"
        },
        confirm_delete: {
            title: 'Weet u zeker dat u dit fonds wilt verwijderen?',
            description: 'Het verwijderen van een fonds is definitief. U kunt dit niet ongedaan maken.'
        }
    },

    // PROVIDER MENU = menu-provider.pug
    // No translations needed
    // PROVIDER MENU = menu-sponsor.pug
    // No translations needed
    // VALIDATOR MENU = menu-validator.pug
    // No translations needed
    // ADDING FUNDS MODAL - modal-funds-add.pug
    modal_funds_add: {
        header: {
            title: "Budget toevoegen aan fonds",
        },
        buttons: {
            close: "Sluiten",
        },
        labels: {
            payment: "Maak het bedrag over naar: ",
            account: "NL83 BUNQ 3456 3344 32",
            addcode: "voeg code  ",
            description: "  toe aan de beschrijving",
            copy: "Kopieer naar klembord"
        }
    },

    modal_pdf_preview: {
        header: {
            title: "PDF-voorbeeld"
        }
    },

    modal_image_preview: {
        header: {
            title: "Afbeelding-voorbeeld"
        }
    },

    // SELECT MULTIPLE CATEGORIES = multi-select.pug
    multi_select: {
        title: "Categorieën",
    },

    // SELECT PHOTO = photo-selector.pug
    photo_selector: {
        labels: {
            image: "Afbeelding",
        },
        buttons: {
            change: "Upload",
        }
    },

    // PRE VALIDATED TABLE = prevalidated_table.pug
    prevalidated_table: {
        header: {
            title: "Gegevens van aanvragers",
        },
        labels: {
            code: "Code",
            search: "Zoeken",
            exported: "Geëxporteerd",
            from: "Van",
            to: "Tot",
            filter: "Filter",
            actions: "Opties",
        },
        status: {
            active: "Geactiveerd",
        },
        buttons: {
            export_selected: "Exporteer selectie",
            export_csv: "Exporteer als .CSV",
            export_xls: "Exporteer als .XLS",
        }
    },

    // PRODUCT CARD = product-card.pug
    product_card: {
        status: {
            active: "Actief",
            paused: "Gepauzeerd",
            closed: "Gesloten",
            archived: "Gearchiveerd",
        },
        buttons: {
            delete: "Verwijderen",
            edit: "Bewerken",
            view: "Bekijken",
        }
    },

    // PROGRESS BAR = progress-bar.pug
    // No translations needed
    // SCHEDULE CONTROL = schedule-controle.pug
    // No translations needed

    // PAGINATOR LOADER = paginator-loader.pug

    paginator_loader: {
        buttons: {
            load: "Laad meer activatie codes",
        },
        labels: {
            from: "Van",
        }
    },

    paginator: {
        buttons: {
            first: "Eerste",
            last: "Laatste",
        },
        labels: {
            from: "Van",
        }
    },

    // MENU = langing/navbar.pug
    topnavbar: {
        items: {
            funds: "Fondsen",
            products: "Aanbod",
            identity: "Profiel",
        },
        buttons: {
            activate: "Activatiecode",
            login: "Login",
            voucher: "Mijn tegoeden",
            records: "Mijn eigenschappen",
            authorize: "Autoriseer apparaat",
            logout: "Uitloggen",
            products: "Aanbod",
            funds: "Fondsen",
        },
    },
    // AUTHENTICATION POPUP = popup-auth.pug
    popup_auth: {
        header: {
            title: "Inloggen op het dashboard",
            subtitle: "<span>Scan de QR-code met de</span> <strong><u>Me-app</u></strong><span> of log in met uw e-mailadres</span>",
        },
        notifications: {
            confirmation: "Het is gelukt!",
            link: "Er is een e-mail verstuurd naar <strong class=\"text-primary\">{{email}}</strong>.<br/>Klik op de link om u aan te melden.",
            link_website: "Er is een e-mail naar uw inbox gestuurd. In de e-mail vindt u een link waarmee u kunt inloggen op deze website.",
            invalid: "De activatiecode is ongeldig of al gebruikt",
            voucher_email: "Het is gelukt, de e-mail is verstuurd",
        },
        buttons: {
            qrcode: "Log in via de Me-app",
            mail: "Log in via e-mail",
            submit: "VERSTUREN",
            cancel: "ANNULEREN",
            confirm: "VOLGENDE",
            close: "SLUITEN",
        },
        labels: {
            timelimit: "De link verloopt in 24 uur, gebruik de link dus binnenkort.",
            join: "Aanmelden",
            mail_sent: "Een e-mail is onderweg!",
            scancode: "Scan deze QR-Code met een ander apparaat waar u al op aangemeld bent",
            mobilecode: "Vul de toegangscode van de Me-app in",
            mail: "Dit scherm is alleen bedoeld voor inwoners die een brief van de gemeente hebben ontvangen met daarin een activatiecode en deze nog niet hebben gebruikt.",
            link: "Vul uw e-mail adres in om een link te ontvangen waarmee u kunt inloggen",
            code: "Vul de activatiecode in die u per brief heeft ontvangen",
            voucher_email: "Verstuur het tegoed per e-mail",
        },
        input: {
            mail: "Vul uw e-mail adres in",
            code: "Activatiecode",
            mailing: "E-mail",
        },
        pin_code: {
            confirmation: {
                title: "Is de mobiele app gekoppeld aan uw persoonlijk e-mailadres?",
                description: "Ga naar het tabblad Profiel in de app. Ziet u hier uw e-mailadres staan? Dan is de app succesvol gekoppeld. Als u het tabblad Profiel niet ziet staan, probeer het dan nog opnieuw.",
                buttons: {
                    try_again: "Opnieuw proberen",
                    confirm: "Volgende"
                }
            }
        }
    },
    product_category_type: {
        products: "PRODUCTEN",
        services: "DIENSTEN OF ACTIVITEITEN",
    },

    lorem_ipsum: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam pulvinar dictum leo, sed congue purus scelerisque ut.',

    modal: {
        buttons: {
            cancel: "Annuleren",
            confirm: "Bevestig",
            close: "Sluit"
        }
    },

    roles: {
        tooltip: {
            admin: 'Alle functionaliteiten',
            validation: 'Aanvragers toevoegen (inwoners toevoegen via CSV bestand)',
            operation_officer: 'Verrichten van betalingen via Me app (voor aanbieders)',
            finance: 'Overzicht van statistieken, transacties en het financieel dashboard',
            policy_officer: 'Aanbieders goedkeuren en instellingen van het fonds aanpassen',
            implementation_manager: 'Implementatie manager',
            implementation_cms_manager: 'Implementatie CMS manager'
        }
    },

    tooltip: {
        product: {
            limit: "U kunt ook de inwoner in uw organisatie te woord staan en hem een persoonlijk aanbod aanbieden. U scant dan de QR-code en vult een bedrag in!",
        }
    },

    search: "Zoeken",

    open_in_me: {
        app_header: {
            title: 'Stap 3: Vul de code in',
            subtitle: 'Vul de 6 cijfers die in uw app verschijnen hieronder in'
        },
        app_instruction: {
            step_1: 'Open <i>Me</i>',
            step_2: 'Kies koppelen',
            step_3: 'Inloggen met Autorisatie code',
        },
        authorize: {
            close: 'Annuleren',
            submit: 'Koppel de app',
        }
    },
    notification_preferences: {
        title_preferences: 'Notificatievoorkeuren',
        title_email_preferences: 'E-mail notificaties',
        title_push_preferences: 'Push notificaties',
        subscribe_desc: 'Met dit e-mailadres "{{email}}" bent u momenteel voor alle e-mail notificaties uitgeschreven. Wanneer u e-mail notificaties wilt ontvangen, kunt u dit hieronder per notificatie instellen.',
        unsubscribe: 'Uitschrijven voor alle e-mail notificaties',
        unsubscribe_desc: 'Ik wil me uitschrijven van alle e-mail notificaties.',
        unsubscribe_button: 'Uitschrijven',
        subscribe: 'Ja, ik wil e-mail notificaties ontvangen.',
        errors: {
            'not_found': 'Deze token is ongeldig',
            'expired': 'Deze token is verlopen',
            'not-pending': 'De notificatievoorkeuren zijn al aangepast via deze link'
        },
        types: {
            digest: {
                daily_sponsor: {
                    title: "Dagelijkse samenvatting omtrent aanmeldingen aanbieders",
                    description: "Notificaties omtrent aanmeldingen van aanbieders worden gegroepeerd toegestuurd."
                },
                daily_provider_funds: {
                    title: "Dagelijkse samenvatting omtrent uw aanmeldingen bij fondsen",
                    description: "Een dagelijkse samenvatting omtrent uw aanmeldingen bij fondsen."
                },
                daily_provider_products: {
                    title: "Dagelijkse samenvatting omtrent gereserveerd aanbod",
                    description: "Een dagelijkse samenvatting van alle notificaties omtrent product en diensten die zijn gereserveerd."
                },
                daily_validator: {
                    title: "Dagelijkse samenvatting omtrent aanvragen voor fondsen",
                    description: "Notificaties omtrent aanvragen worden gegroepeerd toegestuurd."
                },
            },
            funds: {
                new_fund_started: {
                    title: 'Fonds is van start gegaan',
                    description: 'Ontvang een notificatie wanneer er een fonds waar u voor bent aangemeld is gestart en u klanten kunt verwachten.'
                },
                new_fund_applicable: {
                    title: 'Nieuw fonds waar u zich voor kunt aanmelden',
                    description: 'Ontvang een notificatie wanneer er een nieuw fonds is aangemaakt waarvoor u zich kunt aanmelden.'
                },
                balance_warning: {
                    title: 'Actie vereist: saldo aanvullen',
                    description: 'Ontvang een notificatie wanneer het saldo voor een fonds lager is dan de vooraf ingestelde grens.'
                },
                fund_expires: {
                    title: 'Herinnering einddatum voucher',
                    description: 'Ontvang een notificatie 1 maand voor de einddatum van uw voucher.'
                },
                product_added: {
                    title: 'Nieuw aanbod toegevoegd',
                    description: 'Ontvang een notificatie wanneer er een nieuw aanbod is toegevoegd.',
                },
                new_fund_created: {
                    title: 'Nieuw fonds aangemaakt',
                    description: 'Ontvang een notificatie wanneer er een nieuw fonds is aangemaakt.'
                },
                product_reserved: {
                    title: 'Product of dienst gereserveerd',
                    description: 'Ontvang een notificatie wanneer een product of dienst is gereserveerd.',
                },
                product_sold_out: {
                    title: 'Aanbod uitverkocht',
                    description: 'Ontvang een notificatie wanneer een product of dienst is uitverkocht.'
                },
                provider_applied: {
                    title: 'Aanmelding aanbieder',
                    description: 'Ontvang een notificatie wanneer een aanbieder zich heeft aangemeld voor een fonds.'
                },
                provider_approved: {
                    title: 'Aanmelding aanbieder geaccepteerd',
                    description: 'Ontvang een notificatie wanneer een aanbieder voor een fonds is geaccepteerd.'
                },
                provider_rejected: {
                    title: 'Aanmelding aanbieder afgewezen',
                    description: 'Ontvang een notificatie wanneer een aanbieder voor een fonds is afgewezen.'
                },
            },
            validations: {
                new_validation_request: {
                    title: 'Nieuw aanvraag',
                    description: 'Ontvang een notificatie wanneer er een nieuwe aanvraag is gedaan.'
                },
                you_added_as_validator: {
                    title: 'Toegevoegd als beoordelaar',
                    description: 'Ontvang een notificatie wanneer u als beoordelaar aan een fonds bent toegevoegd.'
                }
            },
            vouchers: {
                payment_success: {
                    title: 'Betaling gelukt',
                    description: 'Ontvang een notificatie wanneer een betaling is gelukt.'
                },
                send_voucher: {
                    title: 'Stuur een tegoed naar uzelf',
                    description: 'Ontvang een notificatie wanneer u een tegoed naar uzelf verstuurt.'
                },
                share_product: {
                    title: 'Reservering gedeeld',
                    description: 'Ontvang een notificatie wanneer er een reservering van een product of dienst met u is gedeeld.'
                }
            },
            employee: {
                created: {
                    title: 'Toegevoegd als medewerker',
                    description: 'Ontvang een push notificatie wanneer u bent toegevoegd als medewerker aan een organisatie.',
                },
                deleted: {
                    title: 'Verwijderd als medewerker',
                    description: 'Ontvang een push notificatie wanneer u bent verwijderd als medewerker aan een organisatie.',
                }
            },
            bunq: {
                transaction_success: {
                    title: 'Uitbetaling gelukt',
                    description: 'Ontvang een notificatie van elke uitbetaling die gelukt is.',
                }
            }
        }

    }
}
