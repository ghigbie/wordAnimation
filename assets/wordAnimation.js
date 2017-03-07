var solution = [81, 50, 57, 117, 90, 51, 74, 104, 100, 72, 86, 115, 89, 88, 82, 112, 98, 50, 53, 122, 73, 81, 61, 61],
    header,
    section,
    c = function(input) { 
    	return atob(input.reduce(function(a,b) { 
    		return a + String.fromCharCode(b); },"")); },
    i = 0,
    j = 0,
    charCounts = {},
    started = 0,
    ended = 0,
    x, y, s;

$(function() {
    // we're gonna use these a lot
    header = $('header');
    section = $('section');

    // compute correct counts (ignoring solution)
    section.text().split('').forEach(function(c) {
        c = c.toLowerCase();
        charCounts[c] = (charCounts[c] + 1) || 1;
    });

    // decode solution
    solution = c(solution);

    // correct counts with solution
    solution.split('').forEach(function(c) {
        c = c.toLowerCase();
        charCounts[c]--;
    });
// *****************************************
    //George added this
    var congrats = "Congradulations!";
    var congratsArray = congrats.split("");
    console.log(congratsArray);
// *****************************************

    var f = function() {

        // test if we're finished
        if(i < section.html().length)
        {
            // what is the next character in the input?
            y = section.html()[i];
            s = null;

            var floater = $("<span>" + y + "</span>"),
                isTop = y === congratsArray[j]; //<-----George changed this to the congrats array

            // move the character to the top or the bottom
            if(isTop)
            {
                if(!j) header.html('');

                header.append("&nbsp;"); // make room for the new character
                j++; // increment the solution counter
            }
            else if(y.match(/[A-Za-z]/)) // we're going to count all the alpha characters
            {
                y = y.toLowerCase(); // ignore the case when counting
                s = $("#" + y + " .count"); // get the element that contains the count

                if(!s.length) // create it if it doesnt exist
                {
                    $("footer").append("<div id='" + y + "'><div>" + y + "</div><div class='count'>0</div></div>");
                    s = $("#" + y + " .count");
                }
            }

            // if we have an animating character, do the animation
            if(isTop || s)
            {
                // add a marking element for the start position of the animation
                section.html(section.html().substr(0,i) + "<span id='start" + i + "'>" + (y.match(/([^A-Za-z])|./)[1] || "_") + "</span>" + section.html().substr(i+1));

                var start = $("#start" + i);
                var rect = start[0].getBoundingClientRect(); // get the px position of the start element
                floater.css("top", rect.top + "px")
                    .css("left", rect.left + "px");
                $(".floaters").append(floater); // add an element to be the moving character
                start.prop("outerHTML", start.text()); // remove the start element now that we have the position

                // started another animation
                started++;

                // find the end position for the animation
                if(isTop)
                    rect = header[0].getBoundingClientRect();
                else
                    rect = $("#" + y + " div:first-child")[0].getBoundingClientRect();

                // set the new position and let css transitions do the rest
                floater.css("top", rect.top + "px")
                    .css("left", (isTop ? rect.right : rect.left) + "px")

                // adjust the styles to match the end result
                // ???

                // remove the floating character when the transition ends
                setTimeout(function() { 
                    floater.remove();

                    if(isTop)
                    {
                        // replace the &nbsp; with the right character
                        var arr = header.text().split('');
                        arr[j] = y;
                        header.html(header.html().substr(0, header.html().length - 1) + y);
                    }
                    else
                    {
                        // increment the count and redraw the bar with a new height
                        s.html(+s.html() + 1)
                            .css("height", s.html() + "px");
                    }

                    // finished another animation
                    ended++;

                    if(started === ended)
                    {
                        finalChecks();
                    }
                }, 1000);
            }

            i++;

            setTimeout(f, 10);
        }
    };

    var finalChecks = function() {

        console.log("<header> text === solution", header.text(), solution, header.text() === solution);
        console.log("No extra elements?", !$(".floaters").children().length && !section.children().length);
        console.group("Correct character counts?");
        $('footer .count').each(function(i, e) {
            e = $(e);
            console.log(e.parent().attr('id'), +e.text(), charCounts[e.parent().attr('id')], +e.text() === charCounts[e.parent().attr('id')]);
        });
        console.groupEnd();
    };

    f();
});