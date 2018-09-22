exports.Render = template;

function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (memberCard) {



pug_html = pug_html + "\u003C!DOCTYPE html\u003E\u003Chtml lang=\"en\"\u003E\u003Chead\u003E\u003Cmeta charset=\"UTF-8\"\u003E\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"\u003E\u003Cmeta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\"\u003E\u003Ctitle\u003EOur game\u003C\u002Ftitle\u003E\u003Clink rel=\"stylesheet\" href=\"..\u002F..\u002Fstyles\u002Fmain.css\"\u003E\u003C\u002Fhead\u003E\u003Cbody\u003E\u003Cdiv id=\"root\"\u003E\u003Cdiv id=\"authbar\"\u003E\u003Cul class=\"auth\"\u003E\u003Cli\u003E\u003Ca class=\"authbar__auth-button\" href=\"sign_in.html\"\u003ESign In\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003Cli\u003E\u003Ca class=\"authbar__auth-button\" href=\"sign_up.html\"\u003ESign Up\u003C\u002Fa\u003E\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003Cdiv id=\"logo\"\u003E\u003Ch1\u003E\u003Ca href=\"index.html\"\u003EOur game\u003C\u002Fa\u003E\u003C\u002Fh1\u003E\u003C\u002Fdiv\u003E\u003Cdiv id=\"main-block\"\u003E\u003Cdiv class=\"main-block__form\"\u003E\u003Cul class=\"buttons\"\u003E";
// iterate locals.developers
;(function(){
  var $$obj = locals.developers;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var member = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli\u003E" + (pug_escape(null == (pug_interp = +memberCard(member)) ? "" : pug_interp)) + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var member = $$obj[pug_index0];
pug_html = pug_html + "\u003Cli\u003E" + (pug_escape(null == (pug_interp = +memberCard(member)) ? "" : pug_interp)) + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003Cp\u003E\u003C\u002Fp\u003E\u003Ch2\u003EMentor\u003C\u002Fh2\u003E\u003Cp\u003E\u003C\u002Fp\u003E\u003Cli\u003E" + (pug_escape(null == (pug_interp = +memberCard(locals.mentor)) ? "" : pug_interp)) + "\u003C\u002Fli\u003E\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";}.call(this,"memberCard" in locals_for_with?locals_for_with.memberCard:typeof memberCard!=="undefined"?memberCard:undefined));;return pug_html;}