export function numberFormatter(number: number, options: any) {
    options || (options = {});
    var places = typeof options.places === 'undefined' ? 1 : options.places;
    var neg_paren = options.negative_paren || false;
    var prefix = options.prefix || '';
    var suffix = options.suffix || '';

    if (typeof number === 'undefined' || number === null || isNaN(number)) {
        return '-';
    }

    var num_format = function (num: number) {
        var mul = Math.pow(10, places);
        var rounded: any = Math.round(num * mul) / mul;
        if (options.decimal) {
            rounded = rounded.toString();
            var dotpos = rounded.indexOf('.');
            if (dotpos < 0) {
                rounded += '.';
                dotpos = rounded.length - 1;
            }

            var remaining = places - (rounded.length - 1 - dotpos);
            for (var i = 0; i < remaining; i++) {
                rounded += '0';
            }
        }
        return rounded;
    };

    var formatted = null;
    if (!options.skip_condense) {
        var absnumber = Math.abs(number);
        if (absnumber < 1000) {
            formatted = num_format(number) + '';
        } else if (absnumber < 1000000) {
            formatted = num_format(number / 1000) + 'K';
        } else if (absnumber < 1000000000) {
            formatted = num_format(number / 1000000) + 'M';
        } else if (absnumber < 1000000000000) {
            formatted = num_format(number / 1000000000) + 'B';
        } else {
            formatted = number + '';
        }
    } else {
        formatted = num_format(number) + '';
    }

    // JL NOTE ~ useful to still allow `places = 1` for numbers >= 1000
    if (formatted.endsWith('.0')) {
        formatted = formatted.replace('.0', '');
    }

    if (neg_paren && number < 0) {
        formatted = '(' + formatted.replace(/^-/, '') + ')';
    }
    if (prefix) {
        formatted = prefix + formatted;
    }
    if (suffix) {
        formatted += suffix;
    }
    return formatted;
}
