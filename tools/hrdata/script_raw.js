(function(){
    console.log("running");
    var input = document.getElementById("input");
    var output = document.getElementById("output");

    var formatTime = function formatTim(time){
        return ("00" + time.getHours()).substr(-2,2) 
            + ":" + ("00" + time.getMinutes()).substr(-2,2) + ':' 
            + ("00" + time.getSeconds()).substr(-2,2); 
            
    };
    var onInputChanged = function onInputChanged(ev){
        var value = ev.currentTarget.value;
        var data = null;
        try {
            data = JSON.parse(value);    
        } catch (error) {
            console.log("not a json");
            return;
        }

        data = data.measurements.byId;

        var tmin = Number.MAX_VALUE;
        var tmax = Number.MIN_VALUE;

        const delim = '\t';
        var header = "time";
        var readings = {};
        for (const key in data) {
            if (!data.hasOwnProperty(key)) {
                continue;
            }
            const arr = data[key].readings;
            if(arr.length == 0){
                continue;
            }

            header += delim + key;
            
            tmin = Math.min(tmin, Math.round(new Date(arr[0].time) / 1000));
            tmax = Math.max(tmax, Math.round(new Date(arr[arr.length - 1].time) / 1000));
            
            const stamps = {};
            for(var i = 0; i < arr.length; i++){
                var stamp = (Math.round(new Date(arr[i].time) / 1000));
                stamps[stamp] = {rate: arr[i].rate, dataJam: stamps[stamp] ? true : false, stamp: stamp };
            }
            readings[key] = stamps;
        }

        var result = header;
        for(var t = tmin; t < tmax; t++){
            var expectedTime = new Date(t * 1000);
            var line = formatTime(expectedTime);
            for (const key in readings) {
                if (!readings.hasOwnProperty(key)) {
                    continue;
                }
                const reading = readings[key][t]; 
                line += delim + (reading !== undefined ? reading.rate : "");
            }
            result += "\r\n" + line;
        }

        console.log(result);
        output.innerHTML = result;
    }
    
    input.addEventListener("change", onInputChanged);

})();