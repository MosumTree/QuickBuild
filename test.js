import 'element-closest';
import objectAssign from 'object-assign';
import $ from 'balajs';

function _detect(ua){
    let os = this.os = {}, android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    if (android) {
        os.android = true;
        os.version = android[2];
    }
    else{
        os.android = false;
    }
}

_detect.call($, navigator.userAgent);
console.log($.os)