(function(){
    console.log("running");
    var input = document.getElementById("input");
    var output = document.getElementById("output");

    var onInputChanged = function onInputChanged(ev){
        var value = ev.currentTarget.value;
        var data = null;
        try {
            data = JSON.parse(value);    
        } catch (error) {
            console.log("not a json");
            return;
        }

        data = data.data.result.hr_measurement.data;

        var length = data.length;


        var now = null;
        var result = ""; 


        
        
        
        var dict = {};
        for(var i = 0; i < data.length; i++){
            var stamp =  (Math.round(new Date(data[i].time) / 1000) * 1000);
            dict[stamp] = {rate: data[i].rate, dataJam: dict[stamp] ? true : false, date: new Date(stamp) };

        }

        var ts = Math.round(new Date(data[0].time) / 1000);
        var te = Math.round(new Date(data[data.length - 1].time) / 1000);
        var tdiff = te - ts;

        var expectedTime = new Date(ts * 1000);
        for(var i = 0; i < tdiff; i++){
            var reading = dict[expectedTime * 1];
            var line = expectedTime.getHours() + "\t" + expectedTime.getMinutes() + '\t' + expectedTime.getSeconds() + '\t' 
                + (reading ? reading.rate : "");
                //+ '\t' + (reading ? reading.dataJam : false);
            
            result += line + '\r\n';
            expectedTime = new Date(expectedTime * 1 + 1000); //always increment expected time;

        }
        console.log(result);
        output.innerHTML = result;
    }
    
    input.addEventListener("change", onInputChanged);

})();