var	primes = [2],
	isPrime,
	sqrtceil,
	wells,
	K=0,
	wellDepths=[],
	soundSpeed = 34376, // mm/s in air at 20 degrees celsius, 50% humidity
	designFrequency=600,
	deepestWell,
	units='mm', // or 'inch'
	finWidth = 5;	// mm
var	designDepth = soundSpeed / designFrequency / 2,
	backDepth = 5, // mm
	buildDepth = designDepth + backDepth,
	divprimes = $('#primes');

for (var i=3; i<=101; i+=2){
    isPrime = true;
    sqrtceil = Math.ceil(Math.sqrt(i));
    for (var j = 0; primes[j]<sqrtceil; j++){
        if (i%primes[j]==0){
            isPrime=false;
            break;
        }
    }
    if(isPrime){
	primes.push(i);
	divprimes.append('<div class="prime">'+i+'</div>');
    }
}

// initialize well count
wells = parseInt($('.prime:nth-child(3)').addClass('selected').html());

$('.prime').click(function(e){
	$('.prime').removeClass('selected');
	wells = parseInt($(this).addClass('selected').html());
	recalculate();
});

function recalculate() {
	wellDepths = [];

	var visual = $('#visual');
	// clear wells
	visual.css('height', buildDepth * 5 /*mm to px constant*/);
	$('.well').remove();

	var depth;
	// http://www.mh-audio.nl/downloads/pdf/BBC_Diffusor_1990-15.pdf
	for (var well=0; well<wells; well++){
		//depth = (Math.pow(2, well) + K) % wells; // Primitive Root Diffuser
		depth = (well*well + K) % wells; // Quadratic Residue Diffuser
		wellDepths.push(depth)
		visual.append('<div class="well w'+well+'"><span class="num">'+well+'</span><span class="depth">'+Math.round(designDepth*depth/wells)+'mm</span></div>');
		$('.w'+well).css('height',(100*depth/wells)+'%');
	}
	console.log('well depths:', wellDepths);
}
recalculate();

