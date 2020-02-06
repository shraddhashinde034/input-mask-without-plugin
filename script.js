$(document).ready(function () {
    var newTEST;
    var fired = false;

    $("#input_box").keydown(function (event) {
        var newPos = doGetCaretPosition(this);
        var value = String.fromCharCode(event.keyCode);
        if (!fired) {
            fired = true;
        } else if (event.keyCode == 8) { // 8 is the keyCode for backspace
            event.preventDefault();
        }
        if (event.shiftKey && ((event.keyCode >= 48 && event.keyCode <= 57) ||
                (event.keyCode >= 186 && event.keyCode <= 222))) {
            // Ensure that it is a number and stop the Special chars
            event.preventDefault();
        } else if ((event.shiftKey || event.ctrlKey) && (event.keyCode > 34 && event.keyCode < 40)) {
            // let it happen, don't do anything
        } else {
            // Allow only backspace , delete, numbers               
            if (event.keyCode == 9 || event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 39 || event.keyCode == 37 ||
                (event.keyCode >= 48 && event.keyCode <= 57)) {
                // let it happen, don't do anything
            } else {
                // Ensure that it is a number and stop the key press
                event.preventDefault();
            }
        }
    });

    $("#input_box").keyup(function (e) {
        fired = false;
        var newPos = doGetCaretPosition(this);

        if (e.keyCode == 8 || e.keyCode == 46) {
            var get_newBg = $('#newBg').val();
            newTEST = get_newBg.replaceAt(newPos, '−');
            $('#newBg').val(newTEST);
            $(this).val(newTEST);
            // console.log("inback" + newTEST);
            setCaretToPos(document.getElementById("input_box"), newPos);
        }
    });

    $('#input_box').on('keypress', function (e) {
        var newPos = doGetCaretPosition(this);
        var get_newBg = $('#newBg').val();
        if ($(this).val().length < 10) {
            var this_val = $(this).val();
            newTEST = get_newBg.replaceAt(newPos, String.fromCharCode(e.keyCode));
            $('#newBg').val(newTEST);
            // console.log("inkeypressval" + newTEST);
        } else {
            if (newPos < 10) {
                {
                    newTEST = get_newBg.replaceAt(newPos, String.fromCharCode(e.keyCode));
                    $(this).val(newTEST);
                    $('#newBg').val(newTEST);
                    // console.log("incursor" + newTEST);
                    setCaretToPos(document.getElementById("input_box"), newPos + 1);
                }
            }
        }

    });

    $('#input_box').on("cut copy paste", function (e) {
        e.preventDefault();
    });

    String.prototype.replaceAt = function (index, replacement) {
        return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    }

    function setSelectionRange(input, selectionStart, selectionEnd) {
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(selectionStart, selectionEnd);
        } else if (input.createTextRange) {
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', selectionEnd);
            range.moveStart('character', selectionStart);
            range.select();
        }
    }

    function setCaretToPos(input, pos) {
        setSelectionRange(input, pos, pos);
    }

    function setSelectionRange(input, selectionStart, selectionEnd) {
        if (input.setSelectionRange) {
            input.focus();
            input.setSelectionRange(selectionStart, selectionEnd);
        } else if (input.createTextRange) {
            var range = input.createTextRange();
            range.collapse(true);
            range.moveEnd('character', selectionEnd);
            range.moveStart('character', selectionStart);
            range.select();
        }
    }

    function setCaretToPos(input, pos) {
        setSelectionRange(input, pos, pos);
    }
    // current caret postion

    function doGetCaretPosition(oField) {
        // Initialize
        var iCaretPos = 0;
        // IE Support
        if (document.selection) {
            // Set focus on the element
            oField.focus();
            // To get cursor position, get empty selection range
            var oSel = document.selection.createRange();
            // Move selection start to 0 position
            oSel.moveStart('character', -oField.value.length);
            // The caret position is selection length
            iCaretPos = oSel.text.length;
        }

        // Firefox support
        else if (oField.selectionStart || oField.selectionStart == '0')
            iCaretPos = oField.selectionDirection == 'backward' ? oField.selectionStart : oField.selectionEnd;
        // Return results
        return iCaretPos;
    }

});