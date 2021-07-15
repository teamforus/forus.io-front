module.exports = {
    // VOUCHER = voucher.pug
        header: {
            title: "Uw tegoed",
        },
        buttons: {
            send: "E-mail naar mij",
            details: "Bekijk details",
        },
        labels: {
            transactions: "Uitgaven",
            subtract: "Af",
            fund: "Fonds",
            expire: "Geldig tot en met:",
            requirements: "Voor voorwaarden van dit aanbod neem contact op met de aanbieder.",
            info: "<span style='font-style: italic;'>Zoek je een aanbieder die niet op de kaart staat? Je kunt een aanbieder vragen om deel te nemen. Een aanbieder kan zich het hele jaar door aanmelden.</span>",
            offices: "Aanbieders",
            voucher: "Print uw tegoed uit of mail hem naar uzelf toe. Ga met de QR-code naar de aanbieder en laat hem scannen.",
            office: "Locaties waar u deze reservering kan verzilveren.",
            shopdetail: "Informatie over de aanbieder",
            productdetail: "Informatie over het aanbod",
            offers: "Wilt u graag informatie over het volledige aanbod? Neem dan contact op met de aanbieder.",
        },
        voucher_card: {
            header: {
                title: "Hoe werkt het?",
            },
            labels: {
                description: "Neem de QR-code mee naar de aanbieder. De aanbieder scant de QR-code en levert het aanbod.",  
                contact_sponsor: "Vragen? Neem contact met ons op.",
                contact_provider: "Heeft u vragen over dit aanbod? Neem dan contact met ons op.",
            },
            footer: {
                actions: {
                    mail: "E-mail naar mij",
                    print: "Print",
                    share: "Deel met aanbieder",
                    open_in_me: 'Open in app',
                    physical_card_use: 'Plastic pas'
                },
                tooltips: {
                    mail: "E-mail het tegoed naar uzelf",
                    print: "Print het tegoed uit",
                    share: "Deel het tegoed met de aanbieder",
                    open_in_me: 'Me'
                }
            },
            qrcode: {
                description: "Dit is uw     {{fund_name}} tegoed met een QR-code.",
                productdescription: "Dit is uw reservering met een QR-code."
            },
            expire: "Geldig tot en met:",
            delete: "Annuleer reservering",
            expired: "Verlopen"
        },
        physical_card: {
            title: 'Activeer mijn pas',
            buttons: {
                reactivate: 'Activeer',
                lost_pass: 'Ik ben mijn pas kwijt'
            }
        },
        share_voucher: {
            popup_form: {
                title: 'Let op! Stuur een bericht naar de aanbieder voordat u de QR-code deelt.',
                description: 'U kunt uw reservering met de aanbieder delen om koop op afstand mogelijk te maken. Als het aanbod een activiteit of dienst betreft: typ in het onderstaande veld extra informatie die de aanbieder vereist voor deelname, zoals: uw naam en telefoonnummer.'
            },
            reason_placeholder: 'Bericht voor aanbieder',
            buttons: {
                submit: 'Versturen',
                confirm: 'Sluit'
            },
            popup_sent: {
                title: 'Uw reservering is verstuurd naar de aanbieder.',
                description: 'De aanbieder heeft de reservering en uw bericht ontvangen. Neem contact op met de aanbieder of ga bij de aanbieder langs om het aanbod af te nemen.'
            },
            labels: {
                send_copy: "Stuur e-mail als bewijs ook naar uzelf"
            }
        },
        delete_voucher: {
            popup_form: {
                title: 'Wilt u uw reservering voor aankoop annuleren?',
                description: 'U kunt uw reservering annuleren om af te zien van de aankoop. Wanneer u deze aankoop niet wenst te annuleren klikt u op "sluit".'
            },
            buttons: {
                submit: 'Bevestig',
                close: 'Sluit'
            },
        }
}