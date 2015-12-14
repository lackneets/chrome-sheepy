(function($){

  function str_repeat(str, times) {
    if(times <= 0 || typeof times != 'number') return "";
    else return str + str_repeat(str, times-1);
  }

  function resolvePath(href){
    if(href.indexOf('../') == 0){ console.log('---');console.log(href);console.log(basepath);console.log(basepath.replace(/[^\/]+\/?$/, ''));console.log(href.replace('../', ''));}
    return  
      (href.indexOf('http://') == 0 || href.indexOf('https://') == 0) ? href :
      (href.indexOf('/') == 0) ? rootpath + href :
      (href.indexOf('./') == 0) ? basepath + href.replace('./') :
      (href.indexOf('../../../') == 0) ? basepath.replace(/[^\/]+\/?$/, '').replace(/[^\/]+\/?$/, '').replace(/[^\/]+\/?$/, '') + href.replace('../../../', '') :
      (href.indexOf('../../') == 0) ? basepath.replace(/[^\/]+\/?$/, '').replace(/[^\/]+\/?$/, '') + href.replace('../../', ''):
      (href.indexOf('../') == 0) ? basepath.replace(/[^\/]+\/?$/, '') + href.replace('../', '') : basepath + href;
  }

  function validFilename(input){
    return String(input).replace(/[\:\/\\\<\>\?\:\"\*\|]/g, '_');
  }

  function download(filename, text) {
    var pom = document.createElement('a');
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    pom.setAttribute('download', filename);
    pom.click();
  }

  $.fn.outerHTML = function(s) {
    return (s) ? this.before(s).remove() : jQuery("<p/>").append(this.eq(0).clone()).html();
  };

  function Sheepy(html){
    var basepath = location.protocol + '//' + (location.host + location.pathname).replace(/\/[^\/]+$/, '') ;
    var rootpath = location.protocol + '//' + location.host;

    var output = $('<html/>');
    output.append($("<base>").attr('href', basepath));

    var bodyClone = $('html').clone();

    this.effect();

    // Remove some known extension elements
    bodyClone.find('#window-resizer-tooltip').remove();
    bodyClone.find('.sheepy-scaner').remove();

    // Remove Scripts
    bodyClone.find('script').remove();

    // Fix links
    bodyClone.find('a[href]').attr('target', '_blank');
    bodyClone.find('*[href]').attr('href', function(i, href){
      return  resolvePath(href);
    });
    bodyClone.find('*[src]').attr('src', function(i, href){
      return  resolvePath(href);
    });

    // Remove element events
    bodyClone.find('*').andSelf().each(function(){
      for(var k = this.attributes.length; k-- >0 ;){
        if(this.attributes[k].localName.indexOf('on') == 0){ 
        this.removeAttributeNode(this.attributes[k]);}
      }
    });


    output.append(bodyClone);

    var docType = '<!DOCTYPE html>';

    this.singleHTML = docType + output.html();

  }

  Sheepy.prototype.saveSingle = function(){
    var filename = validFilename(prompt('Rename this cloned page', validFilename(document.title)));
    if(filename && filename != 'null'){
      download(filename + '.html', this.singleHTML);
    }
  }

  Sheepy.prototype.effect = function(){
    var effect = $('<div class="sheepy-scaner">').appendTo('body');
    setTimeout(function(){
      effect.remove();
    }, 2000);
  }

  window.Sheepy = Sheepy;
})(jQuery);