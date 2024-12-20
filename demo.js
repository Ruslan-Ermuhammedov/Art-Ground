// by @nodws
// Jquery not required, see below

// NodQuery - vanilla js
// https://github.com/Nodws/NodQuery
var $ = function(c){
    se = c;
    return document.querySelector(c);
}
Element.prototype.addClass = function(c){
        var array = c.split(' ');
        var el = this;
        array.forEach(function(i){
          el.classList.add(i); });
}	
Element.prototype.removeClass = function(c){
      this.classList.remove(c);
}
Element.prototype.on = function(h,f){
    return this.addEventListener(h,f);
}

var d = $('#somedialog');
$('.open').on('click',function(e){
e.preventDefault();
d.removeClass('dialog-close');
d.addClass('dialog-open');
});
$('.dialog-overlay').on('click',function(e){
e.preventDefault();
d.removeClass('dialog-open');
d.addClass('dialog-close');
});
$('.btn-cta').on('click',function(e){
e.preventDefault();
$('.dialog-content').innerHTML='<i>Thank you for your honesty!';
setTimeout(()=>{ 
d.removeClass('dialog-open');
d.addClass('dialog-close');},800);
});