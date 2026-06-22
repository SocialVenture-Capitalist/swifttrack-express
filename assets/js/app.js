const TRACKING_NUMBER = '7543698412';

function trackShipment() {
    const input = document.getElementById('trackingInput').value.trim().replace(/\s+/g, '');
    const result = document.getElementById('trackingResult');

    if (!input) {
        result.classList.remove('active');
        showNotification('Please enter TTN number', 'error');
        return;
    }

    if (input !== TRACKING_NUMBER) {
        result.classList.remove('active');
        showNotification('Shipment not found for this TTN', 'error');
        return;
    }

    document.getElementById('resultTrackingNum').textContent = TRACKING_NUMBER;
    result.classList.add('active');
    result.scrollIntoView({ behavior: 'smooth' });
    showNotification('Shipment 7543698412 is in transit from London to Bengaluru');
}

const CITY_DATA = {
    london: { country: 'uk', zone: 'uk' },
    manchester: { country: 'uk', zone: 'uk' },
    birmingham: { country: 'uk', zone: 'uk' },
    glasgow: { country: 'uk', zone: 'uk' },
    bengaluru: { country: 'india', zone: 'south' },
    mumbai: { country: 'india', zone: 'west' },
    delhi: { country: 'india', zone: 'north' },
    chennai: { country: 'india', zone: 'south' },
    kolkata: { country: 'india', zone: 'east' },
    hyderabad: { country: 'india', zone: 'south' },
    pune: { country: 'india', zone: 'west' },
    ahmedabad: { country: 'india', zone: 'west' },
    jaipur: { country: 'india', zone: 'north' },
    lucknow: { country: 'india', zone: 'north' },
    kochi: { country: 'india', zone: 'south' },
    goa: { country: 'india', zone: 'west' },
    surat: { country: 'india', zone: 'west' },
    chandigarh: { country: 'india', zone: 'north' },
    indore: { country: 'india', zone: 'central' },
    nagpur: { country: 'india', zone: 'central' },
    dubai: { country: 'uae', zone: 'middle-east' },
    singapore: { country: 'singapore', zone: 'asia' },
    bangkok: { country: 'thailand', zone: 'asia' },
    'kuala-lumpur': { country: 'malaysia', zone: 'asia' },
    'new-york': { country: 'usa', zone: 'north-america' },
    toronto: { country: 'canada', zone: 'north-america' },
    sydney: { country: 'australia', zone: 'oceania' }
};

const SERVICE_LEVELS = {
    express: {
        multiplier: 2.5,
        domestic: '1-2 business days',
        regional: '2-4 business days',
        ukIndia: '3-5 business days',
        international: '4-7 business days'
    },
    standard: {
        multiplier: 1.5,
        domestic: '3-5 business days',
        regional: '4-7 business days',
        ukIndia: '6-9 business days',
        international: '7-12 business days'
    },
    economy: {
        multiplier: 1,
        domestic: '5-7 business days',
        regional: '7-10 business days',
        ukIndia: '10-14 business days',
        international: '12-18 business days'
    }
};

function getRouteRate(originCity, destinationCity) {
    const sameCountry = originCity.country === destinationCity.country;
    const ukIndiaRoute = [originCity.country, destinationCity.country].includes('uk')
        && [originCity.country, destinationCity.country].includes('india');
    const sameRegion = originCity.zone === destinationCity.zone;

    if (sameCountry && originCity.country === 'india') {
        return {
            baseRate: sameRegion ? 60 : 90,
            perKg: sameRegion ? 32 : 45,
            deliveryKey: 'domestic'
        };
    }

    if (sameCountry && originCity.country === 'uk') {
        return {
            baseRate: 420,
            perKg: 120,
            deliveryKey: 'domestic'
        };
    }

    if (ukIndiaRoute) {
        return {
            baseRate: 1800,
            perKg: 420,
            deliveryKey: 'ukIndia'
        };
    }

    if (originCity.zone === destinationCity.zone || ['asia', 'middle-east'].includes(originCity.zone) && ['asia', 'middle-east'].includes(destinationCity.zone)) {
        return {
            baseRate: 1200,
            perKg: 300,
            deliveryKey: 'regional'
        };
    }

    return {
        baseRate: 2400,
        perKg: 550,
        deliveryKey: 'international'
    };
}

function calculateShipping() {
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const service = document.getElementById('serviceType').value;

    if (!origin || !destination || !weight) {
        showNotification('Please fill all fields', 'error');
        return;
    }

    if (origin === destination) {
        showNotification('Origin and destination cannot be the same', 'error');
        return;
    }

    const originCity = CITY_DATA[origin];
    const destinationCity = CITY_DATA[destination];
    const rate = getRouteRate(originCity, destinationCity);
    const serviceLevel = SERVICE_LEVELS[service];
    const cost = Math.round((rate.baseRate + (weight * rate.perKg)) * serviceLevel.multiplier);

    document.getElementById('costValue').textContent = cost.toLocaleString('en-IN');
    document.getElementById('deliveryTime').textContent = serviceLevel[rate.deliveryKey];
    document.getElementById('calcResult').classList.add('show');
    showNotification('Shipping cost calculated!');
}

        function showNotification(text, type = 'success') {
            const notif = document.getElementById('notification');
            const notifText = document.getElementById('notifText');
            notifText.textContent = text;

            if (type === 'error') {
                notif.style.background = '#dc3545';
            } else {
                notif.style.background = '#ba0c2f';
            }

            notif.classList.add('show');
            setTimeout(() => {
                notif.classList.remove('show');
            }, 3000);
        }

// Smooth scroll for real page-section links.
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') {
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
