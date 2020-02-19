exports.config = {
    //seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['testcase_1.js'],

    //seleniumServerJar: './node_modules/selenium/lib/runner/selenium-server-standalone-2.20.0.jar',

    capabilities: {
        'browserstack.user': 'sjoerdhilhorst1',
        'browserstack.key': 'AZgvLqjzR78nsGTF3Av7',
        'browserstack.local': true,
        'browserName': 'firefox',
        'name': 'Bstack-[Protractor] Local Test'
    },



    beforeLaunch: function(){

        //generate random string for email
        let r = Math.random().toString(36).substring(7);

        //fill in environment variables before testing
        var environment = {
            url : "https://berkelland.staging.forus.io",
            email : "forusemail123+".concat(r,"@gmail.com"),
            activationcode : "833983c9"
        }
        
        var MailListener = require("mail-listener2");
        

        // here goes your email connection configuration
        var mailListener = new MailListener({
            username: "forusemail123@gmail.com",
            password: "Password@123!",
            host: "imap.gmail.com",
            //requireSSL: true,
            port: 993, // imap port 
            tls: true,
            tlsOptions: { rejectUnauthorized: false },
            mailbox: "INBOX", // mailbox to monitor 
            searchFilter: ["UNSEEN"], // the search filter being used after an IDLE notification has been retrieved 
            markSeen: true, // all fetched email willbe marked as seen and not fetched next time 
            fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`, 
            mailParserOptions: {streamAttachments: true}, // options to be passed to mailParser lib. 
            attachments: true, // download attachments as they are encountered to the project directory 
            attachmentOptions: { directory: "attachments/" } // specify a download directory for attachments 
        });

        mailListener.start();

        mailListener.on("server:connected", function(){
            console.log("Mail listener initialized");
        });

        mailListener.on("error", function(err){
            console.log(err);
          });
        //url = "http://localhost:5560/#!/"
        url = "https://berkelland.staging.forus.io/";
        
        global.url = url;
        global.mailListener = mailListener;
        global.environment = environment;
    }


  };