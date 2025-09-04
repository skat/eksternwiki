    function Close() {
        window.close();
    }
    function CloseAndRefreshParent(rettelser) {
        window.returnValue = rettelser;
        var windowOpener = GetWindowOpener();
        windowOpener.document.location.href = windowOpener.document.location.href;
        window.close();
    }
    function GetWindowOpener() {
        var windowOpener;
        if (window.dialogArguments) {
            windowOpener = window.dialogArguments;
        }
        else {
            windowOpener = window.opener;
        }
        return windowOpener;
    }

    var aabneVinduer = {};
    function OpenDialog(url, winName, width, height, showScroll, resizable, menubar, status, toolbar, forceOpen, forceNonModal, vinduer) {
        win_width = width;
        win_height = height;
        win_left = (screen.width / 2) - (win_width / 2);
        win_top = (screen.height / 2) - (win_height / 2);
        if (ModalOK() && !forceNonModal) {
            var options = "dialogwidth:" + win_width + "px;dialogheight:" + win_height + "px;dialogLeft:" + win_left + ";dialogTop:" + win_top + ";resizable:no;status:no;help:no;scroll:" + showScroll;
            try {
                window.showModalDialog(url, self, options);
            } catch (e) { } // If popup blocker is set, an exception is thrown. We ignore, as most browsers inform the user.
        }
        else {
            var vindue = vinduer[winName];
            if (forceOpen || !vindue || vindue.closed) {
                var options = "width=" + win_width + ",height=" + win_height + ",Left=" + win_left + ",Top=" + win_top + ",resizable=" + resizable + ",status=" + status + ",menubar=" + menubar + ",toolbar=" + toolbar + ",help=no,scrollbars=" + showScroll;
                var rc = window.open(url, winName, options);
                vinduer[winName] = rc;
                try {
                    rc.window.focus(); // Hvis indholdet i vinduet er PDF (Acro Reader) så kan denne fejle
                } catch (e) { }
                return true;
            }
            else {
                try {
                    vindue.window.focus(); // Hvis indholdet i vinduet er PDF (Acro Reader) så kan denne fejle
                } catch (e) { }
                return false;
            }
        }
    }
    function ModalOK() {
        modal = false;
        if (navigator.appName && navigator.appName == "Microsoft Internet Explorer") {
            if (window.showModalDialog) {
                modal = true;
            }
        }
        return modal;
    }
    function lukAabneVinduer() {
        for (var vId in aabneVinduer) {
            var v = aabneVinduer[vId]
            if (v && !v.closed) {
                v.close();
            }
        }
    }
    var IE = false;
    if (document.all && document.getElementById) {
        IE = true;
        if ((navigator.userAgent).indexOf("Opera") != -1) {
            IE = false;
        }
    }
    function checkMeddelelsePrint() {  // P.g.a. fejl i IE
        var el = document.getElementById('meddelelse');
        if (el != null) {
            el.className = "meddelelse";
        }
    }
    function checkMeddelelseSkaerm() {  // P.g.a. fejl i IE
        var el = document.getElementById('meddelelse');
        if (el != null) {
            el.className = "meddelelsePrintIE";
        }
    }
    if (IE == true) {
        window.onbeforeprint = checkMeddelelseSkaerm;
        window.onafterprint = checkMeddelelsePrint;
    }
    window.onunload = lukAabneVinduer;

    function SetFocus(feltid) {
        var control = document.getElementById(feltid);
        if (control != null) {
            try {
                control.focus();
            }
            catch (er) {
            }
        }
    }

    function aabnBefordringsVindue() {
        var windowOpened = false;
        windowOpened = OpenDialog('Blank.htm', 'BefordringsBgrn', '700', '800', 'yes', 'yes', 'no', 'yes', 'no', false, true, aabneVinduer);

        if (windowOpened) {
            document.form_befordringsbrgnHandler.logning.value = 'pre';
            document.form_befordringsbrgnHandler.pnr.value = '0103897750';
            document.form_befordringsbrgnHandler.indAar.value = '2013';
            document.form_befordringsbrgnHandler.submit();
        }
    }
    function rubrik51Indsaet(val) {
        val = val.replace(/\./g, '');
        if (typeof (VisFeltOgGruppe) == 'function') {
            VisFeltOgGruppe('417');
        }
        var rubrik51 = document.getElementById('tbAFYfnr417');
        rubrik51.value = val;
        rubrik51.focus();
        document.form_befordringsbrgnHandler.logning.value = 'post';
        document.form_befordringsbrgnHandler.rubrik51.value = val;
        document.form_befordringsbrgnHandler.submit();
    }
