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
        var filterZeros = document.getElementById("filterZeros").checked;
        console.log(filterZeros);
        var data = null;
        try {
            data = JSON.parse(value);    
        } catch (error) {
            console.log("not a json");
            return;
        }

        

        var tmin = Number.MAX_VALUE;
        var tmax = Number.MIN_VALUE;

        const delim = '\t';
        var header = "time";
        var readings = {};
        data = data.data;
        for (var i = 0; i < data.length; i++) {
            const arr = data[i].hr_measurement.data;
            if(arr.length == 0){
                continue;
            }
            header += delim + data[i].id;
            
            tmin = Math.min(tmin, Math.round(new Date(arr[0].time) / 1000));
            tmax = Math.max(tmax, Math.round(new Date(arr[arr.length - 1].time) / 1000));
            
            const stamps = {};
            for(var k = 0; k < arr.length; k++){
                var stamp = (Math.round(new Date(arr[k].time) / 1000));
                stamps[stamp] = {rate: arr[k].rate, dataJam: stamps[stamp] ? true : false, stamp: stamp };
            }
            readings[data[i].id] = stamps;
        }

        var result = header;
        for(var t = tmin; t < tmax; t++){
            var expectedTime = new Date(t * 1000);
            var line = formatTime(expectedTime);
            for (const key in readings) {
                if (!readings.hasOwnProperty(key)) {
                    continue;
                }
                var reading = readings[key][t];
                var rate = "";
                if(reading !== undefined){
                    rate = reading.rate;
                    if(filterZeros && rate == 0){
                        rate = "";
                    }
                }

                line += delim + rate;
            }
            result += "\r\n" + line;
        }

        console.log(result);
        output.innerHTML = result;
    }
    
    input.addEventListener("change", onInputChanged);

})();