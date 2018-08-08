(function(){
   
    console.log("running");

    var getDayFilterUriQueryString = function getDayFilterUriQueryString(date){
        const filterPattern = '?filter={"date_begin_gte":"{start_date}","date_begin_lte":"{end_date}"}&order=desc&page=1&perPage=200&sort=date_begin';
        var filter = filterPattern.replace("{end_date}", date.toISOString());
        
        date = new Date(date);
        date.setDate(date.getDate()-1);
        return filter.replace("{start_date}", date.toISOString());
    }


    var ticketsUri = "https://admin.gritspot.de/#/tickets";
    var eventsUri = "https://admin.gritspot.de/#/events";
    var date = new Date()
    date.setUTCHours(0,0,0,0);
    date.setDate(date.getDate()+1);
    document.getElementById("ticketsToday").href = ticketsUri + getDayFilterUriQueryString(date);
    document.getElementById("eventsToday").href = eventsUri + getDayFilterUriQueryString(date);

    date.setDate(date.getDate()-1);
    document.getElementById("ticketsYesterday").href = ticketsUri + getDayFilterUriQueryString(date);
    document.getElementById("eventsYesterday").href = eventsUri + getDayFilterUriQueryString(date);

    date.setDate(date.getDate()-1);
    document.getElementById("ticketsDayBeforeYesterday").href = ticketsUri + getDayFilterUriQueryString(date);
    document.getElementById("eventsDayBeforeYesterday").href = eventsUri + getDayFilterUriQueryString(date);
})();