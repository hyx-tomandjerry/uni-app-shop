var __wxAppData = {};
var __wxRoute;
var __wxRouteBegin;
var __wxAppCode__ = {};
var global = {};
var __wxAppCurrentFile__;
if(typeof __WXML_GLOBAL__ !== 'undefined'){
  delete __WXML_GLOBAL__.ops_cached//remove ops_cached(v8 下会有 cache)
}
// var Component = Component || function() {};
// var definePlugin = definePlugin || function() {};
// var requirePlugin = requirePlugin || function() {};
// var Behavior = Behavior || function() {};
var $gwx;
  
/*v0.5vv_20190312_syb_scopedata*/global.__wcc_version__='v0.5vv_20190312_syb_scopedata';global.__wcc_version_info__={"customComponents":true,"fixZeroRpx":true,"propValueDeepCopy":false};
var $gwxc
var $gaic={}
$gwx=function(path,global){
if(typeof global === 'undefined') global={};if(typeof __WXML_GLOBAL__ === 'undefined') {__WXML_GLOBAL__={};
}__WXML_GLOBAL__.modules = __WXML_GLOBAL__.modules || {};
function _(a,b){if(typeof(b)!='undefined')a.children.push(b);}
function _v(k){if(typeof(k)!='undefined')return {tag:'virtual','wxKey':k,children:[]};return {tag:'virtual',children:[]};}
function _n(tag){$gwxc++;if($gwxc>=16000){throw 'Dom limit exceeded, please check if there\'s any mistake you\'ve made.'};return {tag:'wx-'+tag,attr:{},children:[],n:[],raw:{},generics:{}}}
function _p(a,b){b&&a.properities.push(b);}
function _s(scope,env,key){return typeof(scope[key])!='undefined'?scope[key]:env[key]}
function _wp(m){console.warn("WXMLRT_$gwx:"+m)}
function _wl(tname,prefix){_wp(prefix+':-1:-1:-1: Template `' + tname + '` is being called recursively, will be stop.')}
$gwn=console.warn;
$gwl=console.log;
function $gwh()
{
function x()
{
}
x.prototype = 
{
hn: function( obj, all )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any1=false,any2=false;
for(var x in obj)
{
any1=any1|x==='__value__';
any2=any2|x==='__wxspec__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any1 && any2 && ( all || obj.__wxspec__ !== 'm' || this.hn(obj.__value__) === 'h' ) ? "h" : "n";
}
return "n";
},
nh: function( obj, special )
{
return { __value__: obj, __wxspec__: special ? special : true }
},
rv: function( obj )
{
return this.hn(obj,true)==='n'?obj:this.rv(obj.__value__);
},
hm: function( obj )
{
if( typeof(obj) == 'object' )
{
var cnt=0;
var any1=false,any2=false;
for(var x in obj)
{
any1=any1|x==='__value__';
any2=any2|x==='__wxspec__';
cnt++;
if(cnt>2)break;
}
return cnt == 2 && any1 && any2 && (obj.__wxspec__ === 'm' || this.hm(obj.__value__) );
}
return false;
}
}
return new x;
}
wh=$gwh();
function $gstack(s){
var tmp=s.split('\n '+' '+' '+' ');
for(var i=0;i<tmp.length;++i){
if(0==i) continue;
if(")"===tmp[i][tmp[i].length-1])
tmp[i]=tmp[i].replace(/\s\(.*\)$/,"");
else
tmp[i]="at anonymous function";
}
return tmp.join('\n '+' '+' '+' ');
}
function $gwrt( should_pass_type_info )
{
function ArithmeticEv( ops, e, s, g, o )
{
var _f = false;
var rop = ops[0][1];
var _a,_b,_c,_d, _aa, _bb;
switch( rop )
{
case '?:':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o, _f ) : rev( ops[3], e, s, g, o, _f );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '&&':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? rev( ops[2], e, s, g, o, _f ) : wh.rv( _a );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '||':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && ( wh.hn(_a) === 'h' );
_d = wh.rv( _a ) ? wh.rv(_a) : rev( ops[2], e, s, g, o, _f );
_d = _c && wh.hn( _d ) === 'n' ? wh.nh( _d, 'c' ) : _d;
return _d;
break;
case '+':
case '*':
case '/':
case '%':
case '|':
case '^':
case '&':
case '===':
case '==':
case '!=':
case '!==':
case '>=':
case '<=':
case '>':
case '<':
case '<<':
case '>>':
_a = rev( ops[1], e, s, g, o, _f );
_b = rev( ops[2], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
switch( rop )
{
case '+':
_d = wh.rv( _a ) + wh.rv( _b );
break;
case '*':
_d = wh.rv( _a ) * wh.rv( _b );
break;
case '/':
_d = wh.rv( _a ) / wh.rv( _b );
break;
case '%':
_d = wh.rv( _a ) % wh.rv( _b );
break;
case '|':
_d = wh.rv( _a ) | wh.rv( _b );
break;
case '^':
_d = wh.rv( _a ) ^ wh.rv( _b );
break;
case '&':
_d = wh.rv( _a ) & wh.rv( _b );
break;
case '===':
_d = wh.rv( _a ) === wh.rv( _b );
break;
case '==':
_d = wh.rv( _a ) == wh.rv( _b );
break;
case '!=':
_d = wh.rv( _a ) != wh.rv( _b );
break;
case '!==':
_d = wh.rv( _a ) !== wh.rv( _b );
break;
case '>=':
_d = wh.rv( _a ) >= wh.rv( _b );
break;
case '<=':
_d = wh.rv( _a ) <= wh.rv( _b );
break;
case '>':
_d = wh.rv( _a ) > wh.rv( _b );
break;
case '<':
_d = wh.rv( _a ) < wh.rv( _b );
break;
case '<<':
_d = wh.rv( _a ) << wh.rv( _b );
break;
case '>>':
_d = wh.rv( _a ) >> wh.rv( _b );
break;
default:
break;
}
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '-':
_a = ops.length === 3 ? rev( ops[1], e, s, g, o, _f ) : 0;
_b = ops.length === 3 ? rev( ops[2], e, s, g, o, _f ) : rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) === 'h' || wh.hn( _b ) === 'h');
_d = _c ? wh.rv( _a ) - wh.rv( _b ) : _a - _b;
return _c ? wh.nh( _d, "c" ) : _d;
break;
case '!':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = !wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
case '~':
_a = rev( ops[1], e, s, g, o, _f );
_c = should_pass_type_info && (wh.hn( _a ) == 'h');
_d = ~wh.rv(_a);
return _c ? wh.nh( _d, "c" ) : _d;
default:
$gwn('unrecognized op' + rop );
}
}
function rev( ops, e, s, g, o, newap )
{
var op = ops[0];
var _f = false;
if ( typeof newap !== "undefined" ) o.ap = newap;
if( typeof(op)==='object' )
{
var vop=op[0];
var _a, _aa, _b, _bb, _c, _d, _s, _e, _ta, _tb, _td;
switch(vop)
{
case 2:
return ArithmeticEv(ops,e,s,g,o);
break;
case 4: 
return rev( ops[1], e, s, g, o, _f );
break;
case 5: 
switch( ops.length )
{
case 2: 
_a = rev( ops[1],e,s,g,o,_f );
return should_pass_type_info?[_a]:[wh.rv(_a)];
return [_a];
break;
case 1: 
return [];
break;
default:
_a = rev( ops[1],e,s,g,o,_f );
_b = rev( ops[2],e,s,g,o,_f );
_a.push( 
should_pass_type_info ?
_b :
wh.rv( _b )
);
return _a;
break;
}
break;
case 6:
_a = rev(ops[1],e,s,g,o);
var ap = o.ap;
_ta = wh.hn(_a)==='h';
_aa = _ta ? wh.rv(_a) : _a;
o.is_affected |= _ta;
if( should_pass_type_info )
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return _ta ? wh.nh(undefined, 'e') : undefined;
}
_b = rev(ops[2],e,s,g,o,_f);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.ap = ap;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' || 
_bb === "__proto__" || _bb === "prototype" || _bb === "caller" ) 
{
return (_ta || _tb) ? wh.nh(undefined, 'e') : undefined;
}
_d = _aa[_bb];
if ( typeof _d === 'function' && !ap ) _d = undefined;
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return (_ta || _tb) ? (_td ? _d : wh.nh(_d, 'e')) : _d;
}
else
{
if( _aa===null || typeof(_aa) === 'undefined' )
{
return undefined;
}
_b = rev(ops[2],e,s,g,o,_f);
_tb = wh.hn(_b) === 'h';
_bb = _tb ? wh.rv(_b) : _b;
o.ap = ap;
o.is_affected |= _tb;
if( _bb===null || typeof(_bb) === 'undefined' || 
_bb === "__proto__" || _bb === "prototype" || _bb === "caller" ) 
{
return undefined;
}
_d = _aa[_bb];
if ( typeof _d === 'function' && !ap ) _d = undefined;
_td = wh.hn(_d)==='h';
o.is_affected |= _td;
return _td ? wh.rv(_d) : _d;
}
case 7: 
switch(ops[1][0])
{
case 11:
o.is_affected |= wh.hn(g)==='h';
return g;
case 3:
_s = wh.rv( s );
_e = wh.rv( e );
_b = ops[1][1];
if (g && g.f && g.f.hasOwnProperty(_b) )
{
_a = g.f;
o.ap = true;
}
else
{
_a = _s && _s.hasOwnProperty(_b) ? 
s : (_e && _e.hasOwnProperty(_b) ? e : undefined );
}
if( should_pass_type_info )
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
_d = _ta && !_td ? wh.nh(_d,'e') : _d;
return _d;
}
}
else
{
if( _a )
{
_ta = wh.hn(_a) === 'h';
_aa = _ta ? wh.rv( _a ) : _a;
_d = _aa[_b];
_td = wh.hn(_d) === 'h';
o.is_affected |= _ta || _td;
return wh.rv(_d);
}
}
return undefined;
}
break;
case 8: 
_a = {};
_a[ops[1]] = rev(ops[2],e,s,g,o,_f);
return _a;
break;
case 9: 
_a = rev(ops[1],e,s,g,o,_f);
_b = rev(ops[2],e,s,g,o,_f);
function merge( _a, _b, _ow )
{
var ka, _bbk;
_ta = wh.hn(_a)==='h';
_tb = wh.hn(_b)==='h';
_aa = wh.rv(_a);
_bb = wh.rv(_b);
for(var k in _bb)
{
if ( _ow || !_aa.hasOwnProperty(k) )
{
_aa[k] = should_pass_type_info ? (_tb ? wh.nh(_bb[k],'e') : _bb[k]) : wh.rv(_bb[k]);
}
}
return _a;
}
var _c = _a
var _ow = true
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
_a = _b
_b = _c
_ow = false
}
if ( typeof(ops[1][0]) === "object" && ops[1][0][0] === 10 ) {
var _r = {}
return merge( merge( _r, _a, _ow ), _b, _ow );
}
else
return merge( _a, _b, _ow );
break;
case 10:
_a = rev(ops[1],e,s,g,o,_f);
_a = should_pass_type_info ? _a : wh.rv( _a );
return _a ;
break;
case 12:
var _r;
_a = rev(ops[1],e,s,g,o);
if ( !o.ap )
{
return should_pass_type_info && wh.hn(_a)==='h' ? wh.nh( _r, 'f' ) : _r;
}
var ap = o.ap;
_b = rev(ops[2],e,s,g,o,_f);
o.ap = ap;
_ta = wh.hn(_a)==='h';
_tb = _ca(_b);
_aa = wh.rv(_a);	
_bb = wh.rv(_b); snap_bb=$gdc(_bb,"nv_");
try{
_r = typeof _aa === "function" ? $gdc(_aa.apply(null, snap_bb)) : undefined;
} catch (e){
e.message = e.message.replace(/nv_/g,"");
e.stack = e.stack.substring(0,e.stack.indexOf("\n", e.stack.lastIndexOf("at nv_")));
e.stack = e.stack.replace(/\snv_/g," "); 
e.stack = $gstack(e.stack);	
if(g.debugInfo)
{
e.stack += "\n "+" "+" "+" at "+g.debugInfo[0]+":"+g.debugInfo[1]+":"+g.debugInfo[2];
console.error(e);
}
_r = undefined;
}
return should_pass_type_info && (_tb || _ta) ? wh.nh( _r, 'f' ) : _r;
}
}
else
{
if( op === 3 || op === 1) return ops[1];
else if( op === 11 ) 
{
var _a='';
for( var i = 1 ; i < ops.length ; i++ )
{
var xp = wh.rv(rev(ops[i],e,s,g,o,_f));
_a += typeof(xp) === 'undefined' ? '' : xp;
}
return _a;
}
}
}
function wrapper( ops, e, s, g, o, newap )
{
if( ops[0] == '11182016' )
{
g.debugInfo = ops[2];
return rev( ops[1], e, s, g, o, newap );
}
else
{
g.debugInfo = null;
return rev( ops, e, s, g, o, newap );
}
}
return wrapper;
}
gra=$gwrt(true); 
grb=$gwrt(false); 
function TestTest( expr, ops, e,s,g, expect_a, expect_b, expect_affected )
{
{
var o = {is_affected:false};
var a = gra( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_a )
|| o.is_affected != expect_affected )
{
console.warn( "A. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_a ) + ", " + expect_affected + " is expected" );
}
}
{
var o = {is_affected:false};
var a = grb( ops, e,s,g, o );
if( JSON.stringify(a) != JSON.stringify( expect_b )
|| o.is_affected != expect_affected )
{
console.warn( "B. " + expr + " get result " + JSON.stringify(a) + ", " + o.is_affected + ", but " + JSON.stringify( expect_b ) + ", " + expect_affected + " is expected" );
}
}
}

function wfor( to_iter, func, env, _s, global, father, itemname, indexname, keyname )
{
var _n = wh.hn( to_iter ) === 'n'; 
var scope = wh.rv( _s ); 
var has_old_item = scope.hasOwnProperty(itemname);
var has_old_index = scope.hasOwnProperty(indexname);
var old_item = scope[itemname];
var old_index = scope[indexname];
var full = Object.prototype.toString.call(wh.rv(to_iter));
var type = full[8]; 
if( type === 'N' && full[10] === 'l' ) type = 'X'; 
var _y;
if( _n )
{
if( type === 'A' ) 
{
var r_iter_item;
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = _n ? i : wh.nh(i, 'h');
r_iter_item = wh.rv(to_iter[i]);
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' ) 
{
var i = 0;
var r_iter_item;
for( var k in to_iter )
{
scope[itemname] = to_iter[k];
scope[indexname] = _n ? k : wh.nh(k, 'h');
r_iter_item = wh.rv(to_iter[k]);
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env,scope,_y,global );
i++;
}
}
else if( type === 'S' ) 
{
for( var i = 0 ; i < to_iter.length ; i++ )
{
scope[itemname] = to_iter[i];
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env,scope,_y,global );
}
}
else if( type === 'N' ) 
{
for( var i = 0 ; i < to_iter ; i++ )
{
scope[itemname] = i;
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
else
{
var r_to_iter = wh.rv(to_iter);
var r_iter_item, iter_item;
if( type === 'A' ) 
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = r_to_iter[i];
iter_item = wh.hn(iter_item)==='n' ? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item
scope[indexname] = _n ? i : wh.nh(i, 'h');
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y = _v(key);
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'O' ) 
{
var i=0;
for( var k in r_to_iter )
{
iter_item = r_to_iter[k];
iter_item = wh.hn(iter_item)==='n'? wh.nh(iter_item,'h') : iter_item;
r_iter_item = wh.rv( iter_item );
scope[itemname] = iter_item;
scope[indexname] = _n ? k : wh.nh(k, 'h');
var key = keyname && r_iter_item ? (keyname==="*this" ? r_iter_item : wh.rv(r_iter_item[keyname])) : undefined;
_y=_v(key);
_(father,_y);
func( env, scope, _y, global );
i++
}
}
else if( type === 'S' ) 
{
for( var i = 0 ; i < r_to_iter.length ; i++ )
{
iter_item = wh.nh(r_to_iter[i],'h');
scope[itemname] = iter_item;
scope[indexname] = _n ? i : wh.nh(i, 'h');
_y = _v( to_iter[i] + i );
_(father,_y);
func( env, scope, _y, global );
}
}
else if( type === 'N' ) 
{
for( var i = 0 ; i < r_to_iter ; i++ )
{
iter_item = wh.nh(i,'h');
scope[itemname] = iter_item;
scope[indexname]= _n ? i : wh.nh(i,'h');
_y = _v( i );
_(father,_y);
func(env,scope,_y,global);
}
}
else
{
}
}
if(has_old_item)
{
scope[itemname]=old_item;
}
else
{
delete scope[itemname];
}
if(has_old_index)
{
scope[indexname]=old_index;
}
else
{
delete scope[indexname];
}
}

function _ca(o)
{ 
if ( wh.hn(o) == 'h' ) return true;
if ( typeof o !== "object" ) return false;
for(var i in o){ 
if ( o.hasOwnProperty(i) ){
if (_ca(o[i])) return true;
}
}
return false;
}
function _da( node, attrname, opindex, raw, o )
{
var isaffected = false;
var value = $gdc( raw, "", 2 );
if ( o.ap && value && value.constructor===Function ) 
{
attrname = "$wxs:" + attrname; 
node.attr["$gdc"] = $gdc;
}
if ( o.is_affected || _ca(raw) ) 
{
node.n.push( attrname );
node.raw[attrname] = raw;
}
node.attr[attrname] = value;
}
function _r( node, attrname, opindex, env, scope, global ) 
{
global.opindex=opindex;
var o = {}, _env;
var a = grb( z[opindex], env, scope, global, o );
_da( node, attrname, opindex, a, o );
}
function _rz( z, node, attrname, opindex, env, scope, global ) 
{
global.opindex=opindex;
var o = {}, _env;
var a = grb( z[opindex], env, scope, global, o );
_da( node, attrname, opindex, a, o );
}
function _o( opindex, env, scope, global )
{
global.opindex=opindex;
var nothing = {};
var r = grb( z[opindex], env, scope, global, nothing );
return (r&&r.constructor===Function) ? undefined : r;
}
function _oz( z, opindex, env, scope, global )
{
global.opindex=opindex;
var nothing = {};
var r = grb( z[opindex], env, scope, global, nothing );
return (r&&r.constructor===Function) ? undefined : r;
}
function _1( opindex, env, scope, global, o )
{
var o = o || {};
global.opindex=opindex;
return gra( z[opindex], env, scope, global, o );
}
function _1z( z, opindex, env, scope, global, o )
{
var o = o || {};
global.opindex=opindex;
return gra( z[opindex], env, scope, global, o );
}
function _2( opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var o = {};
var to_iter = _1( opindex, env, scope, global );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}
function _2z( z, opindex, func, env, scope, global, father, itemname, indexname, keyname )
{
var o = {};
var to_iter = _1z( z, opindex, env, scope, global );
wfor( to_iter, func, env, scope, global, father, itemname, indexname, keyname );
}


function _m(tag,attrs,generics,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(base+attrs[i+1]<0)
{
tmp.attr[attrs[i]]=true;
}
else
{
_r(tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];
}
}
for(var i=0;i<generics.length;i+=2)
{
if(base+generics[i+1]<0)
{
tmp.generics[generics[i]]="";
}
else
{
var $t=grb(z[base+generics[i+1]],env,scope,global);
if ($t!="") $t="wx-"+$t;
tmp.generics[generics[i]]=$t;
if(base===0)base=generics[i+1];
}
}
return tmp;
}
function _mz(z,tag,attrs,generics,env,scope,global)
{
var tmp=_n(tag);
var base=0;
for(var i = 0 ; i < attrs.length ; i+=2 )
{
if(base+attrs[i+1]<0)
{
tmp.attr[attrs[i]]=true;
}
else
{
_rz(z, tmp,attrs[i],base+attrs[i+1],env,scope,global);
if(base===0)base=attrs[i+1];
}
}
for(var i=0;i<generics.length;i+=2)
{
if(base+generics[i+1]<0)
{
tmp.generics[generics[i]]="";
}
else
{
var $t=grb(z[base+generics[i+1]],env,scope,global);
if ($t!="") $t="wx-"+$t;
tmp.generics[generics[i]]=$t;
if(base===0)base=generics[i+1];
}
}
return tmp;
}

var nf_init=function(){
if(typeof __WXML_GLOBAL__==="undefined"||undefined===__WXML_GLOBAL__.wxs_nf_init){
nf_init_Object();nf_init_Function();nf_init_Array();nf_init_String();nf_init_Boolean();nf_init_Number();nf_init_Math();nf_init_Date();nf_init_RegExp();
}
if(typeof __WXML_GLOBAL__!=="undefined") __WXML_GLOBAL__.wxs_nf_init=true;
};
var nf_init_Object=function(){
Object.defineProperty(Object.prototype,"nv_constructor",{writable:true,value:"Object"})
Object.defineProperty(Object.prototype,"nv_toString",{writable:true,value:function(){return "[object Object]"}})
}
var nf_init_Function=function(){
Object.defineProperty(Function.prototype,"nv_constructor",{writable:true,value:"Function"})
Object.defineProperty(Function.prototype,"nv_length",{get:function(){return this.length;},set:function(){}});
Object.defineProperty(Function.prototype,"nv_toString",{writable:true,value:function(){return "[function Function]"}})
}
var nf_init_Array=function(){
Object.defineProperty(Array.prototype,"nv_toString",{writable:true,value:function(){return this.nv_join();}})
Object.defineProperty(Array.prototype,"nv_join",{writable:true,value:function(s){
s=undefined==s?',':s;
var r="";
for(var i=0;i<this.length;++i){
if(0!=i) r+=s;
if(null==this[i]||undefined==this[i]) r+='';	
else if(typeof this[i]=='function') r+=this[i].nv_toString();
else if(typeof this[i]=='object'&&this[i].nv_constructor==="Array") r+=this[i].nv_join();
else r+=this[i].toString();
}
return r;
}})
Object.defineProperty(Array.prototype,"nv_constructor",{writable:true,value:"Array"})
Object.defineProperty(Array.prototype,"nv_concat",{writable:true,value:Array.prototype.concat})
Object.defineProperty(Array.prototype,"nv_pop",{writable:true,value:Array.prototype.pop})
Object.defineProperty(Array.prototype,"nv_push",{writable:true,value:Array.prototype.push})
Object.defineProperty(Array.prototype,"nv_reverse",{writable:true,value:Array.prototype.reverse})
Object.defineProperty(Array.prototype,"nv_shift",{writable:true,value:Array.prototype.shift})
Object.defineProperty(Array.prototype,"nv_slice",{writable:true,value:Array.prototype.slice})
Object.defineProperty(Array.prototype,"nv_sort",{writable:true,value:Array.prototype.sort})
Object.defineProperty(Array.prototype,"nv_splice",{writable:true,value:Array.prototype.splice})
Object.defineProperty(Array.prototype,"nv_unshift",{writable:true,value:Array.prototype.unshift})
Object.defineProperty(Array.prototype,"nv_indexOf",{writable:true,value:Array.prototype.indexOf})
Object.defineProperty(Array.prototype,"nv_lastIndexOf",{writable:true,value:Array.prototype.lastIndexOf})
Object.defineProperty(Array.prototype,"nv_every",{writable:true,value:Array.prototype.every})
Object.defineProperty(Array.prototype,"nv_some",{writable:true,value:Array.prototype.some})
Object.defineProperty(Array.prototype,"nv_forEach",{writable:true,value:Array.prototype.forEach})
Object.defineProperty(Array.prototype,"nv_map",{writable:true,value:Array.prototype.map})
Object.defineProperty(Array.prototype,"nv_filter",{writable:true,value:Array.prototype.filter})
Object.defineProperty(Array.prototype,"nv_reduce",{writable:true,value:Array.prototype.reduce})
Object.defineProperty(Array.prototype,"nv_reduceRight",{writable:true,value:Array.prototype.reduceRight})
Object.defineProperty(Array.prototype,"nv_length",{get:function(){return this.length;},set:function(value){this.length=value;}});
}
var nf_init_String=function(){
Object.defineProperty(String.prototype,"nv_constructor",{writable:true,value:"String"})
Object.defineProperty(String.prototype,"nv_toString",{writable:true,value:String.prototype.toString})
Object.defineProperty(String.prototype,"nv_valueOf",{writable:true,value:String.prototype.valueOf})
Object.defineProperty(String.prototype,"nv_charAt",{writable:true,value:String.prototype.charAt})
Object.defineProperty(String.prototype,"nv_charCodeAt",{writable:true,value:String.prototype.charCodeAt})
Object.defineProperty(String.prototype,"nv_concat",{writable:true,value:String.prototype.concat})
Object.defineProperty(String.prototype,"nv_indexOf",{writable:true,value:String.prototype.indexOf})
Object.defineProperty(String.prototype,"nv_lastIndexOf",{writable:true,value:String.prototype.lastIndexOf})
Object.defineProperty(String.prototype,"nv_localeCompare",{writable:true,value:String.prototype.localeCompare})
Object.defineProperty(String.prototype,"nv_match",{writable:true,value:String.prototype.match})
Object.defineProperty(String.prototype,"nv_replace",{writable:true,value:String.prototype.replace})
Object.defineProperty(String.prototype,"nv_search",{writable:true,value:String.prototype.search})
Object.defineProperty(String.prototype,"nv_slice",{writable:true,value:String.prototype.slice})
Object.defineProperty(String.prototype,"nv_split",{writable:true,value:String.prototype.split})
Object.defineProperty(String.prototype,"nv_substring",{writable:true,value:String.prototype.substring})
Object.defineProperty(String.prototype,"nv_toLowerCase",{writable:true,value:String.prototype.toLowerCase})
Object.defineProperty(String.prototype,"nv_toLocaleLowerCase",{writable:true,value:String.prototype.toLocaleLowerCase})
Object.defineProperty(String.prototype,"nv_toUpperCase",{writable:true,value:String.prototype.toUpperCase})
Object.defineProperty(String.prototype,"nv_toLocaleUpperCase",{writable:true,value:String.prototype.toLocaleUpperCase})
Object.defineProperty(String.prototype,"nv_trim",{writable:true,value:String.prototype.trim})
Object.defineProperty(String.prototype,"nv_length",{get:function(){return this.length;},set:function(value){this.length=value;}});
}
var nf_init_Boolean=function(){
Object.defineProperty(Boolean.prototype,"nv_constructor",{writable:true,value:"Boolean"})
Object.defineProperty(Boolean.prototype,"nv_toString",{writable:true,value:Boolean.prototype.toString})
Object.defineProperty(Boolean.prototype,"nv_valueOf",{writable:true,value:Boolean.prototype.valueOf})
}
var nf_init_Number=function(){
Object.defineProperty(Number,"nv_MAX_VALUE",{writable:false,value:Number.MAX_VALUE})
Object.defineProperty(Number,"nv_MIN_VALUE",{writable:false,value:Number.MIN_VALUE})
Object.defineProperty(Number,"nv_NEGATIVE_INFINITY",{writable:false,value:Number.NEGATIVE_INFINITY})
Object.defineProperty(Number,"nv_POSITIVE_INFINITY",{writable:false,value:Number.POSITIVE_INFINITY})
Object.defineProperty(Number.prototype,"nv_constructor",{writable:true,value:"Number"})
Object.defineProperty(Number.prototype,"nv_toString",{writable:true,value:Number.prototype.toString})
Object.defineProperty(Number.prototype,"nv_toLocaleString",{writable:true,value:Number.prototype.toLocaleString})
Object.defineProperty(Number.prototype,"nv_valueOf",{writable:true,value:Number.prototype.valueOf})
Object.defineProperty(Number.prototype,"nv_toFixed",{writable:true,value:Number.prototype.toFixed})
Object.defineProperty(Number.prototype,"nv_toExponential",{writable:true,value:Number.prototype.toExponential})
Object.defineProperty(Number.prototype,"nv_toPrecision",{writable:true,value:Number.prototype.toPrecision})
}
var nf_init_Math=function(){
Object.defineProperty(Math,"nv_E",{writable:false,value:Math.E})
Object.defineProperty(Math,"nv_LN10",{writable:false,value:Math.LN10})
Object.defineProperty(Math,"nv_LN2",{writable:false,value:Math.LN2})
Object.defineProperty(Math,"nv_LOG2E",{writable:false,value:Math.LOG2E})
Object.defineProperty(Math,"nv_LOG10E",{writable:false,value:Math.LOG10E})
Object.defineProperty(Math,"nv_PI",{writable:false,value:Math.PI})
Object.defineProperty(Math,"nv_SQRT1_2",{writable:false,value:Math.SQRT1_2})
Object.defineProperty(Math,"nv_SQRT2",{writable:false,value:Math.SQRT2})
Object.defineProperty(Math,"nv_abs",{writable:false,value:Math.abs})
Object.defineProperty(Math,"nv_acos",{writable:false,value:Math.acos})
Object.defineProperty(Math,"nv_asin",{writable:false,value:Math.asin})
Object.defineProperty(Math,"nv_atan",{writable:false,value:Math.atan})
Object.defineProperty(Math,"nv_atan2",{writable:false,value:Math.atan2})
Object.defineProperty(Math,"nv_ceil",{writable:false,value:Math.ceil})
Object.defineProperty(Math,"nv_cos",{writable:false,value:Math.cos})
Object.defineProperty(Math,"nv_exp",{writable:false,value:Math.exp})
Object.defineProperty(Math,"nv_floor",{writable:false,value:Math.floor})
Object.defineProperty(Math,"nv_log",{writable:false,value:Math.log})
Object.defineProperty(Math,"nv_max",{writable:false,value:Math.max})
Object.defineProperty(Math,"nv_min",{writable:false,value:Math.min})
Object.defineProperty(Math,"nv_pow",{writable:false,value:Math.pow})
Object.defineProperty(Math,"nv_random",{writable:false,value:Math.random})
Object.defineProperty(Math,"nv_round",{writable:false,value:Math.round})
Object.defineProperty(Math,"nv_sin",{writable:false,value:Math.sin})
Object.defineProperty(Math,"nv_sqrt",{writable:false,value:Math.sqrt})
Object.defineProperty(Math,"nv_tan",{writable:false,value:Math.tan})
}
var nf_init_Date=function(){
Object.defineProperty(Date.prototype,"nv_constructor",{writable:true,value:"Date"})
Object.defineProperty(Date,"nv_parse",{writable:true,value:Date.parse})
Object.defineProperty(Date,"nv_UTC",{writable:true,value:Date.UTC})
Object.defineProperty(Date,"nv_now",{writable:true,value:Date.now})
Object.defineProperty(Date.prototype,"nv_toString",{writable:true,value:Date.prototype.toString})
Object.defineProperty(Date.prototype,"nv_toDateString",{writable:true,value:Date.prototype.toDateString})
Object.defineProperty(Date.prototype,"nv_toTimeString",{writable:true,value:Date.prototype.toTimeString})
Object.defineProperty(Date.prototype,"nv_toLocaleString",{writable:true,value:Date.prototype.toLocaleString})
Object.defineProperty(Date.prototype,"nv_toLocaleDateString",{writable:true,value:Date.prototype.toLocaleDateString})
Object.defineProperty(Date.prototype,"nv_toLocaleTimeString",{writable:true,value:Date.prototype.toLocaleTimeString})
Object.defineProperty(Date.prototype,"nv_valueOf",{writable:true,value:Date.prototype.valueOf})
Object.defineProperty(Date.prototype,"nv_getTime",{writable:true,value:Date.prototype.getTime})
Object.defineProperty(Date.prototype,"nv_getFullYear",{writable:true,value:Date.prototype.getFullYear})
Object.defineProperty(Date.prototype,"nv_getUTCFullYear",{writable:true,value:Date.prototype.getUTCFullYear})
Object.defineProperty(Date.prototype,"nv_getMonth",{writable:true,value:Date.prototype.getMonth})
Object.defineProperty(Date.prototype,"nv_getUTCMonth",{writable:true,value:Date.prototype.getUTCMonth})
Object.defineProperty(Date.prototype,"nv_getDate",{writable:true,value:Date.prototype.getDate})
Object.defineProperty(Date.prototype,"nv_getUTCDate",{writable:true,value:Date.prototype.getUTCDate})
Object.defineProperty(Date.prototype,"nv_getDay",{writable:true,value:Date.prototype.getDay})
Object.defineProperty(Date.prototype,"nv_getUTCDay",{writable:true,value:Date.prototype.getUTCDay})
Object.defineProperty(Date.prototype,"nv_getHours",{writable:true,value:Date.prototype.getHours})
Object.defineProperty(Date.prototype,"nv_getUTCHours",{writable:true,value:Date.prototype.getUTCHours})
Object.defineProperty(Date.prototype,"nv_getMinutes",{writable:true,value:Date.prototype.getMinutes})
Object.defineProperty(Date.prototype,"nv_getUTCMinutes",{writable:true,value:Date.prototype.getUTCMinutes})
Object.defineProperty(Date.prototype,"nv_getSeconds",{writable:true,value:Date.prototype.getSeconds})
Object.defineProperty(Date.prototype,"nv_getUTCSeconds",{writable:true,value:Date.prototype.getUTCSeconds})
Object.defineProperty(Date.prototype,"nv_getMilliseconds",{writable:true,value:Date.prototype.getMilliseconds})
Object.defineProperty(Date.prototype,"nv_getUTCMilliseconds",{writable:true,value:Date.prototype.getUTCMilliseconds})
Object.defineProperty(Date.prototype,"nv_getTimezoneOffset",{writable:true,value:Date.prototype.getTimezoneOffset})
Object.defineProperty(Date.prototype,"nv_setTime",{writable:true,value:Date.prototype.setTime})
Object.defineProperty(Date.prototype,"nv_setMilliseconds",{writable:true,value:Date.prototype.setMilliseconds})
Object.defineProperty(Date.prototype,"nv_setUTCMilliseconds",{writable:true,value:Date.prototype.setUTCMilliseconds})
Object.defineProperty(Date.prototype,"nv_setSeconds",{writable:true,value:Date.prototype.setSeconds})
Object.defineProperty(Date.prototype,"nv_setUTCSeconds",{writable:true,value:Date.prototype.setUTCSeconds})
Object.defineProperty(Date.prototype,"nv_setMinutes",{writable:true,value:Date.prototype.setMinutes})
Object.defineProperty(Date.prototype,"nv_setUTCMinutes",{writable:true,value:Date.prototype.setUTCMinutes})
Object.defineProperty(Date.prototype,"nv_setHours",{writable:true,value:Date.prototype.setHours})
Object.defineProperty(Date.prototype,"nv_setUTCHours",{writable:true,value:Date.prototype.setUTCHours})
Object.defineProperty(Date.prototype,"nv_setDate",{writable:true,value:Date.prototype.setDate})
Object.defineProperty(Date.prototype,"nv_setUTCDate",{writable:true,value:Date.prototype.setUTCDate})
Object.defineProperty(Date.prototype,"nv_setMonth",{writable:true,value:Date.prototype.setMonth})
Object.defineProperty(Date.prototype,"nv_setUTCMonth",{writable:true,value:Date.prototype.setUTCMonth})
Object.defineProperty(Date.prototype,"nv_setFullYear",{writable:true,value:Date.prototype.setFullYear})
Object.defineProperty(Date.prototype,"nv_setUTCFullYear",{writable:true,value:Date.prototype.setUTCFullYear})
Object.defineProperty(Date.prototype,"nv_toUTCString",{writable:true,value:Date.prototype.toUTCString})
Object.defineProperty(Date.prototype,"nv_toISOString",{writable:true,value:Date.prototype.toISOString})
Object.defineProperty(Date.prototype,"nv_toJSON",{writable:true,value:Date.prototype.toJSON})
}
var nf_init_RegExp=function(){
Object.defineProperty(RegExp.prototype,"nv_constructor",{writable:true,value:"RegExp"})
Object.defineProperty(RegExp.prototype,"nv_exec",{writable:true,value:RegExp.prototype.exec})
Object.defineProperty(RegExp.prototype,"nv_test",{writable:true,value:RegExp.prototype.test})
Object.defineProperty(RegExp.prototype,"nv_toString",{writable:true,value:RegExp.prototype.toString})
Object.defineProperty(RegExp.prototype,"nv_source",{get:function(){return this.source;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_global",{get:function(){return this.global;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_ignoreCase",{get:function(){return this.ignoreCase;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_multiline",{get:function(){return this.multiline;},set:function(){}});
Object.defineProperty(RegExp.prototype,"nv_lastIndex",{get:function(){return this.lastIndex;},set:function(v){this.lastIndex=v;}});
}
nf_init();
var nv_getDate=function(){var args=Array.prototype.slice.call(arguments);args.unshift(Date);return new(Function.prototype.bind.apply(Date, args));}
var nv_getRegExp=function(){var args=Array.prototype.slice.call(arguments);args.unshift(RegExp);return new(Function.prototype.bind.apply(RegExp, args));}
var nv_console={}
nv_console.nv_log=function(){var res="WXSRT:";for(var i=0;i<arguments.length;++i)res+=arguments[i]+" ";console.log(res);}
var nv_parseInt = parseInt, nv_parseFloat = parseFloat, nv_isNaN = isNaN, nv_isFinite = isFinite, nv_decodeURI = decodeURI, nv_decodeURIComponent = decodeURIComponent, nv_encodeURI = encodeURI, nv_encodeURIComponent = encodeURIComponent;
function $gdc(o,p,r) {
o=wh.rv(o);
if(o===null||o===undefined) return o;
if(o.constructor===String||o.constructor===Boolean||o.constructor===Number) return o;
if(o.constructor===Object){
var copy={};
for(var k in o)
if(o.hasOwnProperty(k))
if(undefined===p) copy[k.substring(3)]=$gdc(o[k],p,r);
else copy[p+k]=$gdc(o[k],p,r);
return copy;
}
if(o.constructor===Array){
var copy=[];
for(var i=0;i<o.length;i++) copy.push($gdc(o[i],p,r));
return copy;
}
if(o.constructor===Date){
var copy=new Date();
copy.setTime(o.getTime());
return copy;
}
if(o.constructor===RegExp){
var f="";
if(o.global) f+="g";
if(o.ignoreCase) f+="i";
if(o.multiline) f+="m";
return (new RegExp(o.source,f));
}
if(r&&o.constructor===Function){
if ( r == 1 ) return $gdc(o(),undefined, 2);
if ( r == 2 ) return o;
}
return null;
}
var nv_JSON={}
nv_JSON.nv_stringify=function(o){
JSON.stringify(o);
return JSON.stringify($gdc(o));
}
nv_JSON.nv_parse=function(o){
if(o===undefined) return undefined;
var t=JSON.parse(o);
return $gdc(t,'nv_');
}

function _af(p, a, c){
p.extraAttr = {"t_action": a, "t_cid": c};
}

function _ai(i,p,e,me,r,c){var x=_grp(p,e,me);if(x)i.push(x);else{i.push('');_wp(me+':import:'+r+':'+c+': Path `'+p+'` not found from `'+me+'`.')}}
function _grp(p,e,me){if(p[0]!='/'){var mepart=me.split('/');mepart.pop();var ppart=p.split('/');for(var i=0;i<ppart.length;i++){if( ppart[i]=='..')mepart.pop();else if(!ppart[i]||ppart[i]=='.')continue;else mepart.push(ppart[i]);}p=mepart.join('/');}if(me[0]=='.'&&p[0]=='/')p='.'+p;if(e[p])return p;if(e[p+'.wxml'])return p+'.wxml';}
function _gd(p,c,e,d){if(!c)return;if(d[p][c])return d[p][c];for(var x=e[p].i.length-1;x>=0;x--){if(e[p].i[x]&&d[e[p].i[x]][c])return d[e[p].i[x]][c]};for(var x=e[p].ti.length-1;x>=0;x--){var q=_grp(e[p].ti[x],e,p);if(q&&d[q][c])return d[q][c]}var ii=_gapi(e,p);for(var x=0;x<ii.length;x++){if(ii[x]&&d[ii[x]][c])return d[ii[x]][c]}for(var k=e[p].j.length-1;k>=0;k--)if(e[p].j[k]){for(var q=e[e[p].j[k]].ti.length-1;q>=0;q--){var pp=_grp(e[e[p].j[k]].ti[q],e,p);if(pp&&d[pp][c]){return d[pp][c]}}}}
function _gapi(e,p){if(!p)return [];if($gaic[p]){return $gaic[p]};var ret=[],q=[],h=0,t=0,put={},visited={};q.push(p);visited[p]=true;t++;while(h<t){var a=q[h++];for(var i=0;i<e[a].ic.length;i++){var nd=e[a].ic[i];var np=_grp(nd,e,a);if(np&&!visited[np]){visited[np]=true;q.push(np);t++;}}for(var i=0;a!=p&&i<e[a].ti.length;i++){var ni=e[a].ti[i];var nm=_grp(ni,e,a);if(nm&&!put[nm]){put[nm]=true;ret.push(nm);}}}$gaic[p]=ret;return ret;}
var $ixc={};function _ic(p,ent,me,e,s,r,gg){var x=_grp(p,ent,me);ent[me].j.push(x);if(x){if($ixc[x]){_wp('-1:include:-1:-1: `'+p+'` is being included in a loop, will be stop.');return;}$ixc[x]=true;try{ent[x].f(e,s,r,gg)}catch(e){}$ixc[x]=false;}else{_wp(me+':include:-1:-1: Included path `'+p+'` not found from `'+me+'`.')}}
function _w(tn,f,line,c){_wp(f+':template:'+line+':'+c+': Template `'+tn+'` not found.');}function _ev(dom){var changed=false;delete dom.properities;delete dom.n;if(dom.children){do{changed=false;var newch = [];for(var i=0;i<dom.children.length;i++){var ch=dom.children[i];if( ch.tag=='virtual'){changed=true;for(var j=0;ch.children&&j<ch.children.length;j++){newch.push(ch.children[j]);}}else { newch.push(ch); } } dom.children = newch; }while(changed);for(var i=0;i<dom.children.length;i++){_ev(dom.children[i]);}} return dom; }
function _tsd( root )
{
if( root.tag == "wx-wx-scope" ) 
{
root.tag = "virtual";
root.wxCkey = "11";
root['wxScopeData'] = root.attr['wx:scope-data'];
delete root.n;
delete root.raw;
delete root.generics;
delete root.attr;
}
for( var i = 0 ; root.children && i < root.children.length ; i++ )
{
_tsd( root.children[i] );
}
return root;
}

var e_={}
if(typeof(global.entrys)==='undefined')global.entrys={};e_=global.entrys;
var d_={}
if(typeof(global.defines)==='undefined')global.defines={};d_=global.defines;
var f_={}
if(typeof(global.modules)==='undefined')global.modules={};f_=global.modules || {};
var p_={}
var cs
__WXML_GLOBAL__.ops_cached = __WXML_GLOBAL__.ops_cached || {}
__WXML_GLOBAL__.ops_set = __WXML_GLOBAL__.ops_set || {};
__WXML_GLOBAL__.ops_init = __WXML_GLOBAL__.ops_init || {};
var z=__WXML_GLOBAL__.ops_set.$gwx || [];
function gz$gwx_1(){
if( __WXML_GLOBAL__.ops_cached.$gwx_1)return __WXML_GLOBAL__.ops_cached.$gwx_1
__WXML_GLOBAL__.ops_cached.$gwx_1=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([[4],[[5],[[5],[[5],[1,'cu-bar fixed']],[[2,'?:'],[[2,'!='],[[7],[3,'bgImage']],[1,'']],[1,'none-bg text-white bg-img'],[1,'']]],[[7],[3,'bgColor']]]])
Z([[7],[3,'style']])
Z([3,'left'])
Z([3,'content'])
Z([3,'right'])
})(__WXML_GLOBAL__.ops_cached.$gwx_1);return __WXML_GLOBAL__.ops_cached.$gwx_1
}
function gz$gwx_2(){
if( __WXML_GLOBAL__.ops_cached.$gwx_2)return __WXML_GLOBAL__.ops_cached.$gwx_2
__WXML_GLOBAL__.ops_cached.$gwx_2=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'cu-card dynamic margin-top-sm margin-bottom-sm'])
Z([3,'cu-item'])
Z([[6],[[7],[3,'listData']],[3,'mark']])
Z([3,'henflex'])
Z(z[3])
Z([[6],[[7],[3,'listData']],[3,'anony']])
})(__WXML_GLOBAL__.ops_cached.$gwx_2);return __WXML_GLOBAL__.ops_cached.$gwx_2
}
function gz$gwx_3(){
if( __WXML_GLOBAL__.ops_cached.$gwx_3)return __WXML_GLOBAL__.ops_cached.$gwx_3
__WXML_GLOBAL__.ops_cached.$gwx_3=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_3);return __WXML_GLOBAL__.ops_cached.$gwx_3
}
function gz$gwx_4(){
if( __WXML_GLOBAL__.ops_cached.$gwx_4)return __WXML_GLOBAL__.ops_cached.$gwx_4
__WXML_GLOBAL__.ops_cached.$gwx_4=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'style-flex style-flex-wrap'])
Z([3,'idx'])
Z([3,'item'])
Z([[7],[3,'items']])
Z(z[2])
Z([3,'__e'])
Z([[6],[[7],[3,'item']],[3,'checked']])
Z([[4],[[5],[[4],[[5],[[5],[1,'^change']],[[4],[[5],[[4],[[5],[1,'radioChange']]]]]]]]])
Z([[6],[[7],[3,'item']],[3,'name']])
Z([[6],[[7],[3,'item']],[3,'value']])
})(__WXML_GLOBAL__.ops_cached.$gwx_4);return __WXML_GLOBAL__.ops_cached.$gwx_4
}
function gz$gwx_5(){
if( __WXML_GLOBAL__.ops_cached.$gwx_5)return __WXML_GLOBAL__.ops_cached.$gwx_5
__WXML_GLOBAL__.ops_cached.$gwx_5=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_5);return __WXML_GLOBAL__.ops_cached.$gwx_5
}
function gz$gwx_6(){
if( __WXML_GLOBAL__.ops_cached.$gwx_6)return __WXML_GLOBAL__.ops_cached.$gwx_6
__WXML_GLOBAL__.ops_cached.$gwx_6=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([[4],[[5],[[7],[3,'setCollapseCellClass']]]])
Z([[2,'?:'],[[2,'||'],[[2,'==='],[[7],[3,'disabled']],[1,true]],[[2,'==='],[[7],[3,'disabled']],[1,'true']]],[1,''],[1,'uni-collapse-cell--hover']])
Z([3,'__e'])
Z([3,'uni-collapse-cell__title'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'onClick']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([[7],[3,'thumb']])
Z([3,'#bbb'])
Z([3,'20'])
Z([3,'arrowdown'])
})(__WXML_GLOBAL__.ops_cached.$gwx_6);return __WXML_GLOBAL__.ops_cached.$gwx_6
}
function gz$gwx_7(){
if( __WXML_GLOBAL__.ops_cached.$gwx_7)return __WXML_GLOBAL__.ops_cached.$gwx_7
__WXML_GLOBAL__.ops_cached.$gwx_7=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'uni-collapse'])
})(__WXML_GLOBAL__.ops_cached.$gwx_7);return __WXML_GLOBAL__.ops_cached.$gwx_7
}
function gz$gwx_8(){
if( __WXML_GLOBAL__.ops_cached.$gwx_8)return __WXML_GLOBAL__.ops_cached.$gwx_8
__WXML_GLOBAL__.ops_cached.$gwx_8=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_8);return __WXML_GLOBAL__.ops_cached.$gwx_8
}
function gz$gwx_9(){
if( __WXML_GLOBAL__.ops_cached.$gwx_9)return __WXML_GLOBAL__.ops_cached.$gwx_9
__WXML_GLOBAL__.ops_cached.$gwx_9=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'header-content'])
Z([[6],[[7],[3,'$slots']],[3,'left']])
Z([3,'left'])
Z([3,'position:absolute;left:70px;right:70px;min-width:0;user-select:auto;'])
Z([[6],[[7],[3,'$slots']],[3,'content']])
Z([3,'content'])
Z([3,'right'])
})(__WXML_GLOBAL__.ops_cached.$gwx_9);return __WXML_GLOBAL__.ops_cached.$gwx_9
}
function gz$gwx_10(){
if( __WXML_GLOBAL__.ops_cached.$gwx_10)return __WXML_GLOBAL__.ops_cached.$gwx_10
__WXML_GLOBAL__.ops_cached.$gwx_10=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_10);return __WXML_GLOBAL__.ops_cached.$gwx_10
}
function gz$gwx_11(){
if( __WXML_GLOBAL__.ops_cached.$gwx_11)return __WXML_GLOBAL__.ops_cached.$gwx_11
__WXML_GLOBAL__.ops_cached.$gwx_11=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([[4],[[5],[[5],[1,'cu-modal']],[[2,'?:'],[[7],[3,'isShow']],[1,'show'],[1,'']]]])
Z([3,'content'])
})(__WXML_GLOBAL__.ops_cached.$gwx_11);return __WXML_GLOBAL__.ops_cached.$gwx_11
}
function gz$gwx_12(){
if( __WXML_GLOBAL__.ops_cached.$gwx_12)return __WXML_GLOBAL__.ops_cached.$gwx_12
__WXML_GLOBAL__.ops_cached.$gwx_12=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([[4],[[5],[[5],[[5],[1,'uni-grid']],[[2,'?:'],[[2,'!'],[[7],[3,'showBorder']]],[1,'uni-grid-no-border'],[1,'']]],[[2,'?:'],[[2,'&&'],[[7],[3,'showBorder']],[[2,'!'],[[7],[3,'showOutBorder']]]],[1,'uni-grid-no-out-border'],[1,'']]]])
Z([3,'i'])
Z([3,'items'])
Z([[7],[3,'gridGroup']])
Z(z[2])
Z([3,'index'])
Z([3,'item'])
Z([[7],[3,'items']])
Z(z[6])
Z([3,'__e'])
Z([[4],[[5],[[5],[[5],[1,'uni-grid-item']],[[2,'?:'],[[2,'=='],[[7],[3,'index']],[[7],[3,'columnNum']]],[1,'uni-grid-item-last'],[1,'']]],[[2,'+'],[1,'uni-grid-item-'],[[7],[3,'type']]]]])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'onClick']],[[4],[[5],[[5],[[7],[3,'i']]],[[7],[3,'index']]]]]]]]]]]])
Z([3,'uni-grid-item-hover'])
Z([1,20])
Z([1,70])
Z([[2,'+'],[[2,'+'],[1,'visibility:'],[[2,'?:'],[[6],[[7],[3,'item']],[3,'seize']],[1,'hidden'],[1,'inherit']]],[1,';']])
Z([[2,'!'],[[6],[[7],[3,'item']],[3,'seize']]])
})(__WXML_GLOBAL__.ops_cached.$gwx_12);return __WXML_GLOBAL__.ops_cached.$gwx_12
}
function gz$gwx_13(){
if( __WXML_GLOBAL__.ops_cached.$gwx_13)return __WXML_GLOBAL__.ops_cached.$gwx_13
__WXML_GLOBAL__.ops_cached.$gwx_13=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([[7],[3,'isShow']])
Z(z[0])
Z([3,'picker data-v-67ced56c'])
Z([[2,'!='],[[7],[3,'type']],[1,'time']])
Z([3,'picker-modal-footer-info data-v-67ced56c'])
Z([[7],[3,'isMultiSelect']])
Z([3,'data-v-67ced56c'])
Z([[7],[3,'isContainTime']])
Z(z[8])
Z([[7],[3,'showTimePicker']])
Z([3,'__e'])
Z([3,'picker-modal-time data-v-67ced56c'])
Z([[4],[[5],[[4],[[5],[[5],[1,'change']],[[4],[[5],[[4],[[5],[[5],[1,'onTimeChange']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([3,'picker-modal-time-item'])
Z([[7],[3,'timeValue']])
Z([[7],[3,'showSeconds']])
})(__WXML_GLOBAL__.ops_cached.$gwx_13);return __WXML_GLOBAL__.ops_cached.$gwx_13
}
function gz$gwx_14(){
if( __WXML_GLOBAL__.ops_cached.$gwx_14)return __WXML_GLOBAL__.ops_cached.$gwx_14
__WXML_GLOBAL__.ops_cached.$gwx_14=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([[7],[3,'text']])
})(__WXML_GLOBAL__.ops_cached.$gwx_14);return __WXML_GLOBAL__.ops_cached.$gwx_14
}
function gz$gwx_15(){
if( __WXML_GLOBAL__.ops_cached.$gwx_15)return __WXML_GLOBAL__.ops_cached.$gwx_15
__WXML_GLOBAL__.ops_cached.$gwx_15=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'data-v-a73cfbd2'])
Z([3,'container data-v-a73cfbd2'])
Z([[2,'=='],[[7],[3,'type']],[1,'example']])
Z([[2,'=='],[[7],[3,'type']],[1,'skill']])
})(__WXML_GLOBAL__.ops_cached.$gwx_15);return __WXML_GLOBAL__.ops_cached.$gwx_15
}
function gz$gwx_16(){
if( __WXML_GLOBAL__.ops_cached.$gwx_16)return __WXML_GLOBAL__.ops_cached.$gwx_16
__WXML_GLOBAL__.ops_cached.$gwx_16=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([1,true])
Z([[4],[[5],[[5],[1,'left']],[1,'content']]])
Z([[2,'=='],[[7],[3,'value']],[1,'skill']])
})(__WXML_GLOBAL__.ops_cached.$gwx_16);return __WXML_GLOBAL__.ops_cached.$gwx_16
}
function gz$gwx_17(){
if( __WXML_GLOBAL__.ops_cached.$gwx_17)return __WXML_GLOBAL__.ops_cached.$gwx_17
__WXML_GLOBAL__.ops_cached.$gwx_17=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'login_container'])
Z([[7],[3,'isShow']])
Z([[4],[[5],[1,'content']]])
Z([3,'content'])
Z([[2,'=='],[[7],[3,'modalName']],[1,'exit']])
Z([[2,'=='],[[7],[3,'modalName']],[1,'success']])
})(__WXML_GLOBAL__.ops_cached.$gwx_17);return __WXML_GLOBAL__.ops_cached.$gwx_17
}
function gz$gwx_18(){
if( __WXML_GLOBAL__.ops_cached.$gwx_18)return __WXML_GLOBAL__.ops_cached.$gwx_18
__WXML_GLOBAL__.ops_cached.$gwx_18=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_18);return __WXML_GLOBAL__.ops_cached.$gwx_18
}
function gz$gwx_19(){
if( __WXML_GLOBAL__.ops_cached.$gwx_19)return __WXML_GLOBAL__.ops_cached.$gwx_19
__WXML_GLOBAL__.ops_cached.$gwx_19=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_19);return __WXML_GLOBAL__.ops_cached.$gwx_19
}
function gz$gwx_20(){
if( __WXML_GLOBAL__.ops_cached.$gwx_20)return __WXML_GLOBAL__.ops_cached.$gwx_20
__WXML_GLOBAL__.ops_cached.$gwx_20=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_20);return __WXML_GLOBAL__.ops_cached.$gwx_20
}
function gz$gwx_21(){
if( __WXML_GLOBAL__.ops_cached.$gwx_21)return __WXML_GLOBAL__.ops_cached.$gwx_21
__WXML_GLOBAL__.ops_cached.$gwx_21=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_21);return __WXML_GLOBAL__.ops_cached.$gwx_21
}
function gz$gwx_22(){
if( __WXML_GLOBAL__.ops_cached.$gwx_22)return __WXML_GLOBAL__.ops_cached.$gwx_22
__WXML_GLOBAL__.ops_cached.$gwx_22=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'true'])
Z([[4],[[5],[1,'default']]])
Z([3,'index'])
Z([3,'item'])
Z([[7],[3,'telephoneList']])
Z(z[3])
Z([[2,'+'],[[2,'+'],[[2,'+'],[[2,'||'],[[6],[[7],[3,'item']],[3,'name']],[1,'未指定部门']],[1,'    (']],[[6],[[6],[[7],[3,'item']],[3,'members']],[3,'length']]],[1,')']])
Z(z[2])
})(__WXML_GLOBAL__.ops_cached.$gwx_22);return __WXML_GLOBAL__.ops_cached.$gwx_22
}
function gz$gwx_23(){
if( __WXML_GLOBAL__.ops_cached.$gwx_23)return __WXML_GLOBAL__.ops_cached.$gwx_23
__WXML_GLOBAL__.ops_cached.$gwx_23=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_23);return __WXML_GLOBAL__.ops_cached.$gwx_23
}
function gz$gwx_24(){
if( __WXML_GLOBAL__.ops_cached.$gwx_24)return __WXML_GLOBAL__.ops_cached.$gwx_24
__WXML_GLOBAL__.ops_cached.$gwx_24=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'red'])
Z([1,true])
Z([[4],[[5],[[5],[[5],[1,'left']],[1,'content']],[1,'right']]])
Z([3,'__e'])
Z([3,'info-content-item flex justify-between'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'onShowDatePicker']],[[4],[[5],[1,'date']]]]]]]]]]])
Z([[2,'&&'],[[6],[[7],[3,'userInfo']],[3,'birthday']],[[7],[3,'isShow']]])
Z([[2,'&&'],[[7],[3,'birthday']],[[2,'!'],[[7],[3,'isShow']]]])
Z(z[4])
Z(z[4])
Z([[4],[[5],[[5],[[4],[[5],[[5],[1,'^confirm']],[[4],[[5],[[4],[[5],[[5],[1,'onSelected']],[[4],[[5],[1,'$event']]]]]]]]]],[[4],[[5],[[5],[1,'^cancel']],[[4],[[5],[[4],[[5],[[5],[1,'onSelected']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([[7],[3,'showPicker']])
Z(z[2])
Z([[7],[3,'type']])
Z([[7],[3,'value']])
})(__WXML_GLOBAL__.ops_cached.$gwx_24);return __WXML_GLOBAL__.ops_cached.$gwx_24
}
function gz$gwx_25(){
if( __WXML_GLOBAL__.ops_cached.$gwx_25)return __WXML_GLOBAL__.ops_cached.$gwx_25
__WXML_GLOBAL__.ops_cached.$gwx_25=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([1,true])
Z([[4],[[5],[[5],[1,'left']],[1,'right']]])
})(__WXML_GLOBAL__.ops_cached.$gwx_25);return __WXML_GLOBAL__.ops_cached.$gwx_25
}
function gz$gwx_26(){
if( __WXML_GLOBAL__.ops_cached.$gwx_26)return __WXML_GLOBAL__.ops_cached.$gwx_26
__WXML_GLOBAL__.ops_cached.$gwx_26=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_26);return __WXML_GLOBAL__.ops_cached.$gwx_26
}
function gz$gwx_27(){
if( __WXML_GLOBAL__.ops_cached.$gwx_27)return __WXML_GLOBAL__.ops_cached.$gwx_27
__WXML_GLOBAL__.ops_cached.$gwx_27=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([1,true])
Z([[4],[[5],[[5],[[5],[1,'left']],[1,'content']],[1,'right']]])
Z([[2,'<'],[[6],[[7],[3,'imgList']],[3,'length']],[1,4]])
})(__WXML_GLOBAL__.ops_cached.$gwx_27);return __WXML_GLOBAL__.ops_cached.$gwx_27
}
function gz$gwx_28(){
if( __WXML_GLOBAL__.ops_cached.$gwx_28)return __WXML_GLOBAL__.ops_cached.$gwx_28
__WXML_GLOBAL__.ops_cached.$gwx_28=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_28);return __WXML_GLOBAL__.ops_cached.$gwx_28
}
function gz$gwx_29(){
if( __WXML_GLOBAL__.ops_cached.$gwx_29)return __WXML_GLOBAL__.ops_cached.$gwx_29
__WXML_GLOBAL__.ops_cached.$gwx_29=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'true'])
Z([[4],[[5],[[5],[[5],[1,'left']],[1,'content']],[1,'right']]])
})(__WXML_GLOBAL__.ops_cached.$gwx_29);return __WXML_GLOBAL__.ops_cached.$gwx_29
}
function gz$gwx_30(){
if( __WXML_GLOBAL__.ops_cached.$gwx_30)return __WXML_GLOBAL__.ops_cached.$gwx_30
__WXML_GLOBAL__.ops_cached.$gwx_30=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'data-v-43bf5d20'])
Z([3,'__i0__'])
Z([3,'item'])
Z([[6],[[7],[3,'config']],[3,'count']])
Z([3,'key'])
Z([3,'__e'])
Z([[4],[[5],[[5],[1,'input data-v-43bf5d20']],[[2,'?:'],[[2,'=='],[[7],[3,'currentFocus']],[[6],[[7],[3,'item']],[3,'index']]],[1,'active'],[1,'']]]])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[1,'hanldeOpenKeyboard']]]]]]]]])
Z([[2,'!='],[[6],[[7],[3,'code']],[[2,'-'],[[6],[[7],[3,'item']],[3,'index']],[1,1]]],[1,undefined]])
Z([[2,'=='],[[7],[3,'currentFocus']],[[6],[[7],[3,'item']],[3,'index']]])
Z(z[6])
Z(z[6])
Z(z[6])
Z(z[1])
Z([[4],[[5],[[5],[[5],[[4],[[5],[[5],[1,'^number']],[[4],[[5],[[4],[[5],[[5],[1,'inputCode']],[[4],[[5],[1,'$event']]]]]]]]]],[[4],[[5],[[5],[1,'^delete']],[[4],[[5],[[4],[[5],[[5],[1,'deleteCode']],[[4],[[5],[1,'$event']]]]]]]]]],[[4],[[5],[[5],[1,'^close']],[[4],[[5],[[4],[[5],[1,'e0']]]]]]]]])
Z([[7],[3,'keyboardVisible']])
})(__WXML_GLOBAL__.ops_cached.$gwx_30);return __WXML_GLOBAL__.ops_cached.$gwx_30
}
function gz$gwx_31(){
if( __WXML_GLOBAL__.ops_cached.$gwx_31)return __WXML_GLOBAL__.ops_cached.$gwx_31
__WXML_GLOBAL__.ops_cached.$gwx_31=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'true'])
Z([[4],[[5],[[5],[[5],[1,'left']],[1,'content']],[1,'right']]])
})(__WXML_GLOBAL__.ops_cached.$gwx_31);return __WXML_GLOBAL__.ops_cached.$gwx_31
}
function gz$gwx_32(){
if( __WXML_GLOBAL__.ops_cached.$gwx_32)return __WXML_GLOBAL__.ops_cached.$gwx_32
__WXML_GLOBAL__.ops_cached.$gwx_32=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([1,true])
Z([[4],[[5],[[5],[[5],[1,'left']],[1,'content']],[1,'right']]])
})(__WXML_GLOBAL__.ops_cached.$gwx_32);return __WXML_GLOBAL__.ops_cached.$gwx_32
}
function gz$gwx_33(){
if( __WXML_GLOBAL__.ops_cached.$gwx_33)return __WXML_GLOBAL__.ops_cached.$gwx_33
__WXML_GLOBAL__.ops_cached.$gwx_33=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_33);return __WXML_GLOBAL__.ops_cached.$gwx_33
}
function gz$gwx_34(){
if( __WXML_GLOBAL__.ops_cached.$gwx_34)return __WXML_GLOBAL__.ops_cached.$gwx_34
__WXML_GLOBAL__.ops_cached.$gwx_34=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'__e'])
Z([[4],[[5],[[4],[[5],[[5],[1,'scroll']],[[4],[[5],[[4],[[5],[[5],[1,'scroll']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([[7],[3,'scrollTop']])
Z([[2,'+'],[[2,'+'],[1,'height:'],[[7],[3,'height']]],[1,'px']])
Z([3,'index'])
Z([3,'item'])
Z([[7],[3,'subCategoryList']])
Z(z[5])
Z(z[1])
Z([[4],[[5],[[5],[1,'nav-right-item']],[[2,'?:'],[[2,'=='],[[7],[3,'index']],[[7],[3,'categorySubActive']]],[1,'subActive'],[1,'']]]])
Z([[4],[[5],[[4],[[5],[[5],[1,'^click']],[[4],[[5],[[4],[[5],[[5],[[5],[1,'categoryClickSub']],[[4],[[5],[[5],[1,'$0']],[[7],[3,'index']]]]],[[4],[[5],[[4],[[5],[[4],[[5],[[5],[[5],[1,'subCategoryList']],[1,'']],[[7],[3,'index']]]]]]]]]]]]]]]])
Z([3,'border:1px solid #EEEEED;border-radius:14px;text-align:center;width:40%;line-height:17px;'])
Z([[6],[[7],[3,'item']],[3,'name']])
})(__WXML_GLOBAL__.ops_cached.$gwx_34);return __WXML_GLOBAL__.ops_cached.$gwx_34
}
function gz$gwx_35(){
if( __WXML_GLOBAL__.ops_cached.$gwx_35)return __WXML_GLOBAL__.ops_cached.$gwx_35
__WXML_GLOBAL__.ops_cached.$gwx_35=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'position:relative;'])
Z([[2,'||'],[[6],[[7],[3,'shopItem']],[3,'contactor']],[[6],[[7],[3,'shopItem']],[3,'telephone']]])
Z([3,'index'])
Z([3,'item'])
Z([[7],[3,'userList']])
Z(z[3])
Z([[2,'=='],[[6],[[7],[3,'item']],[3,'status']],[[6],[[7],[3,'salemanStatus']],[3,'normal']]])
Z([[2,'=='],[[6],[[7],[3,'item']],[3,'status']],[[6],[[7],[3,'salemanStatus']],[3,'inviting']]])
Z([[2,'=='],[[6],[[7],[3,'item']],[3,'status']],[[6],[[7],[3,'salemanStatus']],[3,'free']]])
})(__WXML_GLOBAL__.ops_cached.$gwx_35);return __WXML_GLOBAL__.ops_cached.$gwx_35
}
function gz$gwx_36(){
if( __WXML_GLOBAL__.ops_cached.$gwx_36)return __WXML_GLOBAL__.ops_cached.$gwx_36
__WXML_GLOBAL__.ops_cached.$gwx_36=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'repairInfo bg-white'])
Z([[7],[3,'filesList']])
Z([3,'__e'])
Z([[4],[[5],[[4],[[5],[[5],[1,'^click']],[[4],[[5],[[4],[[5],[1,'viewImg']]]]]]]]])
Z(z[2])
Z([[2,'<'],[[6],[[7],[3,'imgList']],[3,'length']],[1,4]])
})(__WXML_GLOBAL__.ops_cached.$gwx_36);return __WXML_GLOBAL__.ops_cached.$gwx_36
}
function gz$gwx_37(){
if( __WXML_GLOBAL__.ops_cached.$gwx_37)return __WXML_GLOBAL__.ops_cached.$gwx_37
__WXML_GLOBAL__.ops_cached.$gwx_37=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([[2,'<'],[[6],[[7],[3,'imgList']],[3,'length']],[1,4]])
Z([3,'__e'])
Z(z[2])
Z([[4],[[5],[[5],[[4],[[5],[[5],[1,'^confirm']],[[4],[[5],[[4],[[5],[[5],[1,'onSelected']],[[4],[[5],[1,'$event']]]]]]]]]],[[4],[[5],[[5],[1,'^cancel']],[[4],[[5],[[4],[[5],[[5],[1,'onSelected']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([[7],[3,'showPicker']])
Z([1,true])
Z([[7],[3,'type']])
Z([[7],[3,'value']])
})(__WXML_GLOBAL__.ops_cached.$gwx_37);return __WXML_GLOBAL__.ops_cached.$gwx_37
}
function gz$gwx_38(){
if( __WXML_GLOBAL__.ops_cached.$gwx_38)return __WXML_GLOBAL__.ops_cached.$gwx_38
__WXML_GLOBAL__.ops_cached.$gwx_38=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_38);return __WXML_GLOBAL__.ops_cached.$gwx_38
}
function gz$gwx_39(){
if( __WXML_GLOBAL__.ops_cached.$gwx_39)return __WXML_GLOBAL__.ops_cached.$gwx_39
__WXML_GLOBAL__.ops_cached.$gwx_39=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_39);return __WXML_GLOBAL__.ops_cached.$gwx_39
}
function gz$gwx_40(){
if( __WXML_GLOBAL__.ops_cached.$gwx_40)return __WXML_GLOBAL__.ops_cached.$gwx_40
__WXML_GLOBAL__.ops_cached.$gwx_40=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'index'])
Z([3,'item'])
Z([[7],[3,'shopList']])
Z(z[1])
Z([3,'__e'])
Z([3,'shop-list-item'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[[5],[1,'choseShop']],[[4],[[5],[1,'$0']]]],[[4],[[5],[[4],[[5],[[4],[[5],[[5],[[5],[1,'shopList']],[1,'']],[[7],[3,'index']]]]]]]]]]]]]]]])
Z([[6],[[7],[3,'item']],[3,'catalogName']])
Z([[2,'=='],[[7],[3,'type']],[1,'express']])
})(__WXML_GLOBAL__.ops_cached.$gwx_40);return __WXML_GLOBAL__.ops_cached.$gwx_40
}
function gz$gwx_41(){
if( __WXML_GLOBAL__.ops_cached.$gwx_41)return __WXML_GLOBAL__.ops_cached.$gwx_41
__WXML_GLOBAL__.ops_cached.$gwx_41=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'text-gray text-sm'])
Z([[2,'<'],[[6],[[7],[3,'coverList']],[3,'length']],[1,1]])
Z([3,'__e'])
Z([[4],[[5],[[4],[[5],[[5],[1,'^changes']],[[4],[[5],[[4],[[5],[[5],[1,'childClick']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z(z[3])
Z(z[3])
Z([[4],[[5],[[5],[[4],[[5],[[5],[1,'^confirm']],[[4],[[5],[[4],[[5],[[5],[1,'onSelected']],[[4],[[5],[1,'$event']]]]]]]]]],[[4],[[5],[[5],[1,'^cancel']],[[4],[[5],[[4],[[5],[[5],[1,'onSelected']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([[7],[3,'showPicker']])
Z([1,true])
Z([[7],[3,'type']])
Z([[7],[3,'value']])
})(__WXML_GLOBAL__.ops_cached.$gwx_41);return __WXML_GLOBAL__.ops_cached.$gwx_41
}
function gz$gwx_42(){
if( __WXML_GLOBAL__.ops_cached.$gwx_42)return __WXML_GLOBAL__.ops_cached.$gwx_42
__WXML_GLOBAL__.ops_cached.$gwx_42=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'__e'])
Z([[4],[[5],[[4],[[5],[[5],[1,'scroll']],[[4],[[5],[[4],[[5],[[5],[1,'scroll']],[[4],[[5],[1,'$event']]]]]]]]]]])
Z([[7],[3,'scrollTop']])
Z([[2,'+'],[[2,'+'],[1,'height:'],[[7],[3,'height']]],[1,'px']])
Z([3,'index'])
Z([3,'item'])
Z([[7],[3,'subCategoryList']])
Z(z[5])
Z(z[1])
Z([[4],[[5],[[5],[1,'nav-right-item ']],[[2,'?:'],[[2,'=='],[[7],[3,'index']],[[7],[3,'categorySubActive']]],[1,'subActive'],[1,'']]]])
Z([[4],[[5],[[4],[[5],[[5],[1,'^click']],[[4],[[5],[[4],[[5],[[5],[[5],[1,'categoryClickSub']],[[4],[[5],[[5],[1,'$0']],[[7],[3,'index']]]]],[[4],[[5],[[4],[[5],[[4],[[5],[[5],[[5],[1,'subCategoryList']],[1,'']],[[7],[3,'index']]]]]]]]]]]]]]]])
Z([3,'text-align:center;width:55%;line-height:17px;'])
Z([[6],[[7],[3,'item']],[3,'name']])
Z([[4],[[5],[1,'default']]])
})(__WXML_GLOBAL__.ops_cached.$gwx_42);return __WXML_GLOBAL__.ops_cached.$gwx_42
}
function gz$gwx_43(){
if( __WXML_GLOBAL__.ops_cached.$gwx_43)return __WXML_GLOBAL__.ops_cached.$gwx_43
__WXML_GLOBAL__.ops_cached.$gwx_43=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'page show'])
Z([3,'true'])
Z([[2,'!='],[[6],[[7],[3,'repaitItem']],[3,'status']],[1,1]])
Z([[2,'=='],[[6],[[7],[3,'repaitItem']],[3,'status']],[1,4]])
Z([3,'__e'])
Z([[4],[[5],[[4],[[5],[[5],[1,'^click']],[[4],[[5],[[4],[[5],[1,'viewImg']]]]]]]]])
Z([[7],[3,'avatar']])
})(__WXML_GLOBAL__.ops_cached.$gwx_43);return __WXML_GLOBAL__.ops_cached.$gwx_43
}
function gz$gwx_44(){
if( __WXML_GLOBAL__.ops_cached.$gwx_44)return __WXML_GLOBAL__.ops_cached.$gwx_44
__WXML_GLOBAL__.ops_cached.$gwx_44=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'index'])
Z([3,'item'])
Z([[6],[[7],[3,'$root']],[3,'l0']])
Z(z[1])
Z([3,'__e'])
Z([[4],[[5],[[2,'?:'],[[2,'=='],[[7],[3,'shopIndex']],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'id']]],[1,'bg-pink'],[1,'']]]])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[[5],[1,'chooseShop']],[[4],[[5],[[5],[1,'$0']],[[7],[3,'index']]]]],[[4],[[5],[[4],[[5],[[4],[[5],[[5],[[5],[1,'shopList']],[1,'']],[[7],[3,'index']]]]]]]]]]]]]]]])
Z([3,'padding:5px 10px;border:1px solid #EEEEED;border-radius:10px;margin-bottom:10px;'])
Z([[2,'&&'],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'contactor']],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'telephone']]])
})(__WXML_GLOBAL__.ops_cached.$gwx_44);return __WXML_GLOBAL__.ops_cached.$gwx_44
}
function gz$gwx_45(){
if( __WXML_GLOBAL__.ops_cached.$gwx_45)return __WXML_GLOBAL__.ops_cached.$gwx_45
__WXML_GLOBAL__.ops_cached.$gwx_45=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'bg-white'])
Z([1,true])
Z([[4],[[5],[[5],[1,'left']],[1,'content']]])
})(__WXML_GLOBAL__.ops_cached.$gwx_45);return __WXML_GLOBAL__.ops_cached.$gwx_45
}
function gz$gwx_46(){
if( __WXML_GLOBAL__.ops_cached.$gwx_46)return __WXML_GLOBAL__.ops_cached.$gwx_46
__WXML_GLOBAL__.ops_cached.$gwx_46=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'index'])
Z([3,'item'])
Z([[6],[[7],[3,'$root']],[3,'l0']])
Z(z[1])
Z([3,'__e'])
Z([3,'list-item'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[[5],[1,'orderDetail']],[[4],[[5],[1,'$0']]]],[[4],[[5],[[4],[[5],[[4],[[5],[[5],[[5],[1,'repairList']],[1,'']],[[7],[3,'index']]]]]]]]]]]]]]]])
Z([3,'list-content-item'])
Z([3,'border-top:1px solid #EEEEED;padding-top:10px;text-align:right;margin-bottom:7px;'])
Z([[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'status']],[[6],[[7],[3,'repairStatus']],[3,'treating']]])
Z([[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'status']],[[6],[[7],[3,'repairStatus']],[3,'refuse']]])
Z([[2,'=='],[[6],[[6],[[7],[3,'item']],[3,'$orig']],[3,'status']],[[6],[[7],[3,'repairStatus']],[3,'finish']]])
})(__WXML_GLOBAL__.ops_cached.$gwx_46);return __WXML_GLOBAL__.ops_cached.$gwx_46
}
function gz$gwx_47(){
if( __WXML_GLOBAL__.ops_cached.$gwx_47)return __WXML_GLOBAL__.ops_cached.$gwx_47
__WXML_GLOBAL__.ops_cached.$gwx_47=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'index'])
Z([3,'item'])
Z([[7],[3,'shopList']])
Z(z[1])
Z([3,'__e'])
Z([3,'shop-item flex justify-start borderBottom'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[[5],[1,'checkShopDetail']],[[4],[[5],[1,'$0']]]],[[4],[[5],[[4],[[5],[[4],[[5],[[5],[[5],[1,'shopList']],[1,'']],[[7],[3,'index']]]]]]]]]]]]]]]])
Z([3,'padding:24px 10px 18px 14px;'])
Z([3,'width:70%;'])
Z([[6],[[7],[3,'item']],[3,'catalogName']])
Z([[2,'||'],[[6],[[7],[3,'item']],[3,'contactor']],[[6],[[7],[3,'item']],[3,'telephone']]])
})(__WXML_GLOBAL__.ops_cached.$gwx_47);return __WXML_GLOBAL__.ops_cached.$gwx_47
}
function gz$gwx_48(){
if( __WXML_GLOBAL__.ops_cached.$gwx_48)return __WXML_GLOBAL__.ops_cached.$gwx_48
__WXML_GLOBAL__.ops_cached.$gwx_48=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_48);return __WXML_GLOBAL__.ops_cached.$gwx_48
}
function gz$gwx_49(){
if( __WXML_GLOBAL__.ops_cached.$gwx_49)return __WXML_GLOBAL__.ops_cached.$gwx_49
__WXML_GLOBAL__.ops_cached.$gwx_49=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([[2,'<'],[[6],[[7],[3,'imgList']],[3,'length']],[1,4]])
})(__WXML_GLOBAL__.ops_cached.$gwx_49);return __WXML_GLOBAL__.ops_cached.$gwx_49
}
function gz$gwx_50(){
if( __WXML_GLOBAL__.ops_cached.$gwx_50)return __WXML_GLOBAL__.ops_cached.$gwx_50
__WXML_GLOBAL__.ops_cached.$gwx_50=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'__e'])
Z([[4],[[5],[[4],[[5],[[5],[1,'^changes']],[[4],[[5],[[4],[[5],[[5],[1,'childClick']],[[4],[[5],[1,'$event']]]]]]]]]]])
})(__WXML_GLOBAL__.ops_cached.$gwx_50);return __WXML_GLOBAL__.ops_cached.$gwx_50
}
function gz$gwx_51(){
if( __WXML_GLOBAL__.ops_cached.$gwx_51)return __WXML_GLOBAL__.ops_cached.$gwx_51
__WXML_GLOBAL__.ops_cached.$gwx_51=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([1,true])
Z([[4],[[5],[[5],[1,'left']],[1,'content']]])
Z([3,'width:78%;'])
Z([[7],[3,'shopItem']])
Z([[6],[[7],[3,'shopItem']],[3,'managerMobile']])
})(__WXML_GLOBAL__.ops_cached.$gwx_51);return __WXML_GLOBAL__.ops_cached.$gwx_51
}
function gz$gwx_52(){
if( __WXML_GLOBAL__.ops_cached.$gwx_52)return __WXML_GLOBAL__.ops_cached.$gwx_52
__WXML_GLOBAL__.ops_cached.$gwx_52=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'bg-white'])
Z([[2,'=='],[[7],[3,'TabCur']],[1,0]])
Z([[2,'=='],[[7],[3,'TabCur']],[1,1]])
Z([[2,'=='],[[7],[3,'TabCur']],[1,2]])
Z([[2,'=='],[[7],[3,'TabCur']],[1,3]])
})(__WXML_GLOBAL__.ops_cached.$gwx_52);return __WXML_GLOBAL__.ops_cached.$gwx_52
}
function gz$gwx_53(){
if( __WXML_GLOBAL__.ops_cached.$gwx_53)return __WXML_GLOBAL__.ops_cached.$gwx_53
__WXML_GLOBAL__.ops_cached.$gwx_53=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([1,true])
Z([[4],[[5],[[5],[[5],[1,'left']],[1,'content']],[1,'right']]])
})(__WXML_GLOBAL__.ops_cached.$gwx_53);return __WXML_GLOBAL__.ops_cached.$gwx_53
}
function gz$gwx_54(){
if( __WXML_GLOBAL__.ops_cached.$gwx_54)return __WXML_GLOBAL__.ops_cached.$gwx_54
__WXML_GLOBAL__.ops_cached.$gwx_54=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([[2,'=='],[[7],[3,'TabCur']],[1,0]])
Z([[2,'=='],[[7],[3,'TabCur']],[1,1]])
Z([[2,'=='],[[7],[3,'TabCur']],[1,2]])
})(__WXML_GLOBAL__.ops_cached.$gwx_54);return __WXML_GLOBAL__.ops_cached.$gwx_54
}
function gz$gwx_55(){
if( __WXML_GLOBAL__.ops_cached.$gwx_55)return __WXML_GLOBAL__.ops_cached.$gwx_55
__WXML_GLOBAL__.ops_cached.$gwx_55=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_55);return __WXML_GLOBAL__.ops_cached.$gwx_55
}
function gz$gwx_56(){
if( __WXML_GLOBAL__.ops_cached.$gwx_56)return __WXML_GLOBAL__.ops_cached.$gwx_56
__WXML_GLOBAL__.ops_cached.$gwx_56=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
Z([3,'__l'])
Z([3,'index'])
Z([3,'item'])
Z([[7],[3,'options']])
Z(z[1])
Z([3,'__e'])
Z([[4],[[5],[[4],[[5],[[5],[1,'tap']],[[4],[[5],[[4],[[5],[[5],[1,'showOperateItem']],[[4],[[5],[[7],[3,'index']]]]]]]]]]]])
Z([3,'position:relative;'])
Z([[2,'&&'],[[6],[[7],[3,'item']],[3,'num']],[[2,'>'],[[7],[3,'todoNum']],[1,0]]])
Z([[7],[3,'companyObj']])
})(__WXML_GLOBAL__.ops_cached.$gwx_56);return __WXML_GLOBAL__.ops_cached.$gwx_56
}
function gz$gwx_57(){
if( __WXML_GLOBAL__.ops_cached.$gwx_57)return __WXML_GLOBAL__.ops_cached.$gwx_57
__WXML_GLOBAL__.ops_cached.$gwx_57=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_57);return __WXML_GLOBAL__.ops_cached.$gwx_57
}
function gz$gwx_58(){
if( __WXML_GLOBAL__.ops_cached.$gwx_58)return __WXML_GLOBAL__.ops_cached.$gwx_58
__WXML_GLOBAL__.ops_cached.$gwx_58=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_58);return __WXML_GLOBAL__.ops_cached.$gwx_58
}
function gz$gwx_59(){
if( __WXML_GLOBAL__.ops_cached.$gwx_59)return __WXML_GLOBAL__.ops_cached.$gwx_59
__WXML_GLOBAL__.ops_cached.$gwx_59=[];
(function(z){var a=11;function Z(ops){z.push(ops)}
})(__WXML_GLOBAL__.ops_cached.$gwx_59);return __WXML_GLOBAL__.ops_cached.$gwx_59
}
__WXML_GLOBAL__.ops_set.$gwx=z;
__WXML_GLOBAL__.ops_init.$gwx=true;
var nv_require=function(){var nnm={};var nom={};return function(n){return function(){if(!nnm[n]) return undefined;try{if(!nom[n])nom[n]=nnm[n]();return nom[n];}catch(e){e.message=e.message.replace(/nv_/g,'');var tmp = e.stack.substring(0,e.stack.lastIndexOf(n));e.stack = tmp.substring(0,tmp.lastIndexOf('\n'));e.stack = e.stack.replace(/\snv_/g,' ');e.stack = $gstack(e.stack);e.stack += '\n    at ' + n.substring(2);console.error(e);}
}}}()
var x=['./colorui/components/cu-custom.wxml','./components/NAUI-card/NAUI-card.wxml','./components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox-item.wxml','./components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox.wxml','./components/code/number-keyboard.wxml','./components/collapse/uni-collapse-item.wxml','./components/collapse/uni-collapse.wxml','./components/collapse/uni-icon.wxml','./components/head-tab.wxml','./components/jm-address/jm-address.wxml','./components/popmodal.wxml','./components/uni-grid/uni-grid.wxml','./components/uni/mx-datepicker/mx-datepicker.wxml','./components/uni/uni-tag/uni-tag.wxml','./pages/all-item-content/detail-content/detail-content.wxml','./pages/all-item-content/index-more/index-more.wxml','./pages/login-design/design/design.wxml','./pages/login-design/find-password/find-password.wxml','./pages/login-design/login/login.wxml','./pages/login-design/reset-password/reset-password.wxml','./pages/tab-item-content/message-center/chat/chat.wxml','./pages/tab-item-content/message-center/group-list/group-list.wxml','./pages/tab-item-content/mine-center/account-manager/account-manager.wxml','./pages/tab-item-content/mine-center/basic-setting/basic-setting.wxml','./pages/tab-item-content/mine-center/change-name/change-name.wxml','./pages/tab-item-content/mine-center/change-telephone/change-telephone.wxml','./pages/tab-item-content/mine-center/create-suggestion/create-suggestion.wxml','./pages/tab-item-content/mine-center/cut-image/cut-image.wxml','./pages/tab-item-content/mine-center/edit-password/edit-password.wxml','./pages/tab-item-content/mine-center/input-code/input-code.wxml','./pages/tab-item-content/mine-center/suggestion-list/suggestion-list.wxml','./pages/tab-item-content/mine-center/write-motto/write-motto.wxml','./pages/tab-item-content/notice-center/notice-center.wxml','./pages/tab-item-content/shop-center/category-item/category-item.wxml','./pages/tab-item-content/shop-center/clerk-list/clerk-list.wxml','./pages/tab-item-content/shop-center/create-comment/create-comment.wxml','./pages/tab-item-content/shop-center/create-order/create-order.wxml','./pages/tab-item-content/shop-center/invite-join/invite-join.wxml','./pages/tab-item-content/shop-center/join-shop/join-shop.wxml','./pages/tab-item-content/shop-center/near-shop-list/near-shop-list.wxml','./pages/tab-item-content/shop-center/record-shop/record-shop.wxml','./pages/tab-item-content/shop-center/repair-item/repair-item.wxml','./pages/tab-item-content/shop-center/repair-order-item/repair-order-item.wxml','./pages/tab-item-content/shop-center/search-more-shop/search-more-shop.wxml','./pages/tab-item-content/shop-center/search-shop/search-shop.wxml','./pages/tab-item-content/shop-center/shop-center.wxml','./pages/tab-item-content/shop-center/shop-list/shop-list.wxml','./pages/tab-item-content/work-center/chose-copy/chose-copy.wxml','./pages/tab-item-content/work-center/create-log/create-log.wxml','./pages/tab-item-content/work-center/express-center/create-address/create-address.wxml','./pages/tab-item-content/work-center/express-center/create-express/create-express.wxml','./pages/tab-item-content/work-center/express-center/express-index/express-index.wxml','./pages/tab-item-content/work-center/log-detail/log-detail.wxml','./pages/tab-item-content/work-center/work-index/work-index.wxml','./pages/tab-item-content/work-center/work-log/work-log.wxml','./pages/tab-item/index/index.wxml','./pages/tab-item/message/message.wxml','./pages/tab-item/mine/mine.wxml','./pages/tab-item/work/work.wxml'];d_[x[0]]={}
var m0=function(e,s,r,gg){
var z=gz$gwx_1()
cs.push("./colorui/components/cu-custom.wxml:view:1:1")
var oB=_n('view')
_rz(z,oB,'bind:__l',0,e,s,gg)
cs.push("./colorui/components/cu-custom.wxml:view:1:89")
var xC=_mz(z,'view',['class',1,'style',1],[],e,s,gg)
cs.push("./colorui/components/cu-custom.wxml:slot:1:216")
var oD=_n('slot')
_rz(z,oD,'name',3,e,s,gg)
cs.pop()
_(xC,oD)
cs.push("./colorui/components/cu-custom.wxml:slot:1:310")
var fE=_n('slot')
_rz(z,fE,'name',4,e,s,gg)
cs.pop()
_(xC,fE)
cs.push("./colorui/components/cu-custom.wxml:slot:1:345")
var cF=_n('slot')
_rz(z,cF,'name',5,e,s,gg)
cs.pop()
_(xC,cF)
cs.pop()
_(oB,xC)
cs.pop()
_(r,oB)
return r
}
e_[x[0]]={f:m0,j:[],i:[],ti:[],ic:[]}
d_[x[1]]={}
var m1=function(e,s,r,gg){
var z=gz$gwx_2()
cs.push("./components/NAUI-card/NAUI-card.wxml:view:1:1")
var oH=_mz(z,'view',['bind:__l',0,'class',1],[],e,s,gg)
cs.push("./components/NAUI-card/NAUI-card.wxml:view:1:146")
var cI=_n('view')
_rz(z,cI,'class',2,e,s,gg)
var oJ=_v()
_(cI,oJ)
if(_oz(z,3,e,s,gg)){oJ.wxVkey=1
cs.push("./components/NAUI-card/NAUI-card.wxml:block:1:343")
cs.pop()
}
cs.push("./components/NAUI-card/NAUI-card.wxml:view:1:468")
var lK=_n('view')
_rz(z,lK,'class',4,e,s,gg)
var aL=_v()
_(lK,aL)
if(_oz(z,5,e,s,gg)){aL.wxVkey=1
cs.push("./components/NAUI-card/NAUI-card.wxml:block:1:570")
cs.pop()
}
var tM=_v()
_(lK,tM)
if(_oz(z,6,e,s,gg)){tM.wxVkey=1
cs.push("./components/NAUI-card/NAUI-card.wxml:block:1:689")
cs.pop()
}
aL.wxXCkey=1
tM.wxXCkey=1
cs.pop()
_(cI,lK)
oJ.wxXCkey=1
cs.pop()
_(oH,cI)
cs.pop()
_(r,oH)
return r
}
e_[x[1]]={f:m1,j:[],i:[],ti:[],ic:[]}
d_[x[2]]={}
var m2=function(e,s,r,gg){
var z=gz$gwx_3()
return r
}
e_[x[2]]={f:m2,j:[],i:[],ti:[],ic:[]}
d_[x[3]]={}
var m3=function(e,s,r,gg){
var z=gz$gwx_4()
cs.push("./components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox.wxml:view:1:1")
var oP=_mz(z,'view',['bind:__l',0,'class',1],[],e,s,gg)
var xQ=_v()
_(oP,xQ)
cs.push("./components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox.wxml:block:1:57")
var oR=function(cT,fS,hU,gg){
cs.push("./components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox.wxml:filter-radio-item:1:134")
var cW=_mz(z,'filter-radio-item',['bind:change',6,'checked',1,'data-event-opts',2,'name',3,'value',4],[],cT,fS,gg)
cs.pop()
_(hU,cW)
return hU
}
xQ.wxXCkey=4
_2z(z,4,oR,e,s,gg,xQ,'item','idx','idx')
cs.pop()
cs.pop()
_(r,oP)
return r
}
e_[x[3]]={f:m3,j:[],i:[],ti:[],ic:[]}
d_[x[4]]={}
var m4=function(e,s,r,gg){
var z=gz$gwx_5()
return r
}
e_[x[4]]={f:m4,j:[],i:[],ti:[],ic:[]}
d_[x[5]]={}
var m5=function(e,s,r,gg){
var z=gz$gwx_6()
cs.push("./components/collapse/uni-collapse-item.wxml:view:1:1")
var aZ=_mz(z,'view',['bind:__l',0,'class',1,'hoverClass',1],[],e,s,gg)
cs.push("./components/collapse/uni-collapse-item.wxml:view:1:140")
var t1=_mz(z,'view',['bindtap',3,'class',1,'data-event-opts',2],[],e,s,gg)
var e2=_v()
_(t1,e2)
if(_oz(z,6,e,s,gg)){e2.wxVkey=1
cs.push("./components/collapse/uni-collapse-item.wxml:block:1:250")
cs.pop()
}
cs.push("./components/collapse/uni-collapse-item.wxml:uni-icon:1:578")
var b3=_mz(z,'uni-icon',['color',7,'size',1,'type',2],[],e,s,gg)
cs.pop()
_(t1,b3)
e2.wxXCkey=1
cs.pop()
_(aZ,t1)
cs.push("./components/collapse/uni-collapse-item.wxml:slot:1:880")
var o4=_n('slot')
cs.pop()
_(aZ,o4)
cs.pop()
_(r,aZ)
return r
}
e_[x[5]]={f:m5,j:[],i:[],ti:[],ic:[]}
d_[x[6]]={}
var m6=function(e,s,r,gg){
var z=gz$gwx_7()
cs.push("./components/collapse/uni-collapse.wxml:view:1:1")
var o6=_mz(z,'view',['bind:__l',0,'class',1],[],e,s,gg)
cs.push("./components/collapse/uni-collapse.wxml:slot:1:43")
var f7=_n('slot')
cs.pop()
_(o6,f7)
cs.pop()
_(r,o6)
return r
}
e_[x[6]]={f:m6,j:[],i:[],ti:[],ic:[]}
d_[x[7]]={}
var m7=function(e,s,r,gg){
var z=gz$gwx_8()
return r
}
e_[x[7]]={f:m7,j:[],i:[],ti:[],ic:[]}
d_[x[8]]={}
var m8=function(e,s,r,gg){
var z=gz$gwx_9()
cs.push("./components/head-tab.wxml:view:1:1")
var o0=_n('view')
_rz(z,o0,'bind:__l',0,e,s,gg)
cs.push("./components/head-tab.wxml:view:1:22")
var cAB=_n('view')
_rz(z,cAB,'class',1,e,s,gg)
var oBB=_v()
_(cAB,oBB)
if(_oz(z,2,e,s,gg)){oBB.wxVkey=1
cs.push("./components/head-tab.wxml:block:1:51")
cs.push("./components/head-tab.wxml:slot:1:82")
var lCB=_n('slot')
_rz(z,lCB,'name',3,e,s,gg)
cs.pop()
_(oBB,lCB)
cs.pop()
}
else{oBB.wxVkey=2
cs.push("./components/head-tab.wxml:block:1:115")
cs.pop()
}
cs.push("./components/head-tab.wxml:view:1:235")
var aDB=_n('view')
_rz(z,aDB,'style',4,e,s,gg)
var tEB=_v()
_(aDB,tEB)
if(_oz(z,5,e,s,gg)){tEB.wxVkey=1
cs.push("./components/head-tab.wxml:block:1:318")
cs.push("./components/head-tab.wxml:slot:1:352")
var eFB=_n('slot')
_rz(z,eFB,'name',6,e,s,gg)
cs.pop()
_(tEB,eFB)
cs.pop()
}
else{tEB.wxVkey=2
cs.push("./components/head-tab.wxml:block:1:388")
cs.pop()
}
tEB.wxXCkey=1
cs.pop()
_(cAB,aDB)
cs.push("./components/head-tab.wxml:slot:1:507")
var bGB=_n('slot')
_rz(z,bGB,'name',7,e,s,gg)
cs.pop()
_(cAB,bGB)
oBB.wxXCkey=1
cs.pop()
_(o0,cAB)
cs.pop()
_(r,o0)
return r
}
e_[x[8]]={f:m8,j:[],i:[],ti:[],ic:[]}
d_[x[9]]={}
var m9=function(e,s,r,gg){
var z=gz$gwx_10()
return r
}
e_[x[9]]={f:m9,j:[],i:[],ti:[],ic:[]}
d_[x[10]]={}
var m10=function(e,s,r,gg){
var z=gz$gwx_11()
cs.push("./components/popmodal.wxml:view:1:1")
var oJB=_mz(z,'view',['bind:__l',0,'class',1],[],e,s,gg)
cs.push("./components/popmodal.wxml:slot:1:113")
var fKB=_n('slot')
_rz(z,fKB,'name',2,e,s,gg)
cs.pop()
_(oJB,fKB)
cs.pop()
_(r,oJB)
return r
}
e_[x[10]]={f:m10,j:[],i:[],ti:[],ic:[]}
d_[x[11]]={}
var m11=function(e,s,r,gg){
var z=gz$gwx_12()
cs.push("./components/uni-grid/uni-grid.wxml:view:1:1")
var hMB=_mz(z,'view',['bind:__l',0,'class',1],[],e,s,gg)
var oNB=_v()
_(hMB,oNB)
cs.push("./components/uni-grid/uni-grid.wxml:block:1:142")
var cOB=function(lQB,oPB,aRB,gg){
var eTB=_v()
_(aRB,eTB)
cs.push("./components/uni-grid/uni-grid.wxml:block:1:249")
var bUB=function(xWB,oVB,oXB,gg){
cs.push("./components/uni-grid/uni-grid.wxml:view:1:330")
var cZB=_mz(z,'view',['bindtap',10,'class',1,'data-event-opts',2,'hoverClass',3,'hoverStartTime',4,'hoverStayTime',5,'style',6],[],xWB,oVB,gg)
var h1B=_v()
_(cZB,h1B)
if(_oz(z,17,xWB,oVB,gg)){h1B.wxVkey=1
cs.push("./components/uni-grid/uni-grid.wxml:block:1:646")
cs.pop()
}
h1B.wxXCkey=1
cs.pop()
_(oXB,cZB)
return oXB
}
eTB.wxXCkey=2
_2z(z,8,bUB,lQB,oPB,gg,eTB,'item','index','index')
cs.pop()
return aRB
}
oNB.wxXCkey=2
_2z(z,4,cOB,e,s,gg,oNB,'items','i','i')
cs.pop()
cs.pop()
_(r,hMB)
return r
}
e_[x[11]]={f:m11,j:[],i:[],ti:[],ic:[]}
d_[x[12]]={}
var m12=function(e,s,r,gg){
var z=gz$gwx_13()
var c3B=_v()
_(r,c3B)
if(_oz(z,1,e,s,gg)){c3B.wxVkey=1
cs.push("./components/uni/mx-datepicker/mx-datepicker.wxml:block:1:1")
cs.push("./components/uni/mx-datepicker/mx-datepicker.wxml:view:1:42")
var o4B=_mz(z,'view',['bind:__l',2,'class',1],[],e,s,gg)
var l5B=_v()
_(o4B,l5B)
if(_oz(z,4,e,s,gg)){l5B.wxVkey=1
cs.push("./components/uni/mx-datepicker/mx-datepicker.wxml:block:1:94")
cs.push("./components/uni/mx-datepicker/mx-datepicker.wxml:view:1:2739")
var t7B=_n('view')
_rz(z,t7B,'class',5,e,s,gg)
var e8B=_v()
_(t7B,e8B)
if(_oz(z,6,e,s,gg)){e8B.wxVkey=1
cs.push("./components/uni/mx-datepicker/mx-datepicker.wxml:block:1:2794")
cs.push("./components/uni/mx-datepicker/mx-datepicker.wxml:block:1:2827")
var b9B=_v()
_(e8B,b9B)
if(_oz(z,8,e,s,gg)){b9B.wxVkey=1
cs.push("./components/uni/mx-datepicker/mx-datepicker.wxml:block:1:3033")
cs.pop()
}
var o0B=_v()
_(e8B,o0B)
if(_oz(z,9,e,s,gg)){o0B.wxVkey=1
cs.push("./components/uni/mx-datepicker/mx-datepicker.wxml:block:1:3506")
cs.pop()
}
b9B.wxXCkey=1
o0B.wxXCkey=1
cs.pop()
cs.pop()
}
else{e8B.wxVkey=2
cs.push("./components/uni/mx-datepicker/mx-datepicker.wxml:block:1:3820")
cs.pop()
}
e8B.wxXCkey=1
cs.pop()
_(l5B,t7B)
cs.pop()
}
var a6B=_v()
_(o4B,a6B)
if(_oz(z,10,e,s,gg)){a6B.wxVkey=1
cs.push("./components/uni/mx-datepicker/mx-datepicker.wxml:block:1:4374")
cs.push("./components/uni/mx-datepicker/mx-datepicker.wxml:picker-view:1:4632")
var xAC=_mz(z,'picker-view',['bindchange',11,'class',1,'data-event-opts',2,'indicatorClass',3,'value',4],[],e,s,gg)
var oBC=_v()
_(xAC,oBC)
if(_oz(z,16,e,s,gg)){oBC.wxVkey=1
cs.push("./components/uni/mx-datepicker/mx-datepicker.wxml:block:1:5234")
cs.pop()
}
oBC.wxXCkey=1
cs.pop()
_(a6B,xAC)
cs.pop()
}
l5B.wxXCkey=1
a6B.wxXCkey=1
cs.pop()
_(c3B,o4B)
cs.pop()
}
c3B.wxXCkey=1
return r
}
e_[x[12]]={f:m12,j:[],i:[],ti:[],ic:[]}
d_[x[13]]={}
var m13=function(e,s,r,gg){
var z=gz$gwx_14()
var cDC=_v()
_(r,cDC)
if(_oz(z,1,e,s,gg)){cDC.wxVkey=1
cs.push("./components/uni/uni-tag/uni-tag.wxml:block:1:1")
cs.pop()
}
cDC.wxXCkey=1
return r
}
e_[x[13]]={f:m13,j:[],i:[],ti:[],ic:[]}
d_[x[14]]={}
var m14=function(e,s,r,gg){
var z=gz$gwx_15()
cs.push("./pages/all-item-content/detail-content/detail-content.wxml:view:1:1")
var oFC=_mz(z,'view',['bind:__l',0,'class',1],[],e,s,gg)
cs.push("./pages/all-item-content/detail-content/detail-content.wxml:view:1:46")
var cGC=_n('view')
_rz(z,cGC,'class',2,e,s,gg)
var oHC=_v()
_(cGC,oHC)
if(_oz(z,3,e,s,gg)){oHC.wxVkey=1
cs.push("./pages/all-item-content/detail-content/detail-content.wxml:block:1:774")
cs.pop()
}
var lIC=_v()
_(cGC,lIC)
if(_oz(z,4,e,s,gg)){lIC.wxVkey=1
cs.push("./pages/all-item-content/detail-content/detail-content.wxml:block:1:914")
cs.pop()
}
oHC.wxXCkey=1
lIC.wxXCkey=1
cs.pop()
_(oFC,cGC)
cs.pop()
_(r,oFC)
return r
}
e_[x[14]]={f:m14,j:[],i:[],ti:[],ic:[]}
d_[x[15]]={}
var m15=function(e,s,r,gg){
var z=gz$gwx_16()
cs.push("./pages/all-item-content/index-more/index-more.wxml:view:1:1")
var tKC=_n('view')
_rz(z,tKC,'bind:__l',0,e,s,gg)
cs.push("./pages/all-item-content/index-more/index-more.wxml:cu-custom:1:22")
var bMC=_mz(z,'cu-custom',['isBack',1,'vueSlots',1],[],e,s,gg)
cs.pop()
_(tKC,bMC)
var eLC=_v()
_(tKC,eLC)
if(_oz(z,3,e,s,gg)){eLC.wxVkey=1
cs.push("./pages/all-item-content/index-more/index-more.wxml:block:1:279")
cs.pop()
}
eLC.wxXCkey=1
cs.pop()
_(r,tKC)
return r
}
e_[x[15]]={f:m15,j:[],i:[],ti:[],ic:[]}
d_[x[16]]={}
var m16=function(e,s,r,gg){
var z=gz$gwx_17()
cs.push("./pages/login-design/design/design.wxml:view:1:1")
var xOC=_mz(z,'view',['bind:__l',0,'class',1],[],e,s,gg)
cs.push("./pages/login-design/design/design.wxml:pop-modal:1:2808")
var oPC=_mz(z,'pop-modal',['isShow',2,'vueSlots',1],[],e,s,gg)
cs.push("./pages/login-design/design/design.wxml:view:1:2867")
var fQC=_n('view')
_rz(z,fQC,'slot',4,e,s,gg)
var cRC=_v()
_(fQC,cRC)
if(_oz(z,5,e,s,gg)){cRC.wxVkey=1
cs.push("./pages/login-design/design/design.wxml:block:1:2888")
cs.pop()
}
var hSC=_v()
_(fQC,hSC)
if(_oz(z,6,e,s,gg)){hSC.wxVkey=1
cs.push("./pages/login-design/design/design.wxml:block:1:2967")
cs.pop()
}
cRC.wxXCkey=1
hSC.wxXCkey=1
cs.pop()
_(oPC,fQC)
cs.pop()
_(xOC,oPC)
cs.pop()
_(r,xOC)
return r
}
e_[x[16]]={f:m16,j:[],i:[],ti:[],ic:[]}
d_[x[17]]={}
var m17=function(e,s,r,gg){
var z=gz$gwx_18()
return r
}
e_[x[17]]={f:m17,j:[],i:[],ti:[],ic:[]}
d_[x[18]]={}
var m18=function(e,s,r,gg){
var z=gz$gwx_19()
return r
}
e_[x[18]]={f:m18,j:[],i:[],ti:[],ic:[]}
d_[x[19]]={}
var m19=function(e,s,r,gg){
var z=gz$gwx_20()
return r
}
e_[x[19]]={f:m19,j:[],i:[],ti:[],ic:[]}
d_[x[20]]={}
var m20=function(e,s,r,gg){
var z=gz$gwx_21()
return r
}
e_[x[20]]={f:m20,j:[],i:[],ti:[],ic:[]}
d_[x[21]]={}
var m21=function(e,s,r,gg){
var z=gz$gwx_22()
cs.push("./pages/tab-item-content/message-center/group-list/group-list.wxml:view:1:1")
var tYC=_n('view')
_rz(z,tYC,'bind:__l',0,e,s,gg)
cs.push("./pages/tab-item-content/message-center/group-list/group-list.wxml:uni-collapse:1:627")
var eZC=_mz(z,'uni-collapse',['accordion',1,'vueSlots',1],[],e,s,gg)
var b1C=_v()
_(eZC,b1C)
cs.push("./pages/tab-item-content/message-center/group-list/group-list.wxml:block:1:686")
var o2C=function(o4C,x3C,f5C,gg){
cs.push("./pages/tab-item-content/message-center/group-list/group-list.wxml:uni-collapse-item:1:775")
var h7C=_mz(z,'uni-collapse-item',['title',7,'vueSlots',1],[],o4C,x3C,gg)
cs.pop()
_(f5C,h7C)
return f5C
}
b1C.wxXCkey=4
_2z(z,5,o2C,e,s,gg,b1C,'item','index','index')
cs.pop()
cs.pop()
_(tYC,eZC)
cs.pop()
_(r,tYC)
return r
}
e_[x[21]]={f:m21,j:[],i:[],ti:[],ic:[]}
d_[x[22]]={}
var m22=function(e,s,r,gg){
var z=gz$gwx_23()
return r
}
e_[x[22]]={f:m22,j:[],i:[],ti:[],ic:[]}
d_[x[23]]={}
var m23=function(e,s,r,gg){
var z=gz$gwx_24()
cs.push("./pages/tab-item-content/mine-center/basic-setting/basic-setting.wxml:view:1:1")
var o0C=_n('view')
_rz(z,o0C,'bind:__l',0,e,s,gg)
cs.push("./pages/tab-item-content/mine-center/basic-setting/basic-setting.wxml:cu-custom:1:22")
var lAD=_mz(z,'cu-custom',['bgColor',1,'isBack',1,'vueSlots',2],[],e,s,gg)
cs.pop()
_(o0C,lAD)
cs.push("./pages/tab-item-content/mine-center/basic-setting/basic-setting.wxml:view:1:2059")
var aBD=_mz(z,'view',['bindtap',4,'class',1,'data-event-opts',2],[],e,s,gg)
cs.push("./pages/tab-item-content/mine-center/basic-setting/basic-setting.wxml:view:1:2248")
var tCD=_n('view')
var eDD=_v()
_(tCD,eDD)
if(_oz(z,7,e,s,gg)){eDD.wxVkey=1
cs.push("./pages/tab-item-content/mine-center/basic-setting/basic-setting.wxml:block:1:2254")
cs.pop()
}
var bED=_v()
_(tCD,bED)
if(_oz(z,8,e,s,gg)){bED.wxVkey=1
cs.push("./pages/tab-item-content/mine-center/basic-setting/basic-setting.wxml:block:1:2332")
cs.pop()
}
eDD.wxXCkey=1
bED.wxXCkey=1
cs.pop()
_(aBD,tCD)
cs.pop()
_(o0C,aBD)
cs.push("./pages/tab-item-content/mine-center/basic-setting/basic-setting.wxml:mx-date-picker:1:3567")
var oFD=_mz(z,'mx-date-picker',['bind:cancel',9,'bind:confirm',1,'data-event-opts',2,'show',3,'showTips',4,'type',5,'value',6],[],e,s,gg)
cs.pop()
_(o0C,oFD)
cs.pop()
_(r,o0C)
return r
}
e_[x[23]]={f:m23,j:[],i:[],ti:[],ic:[]}
d_[x[24]]={}
var m24=function(e,s,r,gg){
var z=gz$gwx_25()
cs.push("./pages/tab-item-content/mine-center/change-name/change-name.wxml:view:1:1")
var oHD=_n('view')
_rz(z,oHD,'bind:__l',0,e,s,gg)
cs.push("./pages/tab-item-content/mine-center/change-name/change-name.wxml:cu-custom:1:22")
var fID=_mz(z,'cu-custom',['isBack',1,'vueSlots',1],[],e,s,gg)
cs.pop()
_(oHD,fID)
cs.pop()
_(r,oHD)
return r
}
e_[x[24]]={f:m24,j:[],i:[],ti:[],ic:[]}
d_[x[25]]={}
var m25=function(e,s,r,gg){
var z=gz$gwx_26()
return r
}
e_[x[25]]={f:m25,j:[],i:[],ti:[],ic:[]}
d_[x[26]]={}
var m26=function(e,s,r,gg){
var z=gz$gwx_27()
cs.push("./pages/tab-item-content/mine-center/create-suggestion/create-suggestion.wxml:view:1:1")
var oLD=_n('view')
_rz(z,oLD,'bind:__l',0,e,s,gg)
cs.push("./pages/tab-item-content/mine-center/create-suggestion/create-suggestion.wxml:cu-custom:1:22")
var oND=_mz(z,'cu-custom',['isBack',1,'vueSlots',1],[],e,s,gg)
cs.pop()
_(oLD,oND)
var cMD=_v()
_(oLD,cMD)
if(_oz(z,3,e,s,gg)){cMD.wxVkey=1
cs.push("./pages/tab-item-content/mine-center/create-suggestion/create-suggestion.wxml:block:1:1579")
cs.pop()
}
cMD.wxXCkey=1
cs.pop()
_(r,oLD)
return r
}
e_[x[26]]={f:m26,j:[],i:[],ti:[],ic:[]}
d_[x[27]]={}
var m27=function(e,s,r,gg){
var z=gz$gwx_28()
return r
}
e_[x[27]]={f:m27,j:[],i:[],ti:[],ic:[]}
d_[x[28]]={}
var m28=function(e,s,r,gg){
var z=gz$gwx_29()
cs.push("./pages/tab-item-content/mine-center/edit-password/edit-password.wxml:view:1:1")
var tQD=_n('view')
_rz(z,tQD,'bind:__l',0,e,s,gg)
cs.push("./pages/tab-item-content/mine-center/edit-password/edit-password.wxml:cu-custom:1:22")
var eRD=_mz(z,'cu-custom',['isBack',1,'vueSlots',1],[],e,s,gg)
cs.pop()
_(tQD,eRD)
cs.pop()
_(r,tQD)
return r
}
e_[x[28]]={f:m28,j:[],i:[],ti:[],ic:[]}
d_[x[29]]={}
var m29=function(e,s,r,gg){
var z=gz$gwx_30()
cs.push("./pages/tab-item-content/mine-center/input-code/input-code.wxml:view:1:1")
var oTD=_mz(z,'view',['bind:__l',0,'class',1],[],e,s,gg)
var xUD=_v()
_(oTD,xUD)
cs.push("./pages/tab-item-content/mine-center/input-code/input-code.wxml:block:1:543")
var oVD=function(cXD,fWD,hYD,gg){
cs.push("./pages/tab-item-content/mine-center/input-code/input-code.wxml:view:1:660")
var c1D=_mz(z,'view',['bindtap',6,'class',1,'data-event-opts',2],[],cXD,fWD,gg)
var o2D=_v()
_(c1D,o2D)
if(_oz(z,9,cXD,fWD,gg)){o2D.wxVkey=1
cs.push("./pages/tab-item-content/mine-center/input-code/input-code.wxml:block:1:814")
cs.pop()
}
else{o2D.wxVkey=2
cs.push("./pages/tab-item-content/mine-center/input-code/input-code.wxml:block:1:899")
var l3D=_v()
_(o2D,l3D)
if(_oz(z,10,cXD,fWD,gg)){l3D.wxVkey=1
cs.push("./pages/tab-item-content/mine-center/input-code/input-code.wxml:block:1:914")
cs.pop()
}
l3D.wxXCkey=1
cs.pop()
}
o2D.wxXCkey=1
cs.pop()
_(hYD,c1D)
return hYD
}
xUD.wxXCkey=2
_2z(z,4,oVD,e,s,gg,xUD,'item','__i0__','key')
cs.pop()
cs.push("./pages/tab-item-content/mine-center/input-code/input-code.wxml:number-keyboard:1:1055")
var a4D=_mz(z,'number-keyboard',['bind:close',11,'bind:delete',1,'bind:number',2,'class',3,'data-event-opts',4,'open',5],[],e,s,gg)
cs.pop()
_(oTD,a4D)
cs.pop()
_(r,oTD)
return r
}
e_[x[29]]={f:m29,j:[],i:[],ti:[],ic:[]}
d_[x[30]]={}
var m30=function(e,s,r,gg){
var z=gz$gwx_31()
cs.push("./pages/tab-item-content/mine-center/suggestion-list/suggestion-list.wxml:view:1:1")
var e6D=_n('view')
_rz(z,e6D,'bind:__l',0,e,s,gg)
cs.push("./pages/tab-item-content/mine-center/suggestion-list/suggestion-list.wxml:cu-custom:1:22")
var b7D=_mz(z,'cu-custom',['isBack',1,'vueSlots',1],[],e,s,gg)
cs.pop()
_(e6D,b7D)
cs.pop()
_(r,e6D)
return r
}
e_[x[30]]={f:m30,j:[],i:[],ti:[],ic:[]}
d_[x[31]]={}
var m31=function(e,s,r,gg){
var z=gz$gwx_32()
cs.push("./pages/tab-item-content/mine-center/write-motto/write-motto.wxml:view:1:1")
var x9D=_n('view')
_rz(z,x9D,'bind:__l',0,e,s,gg)
cs.push("./pages/tab-item-content/mine-center/write-motto/write-motto.wxml:cu-custom:1:22")
var o0D=_mz(z,'cu-custom',['isBack',1,'vueSlots',1],[],e,s,gg)
cs.pop()
_(x9D,o0D)
cs.pop()
_(r,x9D)
return r
}
e_[x[31]]={f:m31,j:[],i:[],ti:[],ic:[]}
d_[x[32]]={}
var m32=function(e,s,r,gg){
var z=gz$gwx_33()
return r
}
e_[x[32]]={f:m32,j:[],i:[],ti:[],ic:[]}
d_[x[33]]={}
var m33=function(e,s,r,gg){
var z=gz$gwx_34()
cs.push("./pages/tab-item-content/shop-center/category-item/category-item.wxml:view:1:1")
var hCE=_n('view')
_rz(z,hCE,'bind:__l',0,e,s,gg)
cs.push("./pages/tab-item-content/shop-center/category-item/category-item.wxml:scroll-view:1:493")
var oDE=_mz(z,'scroll-view',['scrollWithAnimation',-1,'scrollY',-1,'bindscroll',1,'data-event-opts',1,'scrollTop',2,'style',3],[],e,s,gg)
var cEE=_v()
_(oDE,cEE)
cs.push("./pages/tab-item-content/shop-center/category-item/category-item.wxml:block:1:682")
var oFE=function(aHE,lGE,tIE,gg){
cs.push("./pages/tab-item-content/shop-center/category-item/category-item.wxml:uni-tag:1:773")
var bKE=_mz(z,'uni-tag',['bind:click',9,'class',1,'data-event-opts',2,'style',3,'text',4],[],aHE,lGE,gg)
cs.pop()
_(tIE,bKE)
return tIE
}
cEE.wxXCkey=4
_2z(z,7,oFE,e,s,gg,cEE,'item','index','index')
cs.pop()
cs.pop()
_(hCE,oDE)
cs.pop()
_(r,hCE)
return r
}
e_[x[33]]={f:m33,j:[],i:[],ti:[],ic:[]}
d_[x[34]]={}
var m34=function(e,s,r,gg){
var z=gz$gwx_35()
cs.push("./pages/tab-item-content/shop-center/clerk-list/clerk-list.wxml:view:1:1")
var xME=_mz(z,'view',['bind:__l',0,'style',1],[],e,s,gg)
var oNE=_v()
_(xME,oNE)
if(_oz(z,2,e,s,gg)){oNE.wxVkey=1
cs.push("./pages/tab-item-content/shop-center/clerk-list/clerk-list.wxml:block:1:770")
cs.pop()
}
var fOE=_v()
_(xME,fOE)
cs.push("./pages/tab-item-content/shop-center/clerk-list/clerk-list.wxml:block:1:1944")
var cPE=function(oRE,hQE,cSE,gg){
cs.push("./pages/tab-item-content/shop-center/clerk-list/clerk-list.wxml:view:1:2633")
var lUE=_n('view')
var aVE=_v()
_(lUE,aVE)
if(_oz(z,7,oRE,hQE,gg)){aVE.wxVkey=1
cs.push("./pages/tab-item-content/shop-center/clerk-list/clerk-list.wxml:block:1:2639")
cs.pop()
}
var tWE=_v()
_(lUE,tWE)
if(_oz(z,8,oRE,hQE,gg)){tWE.wxVkey=1
cs.push("./pages/tab-item-content/shop-center/clerk-list/clerk-list.wxml:block:1:2773")
cs.pop()
}
var eXE=_v()
_(lUE,eXE)
if(_oz(z,9,oRE,hQE,gg)){eXE.wxVkey=1
cs.push("./pages/tab-item-content/shop-center/clerk-list/clerk-list.wxml:block:1:2922")
cs.pop()
}
aVE.wxXCkey=1
tWE.wxXCkey=1
eXE.wxXCkey=1
cs.pop()
_(cSE,lUE)
return cSE
}
fOE.wxXCkey=2
_2z(z,5,cPE,e,s,gg,fOE,'item','index','index')
cs.pop()
oNE.wxXCkey=1
cs.pop()
_(r,xME)
return r
}
e_[x[34]]={f:m34,j:[],i:[],ti:[],ic:[]}
d_[x[35]]={}
var m35=function(e,s,r,gg){
var z=gz$gwx_36()
cs.push("./pages/tab-item-content/shop-center/create-comment/create-comment.wxml:view:1:1")
var oZE=_n('view')
_rz(z,oZE,'bind:__l',0,e,s,gg)
cs.push("./pages/tab-item-content/shop-center/create-comment/create-comment.wxml:view:1:22")
var x1E=_n('view')
_rz(z,x1E,'class',1,e,s,gg)
var o2E=_v()
_(x1E,o2E)
if(_oz(z,2,e,s,gg)){o2E.wxVkey=1
cs.push("./pages/tab-item-content/shop-center/create-comment/create-comment.wxml:block:1:144")
cs.push("./pages/tab-item-content/shop-center/create-comment/create-comment.wxml:uni-grid:1:173")
var c4E=_mz(z,'uni-grid',['bind:click',3,'data-event-opts',1,'options',2],[],e,s,gg)
cs.pop()
_(o2E,c4E)
cs.pop()
}
var f3E=_v()
_(x1E,f3E)
if(_oz(z,6,e,s,gg)){f3E.wxVkey=1
cs.push("./pages/tab-item-content/shop-center/create-comment/create-comment.wxml:block:1:1200")
cs.pop()
}
o2E.wxXCkey=1
o2E.wxXCkey=3
f3E.wxXCkey=1
cs.pop()
_(oZE,x1E)
cs.pop()
_(r,oZE)
return r
}
e_[x[35]]={f:m35,j:[],i:[],ti:[],ic:[]}
d_[x[36]]={}
var m36=function(e,s,r,gg){
var z=gz$gwx_37()
cs.push("./pages/tab-item-content/shop-center/create-order/create-order.wxml:view:1:1")
var o6E=_n('view')
_rz(z,o6E,'bind:__l',0,e,s,gg)
var c7E=_v()
_(o6E,c7E)
if(_oz(z,1,e,s,gg)){c7E.wxVkey=1
cs.push("./pages/tab-item-content/shop-center/create-order/create-order.wxml:block:1:3897")
cs.pop()
}
cs.push("./pages/tab-item-content/shop-center/create-order/create-order.wxml:mx-date-picker:1:4261")
var o8E=_mz(z,'mx-date-picker',['bind:cancel',2,'bind:confirm',1,'data-event-opts',2,'show',3,'showTips',4,'type',5,'value',6],[],e,s,gg)
cs.pop()
_(o6E,o8E)
c7E.wxXCkey=1
cs.pop()
_(r,o6E)
return r
}
e_[x[36]]={f:m36,j:[],i:[],ti:[],ic:[]}
d_[x[37]]={}
var m37=function(e,s,r,gg){
var z=gz$gwx_38()
return r
}
e_[x[37]]={f:m37,j:[],i:[],ti:[],ic:[]}
d_[x[38]]={}
var m38=function(e,s,r,gg){
var z=gz$gwx_39()
return r
}
e_[x[38]]={f:m38,j:[],i:[],ti:[],ic:[]}
d_[x[39]]={}
var m39=function(e,s,r,gg){
var z=gz$gwx_40()
cs.push("./pages/tab-item-content/shop-center/near-shop-list/near-shop-list.wxml:view:1:1")
var eBF=_n('view')
_rz(z,eBF,'bind:__l',0,e,s,gg)
var oDF=_v()
_(eBF,oDF)
cs.push("./pages/tab-item-content/shop-center/near-shop-list/near-shop-list.wxml:block:1:87")
var xEF=function(fGF,oFF,cHF,gg){
cs.push("./pages/tab-item-content/shop-center/near-shop-list/near-shop-list.wxml:view:1:171")
var oJF=_mz(z,'view',['bindtap',5,'class',1,'data-event-opts',2],[],fGF,oFF,gg)
var cKF=_v()
_(oJF,cKF)
if(_oz(z,8,fGF,oFF,gg)){cKF.wxVkey=1
cs.push("./pages/tab-item-content/shop-center/near-shop-list/near-shop-list.wxml:block:1:443")
cs.pop()
}
cKF.wxXCkey=1
cs.pop()
_(cHF,oJF)
return cHF
}
oDF.wxXCkey=2
_2z(z,3,xEF,e,s,gg,oDF,'item','index','index')
cs.pop()
var bCF=_v()
_(eBF,bCF)
if(_oz(z,9,e,s,gg)){bCF.wxVkey=1
cs.push("./pages/tab-item-content/shop-center/near-shop-list/near-shop-list.wxml:block:1:860")
cs.pop()
}
bCF.wxXCkey=1
cs.pop()
_(r,eBF)
return r
}
e_[x[39]]={f:m39,j:[],i:[],ti:[],ic:[]}
d_[x[40]]={}
var m40=function(e,s,r,gg){
var z=gz$gwx_41()
cs.push("./pages/tab-item-content/shop-center/record-shop/record-shop.wxml:view:1:1")
var lMF=_n('view')
_rz(z,lMF,'bind:__l',0,e,s,gg)
cs.push("./pages/tab-item-content/shop-center/record-shop/record-shop.wxml:view:1:56")
var aNF=_n('view')
_rz(z,aNF,'class',1,e,s,gg)
var tOF=_v()
_(aNF,tOF)
if(_oz(z,2,e,s,gg)){tOF.wxVkey=1
cs.push("./pages/tab-item-content/shop-center/record-shop/record-shop.wxml:block:1:757")
cs.pop()
}
cs.push("./pages/tab-item-content/shop-center/record-shop/record-shop.wxml:addressed:1:1739")
var ePF=_mz(z,'addressed',['bind:changes',3,'data-event-opts',1],[],e,s,gg)
cs.pop()
_(aNF,ePF)
tOF.wxXCkey=1
cs.pop()
_(lMF,aNF)
cs.push("./pages/tab-item-content/shop-center/record-shop/record-shop.wxml:mx-date-picker:1:4995")
var bQF=_mz(z,'mx-date-picker',['bind:cancel',5,'bind:confirm',1,'data-event-opts',2,'show',3,'showTips',4,'type',5,'value',6],[],e,s,gg)
cs.pop()
_(lMF,bQF)
cs.pop()
_(r,lMF)
return r
}
e_[x[40]]={f:m40,j:[],i:[],ti:[],ic:[]}
d_[x[41]]={}
var m41=function(e,s,r,gg){
var z=gz$gwx_42()
cs.push("./pages/tab-item-content/shop-center/repair-item/repair-item.wxml:view:1:1")
var xSF=_n('view')
_rz(z,xSF,'bind:__l',0,e,s,gg)
cs.push("./pages/tab-item-content/shop-center/repair-item/repair-item.wxml:scroll-view:1:494")
var oTF=_mz(z,'scroll-view',['scrollWithAnimation',-1,'scrollY',-1,'bindscroll',1,'data-event-opts',1,'scrollTop',2,'style',3],[],e,s,gg)
var fUF=_v()
_(oTF,fUF)
cs.push("./pages/tab-item-content/shop-center/repair-item/repair-item.wxml:block:1:677")
var cVF=function(oXF,hWF,cYF,gg){
cs.push("./pages/tab-item-content/shop-center/repair-item/repair-item.wxml:uni-tag:1:768")
var l1F=_mz(z,'uni-tag',['bind:click',9,'class',1,'data-event-opts',2,'style',3,'text',4,'vueSlots',5],[],oXF,hWF,gg)
cs.pop()
_(cYF,l1F)
return cYF
}
fUF.wxXCkey=4
_2z(z,7,cVF,e,s,gg,fUF,'item','index','index')
cs.pop()
cs.pop()
_(xSF,oTF)
cs.pop()
_(r,xSF)
return r
}
e_[x[41]]={f:m41,j:[],i:[],ti:[],ic:[]}
d_[x[42]]={}
var m42=function(e,s,r,gg){
var z=gz$gwx_43()
cs.push("./pages/tab-item-content/shop-center/repair-order-item/repair-order-item.wxml:view:1:1")
var t3F=_n('view')
_rz(z,t3F,'bind:__l',0,e,s,gg)
cs.push("./pages/tab-item-content/shop-center/repair-order-item/repair-order-item.wxml:scroll-view:1:50")
var e4F=_mz(z,'scroll-view',['class',1,'scrollY',1],[],e,s,gg)
var b5F=_v()
_(e4F,b5F)
if(_oz(z,3,e,s,gg)){b5F.wxVkey=1
cs.push("./pages/tab-item-content/shop-center/repair-order-item/repair-order-item.wxml:block:1:2781")
cs.pop()
}
var o6F=_v()
_(e4F,o6F)
if(_oz(z,4,e,s,gg)){o6F.wxVkey=1
cs.push("./pages/tab-item-content/shop-center/repair-order-item/repair-order-item.wxml:block:1:3287")
cs.pop()
}
cs.push("./pages/tab-item-content/shop-center/repair-order-item/repair-order-item.wxml:uni-grid:1:3989")
var x7F=_mz(z,'uni-grid',['bind:click',5,'data-event-opts',1,'options',2],[],e,s,gg)
cs.pop()
_(e4F,x7F)
b5F.wxXCkey=1
o6F.wxXCkey=1
cs.pop()
_(t3F,e4F)
cs.pop()
_(r,t3F)
return r
}
e_[x[42]]={f:m42,j:[],i:[],ti:[],ic:[]}
d_[x[43]]={}
var m43=function(e,s,r,gg){
var z=gz$gwx_44()
cs.push("./pages/tab-item-content/shop-center/search-more-shop/search-more-shop.wxml:view:1:1")
var f9F=_n('view')
_rz(z,f9F,'bind:__l',0,e,s,gg)
var c0F=_v()
_(f9F,c0F)
cs.push("./pages/tab-item-content/shop-center/search-more-shop/search-more-shop.wxml:block:1:588")
var hAG=function(cCG,oBG,oDG,gg){
cs.push("./pages/tab-item-content/shop-center/search-more-shop/search-more-shop.wxml:view:1:672")
var aFG=_mz(z,'view',['bindtap',5,'class',1,'data-event-opts',2,'style',3],[],cCG,oBG,gg)
var tGG=_v()
_(aFG,tGG)
if(_oz(z,9,cCG,oBG,gg)){tGG.wxVkey=1
cs.push("./pages/tab-item-content/shop-center/search-more-shop/search-more-shop.wxml:block:1:1427")
cs.pop()
}
tGG.wxXCkey=1
cs.pop()
_(oDG,aFG)
return oDG
}
c0F.wxXCkey=2
_2z(z,3,hAG,e,s,gg,c0F,'item','index','index')
cs.pop()
cs.pop()
_(r,f9F)
return r
}
e_[x[43]]={f:m43,j:[],i:[],ti:[],ic:[]}
d_[x[44]]={}
var m44=function(e,s,r,gg){
var z=gz$gwx_45()
cs.push("./pages/tab-item-content/shop-center/search-shop/search-shop.wxml:view:1:1")
var bIG=_n('view')
_rz(z,bIG,'bind:__l',0,e,s,gg)
cs.push("./pages/tab-item-content/shop-center/search-shop/search-shop.wxml:cu-custom:1:22")
var oJG=_mz(z,'cu-custom',['bgColor',1,'isBack',1,'vueSlots',2],[],e,s,gg)
cs.pop()
_(bIG,oJG)
cs.pop()
_(r,bIG)
return r
}
e_[x[44]]={f:m44,j:[],i:[],ti:[],ic:[]}
d_[x[45]]={}
var m45=function(e,s,r,gg){
var z=gz$gwx_46()
cs.push("./pages/tab-item-content/shop-center/shop-center.wxml:view:1:1")
var oLG=_n('view')
_rz(z,oLG,'bind:__l',0,e,s,gg)
var fMG=_v()
_(oLG,fMG)
cs.push("./pages/tab-item-content/shop-center/shop-center.wxml:block:1:554")
var cNG=function(oPG,hOG,cQG,gg){
cs.push("./pages/tab-item-content/shop-center/shop-center.wxml:view:1:638")
var lSG=_mz(z,'view',['bindtap',5,'class',1,'data-event-opts',2],[],oPG,hOG,gg)
cs.push("./pages/tab-item-content/shop-center/shop-center.wxml:view:1:1964")
var aTG=_mz(z,'view',['class',8,'style',1],[],oPG,hOG,gg)
var tUG=_v()
_(aTG,tUG)
if(_oz(z,10,oPG,hOG,gg)){tUG.wxVkey=1
cs.push("./pages/tab-item-content/shop-center/shop-center.wxml:block:1:2086")
cs.pop()
}
var eVG=_v()
_(aTG,eVG)
if(_oz(z,11,oPG,hOG,gg)){eVG.wxVkey=1
cs.push("./pages/tab-item-content/shop-center/shop-center.wxml:block:1:2306")
cs.pop()
}
var bWG=_v()
_(aTG,bWG)
if(_oz(z,12,oPG,hOG,gg)){bWG.wxVkey=1
cs.push("./pages/tab-item-content/shop-center/shop-center.wxml:block:1:2518")
cs.pop()
}
tUG.wxXCkey=1
eVG.wxXCkey=1
bWG.wxXCkey=1
cs.pop()
_(lSG,aTG)
cs.pop()
_(cQG,lSG)
return cQG
}
fMG.wxXCkey=2
_2z(z,3,cNG,e,s,gg,fMG,'item','index','index')
cs.pop()
cs.pop()
_(r,oLG)
return r
}
e_[x[45]]={f:m45,j:[],i:[],ti:[],ic:[]}
d_[x[46]]={}
var m46=function(e,s,r,gg){
var z=gz$gwx_47()
cs.push("./pages/tab-item-content/shop-center/shop-list/shop-list.wxml:view:1:1")
var xYG=_n('view')
_rz(z,xYG,'bind:__l',0,e,s,gg)
var oZG=_v()
_(xYG,oZG)
cs.push("./pages/tab-item-content/shop-center/shop-list/shop-list.wxml:block:1:82")
var f1G=function(h3G,c2G,o4G,gg){
cs.push("./pages/tab-item-content/shop-center/shop-list/shop-list.wxml:view:1:166")
var o6G=_mz(z,'view',['bindtap',5,'class',1,'data-event-opts',2,'style',3],[],h3G,c2G,gg)
cs.push("./pages/tab-item-content/shop-center/shop-list/shop-list.wxml:view:1:703")
var l7G=_n('view')
_rz(z,l7G,'style',9,h3G,c2G,gg)
var a8G=_v()
_(l7G,a8G)
if(_oz(z,10,h3G,c2G,gg)){a8G.wxVkey=1
cs.push("./pages/tab-item-content/shop-center/shop-list/shop-list.wxml:block:1:854")
cs.pop()
}
var t9G=_v()
_(l7G,t9G)
if(_oz(z,11,h3G,c2G,gg)){t9G.wxVkey=1
cs.push("./pages/tab-item-content/shop-center/shop-list/shop-list.wxml:block:1:1060")
cs.pop()
}
a8G.wxXCkey=1
t9G.wxXCkey=1
cs.pop()
_(o6G,l7G)
cs.pop()
_(o4G,o6G)
return o4G
}
oZG.wxXCkey=2
_2z(z,3,f1G,e,s,gg,oZG,'item','index','index')
cs.pop()
cs.pop()
_(r,xYG)
return r
}
e_[x[46]]={f:m46,j:[],i:[],ti:[],ic:[]}
d_[x[47]]={}
var m47=function(e,s,r,gg){
var z=gz$gwx_48()
return r
}
e_[x[47]]={f:m47,j:[],i:[],ti:[],ic:[]}
d_[x[48]]={}
var m48=function(e,s,r,gg){
var z=gz$gwx_49()
cs.push("./pages/tab-item-content/work-center/create-log/create-log.wxml:view:1:1")
var oBH=_n('view')
_rz(z,oBH,'bind:__l',0,e,s,gg)
var xCH=_v()
_(oBH,xCH)
if(_oz(z,1,e,s,gg)){xCH.wxVkey=1
cs.push("./pages/tab-item-content/work-center/create-log/create-log.wxml:block:1:1840")
cs.pop()
}
xCH.wxXCkey=1
cs.pop()
_(r,oBH)
return r
}
e_[x[48]]={f:m48,j:[],i:[],ti:[],ic:[]}
d_[x[49]]={}
var m49=function(e,s,r,gg){
var z=gz$gwx_50()
cs.push("./pages/tab-item-content/work-center/express-center/create-address/create-address.wxml:view:1:1")
var fEH=_n('view')
_rz(z,fEH,'bind:__l',0,e,s,gg)
cs.push("./pages/tab-item-content/work-center/express-center/create-address/create-address.wxml:addressed:1:570")
var cFH=_mz(z,'addressed',['bind:changes',1,'data-event-opts',1],[],e,s,gg)
cs.pop()
_(fEH,cFH)
cs.pop()
_(r,fEH)
return r
}
e_[x[49]]={f:m49,j:[],i:[],ti:[],ic:[]}
d_[x[50]]={}
var m50=function(e,s,r,gg){
var z=gz$gwx_51()
cs.push("./pages/tab-item-content/work-center/express-center/create-express/create-express.wxml:view:1:1")
var oHH=_n('view')
_rz(z,oHH,'bind:__l',0,e,s,gg)
cs.push("./pages/tab-item-content/work-center/express-center/create-express/create-express.wxml:cu-custom:1:22")
var cIH=_mz(z,'cu-custom',['isBack',1,'vueSlots',1],[],e,s,gg)
cs.pop()
_(oHH,cIH)
cs.push("./pages/tab-item-content/work-center/express-center/create-express/create-express.wxml:view:1:612")
var oJH=_n('view')
_rz(z,oJH,'style',3,e,s,gg)
var lKH=_v()
_(oJH,lKH)
if(_oz(z,4,e,s,gg)){lKH.wxVkey=1
cs.push("./pages/tab-item-content/work-center/express-center/create-express/create-express.wxml:block:1:637")
var aLH=_v()
_(lKH,aLH)
if(_oz(z,5,e,s,gg)){aLH.wxVkey=1
cs.push("./pages/tab-item-content/work-center/express-center/create-express/create-express.wxml:block:1:867")
cs.pop()
}
aLH.wxXCkey=1
cs.pop()
}
else{lKH.wxVkey=2
cs.push("./pages/tab-item-content/work-center/express-center/create-express/create-express.wxml:block:1:1275")
cs.pop()
}
lKH.wxXCkey=1
cs.pop()
_(oHH,oJH)
cs.pop()
_(r,oHH)
return r
}
e_[x[50]]={f:m50,j:[],i:[],ti:[],ic:[]}
d_[x[51]]={}
var m51=function(e,s,r,gg){
var z=gz$gwx_52()
cs.push("./pages/tab-item-content/work-center/express-center/express-index/express-index.wxml:view:1:1")
var eNH=_n('view')
_rz(z,eNH,'bind:__l',0,e,s,gg)
cs.push("./pages/tab-item-content/work-center/express-center/express-index/express-index.wxml:scroll-view:1:357")
var bOH=_mz(z,'scroll-view',['scrollX',-1,'class',1],[],e,s,gg)
var oPH=_v()
_(bOH,oPH)
if(_oz(z,2,e,s,gg)){oPH.wxVkey=1
cs.push("./pages/tab-item-content/work-center/express-center/express-index/express-index.wxml:block:1:396")
cs.pop()
}
var xQH=_v()
_(bOH,xQH)
if(_oz(z,3,e,s,gg)){xQH.wxVkey=1
cs.push("./pages/tab-item-content/work-center/express-center/express-index/express-index.wxml:block:1:452")
cs.pop()
}
var oRH=_v()
_(bOH,oRH)
if(_oz(z,4,e,s,gg)){oRH.wxVkey=1
cs.push("./pages/tab-item-content/work-center/express-center/express-index/express-index.wxml:block:1:511")
cs.pop()
}
var fSH=_v()
_(bOH,fSH)
if(_oz(z,5,e,s,gg)){fSH.wxVkey=1
cs.push("./pages/tab-item-content/work-center/express-center/express-index/express-index.wxml:block:1:570")
cs.pop()
}
oPH.wxXCkey=1
xQH.wxXCkey=1
oRH.wxXCkey=1
fSH.wxXCkey=1
cs.pop()
_(eNH,bOH)
cs.pop()
_(r,eNH)
return r
}
e_[x[51]]={f:m51,j:[],i:[],ti:[],ic:[]}
d_[x[52]]={}
var m52=function(e,s,r,gg){
var z=gz$gwx_53()
cs.push("./pages/tab-item-content/work-center/log-detail/log-detail.wxml:view:1:1")
var hUH=_n('view')
_rz(z,hUH,'bind:__l',0,e,s,gg)
cs.push("./pages/tab-item-content/work-center/log-detail/log-detail.wxml:cu-custom:1:22")
var oVH=_mz(z,'cu-custom',['isBack',1,'vueSlots',1],[],e,s,gg)
cs.pop()
_(hUH,oVH)
cs.pop()
_(r,hUH)
return r
}
e_[x[52]]={f:m52,j:[],i:[],ti:[],ic:[]}
d_[x[53]]={}
var m53=function(e,s,r,gg){
var z=gz$gwx_54()
cs.push("./pages/tab-item-content/work-center/work-index/work-index.wxml:view:1:1")
var oXH=_n('view')
_rz(z,oXH,'bind:__l',0,e,s,gg)
var lYH=_v()
_(oXH,lYH)
if(_oz(z,1,e,s,gg)){lYH.wxVkey=1
cs.push("./pages/tab-item-content/work-center/work-index/work-index.wxml:block:1:362")
cs.pop()
}
var aZH=_v()
_(oXH,aZH)
if(_oz(z,2,e,s,gg)){aZH.wxVkey=1
cs.push("./pages/tab-item-content/work-center/work-index/work-index.wxml:block:1:4543")
cs.pop()
}
var t1H=_v()
_(oXH,t1H)
if(_oz(z,3,e,s,gg)){t1H.wxVkey=1
cs.push("./pages/tab-item-content/work-center/work-index/work-index.wxml:block:1:4615")
cs.pop()
}
lYH.wxXCkey=1
aZH.wxXCkey=1
t1H.wxXCkey=1
cs.pop()
_(r,oXH)
return r
}
e_[x[53]]={f:m53,j:[],i:[],ti:[],ic:[]}
d_[x[54]]={}
var m54=function(e,s,r,gg){
var z=gz$gwx_55()
return r
}
e_[x[54]]={f:m54,j:[],i:[],ti:[],ic:[]}
d_[x[55]]={}
var m55=function(e,s,r,gg){
var z=gz$gwx_56()
cs.push("./pages/tab-item/index/index.wxml:view:1:1")
var o4H=_n('view')
_rz(z,o4H,'bind:__l',0,e,s,gg)
var o6H=_v()
_(o4H,o6H)
cs.push("./pages/tab-item/index/index.wxml:block:1:928")
var f7H=function(h9H,c8H,o0H,gg){
cs.push("./pages/tab-item/index/index.wxml:view:1:1011")
var oBI=_mz(z,'view',['bindtap',5,'data-event-opts',1,'style',2],[],h9H,c8H,gg)
var lCI=_v()
_(oBI,lCI)
if(_oz(z,8,h9H,c8H,gg)){lCI.wxVkey=1
cs.push("./pages/tab-item/index/index.wxml:block:1:1262")
cs.pop()
}
lCI.wxXCkey=1
cs.pop()
_(o0H,oBI)
return o0H
}
o6H.wxXCkey=2
_2z(z,3,f7H,e,s,gg,o6H,'item','index','index')
cs.pop()
var x5H=_v()
_(o4H,x5H)
if(_oz(z,9,e,s,gg)){x5H.wxVkey=1
cs.push("./pages/tab-item/index/index.wxml:block:1:4973")
cs.pop()
}
x5H.wxXCkey=1
cs.pop()
_(r,o4H)
return r
}
e_[x[55]]={f:m55,j:[],i:[],ti:[],ic:[]}
d_[x[56]]={}
var m56=function(e,s,r,gg){
var z=gz$gwx_57()
return r
}
e_[x[56]]={f:m56,j:[],i:[],ti:[],ic:[]}
d_[x[57]]={}
var m57=function(e,s,r,gg){
var z=gz$gwx_58()
return r
}
e_[x[57]]={f:m57,j:[],i:[],ti:[],ic:[]}
d_[x[58]]={}
var m58=function(e,s,r,gg){
var z=gz$gwx_59()
return r
}
e_[x[58]]={f:m58,j:[],i:[],ti:[],ic:[]}
if(path&&e_[path]){
return function(env,dd,global){$gwxc=0;var root={"tag":"wx-page"};root.children=[]
var main=e_[path].f
cs=[]
if (typeof global==="undefined")global={};global.f=$gdc(f_[path],"",1);
try{
main(env,{},root,global);
_tsd(root)
}catch(err){
console.log(cs, env);
console.log(err)
throw err
}
return root;
}
}
}



__wxAppCode__['app.json']={"pages":["pages/login-design/login/login","pages/tab-item-content/shop-center/search-more-shop/search-more-shop","pages/tab-item/mine/mine","pages/tab-item-content/work-center/express-center/express-index/express-index","pages/tab-item-content/work-center/express-center/create-address/create-address","pages/tab-item-content/work-center/express-center/create-express/create-express","pages/tab-item-content/mine-center/basic-setting/basic-setting","pages/tab-item-content/mine-center/suggestion-list/suggestion-list","pages/tab-item-content/mine-center/edit-password/edit-password","pages/tab-item/index/index","pages/all-item-content/index-more/index-more","pages/tab-item-content/shop-center/shop-list/shop-list","pages/tab-item-content/mine-center/create-suggestion/create-suggestion","pages/tab-item-content/shop-center/create-comment/create-comment","pages/tab-item/message/message","pages/tab-item-content/message-center/chat/chat","pages/login-design/design/design","pages/tab-item-content/shop-center/create-order/create-order","pages/tab-item-content/shop-center/record-shop/record-shop","pages/tab-item-content/shop-center/repair-item/repair-item","pages/tab-item-content/mine-center/input-code/input-code","pages/tab-item-content/mine-center/change-telephone/change-telephone","pages/tab-item-content/mine-center/account-manager/account-manager","pages/tab-item-content/work-center/work-index/work-index","pages/tab-item-content/notice-center/notice-center","pages/tab-item-content/shop-center/near-shop-list/near-shop-list","pages/tab-item-content/shop-center/shop-center","pages/tab-item-content/work-center/create-log/create-log","pages/login-design/find-password/find-password","pages/login-design/reset-password/reset-password","pages/tab-item-content/shop-center/clerk-list/clerk-list","pages/tab-item-content/shop-center/invite-join/invite-join","pages/tab-item-content/shop-center/join-shop/join-shop","pages/all-item-content/detail-content/detail-content","pages/tab-item-content/shop-center/repair-order-item/repair-order-item","pages/tab-item-content/shop-center/search-shop/search-shop","pages/tab-item-content/work-center/log-detail/log-detail","pages/tab-item-content/work-center/chose-copy/chose-copy","pages/tab-item-content/shop-center/category-item/category-item","pages/tab-item-content/message-center/group-list/group-list","pages/tab-item/work/work","pages/tab-item-content/work-center/work-log/work-log","pages/tab-item-content/mine-center/change-name/change-name","pages/tab-item-content/mine-center/cut-image/cut-image","pages/tab-item-content/mine-center/write-motto/write-motto"],"subPackages":[],"window":{"navigationBarTextStyle":"black","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"black","selectedColor":"aqua","list":[{"pagePath":"pages/tab-item/index/index","iconPath":"static/img/tab_img/shouye.png","selectedIconPath":"static/img/tab_img/shouye_color.png","text":"首页"},{"pagePath":"pages/tab-item/message/message","iconPath":"static/img/tab_img/xiaoxi.png","selectedIconPath":"static/img/tab_img/xiaoxi_color.png","text":"消息"},{"pagePath":"pages/tab-item/work/work","iconPath":"static/img/tab_img/gongzuo.png","selectedIconPath":"static/img/tab_img/gongzuo_color.png","text":"工作"},{"pagePath":"pages/tab-item/mine/mine","iconPath":"static/img/tab_img/mine.png","selectedIconPath":"static/img/tab_img/mine_color.png","text":"个人中心"}]},"splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"门店助手","compilerVersion":"1.9.4","usingComponents":{"cu-custom":"/colorui/components/cu-custom"}};
__wxAppCode__['app.wxml']=$gwx('./app.wxml');

__wxAppCode__['colorui/components/cu-custom.json']={"usingComponents":{},"component":true};
__wxAppCode__['colorui/components/cu-custom.wxml']=$gwx('./colorui/components/cu-custom.wxml');

__wxAppCode__['components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox-item.json']={"usingComponents":{},"component":true};
__wxAppCode__['components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox-item.wxml']=$gwx('./components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox-item.wxml');

__wxAppCode__['components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox.json']={"usingComponents":{"filter-radio-item":"/components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox-item"},"component":true};
__wxAppCode__['components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox.wxml']=$gwx('./components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox.wxml');

__wxAppCode__['components/code/number-keyboard.json']={"usingComponents":{},"component":true};
__wxAppCode__['components/code/number-keyboard.wxml']=$gwx('./components/code/number-keyboard.wxml');

__wxAppCode__['components/collapse/uni-collapse-item.json']={"usingComponents":{"uni-icon":"/components/collapse/uni-icon"},"component":true};
__wxAppCode__['components/collapse/uni-collapse-item.wxml']=$gwx('./components/collapse/uni-collapse-item.wxml');

__wxAppCode__['components/collapse/uni-collapse.json']={"usingComponents":{},"component":true};
__wxAppCode__['components/collapse/uni-collapse.wxml']=$gwx('./components/collapse/uni-collapse.wxml');

__wxAppCode__['components/collapse/uni-icon.json']={"usingComponents":{},"component":true};
__wxAppCode__['components/collapse/uni-icon.wxml']=$gwx('./components/collapse/uni-icon.wxml');

__wxAppCode__['components/head-tab.json']={"usingComponents":{},"component":true};
__wxAppCode__['components/head-tab.wxml']=$gwx('./components/head-tab.wxml');

__wxAppCode__['components/jm-address/jm-address.json']={"usingComponents":{},"component":true};
__wxAppCode__['components/jm-address/jm-address.wxml']=$gwx('./components/jm-address/jm-address.wxml');

__wxAppCode__['components/NAUI-card/NAUI-card.json']={"usingComponents":{},"component":true};
__wxAppCode__['components/NAUI-card/NAUI-card.wxml']=$gwx('./components/NAUI-card/NAUI-card.wxml');

__wxAppCode__['components/popmodal.json']={"usingComponents":{},"component":true};
__wxAppCode__['components/popmodal.wxml']=$gwx('./components/popmodal.wxml');

__wxAppCode__['components/start/App.json']={"usingComponents":{},"component":true};
__wxAppCode__['components/start/App.wxml']=$gwx('./components/start/App.wxml');

__wxAppCode__['components/uni-grid/uni-grid.json']={"usingComponents":{},"component":true};
__wxAppCode__['components/uni-grid/uni-grid.wxml']=$gwx('./components/uni-grid/uni-grid.wxml');

__wxAppCode__['components/uni/mx-datepicker/mx-datepicker.json']={"usingComponents":{},"component":true};
__wxAppCode__['components/uni/mx-datepicker/mx-datepicker.wxml']=$gwx('./components/uni/mx-datepicker/mx-datepicker.wxml');

__wxAppCode__['components/uni/uni-tag/uni-tag.json']={"usingComponents":{},"component":true};
__wxAppCode__['components/uni/uni-tag/uni-tag.wxml']=$gwx('./components/uni/uni-tag/uni-tag.wxml');

__wxAppCode__['pages/all-item-content/detail-content/detail-content.json']={"navigationBarTitleText":"详情内容","usingComponents":{}};
__wxAppCode__['pages/all-item-content/detail-content/detail-content.wxml']=$gwx('./pages/all-item-content/detail-content/detail-content.wxml');

__wxAppCode__['pages/all-item-content/index-more/index-more.json']={"navigationStyle":"custom","titleNView":false,"usingComponents":{"cu-custom":"/colorui/components/cu-custom","head-tab":"/components/head-tab"}};
__wxAppCode__['pages/all-item-content/index-more/index-more.wxml']=$gwx('./pages/all-item-content/index-more/index-more.wxml');

__wxAppCode__['pages/login-design/design/design.json']={"navigationBarTitleText":"门店助手","usingComponents":{"pop-modal":"/components/popmodal"}};
__wxAppCode__['pages/login-design/design/design.wxml']=$gwx('./pages/login-design/design/design.wxml');

__wxAppCode__['pages/login-design/find-password/find-password.json']={"navigationBarTitleText":"门店助手","usingComponents":{}};
__wxAppCode__['pages/login-design/find-password/find-password.wxml']=$gwx('./pages/login-design/find-password/find-password.wxml');

__wxAppCode__['pages/login-design/login/login.json']={"navigationBarTitleText":"门店助手","usingComponents":{"pop-modal":"/components/popmodal"}};
__wxAppCode__['pages/login-design/login/login.wxml']=$gwx('./pages/login-design/login/login.wxml');

__wxAppCode__['pages/login-design/reset-password/reset-password.json']={"navigationBarTitleText":"门店助手","usingComponents":{}};
__wxAppCode__['pages/login-design/reset-password/reset-password.wxml']=$gwx('./pages/login-design/reset-password/reset-password.wxml');

__wxAppCode__['pages/tab-item-content/message-center/chat/chat.json']={"navigationStyle":"custom","titleNView":false,"usingComponents":{}};
__wxAppCode__['pages/tab-item-content/message-center/chat/chat.wxml']=$gwx('./pages/tab-item-content/message-center/chat/chat.wxml');

__wxAppCode__['pages/tab-item-content/message-center/group-list/group-list.json']={"navigationBarTitleText":"群组列表","usingComponents":{"uni-collapse":"/components/collapse/uni-collapse","uni-collapse-item":"/components/collapse/uni-collapse-item"}};
__wxAppCode__['pages/tab-item-content/message-center/group-list/group-list.wxml']=$gwx('./pages/tab-item-content/message-center/group-list/group-list.wxml');

__wxAppCode__['pages/tab-item-content/mine-center/account-manager/account-manager.json']={"navigationBarTitleText":"手机号码","usingComponents":{}};
__wxAppCode__['pages/tab-item-content/mine-center/account-manager/account-manager.wxml']=$gwx('./pages/tab-item-content/mine-center/account-manager/account-manager.wxml');

__wxAppCode__['pages/tab-item-content/mine-center/basic-setting/basic-setting.json']={"navigationStyle":"custom","titleNView":false,"usingComponents":{"cu-custom":"/colorui/components/cu-custom","mx-date-picker":"/components/uni/mx-datepicker/mx-datepicker"}};
__wxAppCode__['pages/tab-item-content/mine-center/basic-setting/basic-setting.wxml']=$gwx('./pages/tab-item-content/mine-center/basic-setting/basic-setting.wxml');

__wxAppCode__['pages/tab-item-content/mine-center/change-name/change-name.json']={"navigationStyle":"custom","titleNView":false,"usingComponents":{"cu-custom":"/colorui/components/cu-custom"}};
__wxAppCode__['pages/tab-item-content/mine-center/change-name/change-name.wxml']=$gwx('./pages/tab-item-content/mine-center/change-name/change-name.wxml');

__wxAppCode__['pages/tab-item-content/mine-center/change-telephone/change-telephone.json']={"navigationBarTitleText":"绑定手机号码","usingComponents":{"pop-modal":"/components/popmodal"}};
__wxAppCode__['pages/tab-item-content/mine-center/change-telephone/change-telephone.wxml']=$gwx('./pages/tab-item-content/mine-center/change-telephone/change-telephone.wxml');

__wxAppCode__['pages/tab-item-content/mine-center/create-suggestion/create-suggestion.json']={"navigationStyle":"custom","titleNView":false,"usingComponents":{"cu-custom":"/colorui/components/cu-custom","head-tab":"/components/head-tab"}};
__wxAppCode__['pages/tab-item-content/mine-center/create-suggestion/create-suggestion.wxml']=$gwx('./pages/tab-item-content/mine-center/create-suggestion/create-suggestion.wxml');

__wxAppCode__['pages/tab-item-content/mine-center/cut-image/cut-image.json']={"navigationBarTitleText":"图片裁剪","usingComponents":{}};
__wxAppCode__['pages/tab-item-content/mine-center/cut-image/cut-image.wxml']=$gwx('./pages/tab-item-content/mine-center/cut-image/cut-image.wxml');

__wxAppCode__['pages/tab-item-content/mine-center/edit-password/edit-password.json']={"navigationStyle":"custom","titleNView":false,"usingComponents":{"cu-custom":"/colorui/components/cu-custom","head-tab":"/components/head-tab"}};
__wxAppCode__['pages/tab-item-content/mine-center/edit-password/edit-password.wxml']=$gwx('./pages/tab-item-content/mine-center/edit-password/edit-password.wxml');

__wxAppCode__['pages/tab-item-content/mine-center/input-code/input-code.json']={"navigationBarTitleText":"输入验证码","usingComponents":{"number-keyboard":"/components/code/number-keyboard"}};
__wxAppCode__['pages/tab-item-content/mine-center/input-code/input-code.wxml']=$gwx('./pages/tab-item-content/mine-center/input-code/input-code.wxml');

__wxAppCode__['pages/tab-item-content/mine-center/suggestion-list/suggestion-list.json']={"navigationStyle":"custom","titleNView":false,"usingComponents":{"cu-custom":"/colorui/components/cu-custom","head-tab":"/components/head-tab"}};
__wxAppCode__['pages/tab-item-content/mine-center/suggestion-list/suggestion-list.wxml']=$gwx('./pages/tab-item-content/mine-center/suggestion-list/suggestion-list.wxml');

__wxAppCode__['pages/tab-item-content/mine-center/write-motto/write-motto.json']={"navigationStyle":"custom","titleNView":false,"usingComponents":{"cu-custom":"/colorui/components/cu-custom"}};
__wxAppCode__['pages/tab-item-content/mine-center/write-motto/write-motto.wxml']=$gwx('./pages/tab-item-content/mine-center/write-motto/write-motto.wxml');

__wxAppCode__['pages/tab-item-content/notice-center/notice-center.json']={"navigationBarTitleText":"通知公告","usingComponents":{}};
__wxAppCode__['pages/tab-item-content/notice-center/notice-center.wxml']=$gwx('./pages/tab-item-content/notice-center/notice-center.wxml');

__wxAppCode__['pages/tab-item-content/shop-center/category-item/category-item.json']={"navigationBarTitleText":"选择类别","usingComponents":{"uni-tag":"/components/uni/uni-tag/uni-tag"}};
__wxAppCode__['pages/tab-item-content/shop-center/category-item/category-item.wxml']=$gwx('./pages/tab-item-content/shop-center/category-item/category-item.wxml');

__wxAppCode__['pages/tab-item-content/shop-center/clerk-list/clerk-list.json']={"navigationBarTitleText":"店员列表","usingComponents":{"pop-modal":"/components/popmodal"}};
__wxAppCode__['pages/tab-item-content/shop-center/clerk-list/clerk-list.wxml']=$gwx('./pages/tab-item-content/shop-center/clerk-list/clerk-list.wxml');

__wxAppCode__['pages/tab-item-content/shop-center/create-comment/create-comment.json']={"navigationBarTitleText":"发表评价","usingComponents":{"my-issue":"/components/start/App","uni-grid":"/components/uni-grid/uni-grid"}};
__wxAppCode__['pages/tab-item-content/shop-center/create-comment/create-comment.wxml']=$gwx('./pages/tab-item-content/shop-center/create-comment/create-comment.wxml');

__wxAppCode__['pages/tab-item-content/shop-center/create-order/create-order.json']={"navigationBarTitleText":"新增报修","usingComponents":{"mx-date-picker":"/components/uni/mx-datepicker/mx-datepicker"}};
__wxAppCode__['pages/tab-item-content/shop-center/create-order/create-order.wxml']=$gwx('./pages/tab-item-content/shop-center/create-order/create-order.wxml');

__wxAppCode__['pages/tab-item-content/shop-center/invite-join/invite-join.json']={"navigationBarTitleText":"录入店员","usingComponents":{}};
__wxAppCode__['pages/tab-item-content/shop-center/invite-join/invite-join.wxml']=$gwx('./pages/tab-item-content/shop-center/invite-join/invite-join.wxml');

__wxAppCode__['pages/tab-item-content/shop-center/join-shop/join-shop.json']={"navigationBarTitleText":"加入门店","usingComponents":{}};
__wxAppCode__['pages/tab-item-content/shop-center/join-shop/join-shop.wxml']=$gwx('./pages/tab-item-content/shop-center/join-shop/join-shop.wxml');

__wxAppCode__['pages/tab-item-content/shop-center/near-shop-list/near-shop-list.json']={"navigationBarTitleText":"选择门店","usingComponents":{}};
__wxAppCode__['pages/tab-item-content/shop-center/near-shop-list/near-shop-list.wxml']=$gwx('./pages/tab-item-content/shop-center/near-shop-list/near-shop-list.wxml');

__wxAppCode__['pages/tab-item-content/shop-center/record-shop/record-shop.json']={"navigationBarTitleText":"录入门店","usingComponents":{"addressed":"/components/jm-address/jm-address","mx-date-picker":"/components/uni/mx-datepicker/mx-datepicker"}};
__wxAppCode__['pages/tab-item-content/shop-center/record-shop/record-shop.wxml']=$gwx('./pages/tab-item-content/shop-center/record-shop/record-shop.wxml');

__wxAppCode__['pages/tab-item-content/shop-center/repair-item/repair-item.json']={"navigationBarTitleText":"新增报修","usingComponents":{"uni-tag":"/components/uni/uni-tag/uni-tag"}};
__wxAppCode__['pages/tab-item-content/shop-center/repair-item/repair-item.wxml']=$gwx('./pages/tab-item-content/shop-center/repair-item/repair-item.wxml');

__wxAppCode__['pages/tab-item-content/shop-center/repair-order-item/repair-order-item.json']={"navigationBarTitleText":"报修详情","usingComponents":{"uni-grid":"/components/uni-grid/uni-grid"}};
__wxAppCode__['pages/tab-item-content/shop-center/repair-order-item/repair-order-item.wxml']=$gwx('./pages/tab-item-content/shop-center/repair-order-item/repair-order-item.wxml');

__wxAppCode__['pages/tab-item-content/shop-center/search-more-shop/search-more-shop.json']={"navigationBarTitleText":"选择门店","usingComponents":{}};
__wxAppCode__['pages/tab-item-content/shop-center/search-more-shop/search-more-shop.wxml']=$gwx('./pages/tab-item-content/shop-center/search-more-shop/search-more-shop.wxml');

__wxAppCode__['pages/tab-item-content/shop-center/search-shop/search-shop.json']={"navigationStyle":"custom","titleNView":false,"usingComponents":{"cu-custom":"/colorui/components/cu-custom"}};
__wxAppCode__['pages/tab-item-content/shop-center/search-shop/search-shop.wxml']=$gwx('./pages/tab-item-content/shop-center/search-shop/search-shop.wxml');

__wxAppCode__['pages/tab-item-content/shop-center/shop-center.json']={"navigationBarTitleText":"报修记录","usingComponents":{}};
__wxAppCode__['pages/tab-item-content/shop-center/shop-center.wxml']=$gwx('./pages/tab-item-content/shop-center/shop-center.wxml');

__wxAppCode__['pages/tab-item-content/shop-center/shop-list/shop-list.json']={"navigationBarTitleText":"我的门店","usingComponents":{"head-tab":"/components/head-tab"}};
__wxAppCode__['pages/tab-item-content/shop-center/shop-list/shop-list.wxml']=$gwx('./pages/tab-item-content/shop-center/shop-list/shop-list.wxml');

__wxAppCode__['pages/tab-item-content/work-center/chose-copy/chose-copy.json']={"navigationBarTitleText":"选择抄送人","usingComponents":{}};
__wxAppCode__['pages/tab-item-content/work-center/chose-copy/chose-copy.wxml']=$gwx('./pages/tab-item-content/work-center/chose-copy/chose-copy.wxml');

__wxAppCode__['pages/tab-item-content/work-center/create-log/create-log.json']={"navigationBarTitleText":"新增日志","usingComponents":{}};
__wxAppCode__['pages/tab-item-content/work-center/create-log/create-log.wxml']=$gwx('./pages/tab-item-content/work-center/create-log/create-log.wxml');

__wxAppCode__['pages/tab-item-content/work-center/express-center/create-address/create-address.json']={"navigationBarTitleText":"新增地址","usingComponents":{"addressed":"/components/jm-address/jm-address"}};
__wxAppCode__['pages/tab-item-content/work-center/express-center/create-address/create-address.wxml']=$gwx('./pages/tab-item-content/work-center/express-center/create-address/create-address.wxml');

__wxAppCode__['pages/tab-item-content/work-center/express-center/create-express/create-express.json']={"navigationStyle":"custom","titleNView":false,"usingComponents":{"cu-custom":"/colorui/components/cu-custom"}};
__wxAppCode__['pages/tab-item-content/work-center/express-center/create-express/create-express.wxml']=$gwx('./pages/tab-item-content/work-center/express-center/create-express/create-express.wxml');

__wxAppCode__['pages/tab-item-content/work-center/express-center/express-index/express-index.json']={"navigationBarTitleText":"快递包裹","usingComponents":{}};
__wxAppCode__['pages/tab-item-content/work-center/express-center/express-index/express-index.wxml']=$gwx('./pages/tab-item-content/work-center/express-center/express-index/express-index.wxml');

__wxAppCode__['pages/tab-item-content/work-center/log-detail/log-detail.json']={"titleNView":false,"usingComponents":{"cu-custom":"/colorui/components/cu-custom"}};
__wxAppCode__['pages/tab-item-content/work-center/log-detail/log-detail.wxml']=$gwx('./pages/tab-item-content/work-center/log-detail/log-detail.wxml');

__wxAppCode__['pages/tab-item-content/work-center/work-index/work-index.json']={"navigationBarTitleText":"工作日志","usingComponents":{}};
__wxAppCode__['pages/tab-item-content/work-center/work-index/work-index.wxml']=$gwx('./pages/tab-item-content/work-center/work-index/work-index.wxml');

__wxAppCode__['pages/tab-item-content/work-center/work-log/work-log.json']={"navigationBarTitleText":"工作日志","usingComponents":{}};
__wxAppCode__['pages/tab-item-content/work-center/work-log/work-log.wxml']=$gwx('./pages/tab-item-content/work-center/work-log/work-log.wxml');

__wxAppCode__['pages/tab-item/index/index.json']={"navigationBarTitleText":"首页","usingComponents":{"axb-check-box":"/components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox","uni-grid":"/components/uni-grid/uni-grid","n-a-u-icard":"/components/NAUI-card/NAUI-card"}};
__wxAppCode__['pages/tab-item/index/index.wxml']=$gwx('./pages/tab-item/index/index.wxml');

__wxAppCode__['pages/tab-item/message/message.json']={"navigationBarTitleText":"消息","usingComponents":{}};
__wxAppCode__['pages/tab-item/message/message.wxml']=$gwx('./pages/tab-item/message/message.wxml');

__wxAppCode__['pages/tab-item/mine/mine.json']={"navigationBarTitleText":"我的","usingComponents":{"pop-modal":"/components/popmodal"}};
__wxAppCode__['pages/tab-item/mine/mine.wxml']=$gwx('./pages/tab-item/mine/mine.wxml');

__wxAppCode__['pages/tab-item/work/work.json']={"navigationBarTitleText":"工作","usingComponents":{}};
__wxAppCode__['pages/tab-item/work/work.wxml']=$gwx('./pages/tab-item/work/work.wxml');



define('common/main.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{"55d7":function(t,n,a){"use strict";var e=a("ff48"),u=a.n(e);u.a},"7f0a":function(t,n,a){"use strict";a.r(n);var e=a("a8d0");for(var u in e)"default"!==u&&function(t){a.d(n,t,function(){return e[t]})}(u);a("55d7");var r,o,f=a("2877"),s=Object(f["a"])(e["default"],r,o,!1,null,null,null);n["default"]=s.exports},a8d0:function(t,n,a){"use strict";a.r(n);var e=a("e1ab"),u=a.n(e);for(var r in e)"default"!==r&&function(t){a.d(n,t,function(){return e[t]})}(r);n["default"]=u.a},e1ab:function(t,n,a){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=u(a("66fd"));function u(t){return t&&t.__esModule?t:{default:t}}var r={data:function(){return{}},onLoad:function(){},methods:{},filters:{repairStatus:function(t){return this.$store.state.repairStatusZn[t]},repairStatusColor:function(t){return this.$store.state.repairStatusColor[t]}},onLaunch:function(){t.getSystemInfo({success:function(t){e.default.prototype.StatusBar=t.statusBarHeight,"android"==t.platform?e.default.prototype.CustomBar=t.statusBarHeight+50:e.default.prototype.CustomBar=t.statusBarHeight+45}})}};n.default=r}).call(this,a("6e42")["default"])},ff48:function(t,n,a){}},[["7e44","common/runtime","common/vendor"]]]);
});
define('common/runtime.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
"use strict";

(function (e) {
  function n(n) {
    for (var t, c, s = n[0], p = n[1], i = n[2], u = 0, m = []; u < s.length; u++) {
      c = s[u], r[c] && m.push(r[c][0]), r[c] = 0;
    }

    for (t in p) {
      Object.prototype.hasOwnProperty.call(p, t) && (e[t] = p[t]);
    }

    l && l(n);

    while (m.length) {
      m.shift()();
    }

    return a.push.apply(a, i || []), o();
  }

  function o() {
    for (var e, n = 0; n < a.length; n++) {
      for (var o = a[n], t = !0, c = 1; c < o.length; c++) {
        var s = o[c];
        0 !== r[s] && (t = !1);
      }

      t && (a.splice(n--, 1), e = p(p.s = o[0]));
    }

    return e;
  }

  var t = {},
      c = {
    "common/runtime": 0
  },
      r = {
    "common/runtime": 0
  },
      a = [];

  function s(e) {
    return p.p + "" + e + ".js";
  }

  function p(n) {
    if (t[n]) return t[n].exports;
    var o = t[n] = {
      i: n,
      l: !1,
      exports: {}
    };
    return e[n].call(o.exports, o, o.exports, p), o.l = !0, o.exports;
  }

  p.e = function (e) {
    var n = [],
        o = {
      "colorui/components/cu-custom": 1,
      "components/jm-address/jm-address": 1,
      "components/uni/mx-datepicker/mx-datepicker": 1,
      "components/head-tab": 1,
      "components/NAUI-card/NAUI-card": 1,
      "components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox": 1,
      "components/uni-grid/uni-grid": 1,
      "components/start/App": 1,
      "components/uni/uni-tag/uni-tag": 1,
      "components/code/number-keyboard": 1,
      "components/collapse/uni-collapse": 1,
      "components/collapse/uni-collapse-item": 1,
      "components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox-item": 1,
      "components/collapse/uni-icon": 1
    };
    c[e] ? n.push(c[e]) : 0 !== c[e] && o[e] && n.push(c[e] = new Promise(function (n, o) {
      for (var t = ({
        "colorui/components/cu-custom": "colorui/components/cu-custom",
        "components/popmodal": "components/popmodal",
        "components/jm-address/jm-address": "components/jm-address/jm-address",
        "components/uni/mx-datepicker/mx-datepicker": "components/uni/mx-datepicker/mx-datepicker",
        "components/head-tab": "components/head-tab",
        "components/NAUI-card/NAUI-card": "components/NAUI-card/NAUI-card",
        "components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox": "components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox",
        "components/uni-grid/uni-grid": "components/uni-grid/uni-grid",
        "components/start/App": "components/start/App",
        "components/uni/uni-tag/uni-tag": "components/uni/uni-tag/uni-tag",
        "components/code/number-keyboard": "components/code/number-keyboard",
        "components/collapse/uni-collapse": "components/collapse/uni-collapse",
        "components/collapse/uni-collapse-item": "components/collapse/uni-collapse-item",
        "components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox-item": "components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox-item",
        "components/collapse/uni-icon": "components/collapse/uni-icon"
      }[e] || e) + ".wxss", r = p.p + t, a = document.getElementsByTagName("link"), s = 0; s < a.length; s++) {
        var i = a[s],
            u = i.getAttribute("data-href") || i.getAttribute("href");
        if ("stylesheet" === i.rel && (u === t || u === r)) return n();
      }

      var m = document.getElementsByTagName("style");

      for (s = 0; s < m.length; s++) {
        i = m[s], u = i.getAttribute("data-href");
        if (u === t || u === r) return n();
      }

      var l = document.createElement("link");
      l.rel = "stylesheet", l.type = "text/css", l.onload = n, l.onerror = function (n) {
        var t = n && n.target && n.target.src || r,
            a = new Error("Loading CSS chunk " + e + " failed.\n(" + t + ")");
        a.request = t, delete c[e], l.parentNode.removeChild(l), o(a);
      }, l.href = r;
      var d = document.getElementsByTagName("head")[0];
      d.appendChild(l);
    }).then(function () {
      c[e] = 0;
    }));
    var t = r[e];
    if (0 !== t) if (t) n.push(t[2]);else {
      var a = new Promise(function (n, o) {
        t = r[e] = [n, o];
      });
      n.push(t[2] = a);
      var i,
          u = document.createElement("script");
      u.charset = "utf-8", u.timeout = 120, p.nc && u.setAttribute("nonce", p.nc), u.src = s(e), i = function i(n) {
        u.onerror = u.onload = null, clearTimeout(m);
        var o = r[e];

        if (0 !== o) {
          if (o) {
            var t = n && ("load" === n.type ? "missing" : n.type),
                c = n && n.target && n.target.src,
                a = new Error("Loading chunk " + e + " failed.\n(" + t + ": " + c + ")");
            a.type = t, a.request = c, o[1](a);
          }

          r[e] = void 0;
        }
      };
      var m = setTimeout(function () {
        i({
          type: "timeout",
          target: u
        });
      }, 12e4);
      u.onerror = u.onload = i, document.head.appendChild(u);
    }
    return Promise.all(n);
  }, p.m = e, p.c = t, p.d = function (e, n, o) {
    p.o(e, n) || Object.defineProperty(e, n, {
      enumerable: !0,
      get: o
    });
  }, p.r = function (e) {
    "undefined" !== typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(e, "__esModule", {
      value: !0
    });
  }, p.t = function (e, n) {
    if (1 & n && (e = p(e)), 8 & n) return e;
    if (4 & n && "object" === typeof e && e && e.__esModule) return e;
    var o = Object.create(null);
    if (p.r(o), Object.defineProperty(o, "default", {
      enumerable: !0,
      value: e
    }), 2 & n && "string" != typeof e) for (var t in e) {
      p.d(o, t, function (n) {
        return e[n];
      }.bind(null, t));
    }
    return o;
  }, p.n = function (e) {
    var n = e && e.__esModule ? function () {
      return e["default"];
    } : function () {
      return e;
    };
    return p.d(n, "a", n), n;
  }, p.o = function (e, n) {
    return Object.prototype.hasOwnProperty.call(e, n);
  }, p.p = "/", p.oe = function (e) {
    throw console.error(e), e;
  };
  var i = global["webpackJsonp"] = global["webpackJsonp"] || [],
      u = i.push.bind(i);
  i.push = n, i = i.slice();

  for (var m = 0; m < i.length; m++) {
    n(i[m]);
  }

  var l = u;
  o();
})([]);
});
define('common/vendor.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/vendor"],{"01f9":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("8ef9"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"0426":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("2826"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"16a8":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("7530"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},1877:function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("a963"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"1c26":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("01ba"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"22bd":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("af53"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"23ae":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("1bee"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},2798:function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("32af"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},2877:function(t,e,n){"use strict";function r(t,e,n,r,o,i,a,s){var u,c="function"===typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=n,c._compiled=!0),r&&(c.functional=!0),i&&(c._scopeId="data-v-"+i),a?(u=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"===typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),o&&o.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(a)},c._ssrRegister=u):o&&(u=s?function(){o.call(this,this.$root.$options.shadowRoot)}:o),u)if(c.functional){c._injectStyles=u;var l=c.render;c.render=function(t,e){return u.call(e),l(t,e)}}else{var f=c.beforeCreate;c.beforeCreate=f?[].concat(f,u):[u]}return{exports:t,options:c}}n.d(e,"a",function(){return r})},"2f62":function(t,e,n){"use strict";n.r(e),n.d(e,"Store",function(){return h}),n.d(e,"install",function(){return T}),n.d(e,"mapState",function(){return O}),n.d(e,"mapMutations",function(){return P}),n.d(e,"mapGetters",function(){return k}),n.d(e,"mapActions",function(){return x}),n.d(e,"createNamespacedHelpers",function(){return F});
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var r=function(t){var e=Number(t.version.split(".")[0]);if(e>=2)t.mixin({beforeCreate:r});else{var n=t.prototype._init;t.prototype._init=function(t){void 0===t&&(t={}),t.init=t.init?[r].concat(t.init):r,n.call(this,t)}}function r(){var t=this.$options;t.store?this.$store="function"===typeof t.store?t.store():t.store:t.parent&&t.parent.$store&&(this.$store=t.parent.$store)}},o="undefined"!==typeof window&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;function i(t){o&&(t._devtoolHook=o,o.emit("vuex:init",t),o.on("vuex:travel-to-state",function(e){t.replaceState(e)}),t.subscribe(function(t,e){o.emit("vuex:mutation",t,e)}))}function a(t,e){Object.keys(t).forEach(function(n){return e(t[n],n)})}function s(t){return null!==t&&"object"===typeof t}function u(t){return t&&"function"===typeof t.then}var c=function(t,e){this.runtime=e,this._children=Object.create(null),this._rawModule=t;var n=t.state;this.state=("function"===typeof n?n():n)||{}},l={namespaced:{configurable:!0}};l.namespaced.get=function(){return!!this._rawModule.namespaced},c.prototype.addChild=function(t,e){this._children[t]=e},c.prototype.removeChild=function(t){delete this._children[t]},c.prototype.getChild=function(t){return this._children[t]},c.prototype.update=function(t){this._rawModule.namespaced=t.namespaced,t.actions&&(this._rawModule.actions=t.actions),t.mutations&&(this._rawModule.mutations=t.mutations),t.getters&&(this._rawModule.getters=t.getters)},c.prototype.forEachChild=function(t){a(this._children,t)},c.prototype.forEachGetter=function(t){this._rawModule.getters&&a(this._rawModule.getters,t)},c.prototype.forEachAction=function(t){this._rawModule.actions&&a(this._rawModule.actions,t)},c.prototype.forEachMutation=function(t){this._rawModule.mutations&&a(this._rawModule.mutations,t)},Object.defineProperties(c.prototype,l);var f=function(t){this.register([],t,!1)};function p(t,e,n){if(e.update(n),n.modules)for(var r in n.modules){if(!e.getChild(r))return void 0;p(t.concat(r),e.getChild(r),n.modules[r])}}f.prototype.get=function(t){return t.reduce(function(t,e){return t.getChild(e)},this.root)},f.prototype.getNamespace=function(t){var e=this.root;return t.reduce(function(t,n){return e=e.getChild(n),t+(e.namespaced?n+"/":"")},"")},f.prototype.update=function(t){p([],this.root,t)},f.prototype.register=function(t,e,n){var r=this;void 0===n&&(n=!0);var o=new c(e,n);if(0===t.length)this.root=o;else{var i=this.get(t.slice(0,-1));i.addChild(t[t.length-1],o)}e.modules&&a(e.modules,function(e,o){r.register(t.concat(o),e,n)})},f.prototype.unregister=function(t){var e=this.get(t.slice(0,-1)),n=t[t.length-1];e.getChild(n).runtime&&e.removeChild(n)};var d;var h=function(t){var e=this;void 0===t&&(t={}),!d&&"undefined"!==typeof window&&window.Vue&&T(window.Vue);var n=t.plugins;void 0===n&&(n=[]);var r=t.strict;void 0===r&&(r=!1);var o=t.state;void 0===o&&(o={}),"function"===typeof o&&(o=o()||{}),this._committing=!1,this._actions=Object.create(null),this._actionSubscribers=[],this._mutations=Object.create(null),this._wrappedGetters=Object.create(null),this._modules=new f(t),this._modulesNamespaceMap=Object.create(null),this._subscribers=[],this._watcherVM=new d;var a=this,s=this,u=s.dispatch,c=s.commit;this.dispatch=function(t,e){return u.call(a,t,e)},this.commit=function(t,e,n){return c.call(a,t,e,n)},this.strict=r,_(this,o,[],this._modules.root),y(this,o),n.forEach(function(t){return t(e)}),d.config.devtools&&i(this)},g={state:{configurable:!0}};function m(t,e){return e.indexOf(t)<0&&e.push(t),function(){var n=e.indexOf(t);n>-1&&e.splice(n,1)}}function v(t,e){t._actions=Object.create(null),t._mutations=Object.create(null),t._wrappedGetters=Object.create(null),t._modulesNamespaceMap=Object.create(null);var n=t.state;_(t,n,[],t._modules.root,!0),y(t,n,e)}function y(t,e,n){var r=t._vm;t.getters={};var o=t._wrappedGetters,i={};a(o,function(e,n){i[n]=function(){return e(t)},Object.defineProperty(t.getters,n,{get:function(){return t._vm[n]},enumerable:!0})});var s=d.config.silent;d.config.silent=!0,t._vm=new d({data:{$$state:e},computed:i}),d.config.silent=s,t.strict&&C(t),r&&(n&&t._withCommit(function(){r._data.$$state=null}),d.nextTick(function(){return r.$destroy()}))}function _(t,e,n,r,o){var i=!n.length,a=t._modules.getNamespace(n);if(r.namespaced&&(t._modulesNamespaceMap[a]=r),!i&&!o){var s=w(e,n.slice(0,-1)),u=n[n.length-1];t._withCommit(function(){d.set(s,u,r.state)})}var c=r.context=b(t,a,n);r.forEachMutation(function(e,n){var r=a+n;M(t,r,e,c)}),r.forEachAction(function(e,n){var r=e.root?n:a+n,o=e.handler||e;S(t,r,o,c)}),r.forEachGetter(function(e,n){var r=a+n;E(t,r,e,c)}),r.forEachChild(function(r,i){_(t,e,n.concat(i),r,o)})}function b(t,e,n){var r=""===e,o={dispatch:r?t.dispatch:function(n,r,o){var i=A(n,r,o),a=i.payload,s=i.options,u=i.type;return s&&s.root||(u=e+u),t.dispatch(u,a)},commit:r?t.commit:function(n,r,o){var i=A(n,r,o),a=i.payload,s=i.options,u=i.type;s&&s.root||(u=e+u),t.commit(u,a,s)}};return Object.defineProperties(o,{getters:{get:r?function(){return t.getters}:function(){return I(t,e)}},state:{get:function(){return w(t.state,n)}}}),o}function I(t,e){var n={},r=e.length;return Object.keys(t.getters).forEach(function(o){if(o.slice(0,r)===e){var i=o.slice(r);Object.defineProperty(n,i,{get:function(){return t.getters[o]},enumerable:!0})}}),n}function M(t,e,n,r){var o=t._mutations[e]||(t._mutations[e]=[]);o.push(function(e){n.call(t,r.state,e)})}function S(t,e,n,r){var o=t._actions[e]||(t._actions[e]=[]);o.push(function(e,o){var i=n.call(t,{dispatch:r.dispatch,commit:r.commit,getters:r.getters,state:r.state,rootGetters:t.getters,rootState:t.state},e,o);return u(i)||(i=Promise.resolve(i)),t._devtoolHook?i.catch(function(e){throw t._devtoolHook.emit("vuex:error",e),e}):i})}function E(t,e,n,r){t._wrappedGetters[e]||(t._wrappedGetters[e]=function(t){return n(r.state,r.getters,t.state,t.getters)})}function C(t){t._vm.$watch(function(){return this._data.$$state},function(){0},{deep:!0,sync:!0})}function w(t,e){return e.length?e.reduce(function(t,e){return t[e]},t):t}function A(t,e,n){return s(t)&&t.type&&(n=e,e=t,t=t.type),{type:t,payload:e,options:n}}function T(t){d&&t===d||(d=t,r(d))}g.state.get=function(){return this._vm._data.$$state},g.state.set=function(t){0},h.prototype.commit=function(t,e,n){var r=this,o=A(t,e,n),i=o.type,a=o.payload,s=(o.options,{type:i,payload:a}),u=this._mutations[i];u&&(this._withCommit(function(){u.forEach(function(t){t(a)})}),this._subscribers.forEach(function(t){return t(s,r.state)}))},h.prototype.dispatch=function(t,e){var n=this,r=A(t,e),o=r.type,i=r.payload,a={type:o,payload:i},s=this._actions[o];if(s)return this._actionSubscribers.forEach(function(t){return t(a,n.state)}),s.length>1?Promise.all(s.map(function(t){return t(i)})):s[0](i)},h.prototype.subscribe=function(t){return m(t,this._subscribers)},h.prototype.subscribeAction=function(t){return m(t,this._actionSubscribers)},h.prototype.watch=function(t,e,n){var r=this;return this._watcherVM.$watch(function(){return t(r.state,r.getters)},e,n)},h.prototype.replaceState=function(t){var e=this;this._withCommit(function(){e._vm._data.$$state=t})},h.prototype.registerModule=function(t,e,n){void 0===n&&(n={}),"string"===typeof t&&(t=[t]),this._modules.register(t,e),_(this,this.state,t,this._modules.get(t),n.preserveState),y(this,this.state)},h.prototype.unregisterModule=function(t){var e=this;"string"===typeof t&&(t=[t]),this._modules.unregister(t),this._withCommit(function(){var n=w(e.state,t.slice(0,-1));d.delete(n,t[t.length-1])}),v(this)},h.prototype.hotUpdate=function(t){this._modules.update(t),v(this,!0)},h.prototype._withCommit=function(t){var e=this._committing;this._committing=!0,t(),this._committing=e},Object.defineProperties(h.prototype,g);var O=U(function(t,e){var n={};return R(e).forEach(function(e){var r=e.key,o=e.val;n[r]=function(){var e=this.$store.state,n=this.$store.getters;if(t){var r=G(this.$store,"mapState",t);if(!r)return;e=r.context.state,n=r.context.getters}return"function"===typeof o?o.call(this,e,n):e[o]},n[r].vuex=!0}),n}),P=U(function(t,e){var n={};return R(e).forEach(function(e){var r=e.key,o=e.val;n[r]=function(){var e=[],n=arguments.length;while(n--)e[n]=arguments[n];var r=this.$store.commit;if(t){var i=G(this.$store,"mapMutations",t);if(!i)return;r=i.context.commit}return"function"===typeof o?o.apply(this,[r].concat(e)):r.apply(this.$store,[o].concat(e))}}),n}),k=U(function(t,e){var n={};return R(e).forEach(function(e){var r=e.key,o=e.val;o=t+o,n[r]=function(){if(!t||G(this.$store,"mapGetters",t))return this.$store.getters[o]},n[r].vuex=!0}),n}),x=U(function(t,e){var n={};return R(e).forEach(function(e){var r=e.key,o=e.val;n[r]=function(){var e=[],n=arguments.length;while(n--)e[n]=arguments[n];var r=this.$store.dispatch;if(t){var i=G(this.$store,"mapActions",t);if(!i)return;r=i.context.dispatch}return"function"===typeof o?o.apply(this,[r].concat(e)):r.apply(this.$store,[o].concat(e))}}),n}),F=function(t){return{mapState:O.bind(null,t),mapGetters:k.bind(null,t),mapMutations:P.bind(null,t),mapActions:x.bind(null,t)}};function R(t){return Array.isArray(t)?t.map(function(t){return{key:t,val:t}}):Object.keys(t).map(function(e){return{key:e,val:t[e]}})}function U(t){return function(e,n){return"string"!==typeof e?(n=e,e=""):"/"!==e.charAt(e.length-1)&&(e+="/"),t(e,n)}}function G(t,e,n){var r=t._modulesNamespaceMap[n];return r}var D={Store:h,install:T,version:"3.0.1",mapState:O,mapMutations:P,mapGetters:k,mapActions:x,createNamespacedHelpers:F};e["default"]=D},"31ef":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("0fcd"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"33f6":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("d74a"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"3d67":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("ba06"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},4361:function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("2e67"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"49b1":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("f0d8"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"4a61":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(){this.es={}}return t.prototype.on=function(t,e,n){void 0===n&&(n=!1),this.es[t]||(this.es[t]=[]),this.es[t].push({cb:e,once:n})},t.prototype.once=function(t,e){this.on(t,e,!0)},t.prototype.fire=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];for(var r=this.es[t]||[],o=r.length,i=0;i<o;i++){var a=r[i],s=a.cb,u=a.once;s.apply(this,e),u&&(r.splice(i,1),i--,o--)}},t.prototype.off=function(t,e){if(void 0===t)this.es={};else if(void 0===e)delete this.es[t];else for(var n=this.es[t]||[],r=n.length,o=0;o<r;o++)n[o].cb===e&&(n.splice(o,1),o--,r--)},t.prototype.emit=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];this.fire.apply(this,[t].concat(e))},t.ver="2.0.1",t}();e.default=r},"4d31":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("b2d6"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"56aa":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("4cba"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"5d6c":function(t,e,n){},6193:function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("57a6"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},6221:function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("97d8"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"63c2":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("18dd"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"647e":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("ac4b"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"65af":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("5378"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"66fd":function(t,e,n){"use strict";n.r(e),function(t){
/*!
 * Vue.js v2.6.10
 * (c) 2014-2019 Evan You
 * Released under the MIT License.
 */
var n=Object.freeze({});function r(t){return void 0===t||null===t}function o(t){return void 0!==t&&null!==t}function i(t){return!0===t}function a(t){return!1===t}function s(t){return"string"===typeof t||"number"===typeof t||"symbol"===typeof t||"boolean"===typeof t}function u(t){return null!==t&&"object"===typeof t}var c=Object.prototype.toString;function l(t){return"[object Object]"===c.call(t)}function f(t){return"[object RegExp]"===c.call(t)}function p(t){var e=parseFloat(String(t));return e>=0&&Math.floor(e)===e&&isFinite(t)}function d(t){return o(t)&&"function"===typeof t.then&&"function"===typeof t.catch}function h(t){return null==t?"":Array.isArray(t)||l(t)&&t.toString===c?JSON.stringify(t,null,2):String(t)}function g(t){var e=parseFloat(t);return isNaN(e)?t:e}function m(t,e){for(var n=Object.create(null),r=t.split(","),o=0;o<r.length;o++)n[r[o]]=!0;return e?function(t){return n[t.toLowerCase()]}:function(t){return n[t]}}m("slot,component",!0);var v=m("key,ref,slot,slot-scope,is");function y(t,e){if(t.length){var n=t.indexOf(e);if(n>-1)return t.splice(n,1)}}var _=Object.prototype.hasOwnProperty;function b(t,e){return _.call(t,e)}function I(t){var e=Object.create(null);return function(n){var r=e[n];return r||(e[n]=t(n))}}var M=/-(\w)/g,S=I(function(t){return t.replace(M,function(t,e){return e?e.toUpperCase():""})}),E=I(function(t){return t.charAt(0).toUpperCase()+t.slice(1)}),C=/\B([A-Z])/g,w=I(function(t){return t.replace(C,"-$1").toLowerCase()});function A(t,e){function n(n){var r=arguments.length;return r?r>1?t.apply(e,arguments):t.call(e,n):t.call(e)}return n._length=t.length,n}function T(t,e){return t.bind(e)}var O=Function.prototype.bind?T:A;function P(t,e){e=e||0;var n=t.length-e,r=new Array(n);while(n--)r[n]=t[n+e];return r}function k(t,e){for(var n in e)t[n]=e[n];return t}function x(t){for(var e={},n=0;n<t.length;n++)t[n]&&k(e,t[n]);return e}function F(t,e,n){}var R=function(t,e,n){return!1},U=function(t){return t};function G(t,e){if(t===e)return!0;var n=u(t),r=u(e);if(!n||!r)return!n&&!r&&String(t)===String(e);try{var o=Array.isArray(t),i=Array.isArray(e);if(o&&i)return t.length===e.length&&t.every(function(t,n){return G(t,e[n])});if(t instanceof Date&&e instanceof Date)return t.getTime()===e.getTime();if(o||i)return!1;var a=Object.keys(t),s=Object.keys(e);return a.length===s.length&&a.every(function(n){return G(t[n],e[n])})}catch(c){return!1}}function D(t,e){for(var n=0;n<t.length;n++)if(G(t[n],e))return n;return-1}function N(t){var e=!1;return function(){e||(e=!0,t.apply(this,arguments))}}var L=["component","directive","filter"],j=["beforeCreate","created","beforeMount","mounted","beforeUpdate","updated","beforeDestroy","destroyed","activated","deactivated","errorCaptured","serverPrefetch"],$={optionMergeStrategies:Object.create(null),silent:!1,productionTip:!1,devtools:!1,performance:!1,errorHandler:null,warnHandler:null,ignoredElements:[],keyCodes:Object.create(null),isReservedTag:R,isReservedAttr:R,isUnknownElement:R,getTagNamespace:F,parsePlatformTagName:U,mustUseProp:R,async:!0,_lifecycleHooks:j},q=/a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;function B(t){var e=(t+"").charCodeAt(0);return 36===e||95===e}function H(t,e,n,r){Object.defineProperty(t,e,{value:n,enumerable:!!r,writable:!0,configurable:!0})}var z=new RegExp("[^"+q.source+".$_\\d]");function V(t){if(!z.test(t)){var e=t.split(".");return function(t){for(var n=0;n<e.length;n++){if(!t)return;t=t[e[n]]}return t}}}var K,W="__proto__"in{},J="undefined"!==typeof window,Y="undefined"!==typeof WXEnvironment&&!!WXEnvironment.platform,X=Y&&WXEnvironment.platform.toLowerCase(),Q=J&&window.navigator.userAgent.toLowerCase(),Z=Q&&/msie|trident/.test(Q),tt=(Q&&Q.indexOf("msie 9.0"),Q&&Q.indexOf("edge/")>0),et=(Q&&Q.indexOf("android"),Q&&/iphone|ipad|ipod|ios/.test(Q)||"ios"===X),nt=(Q&&/chrome\/\d+/.test(Q),Q&&/phantomjs/.test(Q),Q&&Q.match(/firefox\/(\d+)/),{}.watch);if(J)try{var rt={};Object.defineProperty(rt,"passive",{get:function(){}}),window.addEventListener("test-passive",null,rt)}catch(no){}var ot=function(){return void 0===K&&(K=!J&&!Y&&"undefined"!==typeof t&&(t["process"]&&"server"===t["process"].env.VUE_ENV)),K},it=J&&window.__VUE_DEVTOOLS_GLOBAL_HOOK__;function at(t){return"function"===typeof t&&/native code/.test(t.toString())}var st,ut="undefined"!==typeof Symbol&&at(Symbol)&&"undefined"!==typeof Reflect&&at(Reflect.ownKeys);st="undefined"!==typeof Set&&at(Set)?Set:function(){function t(){this.set=Object.create(null)}return t.prototype.has=function(t){return!0===this.set[t]},t.prototype.add=function(t){this.set[t]=!0},t.prototype.clear=function(){this.set=Object.create(null)},t}();var ct=F,lt=0,ft=function(){this.id=lt++,this.subs=[]};ft.prototype.addSub=function(t){this.subs.push(t)},ft.prototype.removeSub=function(t){y(this.subs,t)},ft.prototype.depend=function(){ft.target&&ft.target.addDep(this)},ft.prototype.notify=function(){var t=this.subs.slice();for(var e=0,n=t.length;e<n;e++)t[e].update()},ft.target=null;var pt=[];function dt(t){pt.push(t),ft.target=t}function ht(){pt.pop(),ft.target=pt[pt.length-1]}var gt=function(t,e,n,r,o,i,a,s){this.tag=t,this.data=e,this.children=n,this.text=r,this.elm=o,this.ns=void 0,this.context=i,this.fnContext=void 0,this.fnOptions=void 0,this.fnScopeId=void 0,this.key=e&&e.key,this.componentOptions=a,this.componentInstance=void 0,this.parent=void 0,this.raw=!1,this.isStatic=!1,this.isRootInsert=!0,this.isComment=!1,this.isCloned=!1,this.isOnce=!1,this.asyncFactory=s,this.asyncMeta=void 0,this.isAsyncPlaceholder=!1},mt={child:{configurable:!0}};mt.child.get=function(){return this.componentInstance},Object.defineProperties(gt.prototype,mt);var vt=function(t){void 0===t&&(t="");var e=new gt;return e.text=t,e.isComment=!0,e};function yt(t){return new gt(void 0,void 0,void 0,String(t))}function _t(t){var e=new gt(t.tag,t.data,t.children&&t.children.slice(),t.text,t.elm,t.context,t.componentOptions,t.asyncFactory);return e.ns=t.ns,e.isStatic=t.isStatic,e.key=t.key,e.isComment=t.isComment,e.fnContext=t.fnContext,e.fnOptions=t.fnOptions,e.fnScopeId=t.fnScopeId,e.asyncMeta=t.asyncMeta,e.isCloned=!0,e}var bt=Array.prototype,It=Object.create(bt),Mt=["push","pop","shift","unshift","splice","sort","reverse"];Mt.forEach(function(t){var e=bt[t];H(It,t,function(){var n=[],r=arguments.length;while(r--)n[r]=arguments[r];var o,i=e.apply(this,n),a=this.__ob__;switch(t){case"push":case"unshift":o=n;break;case"splice":o=n.slice(2);break}return o&&a.observeArray(o),a.dep.notify(),i})});var St=Object.getOwnPropertyNames(It),Et=!0;function Ct(t){Et=t}var wt=function(t){this.value=t,this.dep=new ft,this.vmCount=0,H(t,"__ob__",this),Array.isArray(t)?(W?At(t,It):Tt(t,It,St),this.observeArray(t)):this.walk(t)};function At(t,e){t.__proto__=e}function Tt(t,e,n){for(var r=0,o=n.length;r<o;r++){var i=n[r];H(t,i,e[i])}}function Ot(t,e){var n;if(u(t)&&!(t instanceof gt))return b(t,"__ob__")&&t.__ob__ instanceof wt?n=t.__ob__:Et&&!ot()&&(Array.isArray(t)||l(t))&&Object.isExtensible(t)&&!t._isVue&&(n=new wt(t)),e&&n&&n.vmCount++,n}function Pt(t,e,n,r,o){var i=new ft,a=Object.getOwnPropertyDescriptor(t,e);if(!a||!1!==a.configurable){var s=a&&a.get,u=a&&a.set;s&&!u||2!==arguments.length||(n=t[e]);var c=!o&&Ot(n);Object.defineProperty(t,e,{enumerable:!0,configurable:!0,get:function(){var e=s?s.call(t):n;return ft.target&&(i.depend(),c&&(c.dep.depend(),Array.isArray(e)&&Ft(e))),e},set:function(e){var r=s?s.call(t):n;e===r||e!==e&&r!==r||s&&!u||(u?u.call(t,e):n=e,c=!o&&Ot(e),i.notify())}})}}function kt(t,e,n){if(Array.isArray(t)&&p(e))return t.length=Math.max(t.length,e),t.splice(e,1,n),n;if(e in t&&!(e in Object.prototype))return t[e]=n,n;var r=t.__ob__;return t._isVue||r&&r.vmCount?n:r?(Pt(r.value,e,n),r.dep.notify(),n):(t[e]=n,n)}function xt(t,e){if(Array.isArray(t)&&p(e))t.splice(e,1);else{var n=t.__ob__;t._isVue||n&&n.vmCount||b(t,e)&&(delete t[e],n&&n.dep.notify())}}function Ft(t){for(var e=void 0,n=0,r=t.length;n<r;n++)e=t[n],e&&e.__ob__&&e.__ob__.dep.depend(),Array.isArray(e)&&Ft(e)}wt.prototype.walk=function(t){for(var e=Object.keys(t),n=0;n<e.length;n++)Pt(t,e[n])},wt.prototype.observeArray=function(t){for(var e=0,n=t.length;e<n;e++)Ot(t[e])};var Rt=$.optionMergeStrategies;function Ut(t,e){if(!e)return t;for(var n,r,o,i=ut?Reflect.ownKeys(e):Object.keys(e),a=0;a<i.length;a++)n=i[a],"__ob__"!==n&&(r=t[n],o=e[n],b(t,n)?r!==o&&l(r)&&l(o)&&Ut(r,o):kt(t,n,o));return t}function Gt(t,e,n){return n?function(){var r="function"===typeof e?e.call(n,n):e,o="function"===typeof t?t.call(n,n):t;return r?Ut(r,o):o}:e?t?function(){return Ut("function"===typeof e?e.call(this,this):e,"function"===typeof t?t.call(this,this):t)}:e:t}function Dt(t,e){var n=e?t?t.concat(e):Array.isArray(e)?e:[e]:t;return n?Nt(n):n}function Nt(t){for(var e=[],n=0;n<t.length;n++)-1===e.indexOf(t[n])&&e.push(t[n]);return e}function Lt(t,e,n,r){var o=Object.create(t||null);return e?k(o,e):o}Rt.data=function(t,e,n){return n?Gt(t,e,n):e&&"function"!==typeof e?t:Gt(t,e)},j.forEach(function(t){Rt[t]=Dt}),L.forEach(function(t){Rt[t+"s"]=Lt}),Rt.watch=function(t,e,n,r){if(t===nt&&(t=void 0),e===nt&&(e=void 0),!e)return Object.create(t||null);if(!t)return e;var o={};for(var i in k(o,t),e){var a=o[i],s=e[i];a&&!Array.isArray(a)&&(a=[a]),o[i]=a?a.concat(s):Array.isArray(s)?s:[s]}return o},Rt.props=Rt.methods=Rt.inject=Rt.computed=function(t,e,n,r){if(!t)return e;var o=Object.create(null);return k(o,t),e&&k(o,e),o},Rt.provide=Gt;var jt=function(t,e){return void 0===e?t:e};function $t(t,e){var n=t.props;if(n){var r,o,i,a={};if(Array.isArray(n)){r=n.length;while(r--)o=n[r],"string"===typeof o&&(i=S(o),a[i]={type:null})}else if(l(n))for(var s in n)o=n[s],i=S(s),a[i]=l(o)?o:{type:o};else 0;t.props=a}}function qt(t,e){var n=t.inject;if(n){var r=t.inject={};if(Array.isArray(n))for(var o=0;o<n.length;o++)r[n[o]]={from:n[o]};else if(l(n))for(var i in n){var a=n[i];r[i]=l(a)?k({from:i},a):{from:a}}else 0}}function Bt(t){var e=t.directives;if(e)for(var n in e){var r=e[n];"function"===typeof r&&(e[n]={bind:r,update:r})}}function Ht(t,e,n){if("function"===typeof e&&(e=e.options),$t(e,n),qt(e,n),Bt(e),!e._base&&(e.extends&&(t=Ht(t,e.extends,n)),e.mixins))for(var r=0,o=e.mixins.length;r<o;r++)t=Ht(t,e.mixins[r],n);var i,a={};for(i in t)s(i);for(i in e)b(t,i)||s(i);function s(r){var o=Rt[r]||jt;a[r]=o(t[r],e[r],n,r)}return a}function zt(t,e,n,r){if("string"===typeof n){var o=t[e];if(b(o,n))return o[n];var i=S(n);if(b(o,i))return o[i];var a=E(i);if(b(o,a))return o[a];var s=o[n]||o[i]||o[a];return s}}function Vt(t,e,n,r){var o=e[t],i=!b(n,t),a=n[t],s=Yt(Boolean,o.type);if(s>-1)if(i&&!b(o,"default"))a=!1;else if(""===a||a===w(t)){var u=Yt(String,o.type);(u<0||s<u)&&(a=!0)}if(void 0===a){a=Kt(r,o,t);var c=Et;Ct(!0),Ot(a),Ct(c)}return a}function Kt(t,e,n){if(b(e,"default")){var r=e.default;return t&&t.$options.propsData&&void 0===t.$options.propsData[n]&&void 0!==t._props[n]?t._props[n]:"function"===typeof r&&"Function"!==Wt(e.type)?r.call(t):r}}function Wt(t){var e=t&&t.toString().match(/^\s*function (\w+)/);return e?e[1]:""}function Jt(t,e){return Wt(t)===Wt(e)}function Yt(t,e){if(!Array.isArray(e))return Jt(e,t)?0:-1;for(var n=0,r=e.length;n<r;n++)if(Jt(e[n],t))return n;return-1}function Xt(t,e,n){dt();try{if(e){var r=e;while(r=r.$parent){var o=r.$options.errorCaptured;if(o)for(var i=0;i<o.length;i++)try{var a=!1===o[i].call(r,t,e,n);if(a)return}catch(no){Zt(no,r,"errorCaptured hook")}}}Zt(t,e,n)}finally{ht()}}function Qt(t,e,n,r,o){var i;try{i=n?t.apply(e,n):t.call(e),i&&!i._isVue&&d(i)&&!i._handled&&(i.catch(function(t){return Xt(t,r,o+" (Promise/async)")}),i._handled=!0)}catch(no){Xt(no,r,o)}return i}function Zt(t,e,n){if($.errorHandler)try{return $.errorHandler.call(null,t,e,n)}catch(no){no!==t&&te(no,null,"config.errorHandler")}te(t,e,n)}function te(t,e,n){if(!J&&!Y||"undefined"===typeof console)throw t;console.error(t)}var ee,ne=[],re=!1;function oe(){re=!1;var t=ne.slice(0);ne.length=0;for(var e=0;e<t.length;e++)t[e]()}if("undefined"!==typeof Promise&&at(Promise)){var ie=Promise.resolve();ee=function(){ie.then(oe),et&&setTimeout(F)}}else if(Z||"undefined"===typeof MutationObserver||!at(MutationObserver)&&"[object MutationObserverConstructor]"!==MutationObserver.toString())ee="undefined"!==typeof setImmediate&&at(setImmediate)?function(){setImmediate(oe)}:function(){setTimeout(oe,0)};else{var ae=1,se=new MutationObserver(oe),ue=document.createTextNode(String(ae));se.observe(ue,{characterData:!0}),ee=function(){ae=(ae+1)%2,ue.data=String(ae)}}function ce(t,e){var n;if(ne.push(function(){if(t)try{t.call(e)}catch(no){Xt(no,e,"nextTick")}else n&&n(e)}),re||(re=!0,ee()),!t&&"undefined"!==typeof Promise)return new Promise(function(t){n=t})}var le=new st;function fe(t){pe(t,le),le.clear()}function pe(t,e){var n,r,o=Array.isArray(t);if(!(!o&&!u(t)||Object.isFrozen(t)||t instanceof gt)){if(t.__ob__){var i=t.__ob__.dep.id;if(e.has(i))return;e.add(i)}if(o){n=t.length;while(n--)pe(t[n],e)}else{r=Object.keys(t),n=r.length;while(n--)pe(t[r[n]],e)}}}var de=I(function(t){var e="&"===t.charAt(0);t=e?t.slice(1):t;var n="~"===t.charAt(0);t=n?t.slice(1):t;var r="!"===t.charAt(0);return t=r?t.slice(1):t,{name:t,once:n,capture:r,passive:e}});function he(t,e){function n(){var t=arguments,r=n.fns;if(!Array.isArray(r))return Qt(r,null,arguments,e,"v-on handler");for(var o=r.slice(),i=0;i<o.length;i++)Qt(o[i],null,t,e,"v-on handler")}return n.fns=t,n}function ge(t,e,n,o,a,s){var u,c,l,f;for(u in t)c=t[u],l=e[u],f=de(u),r(c)||(r(l)?(r(c.fns)&&(c=t[u]=he(c,s)),i(f.once)&&(c=t[u]=a(f.name,c,f.capture)),n(f.name,c,f.capture,f.passive,f.params)):c!==l&&(l.fns=c,t[u]=l));for(u in e)r(t[u])&&(f=de(u),o(f.name,e[u],f.capture))}function me(t,e,n){var i=e.options.props;if(!r(i)){var a={},s=t.attrs,u=t.props;if(o(s)||o(u))for(var c in i){var l=w(c);ve(a,u,c,l,!0)||ve(a,s,c,l,!1)}return a}}function ve(t,e,n,r,i){if(o(e)){if(b(e,n))return t[n]=e[n],i||delete e[n],!0;if(b(e,r))return t[n]=e[r],i||delete e[r],!0}return!1}function ye(t){for(var e=0;e<t.length;e++)if(Array.isArray(t[e]))return Array.prototype.concat.apply([],t);return t}function _e(t){return s(t)?[yt(t)]:Array.isArray(t)?Ie(t):void 0}function be(t){return o(t)&&o(t.text)&&a(t.isComment)}function Ie(t,e){var n,a,u,c,l=[];for(n=0;n<t.length;n++)a=t[n],r(a)||"boolean"===typeof a||(u=l.length-1,c=l[u],Array.isArray(a)?a.length>0&&(a=Ie(a,(e||"")+"_"+n),be(a[0])&&be(c)&&(l[u]=yt(c.text+a[0].text),a.shift()),l.push.apply(l,a)):s(a)?be(c)?l[u]=yt(c.text+a):""!==a&&l.push(yt(a)):be(a)&&be(c)?l[u]=yt(c.text+a.text):(i(t._isVList)&&o(a.tag)&&r(a.key)&&o(e)&&(a.key="__vlist"+e+"_"+n+"__"),l.push(a)));return l}function Me(t){var e=t.$options.provide;e&&(t._provided="function"===typeof e?e.call(t):e)}function Se(t){var e=Ee(t.$options.inject,t);e&&(Ct(!1),Object.keys(e).forEach(function(n){Pt(t,n,e[n])}),Ct(!0))}function Ee(t,e){if(t){for(var n=Object.create(null),r=ut?Reflect.ownKeys(t):Object.keys(t),o=0;o<r.length;o++){var i=r[o];if("__ob__"!==i){var a=t[i].from,s=e;while(s){if(s._provided&&b(s._provided,a)){n[i]=s._provided[a];break}s=s.$parent}if(!s)if("default"in t[i]){var u=t[i].default;n[i]="function"===typeof u?u.call(e):u}else 0}}return n}}function Ce(t,e){if(!t||!t.length)return{};for(var n={},r=0,o=t.length;r<o;r++){var i=t[r],a=i.data;if(a&&a.attrs&&a.attrs.slot&&delete a.attrs.slot,i.context!==e&&i.fnContext!==e||!a||null==a.slot)(n.default||(n.default=[])).push(i);else{var s=a.slot,u=n[s]||(n[s]=[]);"template"===i.tag?u.push.apply(u,i.children||[]):u.push(i)}}for(var c in n)n[c].every(we)&&delete n[c];return n}function we(t){return t.isComment&&!t.asyncFactory||" "===t.text}function Ae(t,e,r){var o,i=Object.keys(e).length>0,a=t?!!t.$stable:!i,s=t&&t.$key;if(t){if(t._normalized)return t._normalized;if(a&&r&&r!==n&&s===r.$key&&!i&&!r.$hasNormal)return r;for(var u in o={},t)t[u]&&"$"!==u[0]&&(o[u]=Te(e,u,t[u]))}else o={};for(var c in e)c in o||(o[c]=Oe(e,c));return t&&Object.isExtensible(t)&&(t._normalized=o),H(o,"$stable",a),H(o,"$key",s),H(o,"$hasNormal",i),o}function Te(t,e,n){var r=function(){var t=arguments.length?n.apply(null,arguments):n({});return t=t&&"object"===typeof t&&!Array.isArray(t)?[t]:_e(t),t&&(0===t.length||1===t.length&&t[0].isComment)?void 0:t};return n.proxy&&Object.defineProperty(t,e,{get:r,enumerable:!0,configurable:!0}),r}function Oe(t,e){return function(){return t[e]}}function Pe(t,e){var n,r,i,a,s;if(Array.isArray(t)||"string"===typeof t)for(n=new Array(t.length),r=0,i=t.length;r<i;r++)n[r]=e(t[r],r);else if("number"===typeof t)for(n=new Array(t),r=0;r<t;r++)n[r]=e(r+1,r);else if(u(t))if(ut&&t[Symbol.iterator]){n=[];var c=t[Symbol.iterator](),l=c.next();while(!l.done)n.push(e(l.value,n.length)),l=c.next()}else for(a=Object.keys(t),n=new Array(a.length),r=0,i=a.length;r<i;r++)s=a[r],n[r]=e(t[s],s,r);return o(n)||(n=[]),n._isVList=!0,n}function ke(t,e,n,r){var o,i=this.$scopedSlots[t];i?(n=n||{},r&&(n=k(k({},r),n)),o=i(n)||e):o=this.$slots[t]||e;var a=n&&n.slot;return a?this.$createElement("template",{slot:a},o):o}function xe(t){return zt(this.$options,"filters",t,!0)||U}function Fe(t,e){return Array.isArray(t)?-1===t.indexOf(e):t!==e}function Re(t,e,n,r,o){var i=$.keyCodes[e]||n;return o&&r&&!$.keyCodes[e]?Fe(o,r):i?Fe(i,t):r?w(r)!==e:void 0}function Ue(t,e,n,r,o){if(n)if(u(n)){var i;Array.isArray(n)&&(n=x(n));var a=function(a){if("class"===a||"style"===a||v(a))i=t;else{var s=t.attrs&&t.attrs.type;i=r||$.mustUseProp(e,s,a)?t.domProps||(t.domProps={}):t.attrs||(t.attrs={})}var u=S(a),c=w(a);if(!(u in i)&&!(c in i)&&(i[a]=n[a],o)){var l=t.on||(t.on={});l["update:"+a]=function(t){n[a]=t}}};for(var s in n)a(s)}else;return t}function Ge(t,e){var n=this._staticTrees||(this._staticTrees=[]),r=n[t];return r&&!e?r:(r=n[t]=this.$options.staticRenderFns[t].call(this._renderProxy,null,this),Ne(r,"__static__"+t,!1),r)}function De(t,e,n){return Ne(t,"__once__"+e+(n?"_"+n:""),!0),t}function Ne(t,e,n){if(Array.isArray(t))for(var r=0;r<t.length;r++)t[r]&&"string"!==typeof t[r]&&Le(t[r],e+"_"+r,n);else Le(t,e,n)}function Le(t,e,n){t.isStatic=!0,t.key=e,t.isOnce=n}function je(t,e){if(e)if(l(e)){var n=t.on=t.on?k({},t.on):{};for(var r in e){var o=n[r],i=e[r];n[r]=o?[].concat(o,i):i}}else;return t}function $e(t,e,n,r){e=e||{$stable:!n};for(var o=0;o<t.length;o++){var i=t[o];Array.isArray(i)?$e(i,e,n):i&&(i.proxy&&(i.fn.proxy=!0),e[i.key]=i.fn)}return r&&(e.$key=r),e}function qe(t,e){for(var n=0;n<e.length;n+=2){var r=e[n];"string"===typeof r&&r&&(t[e[n]]=e[n+1])}return t}function Be(t,e){return"string"===typeof t?e+t:t}function He(t){t._o=De,t._n=g,t._s=h,t._l=Pe,t._t=ke,t._q=G,t._i=D,t._m=Ge,t._f=xe,t._k=Re,t._b=Ue,t._v=yt,t._e=vt,t._u=$e,t._g=je,t._d=qe,t._p=Be}function ze(t,e,r,o,a){var s,u=this,c=a.options;b(o,"_uid")?(s=Object.create(o),s._original=o):(s=o,o=o._original);var l=i(c._compiled),f=!l;this.data=t,this.props=e,this.children=r,this.parent=o,this.listeners=t.on||n,this.injections=Ee(c.inject,o),this.slots=function(){return u.$slots||Ae(t.scopedSlots,u.$slots=Ce(r,o)),u.$slots},Object.defineProperty(this,"scopedSlots",{enumerable:!0,get:function(){return Ae(t.scopedSlots,this.slots())}}),l&&(this.$options=c,this.$slots=this.slots(),this.$scopedSlots=Ae(t.scopedSlots,this.$slots)),c._scopeId?this._c=function(t,e,n,r){var i=on(s,t,e,n,r,f);return i&&!Array.isArray(i)&&(i.fnScopeId=c._scopeId,i.fnContext=o),i}:this._c=function(t,e,n,r){return on(s,t,e,n,r,f)}}function Ve(t,e,r,i,a){var s=t.options,u={},c=s.props;if(o(c))for(var l in c)u[l]=Vt(l,c,e||n);else o(r.attrs)&&We(u,r.attrs),o(r.props)&&We(u,r.props);var f=new ze(r,u,a,i,t),p=s.render.call(null,f._c,f);if(p instanceof gt)return Ke(p,r,f.parent,s,f);if(Array.isArray(p)){for(var d=_e(p)||[],h=new Array(d.length),g=0;g<d.length;g++)h[g]=Ke(d[g],r,f.parent,s,f);return h}}function Ke(t,e,n,r,o){var i=_t(t);return i.fnContext=n,i.fnOptions=r,e.slot&&((i.data||(i.data={})).slot=e.slot),i}function We(t,e){for(var n in e)t[S(n)]=e[n]}He(ze.prototype);var Je={init:function(t,e){if(t.componentInstance&&!t.componentInstance._isDestroyed&&t.data.keepAlive){var n=t;Je.prepatch(n,n)}else{var r=t.componentInstance=Qe(t,En);r.$mount(e?t.elm:void 0,e)}},prepatch:function(t,e){var n=e.componentOptions,r=e.componentInstance=t.componentInstance;Tn(r,n.propsData,n.listeners,e,n.children)},insert:function(t){var e=t.context,n=t.componentInstance;n._isMounted||(n._isMounted=!0,xn(n,"mounted")),t.data.keepAlive&&(e._isMounted?Hn(n):Pn(n,!0))},destroy:function(t){var e=t.componentInstance;e._isDestroyed||(t.data.keepAlive?kn(e,!0):e.$destroy())}},Ye=Object.keys(Je);function Xe(t,e,n,a,s){if(!r(t)){var c=n.$options._base;if(u(t)&&(t=c.extend(t)),"function"===typeof t){var l;if(r(t.cid)&&(l=t,t=gn(l,c),void 0===t))return hn(l,e,n,a,s);e=e||{},dr(t),o(e.model)&&en(t.options,e);var f=me(e,t,s);if(i(t.options.functional))return Ve(t,f,e,n,a);var p=e.on;if(e.on=e.nativeOn,i(t.options.abstract)){var d=e.slot;e={},d&&(e.slot=d)}Ze(e);var h=t.options.name||s,g=new gt("vue-component-"+t.cid+(h?"-"+h:""),e,void 0,void 0,void 0,n,{Ctor:t,propsData:f,listeners:p,tag:s,children:a},l);return g}}}function Qe(t,e){var n={_isComponent:!0,_parentVnode:t,parent:e},r=t.data.inlineTemplate;return o(r)&&(n.render=r.render,n.staticRenderFns=r.staticRenderFns),new t.componentOptions.Ctor(n)}function Ze(t){for(var e=t.hook||(t.hook={}),n=0;n<Ye.length;n++){var r=Ye[n],o=e[r],i=Je[r];o===i||o&&o._merged||(e[r]=o?tn(i,o):i)}}function tn(t,e){var n=function(n,r){t(n,r),e(n,r)};return n._merged=!0,n}function en(t,e){var n=t.model&&t.model.prop||"value",r=t.model&&t.model.event||"input";(e.attrs||(e.attrs={}))[n]=e.model.value;var i=e.on||(e.on={}),a=i[r],s=e.model.callback;o(a)?(Array.isArray(a)?-1===a.indexOf(s):a!==s)&&(i[r]=[s].concat(a)):i[r]=s}var nn=1,rn=2;function on(t,e,n,r,o,a){return(Array.isArray(n)||s(n))&&(o=r,r=n,n=void 0),i(a)&&(o=rn),an(t,e,n,r,o)}function an(t,e,n,r,i){if(o(n)&&o(n.__ob__))return vt();if(o(n)&&o(n.is)&&(e=n.is),!e)return vt();var a,s,u;(Array.isArray(r)&&"function"===typeof r[0]&&(n=n||{},n.scopedSlots={default:r[0]},r.length=0),i===rn?r=_e(r):i===nn&&(r=ye(r)),"string"===typeof e)?(s=t.$vnode&&t.$vnode.ns||$.getTagNamespace(e),a=$.isReservedTag(e)?new gt($.parsePlatformTagName(e),n,r,void 0,void 0,t):n&&n.pre||!o(u=zt(t.$options,"components",e))?new gt(e,n,r,void 0,void 0,t):Xe(u,n,t,r,e)):a=Xe(e,n,t,r);return Array.isArray(a)?a:o(a)?(o(s)&&sn(a,s),o(n)&&un(n),a):vt()}function sn(t,e,n){if(t.ns=e,"foreignObject"===t.tag&&(e=void 0,n=!0),o(t.children))for(var a=0,s=t.children.length;a<s;a++){var u=t.children[a];o(u.tag)&&(r(u.ns)||i(n)&&"svg"!==u.tag)&&sn(u,e,n)}}function un(t){u(t.style)&&fe(t.style),u(t.class)&&fe(t.class)}function cn(t){t._vnode=null,t._staticTrees=null;var e=t.$options,r=t.$vnode=e._parentVnode,o=r&&r.context;t.$slots=Ce(e._renderChildren,o),t.$scopedSlots=n,t._c=function(e,n,r,o){return on(t,e,n,r,o,!1)},t.$createElement=function(e,n,r,o){return on(t,e,n,r,o,!0)};var i=r&&r.data;Pt(t,"$attrs",i&&i.attrs||n,null,!0),Pt(t,"$listeners",e._parentListeners||n,null,!0)}var ln,fn=null;function pn(t){He(t.prototype),t.prototype.$nextTick=function(t){return ce(t,this)},t.prototype._render=function(){var t,e=this,n=e.$options,r=n.render,o=n._parentVnode;o&&(e.$scopedSlots=Ae(o.data.scopedSlots,e.$slots,e.$scopedSlots)),e.$vnode=o;try{fn=e,t=r.call(e._renderProxy,e.$createElement)}catch(no){Xt(no,e,"render"),t=e._vnode}finally{fn=null}return Array.isArray(t)&&1===t.length&&(t=t[0]),t instanceof gt||(t=vt()),t.parent=o,t}}function dn(t,e){return(t.__esModule||ut&&"Module"===t[Symbol.toStringTag])&&(t=t.default),u(t)?e.extend(t):t}function hn(t,e,n,r,o){var i=vt();return i.asyncFactory=t,i.asyncMeta={data:e,context:n,children:r,tag:o},i}function gn(t,e){if(i(t.error)&&o(t.errorComp))return t.errorComp;if(o(t.resolved))return t.resolved;var n=fn;if(n&&o(t.owners)&&-1===t.owners.indexOf(n)&&t.owners.push(n),i(t.loading)&&o(t.loadingComp))return t.loadingComp;if(n&&!o(t.owners)){var a=t.owners=[n],s=!0,c=null,l=null;n.$on("hook:destroyed",function(){return y(a,n)});var f=function(t){for(var e=0,n=a.length;e<n;e++)a[e].$forceUpdate();t&&(a.length=0,null!==c&&(clearTimeout(c),c=null),null!==l&&(clearTimeout(l),l=null))},p=N(function(n){t.resolved=dn(n,e),s?a.length=0:f(!0)}),h=N(function(e){o(t.errorComp)&&(t.error=!0,f(!0))}),g=t(p,h);return u(g)&&(d(g)?r(t.resolved)&&g.then(p,h):d(g.component)&&(g.component.then(p,h),o(g.error)&&(t.errorComp=dn(g.error,e)),o(g.loading)&&(t.loadingComp=dn(g.loading,e),0===g.delay?t.loading=!0:c=setTimeout(function(){c=null,r(t.resolved)&&r(t.error)&&(t.loading=!0,f(!1))},g.delay||200)),o(g.timeout)&&(l=setTimeout(function(){l=null,r(t.resolved)&&h(null)},g.timeout)))),s=!1,t.loading?t.loadingComp:t.resolved}}function mn(t){return t.isComment&&t.asyncFactory}function vn(t){if(Array.isArray(t))for(var e=0;e<t.length;e++){var n=t[e];if(o(n)&&(o(n.componentOptions)||mn(n)))return n}}function yn(t){t._events=Object.create(null),t._hasHookEvent=!1;var e=t.$options._parentListeners;e&&Mn(t,e)}function _n(t,e){ln.$on(t,e)}function bn(t,e){ln.$off(t,e)}function In(t,e){var n=ln;return function r(){var o=e.apply(null,arguments);null!==o&&n.$off(t,r)}}function Mn(t,e,n){ln=t,ge(e,n||{},_n,bn,In,t),ln=void 0}function Sn(t){var e=/^hook:/;t.prototype.$on=function(t,n){var r=this;if(Array.isArray(t))for(var o=0,i=t.length;o<i;o++)r.$on(t[o],n);else(r._events[t]||(r._events[t]=[])).push(n),e.test(t)&&(r._hasHookEvent=!0);return r},t.prototype.$once=function(t,e){var n=this;function r(){n.$off(t,r),e.apply(n,arguments)}return r.fn=e,n.$on(t,r),n},t.prototype.$off=function(t,e){var n=this;if(!arguments.length)return n._events=Object.create(null),n;if(Array.isArray(t)){for(var r=0,o=t.length;r<o;r++)n.$off(t[r],e);return n}var i,a=n._events[t];if(!a)return n;if(!e)return n._events[t]=null,n;var s=a.length;while(s--)if(i=a[s],i===e||i.fn===e){a.splice(s,1);break}return n},t.prototype.$emit=function(t){var e=this,n=e._events[t];if(n){n=n.length>1?P(n):n;for(var r=P(arguments,1),o='event handler for "'+t+'"',i=0,a=n.length;i<a;i++)Qt(n[i],e,r,e,o)}return e}}var En=null;function Cn(t){var e=En;return En=t,function(){En=e}}function wn(t){var e=t.$options,n=e.parent;if(n&&!e.abstract){while(n.$options.abstract&&n.$parent)n=n.$parent;n.$children.push(t)}t.$parent=n,t.$root=n?n.$root:t,t.$children=[],t.$refs={},t._watcher=null,t._inactive=null,t._directInactive=!1,t._isMounted=!1,t._isDestroyed=!1,t._isBeingDestroyed=!1}function An(t){t.prototype._update=function(t,e){var n=this,r=n.$el,o=n._vnode,i=Cn(n);n._vnode=t,n.$el=o?n.__patch__(o,t):n.__patch__(n.$el,t,e,!1),i(),r&&(r.__vue__=null),n.$el&&(n.$el.__vue__=n),n.$vnode&&n.$parent&&n.$vnode===n.$parent._vnode&&(n.$parent.$el=n.$el)},t.prototype.$forceUpdate=function(){var t=this;t._watcher&&t._watcher.update()},t.prototype.$destroy=function(){var t=this;if(!t._isBeingDestroyed){xn(t,"beforeDestroy"),t._isBeingDestroyed=!0;var e=t.$parent;!e||e._isBeingDestroyed||t.$options.abstract||y(e.$children,t),t._watcher&&t._watcher.teardown();var n=t._watchers.length;while(n--)t._watchers[n].teardown();t._data.__ob__&&t._data.__ob__.vmCount--,t._isDestroyed=!0,t.__patch__(t._vnode,null),xn(t,"destroyed"),t.$off(),t.$el&&(t.$el.__vue__=null),t.$vnode&&(t.$vnode.parent=null)}}}function Tn(t,e,r,o,i){var a=o.data.scopedSlots,s=t.$scopedSlots,u=!!(a&&!a.$stable||s!==n&&!s.$stable||a&&t.$scopedSlots.$key!==a.$key),c=!!(i||t.$options._renderChildren||u);if(t.$options._parentVnode=o,t.$vnode=o,t._vnode&&(t._vnode.parent=o),t.$options._renderChildren=i,t.$attrs=o.data.attrs||n,t.$listeners=r||n,e&&t.$options.props){Ct(!1);for(var l=t._props,f=t.$options._propKeys||[],p=0;p<f.length;p++){var d=f[p],h=t.$options.props;l[d]=Vt(d,h,e,t)}Ct(!0),t.$options.propsData=e}r=r||n;var g=t.$options._parentListeners;t.$options._parentListeners=r,Mn(t,r,g),c&&(t.$slots=Ce(i,o.context),t.$forceUpdate())}function On(t){while(t&&(t=t.$parent))if(t._inactive)return!0;return!1}function Pn(t,e){if(e){if(t._directInactive=!1,On(t))return}else if(t._directInactive)return;if(t._inactive||null===t._inactive){t._inactive=!1;for(var n=0;n<t.$children.length;n++)Pn(t.$children[n]);xn(t,"activated")}}function kn(t,e){if((!e||(t._directInactive=!0,!On(t)))&&!t._inactive){t._inactive=!0;for(var n=0;n<t.$children.length;n++)kn(t.$children[n]);xn(t,"deactivated")}}function xn(t,e){dt();var n=t.$options[e],r=e+" hook";if(n)for(var o=0,i=n.length;o<i;o++)Qt(n[o],t,null,t,r);t._hasHookEvent&&t.$emit("hook:"+e),ht()}var Fn=[],Rn=[],Un={},Gn=!1,Dn=!1,Nn=0;function Ln(){Nn=Fn.length=Rn.length=0,Un={},Gn=Dn=!1}var jn=Date.now;if(J&&!Z){var $n=window.performance;$n&&"function"===typeof $n.now&&jn()>document.createEvent("Event").timeStamp&&(jn=function(){return $n.now()})}function qn(){var t,e;for(jn(),Dn=!0,Fn.sort(function(t,e){return t.id-e.id}),Nn=0;Nn<Fn.length;Nn++)t=Fn[Nn],t.before&&t.before(),e=t.id,Un[e]=null,t.run();var n=Rn.slice(),r=Fn.slice();Ln(),zn(n),Bn(r),it&&$.devtools&&it.emit("flush")}function Bn(t){var e=t.length;while(e--){var n=t[e],r=n.vm;r._watcher===n&&r._isMounted&&!r._isDestroyed&&xn(r,"updated")}}function Hn(t){t._inactive=!1,Rn.push(t)}function zn(t){for(var e=0;e<t.length;e++)t[e]._inactive=!0,Pn(t[e],!0)}function Vn(t){var e=t.id;if(null==Un[e]){if(Un[e]=!0,Dn){var n=Fn.length-1;while(n>Nn&&Fn[n].id>t.id)n--;Fn.splice(n+1,0,t)}else Fn.push(t);Gn||(Gn=!0,ce(qn))}}var Kn=0,Wn=function(t,e,n,r,o){this.vm=t,o&&(t._watcher=this),t._watchers.push(this),r?(this.deep=!!r.deep,this.user=!!r.user,this.lazy=!!r.lazy,this.sync=!!r.sync,this.before=r.before):this.deep=this.user=this.lazy=this.sync=!1,this.cb=n,this.id=++Kn,this.active=!0,this.dirty=this.lazy,this.deps=[],this.newDeps=[],this.depIds=new st,this.newDepIds=new st,this.expression="","function"===typeof e?this.getter=e:(this.getter=V(e),this.getter||(this.getter=F)),this.value=this.lazy?void 0:this.get()};Wn.prototype.get=function(){var t;dt(this);var e=this.vm;try{t=this.getter.call(e,e)}catch(no){if(!this.user)throw no;Xt(no,e,'getter for watcher "'+this.expression+'"')}finally{this.deep&&fe(t),ht(),this.cleanupDeps()}return t},Wn.prototype.addDep=function(t){var e=t.id;this.newDepIds.has(e)||(this.newDepIds.add(e),this.newDeps.push(t),this.depIds.has(e)||t.addSub(this))},Wn.prototype.cleanupDeps=function(){var t=this.deps.length;while(t--){var e=this.deps[t];this.newDepIds.has(e.id)||e.removeSub(this)}var n=this.depIds;this.depIds=this.newDepIds,this.newDepIds=n,this.newDepIds.clear(),n=this.deps,this.deps=this.newDeps,this.newDeps=n,this.newDeps.length=0},Wn.prototype.update=function(){this.lazy?this.dirty=!0:this.sync?this.run():Vn(this)},Wn.prototype.run=function(){if(this.active){var t=this.get();if(t!==this.value||u(t)||this.deep){var e=this.value;if(this.value=t,this.user)try{this.cb.call(this.vm,t,e)}catch(no){Xt(no,this.vm,'callback for watcher "'+this.expression+'"')}else this.cb.call(this.vm,t,e)}}},Wn.prototype.evaluate=function(){this.value=this.get(),this.dirty=!1},Wn.prototype.depend=function(){var t=this.deps.length;while(t--)this.deps[t].depend()},Wn.prototype.teardown=function(){if(this.active){this.vm._isBeingDestroyed||y(this.vm._watchers,this);var t=this.deps.length;while(t--)this.deps[t].removeSub(this);this.active=!1}};var Jn={enumerable:!0,configurable:!0,get:F,set:F};function Yn(t,e,n){Jn.get=function(){return this[e][n]},Jn.set=function(t){this[e][n]=t},Object.defineProperty(t,n,Jn)}function Xn(t){t._watchers=[];var e=t.$options;e.props&&Qn(t,e.props),e.methods&&ar(t,e.methods),e.data?Zn(t):Ot(t._data={},!0),e.computed&&nr(t,e.computed),e.watch&&e.watch!==nt&&sr(t,e.watch)}function Qn(t,e){var n=t.$options.propsData||{},r=t._props={},o=t.$options._propKeys=[],i=!t.$parent;i||Ct(!1);var a=function(i){o.push(i);var a=Vt(i,e,n,t);Pt(r,i,a),i in t||Yn(t,"_props",i)};for(var s in e)a(s);Ct(!0)}function Zn(t){var e=t.$options.data;e=t._data="function"===typeof e?tr(e,t):e||{},l(e)||(e={});var n=Object.keys(e),r=t.$options.props,o=(t.$options.methods,n.length);while(o--){var i=n[o];0,r&&b(r,i)||B(i)||Yn(t,"_data",i)}Ot(e,!0)}function tr(t,e){dt();try{return t.call(e,e)}catch(no){return Xt(no,e,"data()"),{}}finally{ht()}}var er={lazy:!0};function nr(t,e){var n=t._computedWatchers=Object.create(null),r=ot();for(var o in e){var i=e[o],a="function"===typeof i?i:i.get;0,r||(n[o]=new Wn(t,a||F,F,er)),o in t||rr(t,o,i)}}function rr(t,e,n){var r=!ot();"function"===typeof n?(Jn.get=r?or(e):ir(n),Jn.set=F):(Jn.get=n.get?r&&!1!==n.cache?or(e):ir(n.get):F,Jn.set=n.set||F),Object.defineProperty(t,e,Jn)}function or(t){return function(){var e=this._computedWatchers&&this._computedWatchers[t];if(e)return e.dirty&&e.evaluate(),ft.target&&e.depend(),e.value}}function ir(t){return function(){return t.call(this,this)}}function ar(t,e){t.$options.props;for(var n in e)t[n]="function"!==typeof e[n]?F:O(e[n],t)}function sr(t,e){for(var n in e){var r=e[n];if(Array.isArray(r))for(var o=0;o<r.length;o++)ur(t,n,r[o]);else ur(t,n,r)}}function ur(t,e,n,r){return l(n)&&(r=n,n=n.handler),"string"===typeof n&&(n=t[n]),t.$watch(e,n,r)}function cr(t){var e={get:function(){return this._data}},n={get:function(){return this._props}};Object.defineProperty(t.prototype,"$data",e),Object.defineProperty(t.prototype,"$props",n),t.prototype.$set=kt,t.prototype.$delete=xt,t.prototype.$watch=function(t,e,n){var r=this;if(l(e))return ur(r,t,e,n);n=n||{},n.user=!0;var o=new Wn(r,t,e,n);if(n.immediate)try{e.call(r,o.value)}catch(i){Xt(i,r,'callback for immediate watcher "'+o.expression+'"')}return function(){o.teardown()}}}var lr=0;function fr(t){t.prototype._init=function(t){var e=this;e._uid=lr++,e._isVue=!0,t&&t._isComponent?pr(e,t):e.$options=Ht(dr(e.constructor),t||{},e),e._renderProxy=e,e._self=e,wn(e),yn(e),cn(e),xn(e,"beforeCreate"),Xn(e),e.$options.el&&e.$mount(e.$options.el)}}function pr(t,e){var n=t.$options=Object.create(t.constructor.options),r=e._parentVnode;n.parent=e.parent,n._parentVnode=r;var o=r.componentOptions;n.propsData=o.propsData,n._parentListeners=o.listeners,n._renderChildren=o.children,n._componentTag=o.tag,e.render&&(n.render=e.render,n.staticRenderFns=e.staticRenderFns)}function dr(t){var e=t.options;if(t.super){var n=dr(t.super),r=t.superOptions;if(n!==r){t.superOptions=n;var o=hr(t);o&&k(t.extendOptions,o),e=t.options=Ht(n,t.extendOptions),e.name&&(e.components[e.name]=t)}}return e}function hr(t){var e,n=t.options,r=t.sealedOptions;for(var o in n)n[o]!==r[o]&&(e||(e={}),e[o]=n[o]);return e}function gr(t){this._init(t)}function mr(t){t.use=function(t){var e=this._installedPlugins||(this._installedPlugins=[]);if(e.indexOf(t)>-1)return this;var n=P(arguments,1);return n.unshift(this),"function"===typeof t.install?t.install.apply(t,n):"function"===typeof t&&t.apply(null,n),e.push(t),this}}function vr(t){t.mixin=function(t){return this.options=Ht(this.options,t),this}}function yr(t){t.cid=0;var e=1;t.extend=function(t){t=t||{};var n=this,r=n.cid,o=t._Ctor||(t._Ctor={});if(o[r])return o[r];var i=t.name||n.options.name;var a=function(t){this._init(t)};return a.prototype=Object.create(n.prototype),a.prototype.constructor=a,a.cid=e++,a.options=Ht(n.options,t),a["super"]=n,a.options.props&&_r(a),a.options.computed&&br(a),a.extend=n.extend,a.mixin=n.mixin,a.use=n.use,L.forEach(function(t){a[t]=n[t]}),i&&(a.options.components[i]=a),a.superOptions=n.options,a.extendOptions=t,a.sealedOptions=k({},a.options),o[r]=a,a}}function _r(t){var e=t.options.props;for(var n in e)Yn(t.prototype,"_props",n)}function br(t){var e=t.options.computed;for(var n in e)rr(t.prototype,n,e[n])}function Ir(t){L.forEach(function(e){t[e]=function(t,n){return n?("component"===e&&l(n)&&(n.name=n.name||t,n=this.options._base.extend(n)),"directive"===e&&"function"===typeof n&&(n={bind:n,update:n}),this.options[e+"s"][t]=n,n):this.options[e+"s"][t]}})}function Mr(t){return t&&(t.Ctor.options.name||t.tag)}function Sr(t,e){return Array.isArray(t)?t.indexOf(e)>-1:"string"===typeof t?t.split(",").indexOf(e)>-1:!!f(t)&&t.test(e)}function Er(t,e){var n=t.cache,r=t.keys,o=t._vnode;for(var i in n){var a=n[i];if(a){var s=Mr(a.componentOptions);s&&!e(s)&&Cr(n,i,r,o)}}}function Cr(t,e,n,r){var o=t[e];!o||r&&o.tag===r.tag||o.componentInstance.$destroy(),t[e]=null,y(n,e)}fr(gr),cr(gr),Sn(gr),An(gr),pn(gr);var wr=[String,RegExp,Array],Ar={name:"keep-alive",abstract:!0,props:{include:wr,exclude:wr,max:[String,Number]},created:function(){this.cache=Object.create(null),this.keys=[]},destroyed:function(){for(var t in this.cache)Cr(this.cache,t,this.keys)},mounted:function(){var t=this;this.$watch("include",function(e){Er(t,function(t){return Sr(e,t)})}),this.$watch("exclude",function(e){Er(t,function(t){return!Sr(e,t)})})},render:function(){var t=this.$slots.default,e=vn(t),n=e&&e.componentOptions;if(n){var r=Mr(n),o=this,i=o.include,a=o.exclude;if(i&&(!r||!Sr(i,r))||a&&r&&Sr(a,r))return e;var s=this,u=s.cache,c=s.keys,l=null==e.key?n.Ctor.cid+(n.tag?"::"+n.tag:""):e.key;u[l]?(e.componentInstance=u[l].componentInstance,y(c,l),c.push(l)):(u[l]=e,c.push(l),this.max&&c.length>parseInt(this.max)&&Cr(u,c[0],c,this._vnode)),e.data.keepAlive=!0}return e||t&&t[0]}},Tr={KeepAlive:Ar};function Or(t){var e={get:function(){return $}};Object.defineProperty(t,"config",e),t.util={warn:ct,extend:k,mergeOptions:Ht,defineReactive:Pt},t.set=kt,t.delete=xt,t.nextTick=ce,t.observable=function(t){return Ot(t),t},t.options=Object.create(null),L.forEach(function(e){t.options[e+"s"]=Object.create(null)}),t.options._base=t,k(t.options.components,Tr),mr(t),vr(t),yr(t),Ir(t)}Or(gr),Object.defineProperty(gr.prototype,"$isServer",{get:ot}),Object.defineProperty(gr.prototype,"$ssrContext",{get:function(){return this.$vnode&&this.$vnode.ssrContext}}),Object.defineProperty(gr,"FunctionalRenderContext",{value:ze}),gr.version="2.6.10";var Pr="[object Array]",kr="[object Object]";function xr(t,e){var n={};return Fr(t,e),Rr(t,e,"",n),n}function Fr(t,e){if(t!==e){var n=Gr(t),r=Gr(e);if(n==kr&&r==kr){if(Object.keys(t).length>=Object.keys(e).length)for(var o in e){var i=t[o];void 0===i?t[o]=null:Fr(i,e[o])}}else n==Pr&&r==Pr&&t.length>=e.length&&e.forEach(function(e,n){Fr(t[n],e)})}}function Rr(t,e,n,r){if(t!==e){var o=Gr(t),i=Gr(e);if(o==kr)if(i!=kr||Object.keys(t).length<Object.keys(e).length)Ur(r,n,t);else{var a=function(o){var i=t[o],a=e[o],s=Gr(i),u=Gr(a);if(s!=Pr&&s!=kr)i!=e[o]&&Ur(r,(""==n?"":n+".")+o,i);else if(s==Pr)u!=Pr?Ur(r,(""==n?"":n+".")+o,i):i.length<a.length?Ur(r,(""==n?"":n+".")+o,i):i.forEach(function(t,e){Rr(t,a[e],(""==n?"":n+".")+o+"["+e+"]",r)});else if(s==kr)if(u!=kr||Object.keys(i).length<Object.keys(a).length)Ur(r,(""==n?"":n+".")+o,i);else for(var c in i)Rr(i[c],a[c],(""==n?"":n+".")+o+"."+c,r)};for(var s in t)a(s)}else o==Pr?i!=Pr?Ur(r,n,t):t.length<e.length?Ur(r,n,t):t.forEach(function(t,o){Rr(t,e[o],n+"["+o+"]",r)}):Ur(r,n,t)}}function Ur(t,e,n){t[e]=n}function Gr(t){return Object.prototype.toString.call(t)}function Dr(t){if(t.__next_tick_callbacks&&t.__next_tick_callbacks.length){if(Object({VUE_APP_PLATFORM:"app-plus",NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_DEBUG){var e=t.$mp[t.mpType];console.log("["+ +new Date+"]["+(e.is||e.route)+"]["+t._uid+"]:flushCallbacks["+t.__next_tick_callbacks.length+"]")}var n=t.__next_tick_callbacks.slice(0);t.__next_tick_callbacks.length=0;for(var r=0;r<n.length;r++)n[r]()}}function Nr(t){return Fn.find(function(e){return t._watcher===e})}function Lr(t,e){if(!t.__next_tick_pending&&!Nr(t)){if(Object({VUE_APP_PLATFORM:"app-plus",NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_DEBUG){var n=t.$mp[t.mpType];console.log("["+ +new Date+"]["+(n.is||n.route)+"]["+t._uid+"]:nextVueTick")}return ce(e,t)}if(Object({VUE_APP_PLATFORM:"app-plus",NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_DEBUG){var r=t.$mp[t.mpType];console.log("["+ +new Date+"]["+(r.is||r.route)+"]["+t._uid+"]:nextMPTick")}var o;if(t.__next_tick_callbacks||(t.__next_tick_callbacks=[]),t.__next_tick_callbacks.push(function(){if(e)try{e.call(t)}catch(no){Xt(no,t,"nextTick")}else o&&o(t)}),!e&&"undefined"!==typeof Promise)return new Promise(function(t){o=t})}function jr(t){var e=[].concat(Object.keys(t._data||{}),Object.keys(t._computedWatchers||{})),n=e.reduce(function(e,n){return e[n]=t[n],e},Object.create(null));return Object.assign(n,t.$mp.data||{}),Array.isArray(t.$options.behaviors)&&-1!==t.$options.behaviors.indexOf("uni://form-field")&&(n["name"]=t.name,n["value"]=t.value),JSON.parse(JSON.stringify(n))}var $r=function(t,e){var n=this;if(null!==e&&("page"===this.mpType||"component"===this.mpType)){var r=this.$mp[this.mpType],o=jr(this);o.__webviewId__=r.data.__webviewId__;var i=Object.create(null);Object.keys(o).forEach(function(t){i[t]=r.data[t]});var a=xr(o,i);Object.keys(a).length?(Object({VUE_APP_PLATFORM:"app-plus",NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_DEBUG&&console.log("["+ +new Date+"]["+(r.is||r.route)+"]["+this._uid+"]差量更新",JSON.stringify(a)),this.__next_tick_pending=!0,r.setData(a,function(){n.__next_tick_pending=!1,Dr(n)})):Dr(this)}};function qr(){}function Br(t,e,n){if(!t.mpType)return t;"app"===t.mpType&&(t.$options.render=qr),t.$options.render||(t.$options.render=qr);var r=function(){t._update(t._render(),n)};return new Wn(t,r,F,{before:function(){t._isMounted&&!t._isDestroyed&&xn(t,"beforeUpdate")}},!0),n=!1,t}function Hr(t,e){return o(t)||o(e)?zr(t,Vr(e)):""}function zr(t,e){return t?e?t+" "+e:t:e||""}function Vr(t){return Array.isArray(t)?Kr(t):u(t)?Wr(t):"string"===typeof t?t:""}function Kr(t){for(var e,n="",r=0,i=t.length;r<i;r++)o(e=Vr(t[r]))&&""!==e&&(n&&(n+=" "),n+=e);return n}function Wr(t){var e="";for(var n in t)t[n]&&(e&&(e+=" "),e+=n);return e}var Jr=I(function(t){var e={},n=/;(?![^(]*\))/g,r=/:(.+)/;return t.split(n).forEach(function(t){if(t){var n=t.split(r);n.length>1&&(e[n[0].trim()]=n[1].trim())}}),e});function Yr(t){return Array.isArray(t)?x(t):"string"===typeof t?Jr(t):t}var Xr=["createSelectorQuery","createIntersectionObserver","selectAllComponents","selectComponent"];function Qr(t,e){var n=e.split("."),r=n[0];return 0===r.indexOf("__$n")&&(r=parseInt(r.replace("__$n",""))),1===n.length?t[r]:Qr(t[r],n.slice(1).join("."))}function Zr(t){var e=t.prototype.$emit;t.prototype.$emit=function(t){return this.$mp&&t&&this.$mp[this.mpType]["triggerEvent"](t,{__args__:P(arguments,1)}),e.apply(this,arguments)},t.prototype.$nextTick=function(t){return Lr(this,t)},Xr.forEach(function(e){t.prototype[e]=function(t){if(this.$mp)return this.$mp[this.mpType][e](t)}}),t.prototype.__init_provide=Me,t.prototype.__init_injections=Se,t.prototype.__call_hook=function(t,e){var n=this;dt();var r,o=n.$options[t],i=t+" hook";if(o)for(var a=0,s=o.length;a<s;a++)r=Qt(o[a],n,e?[e]:null,n,i);return n._hasHookEvent&&n.$emit("hook:"+t),ht(),r},t.prototype.__set_model=function(t,e,n,r){Array.isArray(r)&&(-1!==r.indexOf("trim")&&(n=n.trim()),-1!==r.indexOf("number")&&(n=this._n(n))),t[e]=n},t.prototype.__set_sync=function(t,e,n){t[e]=n},t.prototype.__get_orig=function(t){return l(t)&&t["$orig"]||t},t.prototype.__get_value=function(t,e){return Qr(e||this,t)},t.prototype.__get_class=function(t,e){return Hr(e,t)},t.prototype.__get_style=function(t,e){if(!t&&!e)return"";var n=Yr(t),r=e?k(e,n):n;return Object.keys(r).map(function(t){return w(t)+":"+r[t]}).join(";")}}var to=["onLaunch","onShow","onHide","onUniNViewMessage","onError","onLoad","onReady","onUnload","onPullDownRefresh","onReachBottom","onTabItemTap","onShareAppMessage","onPageScroll","onNavigationBarButtonTap","onBackPress","onNavigationBarSearchInputChanged","onNavigationBarSearchInputConfirmed","onNavigationBarSearchInputClicked","onReady","onPageShow","onPageHide","onPageResize"];function eo(t){var e=t.extend;t.extend=function(t){t=t||{};var n=t.methods;return n&&Object.keys(n).forEach(function(e){-1!==to.indexOf(e)&&(t[e]=n[e],delete n[e])}),e.call(this,t)};var n=t.config.optionMergeStrategies,r=n.created;to.forEach(function(t){n[t]=r}),t.prototype.__lifecycle_hooks__=to}gr.prototype.__patch__=$r,gr.prototype.$mount=function(t,e){return Br(this,t,e)},eo(gr),Zr(gr),e["default"]=gr}.call(this,n("c8ba"))},"6cb3":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("9ead"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"6e42":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.createApp=_t,e.createPage=Mt,e.createComponent=Et,e.default=void 0;var r=o(n("66fd"));function o(t){return t&&t.__esModule?t:{default:t}}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var a=Object.prototype.toString,s=Object.prototype.hasOwnProperty;function u(t){return"function"===typeof t}function c(t){return"string"===typeof t}function l(t){return"[object Object]"===a.call(t)}function f(t,e){return s.call(t,e)}function p(){}function d(t){var e=Object.create(null);return function(n){var r=e[n];return r||(e[n]=t(n))}}var h=/-(\w)/g,g=d(function(t){return t.replace(h,function(t,e){return e?e.toUpperCase():""})}),m=/requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$/,v=/^create|Manager$/,y=/^on/;function _(t){return v.test(t)}function b(t){return m.test(t)}function I(t){return y.test(t)}function M(t){return t.then(function(t){return[null,t]}).catch(function(t){return[t]})}function S(t){return!(_(t)||b(t)||I(t))}function E(t,e){return S(t)?function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return u(t.success)||u(t.fail)||u(t.complete)?e.apply(void 0,[t].concat(r)):M(new Promise(function(n,o){e.apply(void 0,[Object.assign({},t,{success:n,fail:o})].concat(r)),Promise.prototype.finally=function(t){var e=this.constructor;return this.then(function(n){return e.resolve(t()).then(function(){return n})},function(n){return e.resolve(t()).then(function(){throw n})})}}))}:e}var C=1e-4,w=750,A=!1,T=0,O=0;function P(){var t=wx.getSystemInfoSync(),e=t.platform,n=t.pixelRatio,r=t.windowWidth;T=r,O=n,A="ios"===e}function k(t,e){if(0===T&&P(),t=Number(t),0===t)return 0;var n=t/w*(e||T);return n<0&&(n=-n),n=Math.floor(n+C),0===n?1!==O&&A?.5:1:t<0?-n:n}var x={},F=["success","fail","cancel","complete"];function R(t,e,n){return function(r){return e(G(t,r,n))}}function U(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},o=arguments.length>4&&void 0!==arguments[4]&&arguments[4];if(l(e)){var i=!0===o?e:{};for(var a in u(n)&&(n=n(e,i)||{}),e)if(f(n,a)){var s=n[a];u(s)&&(s=s(e[a],e,i)),s?c(s)?i[s]=e[a]:l(s)&&(i[s.name?s.name:a]=s.value):console.warn("app-plus ".concat(t,"暂不支持").concat(a))}else-1!==F.indexOf(a)?i[a]=R(t,e[a],r):o||(i[a]=e[a]);return i}return u(e)&&(e=R(t,e,r)),e}function G(t,e,n){var r=arguments.length>3&&void 0!==arguments[3]&&arguments[3];return u(x.returnValue)&&(e=x.returnValue(t,e)),U(t,e,n,{},r)}function D(t,e){if(f(x,t)){var n=x[t];return n?function(e,r){var o=n;u(n)&&(o=n(e)),e=U(t,e,o.args,o.returnValue);var i=wx[o.name||t](e,r);return b(t)?G(t,i,o.returnValue,_(t)):i}:function(){console.error("app-plus 暂不支持".concat(t))}}return e}var N=Object.create(null),L=["subscribePush","unsubscribePush","onPush","offPush","share"];function j(t){return function(e){var n=e.fail,r=e.complete,o={errMsg:"".concat(t,":fail:暂不支持 ").concat(t," 方法")};u(n)&&n(o),u(r)&&r(o)}}function $(t){return"undefined"!==typeof weex?weex.requireModule(t):__requireNativePlugin__(t)}L.forEach(function(t){N[t]=j(t)});var q=Object.freeze({requireNativePlugin:$}),B=Page,H=Component,z=/:/g,V=d(function(t){return g(t.replace(z,"-"))});function K(t){if(wx.canIUse("nextTick")){var e=t.triggerEvent;t.triggerEvent=function(n){for(var r=arguments.length,o=new Array(r>1?r-1:0),i=1;i<r;i++)o[i-1]=arguments[i];return e.apply(t,[V(n)].concat(o))}}}Page=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e="onLoad",n=t[e];return t[e]=n?function(){K(this);for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return n.apply(this,e)}:function(){K(this)},B(t)};var W=Behavior({created:function(){K(this)}});Component=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return(t.behaviors||(t.behaviors=[])).unshift(W),H(t)};var J=["__route__","__wxExparserNodeId__","__wxWebviewId__"];function Y(t,e){t.triggerEvent("__l",t.$vm||e,{bubbles:!0,composed:!0})}function X(t){t.detail.$mp?t.detail.$parent||(t.detail.$parent=this.$vm,t.detail.$parent.$children.push(t.detail),t.detail.$root=this.$vm.$root):t.detail.parent||(t.detail.parent=this.$vm)}function Q(t){Z(t)}function Z(t){t.methods.$getAppWebview=function(){return plus.webview.getWebviewById("".concat(this.__wxWebviewId__))}}function tt(t,e){var n=t.$mp[t.mpType];e.forEach(function(e){f(n,e)&&(t[e]=n[e])})}function et(t,e){e.forEach(function(e){t[e]=function(t){return this.$vm.__call_hook(e,t)}})}function nt(t,e){var n=t.data||{},r=t.methods||{};if("function"===typeof n)try{n=n.call(e)}catch(o){Object({VUE_APP_PLATFORM:"app-plus",NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_DEBUG&&console.warn("根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。",n)}else try{n=JSON.parse(JSON.stringify(n))}catch(o){}return l(n)||(n={}),Object.keys(r).forEach(function(t){-1!==e.__lifecycle_hooks__.indexOf(t)||f(n,t)||(n[t]=r[t])}),n}var rt=[String,Number,Boolean,Object,Array,null];function ot(t){return function(e,n){this.$vm&&(this.$vm[t]=e)}}function it(t){var e=t["behaviors"],n=t["extends"],r=t["mixins"],o=t["props"];o||(t["props"]=o=[]);var i=[];return Array.isArray(e)&&e.forEach(function(t){i.push(t.replace("uni://","wx".concat("://"))),"uni://form-field"===t&&(Array.isArray(o)?(o.push("name"),o.push("value")):(o["name"]=String,o["value"]=null))}),l(n)&&n.props&&i.push(Behavior({properties:st(n.props,!0)})),Array.isArray(r)&&r.forEach(function(t){l(t)&&t.props&&i.push(Behavior({properties:st(t.props,!0)}))}),i}function at(t,e,n,r){return Array.isArray(e)&&1===e.length?e[0]:e}function st(t){var e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r={};return e||(r.vueSlots={type:null,value:[],observer:function(t,e){var n=Object.create(null);t.forEach(function(t){n[t]=!0}),this.setData({$slots:n})}}),Array.isArray(t)?t.forEach(function(t){r[t]={type:null,observer:ot(t)}}):l(t)&&Object.keys(t).forEach(function(e){var o=t[e];if(l(o)){var i=o["default"];u(i)&&(i=i()),o.type=at(e,o.type,i,n),r[e]={type:-1!==rt.indexOf(o.type)?o.type:null,value:i,observer:ot(e)}}else{var a=at(e,o,null,n);r[e]={type:-1!==rt.indexOf(a)?a:null,observer:ot(e)}}}),r}function ut(t){try{t.mp=JSON.parse(JSON.stringify(t))}catch(e){}return t.stopPropagation=p,t.preventDefault=p,t.target=t.target||{},f(t,"detail")||(t.detail={}),l(t.detail)&&(t.target=Object.assign({},t.target,t.detail)),t}function ct(t,e){var n=t;return e.forEach(function(e){var r=e[0],o=e[2];if(r||"undefined"!==typeof o){var i=e[1],a=e[3],s=r?t.__get_value(r,n):n;Number.isInteger(s)?n=o:i?Array.isArray(s)?n=s.find(function(e){return t.__get_value(i,e)===o}):l(s)?n=Object.keys(s).find(function(e){return t.__get_value(i,s[e])===o}):console.error("v-for 暂不支持循环数据：",s):n=s[o],a&&(n=t.__get_value(a,n))}}),n}function lt(t,e,n){var r={};return Array.isArray(e)&&e.length&&e.forEach(function(e,o){"string"===typeof e?e?"$event"===e?r["$"+o]=n:0===e.indexOf("$event.")?r["$"+o]=t.__get_value(e.replace("$event.",""),n):r["$"+o]=t.__get_value(e):r["$"+o]=t:r["$"+o]=ct(t,e)}),r}function ft(t){for(var e={},n=1;n<t.length;n++){var r=t[n];e[r[0]]=r[1]}return e}function pt(t,e){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:[],r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],o=arguments.length>4?arguments[4]:void 0,i=arguments.length>5?arguments[5]:void 0,a=!1;if(o&&(a=e.currentTarget&&e.currentTarget.dataset&&"wx"===e.currentTarget.dataset.comType,!n.length))return a?[e]:e.detail.__args__||e.detail;var s=lt(t,r,e),u=[];return n.forEach(function(t){"$event"===t?"__set_model"!==i||o?o&&!a?u.push(e.detail.__args__[0]):u.push(e):u.push(e.target.value):Array.isArray(t)&&"o"===t[0]?u.push(ft(t)):"string"===typeof t&&f(s,t)?u.push(s[t]):u.push(t)}),u}var dt="~",ht="^";function gt(t){var e=this;t=ut(t);var n=(t.currentTarget||t.target).dataset.eventOpts;if(!n)return console.warn("事件信息不存在");var r=t.type;n.forEach(function(n){var o=n[0],i=n[1],a=o.charAt(0)===ht;o=a?o.slice(1):o;var s=o.charAt(0)===dt;o=s?o.slice(1):o,i&&r===o&&i.forEach(function(n){var r=n[0];if(r){var o=e.$vm[r];if(!u(o))throw new Error(" _vm.".concat(r," is not a function"));if(s){if(o.once)return;o.once=!0}o.apply(e.$vm,pt(e.$vm,t,n[1],n[2],a,r))}})})}function mt(t){var e=t.$mp[t.mpType];Object.defineProperty(t,"$refs",{get:function(){var t={},n=e.selectAllComponents(".vue-ref");n.forEach(function(e){var n=e.dataset.ref;t[n]=e.$vm||e});var r=e.selectAllComponents(".vue-ref-in-for");return r.forEach(function(e){var n=e.dataset.ref;t[n]||(t[n]=[]),t[n].push(e.$vm||e)}),t}})}var vt=["onHide","onError","onPageNotFound","onUniNViewMessage"];function yt(t){this.$vm||(this.$vm=t,this.$vm.$mp={app:this})}function _t(t){r.default.mixin({beforeCreate:function(){this.$options.mpType&&(this.mpType=this.$options.mpType,this.$mp=i({data:{}},this.mpType,this.$options.mpInstance),delete this.$options.mpType,delete this.$options.mpInstance,"app"!==this.mpType&&(mt(this),tt(this,J)))},created:function(){this.__init_injections(this),this.__init_provide(this)}});var e={onLaunch:function(e){yt.call(this,t),this.$vm._isMounted=!0,this.$vm.__call_hook("mounted"),this.$vm.__call_hook("onLaunch",e)},onShow:function(e){yt.call(this,t),this.$vm.__call_hook("onShow",e)}};return e.globalData=t.$options.globalData||{},et(e,vt),App(e),t}var bt=["onShow","onHide","onPullDownRefresh","onReachBottom","onShareAppMessage","onPageScroll","onResize","onTabItemTap","onBackPress","onNavigationBarButtonTap","onNavigationBarSearchInputChanged","onNavigationBarSearchInputConfirmed","onNavigationBarSearchInputClicked"];function It(t){this.$vm||(this.$vm=new t({mpType:"page",mpInstance:this}),this.$vm.__call_hook("created"),this.$vm.$mount())}function Mt(t){var e;t=t.default||t,u(t)?(e=t,t=e.extendOptions):e=r.default.extend(t);var n={options:{multipleSlots:!0,addGlobalClass:!0},data:nt(t,r.default.prototype),lifetimes:{attached:function(){It.call(this,e)},ready:function(){this.$vm.__call_hook("beforeMount"),this.$vm._isMounted=!0,this.$vm.__call_hook("mounted"),this.$vm.__call_hook("onReady")},detached:function(){this.$vm.$destroy()}},methods:{onLoad:function(t){It.call(this,e),this.$vm.$mp.query=t,this.$vm.__call_hook("onLoad",t)},onUnload:function(){this.$vm.__call_hook("onUnload")},__e:gt,__l:X}};return et(n.methods,bt),Q(n),Component(n)}function St(t){if(!this.$vm){var e={mpType:"component",mpInstance:this,propsData:this.properties};this.$vm=new t(e);var n=this.properties.vueSlots;if(Array.isArray(n)&&n.length){var r=Object.create(null);n.forEach(function(t){r[t]=!0}),this.$vm.$scopedSlots=this.$vm.$slots=r}this.$vm.$mount()}}function Et(t){t=t.default||t;var e=it(t),n=st(t.props,!1,t.__file),o=r.default.extend(t),i={options:{multipleSlots:!0,addGlobalClass:!0},data:nt(t,r.default.prototype),behaviors:e,properties:n,lifetimes:{attached:function(){St.call(this,o)},ready:function(){St.call(this,o),Y(this),this.$vm.__call_hook("created"),this.$vm.__call_hook("beforeMount"),this.$vm._isMounted=!0,this.$vm.__call_hook("mounted"),this.$vm.__call_hook("onReady")},detached:function(){this.$vm.$destroy()}},pageLifetimes:{show:function(t){this.$vm.__call_hook("onPageShow",t)},hide:function(){this.$vm&&this.$vm.__call_hook("onPageHide")},resize:function(t){this.$vm&&this.$vm.__call_hook("onPageResize",t)}},methods:{__e:gt,__l:X}};return Z(i),Component(i)}var Ct={};"undefined"!==typeof Proxy?Ct=new Proxy({},{get:function(t,e){return"upx2px"===e?k:q[e]?E(e,q[e]):f(wx,e)||f(x,e)?E(e,D(e,wx[e])):void 0}}):(Ct.upx2px=k,Object.keys(q).forEach(function(t){Ct[t]=E(t,q[t])}),Object.keys(wx).forEach(function(t){(f(wx,t)||f(x,t))&&(Ct[t]=E(t,D(t,wx[t])))}));var wt=Ct,At=wt;e.default=At},"725b":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("da09"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"73eb":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("a8ff"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"7b7d":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("a7d1"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"7c40":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("dceb"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"7e0c":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("c8ab"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"7e44":function(t,e,n){"use strict";(function(t){n("5d6c");var e=s(n("66fd")),r=s(n("7f0a")),o=s(n("b98f")),i=s(n("4a61")),a=(s(n("c451")),n("8adb"));function s(t){return t&&t.__esModule?t:{default:t}}function u(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){c(t,e,n[e])})}return t}function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}e.default.config.productionTip=!1;var l=function(){return n.e("colorui/components/cu-custom").then(n.bind(null,"16f0"))};e.default.component("cu-custom",l),r.default.mpType="app",e.default.prototype.$store=o.default,e.default.prototype.$fire=new i.default,e.default.prototype.$ajax=a.ajax,e.default.filter("repairStatus",function(t){return t?o.default.state.repairStatusZn[t]:""}),e.default.filter("repairStatusColor",function(t){return t?o.default.state.repairStatusColor[t]:""}),e.default.filter("shopStatus",function(t){return t?o.default.state.shopStatus[t]:""}),e.default.filter("shopStatusZn",function(t){return t?o.default.state.shopStatusZn[t]:""}),e.default.filter("shopStatusColor",function(t){return t?o.default.state.shopStatusColor[t]:""}),e.default.prototype.format=function(t,e){var n="",r=new Date;r.setTime(t);var o=r.getFullYear(),i=r.getMonth()+1<10?"0"+(r.getMonth()+1):r.getMonth()+1,a=r.getDate()<10?"0"+r.getDate():r.getDate(),s=r.getHours()<10?"0"+r.getHours():r.getHours(),u=r.getMinutes()<10?"0"+r.getMinutes():r.getMinutes(),c=r.getSeconds()<10?"0"+r.getSeconds():r.getSeconds();return"YMD"==e?n=o+"-"+i+"-"+a:"YMDHMS"==e?n=o+"-"+i+"-"+a+" "+s+":"+u+":"+c:"HMS"==e?n=s+":"+u+":"+c:"YM"==e&&(n=o+"-"+i),n},e.default.filter("formatTime",function(t,e){var n="",r=new Date;r.setTime(t);var o=r.getFullYear(),i=r.getMonth()+1<10?"0"+(r.getMonth()+1):r.getMonth()+1,a=r.getDate()<10?"0"+r.getDate():r.getDate(),s=r.getHours()<10?"0"+r.getHours():r.getHours(),u=r.getMinutes()<10?"0"+r.getMinutes():r.getMinutes(),c=r.getSeconds()<10?"0"+r.getSeconds():r.getSeconds();return"YMD"==e?n=o+"-"+i+"-"+a:"YMDHMS"==e?n=o+"-"+i+"-"+a+" "+s+":"+u+":"+c:"HMS"==e?n=s+":"+u+":"+c:"YM"==e&&(n=o+"-"+i),n}),e.default.filter("todoType",function(t){return o.default.state.noticeTypeZn[t]}),e.default.filter("todoTypeColor",function(t){return o.default.state.noticeTypeColor[t]});var f=new e.default(u({},r.default));t(f).$mount()}).call(this,n("6e42")["createApp"])},8198:function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("2b59"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"84f4":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("2421"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"87ec":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("890f"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"8adb":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.ajax=void 0;var n="http://192.168.10.22/services?f=",r=function(e,n,r){var i=!(arguments.length>3&&void 0!==arguments[3])||arguments[3];if(i)t.getStorage({key:"userInfo",success:function(i){if(i.data.session){var a={owner:i.data.owner,session:i.data.session,userId:i.data.id};o(e,n,a,r)}else t.showToast({title:"没有本地记录，请重新登录",icon:"none"})},fail:function(){console.log("kkkkkkkkkk"," at common\\http.js:23")}});else{var a={};o(e,n,a,r)}};e.ajax=r;var o=function(e,r,o,i){t.request({url:n+e,data:Object.assign(r,o),method:"POST",header:{"content-type":"application/x-www-form-urlencoded;charset=UTF-8"},success:function(e){200==e.statusCode?i(e.data.data):t.showToast({title:"调用接口失败",icon:"none"})}})}}).call(this,n("6e42")["default"])},"8d14":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("31b2"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"96f3":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("abb9"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"9ab5":function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("99b2"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"9d6e":function(t,e,n){"use strict";(function(e){(function(e,n){t.exports=n()})(0,function(){var t=void 0,n=["touchstarted","touchmoved","touchended"];function r(t){return t.charAt(0).toUpperCase()+t.slice(1)}function o(t){for(var e=arguments.length,r=Array(e>1?e-1:0),o=1;o<e;o++)r[o-1]=arguments[o];n.forEach(function(e,n){void 0!==r[n]&&(t[e]=r[n])})}function i(t,e){Object.defineProperties(t,e)}function a(){return t||(t=wx.getSystemInfoSync()),t}"function"===typeof Symbol&&Symbol.iterator;var s=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=function(){function t(t,e){var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=t[Symbol.iterator]();!(r=(a=s.next()).done);r=!0)if(n.push(a.value),e&&n.length===e)break}catch(u){o=!0,i=u}finally{try{!r&&s["return"]&&s["return"]()}finally{if(o)throw i}}return n}return function(e,n){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),l={},f={id:{default:"cropper",get:function(){return l.id},set:function(t){l.id=t}},width:{default:750,get:function(){return l.width},set:function(t){l.width=t}},height:{default:750,get:function(){return l.height},set:function(t){l.height=t}},scale:{default:2.5,get:function(){return l.scale},set:function(t){l.scale=t}},zoom:{default:5,get:function(){return l.zoom},set:function(t){l.zoom=t}},src:{default:"cropper",get:function(){return l.src},set:function(t){l.src=t}},cut:{default:{},get:function(){return l.cut},set:function(t){l.cut=t}},onReady:{default:null,get:function(){return l.ready},set:function(t){l.ready=t}},onBeforeImageLoad:{default:null,get:function(){return l.beforeImageLoad},set:function(t){l.beforeImageLoad=t}},onImageLoad:{default:null,get:function(){return l.imageLoad},set:function(t){l.imageLoad=t}},onBeforeDraw:{default:null,get:function(){return l.beforeDraw},set:function(t){l.beforeDraw=t}}};function p(){var t=this,e=a(),n=e.windowWidth;t.attachPage=function(){var e=getCurrentPages(),n=e[e.length-1];n.wecropper=t},t.createCtx=function(){var e=t.id;e&&(t.ctx=wx.createCanvasContext(e))},t.deviceRadio=n/750,t.deviceRadio=t.deviceRadio.toFixed(2)}function d(){var t=this,e=["ready","beforeImageLoad","beforeDraw","imageLoad"];t.on=function(n,o){return e.indexOf(n)>-1&&"function"===typeof o&&("ready"===n?o(t):t["on"+r(n)]=o),t}}function h(){var t=this,n=t.deviceRadio,r=t.width,o=t.height,i=t.cut,a=i.x,s=void 0===a?0:a,u=i.y,c=void 0===u?0:u,l=i.width,f=void 0===l?r:l,p=i.height,d=void 0===p?o:p;t.updateCanvas=function(){return t.croperTarget&&t.ctx.drawImage(t.croperTarget,t.imgLeft,t.imgTop,t.scaleWidth,t.scaleHeight),"function"===typeof t.onBeforeDraw&&t.onBeforeDraw(t.ctx,t),t.setBoundStyle(),t.ctx.draw(),t},t.pushOrign=function(n){return t.src=n,"function"===typeof t.onBeforeImageLoad&&t.onBeforeImageLoad(t.ctx,t),e.getImageInfo({src:n,success:function(e){var r=e.width/e.height;t.croperTarget=e.path||n,r<f/d?(t.rectX=s,t.baseWidth=f,t.baseHeight=f/r,t.rectY=c-Math.abs((d-t.baseHeight)/2)):(t.rectY=c,t.baseWidth=d*r,t.baseHeight=d,t.rectX=s-Math.abs((f-t.baseWidth)/2)),t.imgLeft=t.rectX,t.imgTop=t.rectY,t.scaleWidth=t.baseWidth,t.scaleHeight=t.baseHeight,t.updateCanvas(),"function"===typeof t.onImageLoad&&t.onImageLoad(t.ctx,t)}}),t.update(),t},t.getCropperImage=function(){for(var r=arguments.length,o=Array(r),i=0;i<r;i++)o[i]=arguments[i];var a=t.id,u=toString.call(o[0]);switch(u){case"[object Object]":var l=o[0].quality,p=void 0===l?10:l;console.log("quality--"+p," at static\\js\\weCropper.js:353"),e.canvasToTempFilePath({canvasId:a,x:s,y:c,width:f,height:d,destWidth:f*p/(10*n),destHeight:d*p/(10*n),success:function(t){console.log(t," at static\\js\\weCropper.js:364"),"function"===typeof o[o.length-1]&&o[o.length-1](t.tempFilePath)}});break;case"[object Function]":e.canvasToTempFilePath({canvasId:a,x:s,y:c,fileType:"jpg",width:f,height:d,destWidth:f,destHeight:d,success:function(t){"function"===typeof o[o.length-1]&&o[o.length-1](t.tempFilePath)}});break}return t}}function g(){var t=this;t.src&&(t.__oneTouchStart=function(e){t.touchX0=e.x,t.touchY0=e.y},t.__oneTouchMove=function(e){var n=void 0,r=void 0;if(t.touchended)return t.updateCanvas();n=e.x-t.touchX0,r=e.y-t.touchY0;var o=t.rectX+n,i=t.rectY+r;t.outsideBound(o,i),t.updateCanvas()},t.__twoTouchStart=function(e,n){var r=void 0,o=void 0,i=void 0;t.touchX1=t.rectX+t.scaleWidth/2,t.touchY1=t.rectY+t.scaleHeight/2,r=n.x-e.x,o=n.y-e.y,i=Math.sqrt(r*r+o*o),t.oldDistance=i},t.__twoTouchMove=function(e,n){var r=void 0,o=void 0,i=void 0,a=t.scale,s=t.zoom;r=n.x-e.x,o=n.y-e.y,i=Math.sqrt(r*r+o*o),t.newScale=t.oldScale+.001*s*(i-t.oldDistance),t.newScale<=1&&(t.newScale=1),t.newScale>=a&&(t.newScale=a),t.scaleWidth=t.newScale*t.baseWidth,t.scaleHeight=t.newScale*t.baseHeight;var u=t.touchX1-t.scaleWidth/2,c=t.touchY1-t.scaleHeight/2;t.outsideBound(u,c),t.updateCanvas()},t.__xtouchEnd=function(){t.oldScale=t.newScale,t.rectX=t.imgLeft,t.rectY=t.imgTop})}var m={touchStart:function(t){var e=this,n=c(t.touches,2),r=n[0],i=n[1];r.x||(r.x=r.clientX,r.y=r.clientY,i&&(i.x=i.clientX,i.y=i.clientY)),o(e,!0,null,null),e.__oneTouchStart(r),t.touches.length>=2&&e.__twoTouchStart(r,i)},touchMove:function(t){var e=this,n=c(t.touches,2),r=n[0],i=n[1];r.x||(r.x=r.clientX,r.y=r.clientY,i&&(i.x=i.clientX,i.y=i.clientY)),o(e,null,!0),1===t.touches.length&&e.__oneTouchMove(r),t.touches.length>=2&&e.__twoTouchMove(r,i)},touchEnd:function(t){var e=this;o(e,!1,!1,!0),e.__xtouchEnd()}};function v(){var t=this,e=(t.deviceRadio,t.width),n=t.height,r=t.cut,o=r.x,i=void 0===o?0:o,a=r.y,s=void 0===a?0:a,u=r.width,c=void 0===u?e:u,l=r.height,f=void 0===l?n:l;t.outsideBound=function(e,n){t.imgLeft=e>=i?i:t.scaleWidth+e-i<=c?i+c-t.scaleWidth:e,t.imgTop=n>=s?s:t.scaleHeight+n-s<=f?s+f-t.scaleHeight:n},t.setBoundStyle=function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=r.color,a=void 0===o?"#04b00f":o,u=r.mask,l=void 0===u?"rgba(0, 0, 0, 0.3)":u,p=r.lineWidth,d=void 0===p?1:p;t.ctx.beginPath(),t.ctx.setFillStyle(l),t.ctx.fillRect(0,0,i,n),t.ctx.fillRect(i,0,c,s),t.ctx.fillRect(i,s+f,c,n-s-f),t.ctx.fillRect(i+c,0,e-i-c,n),t.ctx.fill(),t.ctx.beginPath(),t.ctx.setStrokeStyle(a),t.ctx.setLineWidth(d),t.ctx.moveTo(i-d,s+10-d),t.ctx.lineTo(i-d,s-d),t.ctx.lineTo(i+10-d,s-d),t.ctx.stroke(),t.ctx.beginPath(),t.ctx.setStrokeStyle(a),t.ctx.setLineWidth(d),t.ctx.moveTo(i-d,s+f-10+d),t.ctx.lineTo(i-d,s+f+d),t.ctx.lineTo(i+10-d,s+f+d),t.ctx.stroke(),t.ctx.beginPath(),t.ctx.setStrokeStyle(a),t.ctx.setLineWidth(d),t.ctx.moveTo(i+c-10+d,s-d),t.ctx.lineTo(i+c+d,s-d),t.ctx.lineTo(i+c+d,s+10-d),t.ctx.stroke(),t.ctx.beginPath(),t.ctx.setStrokeStyle(a),t.ctx.setLineWidth(d),t.ctx.moveTo(i+c+d,s+f-10+d),t.ctx.lineTo(i+c+d,s+f+d),t.ctx.lineTo(i+c-10+d,s+f+d),t.ctx.stroke()}}var y="1.1.4",_=function(){function t(e){s(this,t);var n=this,r={};return i(n,f),Object.keys(f).forEach(function(t){r[t]=f[t].default}),Object.assign(n,r,e),n.prepare(),n.attachPage(),n.createCtx(),n.observer(),n.cutt(),n.methods(),n.init(),n.update(),n}return u(t,[{key:"init",value:function(){var t=this,e=t.src;return t.version=y,"function"===typeof t.onReady&&t.onReady(t.ctx,t),e&&t.pushOrign(e),o(t,!1,!1,!1),t.oldScale=1,t.newScale=1,t}}]),t}();return Object.assign(_.prototype,m),_.prototype.prepare=p,_.prototype.observer=d,_.prototype.methods=h,_.prototype.cutt=v,_.prototype.update=g,_})}).call(this,n("6e42")["default"])},a192:function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("cc4b"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},a1b7:function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("580c"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},a357:function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("4189"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},b115:function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("b6c4"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},b26c:function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("4dbf"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},b504:function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("c568"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},b98f:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=i(n("66fd")),o=i(n("2f62"));function i(t){return t&&t.__esModule?t:{default:t}}r.default.use(o.default);var a=new o.default.Store({state:{appKey:null,url:"http://192.168.10.22/services?f=",uploadHostUrl:"http://up.qiniup.com?token=",userInfo:null,statusHeight:44,IMSDKAPPID:1400132581,loginInfo:"",constants:{brand_type:29,repair_type:39,serviceorder_file:18,shop_file:26},notice:{todo:1,info:2},shopStatus:{1:"筹备中",2:"施工中",3:"营业中",4:"已撤柜",5:"已重装",6:"已移位"},shopStatusZn:{ready:1,processing:2,businessing:3,canceled:4,renovated:5,moved:6},shopStatusColor:{1:"#5cdbd3",2:"#ffa940",3:"#52c41a",4:"#f5222d",5:"#9254de",6:"#006d75"},noticeType:{unSign:0,distributeWork:1,agressWork:2,refuseWork:3,applyCheck:4,passCheck:5,unpassCheck:6,applyDelay:7,applyEnd:8,agressDelay:9,unagressDelay:10,endWork:11,unagreeEndWork:12,deleteWork:13,resignWork:14,editWork:15,applyShenpi:16,shenqiPass:17,applyRefuse:18,newApplyCopy:19,checkFinish:20,point:30},noticeTypeZn:{0:"未分配",1:"分派任务",2:"接收任务",3:"拒收任务",4:"申请验收",5:"通过验收",6:"未通过验收",7:"申请延期",8:"申请终止",9:"同意延期",10:"未同意延期",11:"终止任务",12:"未同意终止",13:"删除任务",14:"转派任务",15:"修改任务",16:"申请审批",17:"审批通过",18:"审批驳回",19:"新建审批抄送",20:"审批完成",30:"指定流程负责人"},noticeTypeColor:{0:"#8c8c8c",1:"#5cdbd3",2:"#096dd9",3:"#ff7a45",4:"#9254de",5:"#52c41a",6:"#f5222d",7:"#d46b08",8:"#ffa940",9:"#614700",10:"#612500",11:"#002329",12:"#ad8b00",13:"#cf1322",14:"#69c0ff",15:"#14B4F2",16:"#14B4F2",17:"#14B4F2",18:"#14B4F2",19:"#14B4F2",20:"#7cb305",30:"#7cb305"},repairStatusZn:{0:"全部",1:"未处理",2:"处理中",3:"无效",4:"已完成"},repairStatus:{all:0,untreated:1,treating:2,refuse:3,finish:4},repairStatusColor:{1:"bg-green",2:"bg-blue",3:"bg-red",4:"bg-purple"},userStatusZn:{1:"正常",2:"无业",3:"邀请中",4:"申请中",5:"离职"},userStatus:{normal:1,free:2,inviting:3,applying:4,quit:5},province:"",address:"",repairSubID:""},mutations:{setUserInfo:function(t,e){this.state.userInfo=e},setProvince:function(t,e){this.state.province=e},setAddress:function(t,e){this.state.address=e},setLoginInfo:function(t,e){this.state.loginInfo=e}}}),s=a;e.default=s},c04a:function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("b17a"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},c451:function(t,e,n){"use strict";function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}t.exports=function(){var t={},e={login:function(t,e,n){},syncMsgs:function(t,e){},getC2CHistoryMsgs:function(t,e,n){},syncGroupMsgs:function(t,e,n){},sendMsg:function(t,e,n){},logout:function(t,e){},setAutoRead:function(t,e,n){},getProfilePortrait:function(t,e,n){},setProfilePortrait:function(t,e,n){},applyAddFriend:function(t,e,n){},getPendency:function(t,e,n){},deletePendency:function(t,e,n){},responseFriend:function(t,e,n){},getAllFriend:function(t,e,n){},deleteFriend:function(t,e,n){},addBlackList:function(t,e,n){},getBlackList:function(t,e,n){},deleteBlackList:function(t,e,n){},uploadPic:function(t,e,n){},createGroup:function(t,e,n){},applyJoinGroup:function(t,e,n){},handleApplyJoinGroup:function(t,e,n){},deleteApplyJoinGroupPendency:function(t,e,n){},quitGroup:function(t,e,n){},getGroupPublicInfo:function(t,e,n){},getGroupInfo:function(t,e,n){},modifyGroupBaseInfo:function(t,e,n){},destroyGroup:function(t,e,n){},getJoinedGroupListHigh:function(t,e,n){},getGroupMemberInfo:function(t,e,n){},addGroupMember:function(t,e,n){},modifyGroupMember:function(t,e,n){},forbidSendMsg:function(t,e,n){},deleteGroupMember:function(t,e,n){},getPendencyGroup:function(t,e,n){},getPendencyReport:function(t,e,n){},getPendencyGroupRead:function(t,e,n){},sendCustomGroupNotify:function(t,e,n){},Msg:function(t,e,n,r,o,i,a,s){},MsgStore:{sessMap:function(){return{}},sessCount:function(){return 0},sessByTypeId:function(t,e){return{}},delSessByTypeId:function(t,e){return!0},resetCookieAndSyncFlag:function(){},downloadMap:{}}};return function(e){var n={VERSION:"1.7.0",APPID:"537048168",PLAATFORM:"10"},o=!0,i={FORMAL:{COMMON:"https://webim.tim.qq.com",PIC:"https://pic.tim.qq.com"},TEST:{COMMON:"https://test.tim.qq.com",PIC:"https://pic.tim.qq.com"}},a={},s=!1,u={OPEN_IM:"openim",GROUP:"group_open_http_svc",FRIEND:"sns",PROFILE:"profile",RECENT_CONTACT:"recentcontact",PIC:"openpic",BIG_GROUP:"group_open_http_noauth_svc",BIG_GROUP_LONG_POLLING:"group_open_long_polling_http_noauth_svc",IM_OPEN_STAT:"imopenstat",DEL_CHAT:"recentcontact"},c=r({openim:"v4",group_open_http_svc:"v4",sns:"v4",profile:"v4",recentcontact:"v4",openpic:"v4",group_open_http_noauth_svc:"v1",group_open_long_polling_http_noauth_svc:"v1",imopenstat:"v4"},"recentcontact","v4"),l={login:1,pic_up:3,apply_join_group:9,create_group:10,longpolling:18,send_group_msg:19,sendmsg:20},f={C2C:"C2C",GROUP:"GROUP"},p={C2C:1,GROUP:2},d={C2C:12e3,GROUP:8898},h={OK:"OK",FAIL:"FAIL"},g=99999,m={TEXT:"TIMTextElem",FACE:"TIMFaceElem",IMAGE:"TIMImageElem",CUSTOM:"TIMCustomElem",SOUND:"TIMSoundElem",FILE:"TIMFileElem",LOCATION:"TIMLocationElem",GROUP_TIP:"TIMGroupTipElem"},v={ORIGIN:1,LARGE:2,SMALL:3},y={JPG:1,JPEG:1,GIF:2,PNG:3,BMP:4,UNKNOWN:255},_={RAW_DATA:0,BASE64_DATA:1},b={BUSSINESS_ID:"10001",AUTH_KEY:"617574686b6579",SERVER_IP:"182.140.186.147"},I={SOUND:2106,FILE:2107},M={IMAGE:1,FILE:2,SHORT_VIDEO:3,SOUND:4},S={APP_VERSION:"2.1",SERVER_VERSION:1},E={C2C:1,GROUP_COMMON:3,GROUP_TIP:4,GROUP_SYSTEM:5,GROUP_TIP2:6,FRIEND_NOTICE:7,PROFILE_NOTICE:8,C2C_COMMON:9,C2C_EVENT:10},C={COMMON:0},w={READED:92,KICKEDOUT:96},A={COMMON:0,LOVEMSG:1,TIP:2,REDPACKET:3},T={REDPACKET:1,COMMON:2,LOVEMSG:3},O={JOIN:1,QUIT:2,KICK:3,SET_ADMIN:4,CANCEL_ADMIN:5,MODIFY_GROUP_INFO:6,MODIFY_MEMBER_INFO:7},P={FACE_URL:1,NAME:2,OWNER:3,NOTIFICATION:4,INTRODUCTION:5},k={JOIN_GROUP_REQUEST:1,JOIN_GROUP_ACCEPT:2,JOIN_GROUP_REFUSE:3,KICK:4,DESTORY:5,CREATE:6,INVITED_JOIN_GROUP_REQUEST:7,QUIT:8,SET_ADMIN:9,CANCEL_ADMIN:10,REVOKE:11,READED:15,CUSTOM:255,INVITED_JOIN_GROUP_REQUEST_AGREE:12},x={FRIEND_ADD:1,FRIEND_DELETE:2,PENDENCY_ADD:3,PENDENCY_DELETE:4,BLACK_LIST_ADD:5,BLACK_LIST_DELETE:6,PENDENCY_REPORT:7,FRIEND_UPDATE:8},F={PROFILE_MODIFY:1},R={OK:0,SIGNATURE_EXPIRATION:11},U={INIT:-1,ON:0,RECONNECT:1,OFF:9999},G={GROUP_MSG:1,C2C_MSG:2,USER_HEAD:3,GROUP_HEAD:4},D={ING:14,STOP:15},N=15e3,L=10,j=U.INIT,$=!1,q=0,B=6e4,H=5e3,z=60008,V=91101,K=null,W=0,J=10,Y=0,X=20,Q=0,Z=null,tt=null,et=0,nt=[],rt=null,ot={sdkAppID:null,appIDAt3rd:null,accountType:null,identifier:null,tinyid:null,identifierNick:null,userSig:null,a2:null,contentType:"json",apn:1},it={},at=0,st={},ut=0,ct=[],lt=[],ft=20,pt=[],dt={downloadMap:{}},ht={"[惊讶]":0,"[撇嘴]":1,"[色]":2,"[发呆]":3,"[得意]":4,"[流泪]":5,"[害羞]":6,"[闭嘴]":7,"[睡]":8,"[大哭]":9,"[尴尬]":10,"[发怒]":11,"[调皮]":12,"[龇牙]":13,"[微笑]":14,"[难过]":15,"[酷]":16,"[冷汗]":17,"[抓狂]":18,"[吐]":19,"[偷笑]":20,"[可爱]":21,"[白眼]":22,"[傲慢]":23,"[饿]":24,"[困]":25,"[惊恐]":26,"[流汗]":27,"[憨笑]":28,"[大兵]":29,"[奋斗]":30,"[咒骂]":31,"[疑问]":32,"[嘘]":33,"[晕]":34},gt={},mt=new function(){this.formatTimeStamp=function(t,e){if(!t)return 0;var n;e=e||"yyyy-MM-dd hh:mm:ss";var r=new Date(1e3*t),o={"M+":r.getMonth()+1,"d+":r.getDate(),"h+":r.getHours(),"m+":r.getMinutes(),"s+":r.getSeconds()};for(var i in n=/(y+)/.test(e)?e.replace(RegExp.$1,(r.getFullYear()+"").substr(4-RegExp.$1.length)):e,o)new RegExp("("+i+")").test(n)&&(n=n.replace(RegExp.$1,1==RegExp.$1.length?o[i]:("00"+o[i]).substr((""+o[i]).length)));return n},this.groupTypeEn2Ch=function(t){var e=null;switch(t){case"Public":e="公开群";break;case"ChatRoom":e="聊天室";break;case"Private":e="私有群";break;case"AVChatRoom":e="直播聊天室";break;default:e=t;break}return e},this.groupTypeCh2En=function(t){var e=null;switch(t){case"公开群":e="Public";break;case"聊天室":e="ChatRoom";break;case"私有群":e="Private";break;case"直播聊天室":e="AVChatRoom";break;default:e=t;break}return e},this.groupRoleEn2Ch=function(t){var e=null;switch(t){case"Member":e="成员";break;case"Admin":e="管理员";break;case"Owner":e="群主";break;default:e=t;break}return e},this.groupRoleCh2En=function(t){var e=null;switch(t){case"成员":e="Member";break;case"管理员":e="Admin";break;case"群主":e="Owner";break;default:e=t;break}return e},this.groupMsgFlagEn2Ch=function(t){var e=null;switch(t){case"AcceptAndNotify":e="接收并提示";break;case"AcceptNotNotify":e="接收不提示";break;case"Discard":e="屏蔽";break;default:e=t;break}return e},this.groupMsgFlagCh2En=function(t){var e=null;switch(t){case"接收并提示":e="AcceptAndNotify";break;case"接收不提示":e="AcceptNotNotify";break;case"屏蔽":e="Discard";break;default:e=t;break}return e},this.formatText2Html=function(t){var e=t;return e&&(e=this.xssFilter(e),e=e.replace(/ /g,"&nbsp;"),e=e.replace(/\n/g,"<br/>")),e},this.formatHtml2Text=function(t){var e=t;return e&&(e=e.replace(/&nbsp;/g," "),e=e.replace(/<br\/>/g,"\n")),e},this.getStrBytes=function(t){if(null==t||void 0===t)return 0;if("string"!=typeof t)return 0;var e,n,r,o=0;for(n=0,r=t.length;n<r;n++)e=t.charCodeAt(n),o+=e<=127?1:e<=2047?2:e<=65535?3:4;return o},this.xssFilter=function(t){return t=t.toString(),t=t.replace(/[<]/g,"&lt;"),t=t.replace(/[>]/g,"&gt;"),t=t.replace(/"/g,"&quot;"),t},this.trimStr=function(t){return t?(t=t.toString(),t.replace(/(^\s*)|(\s*$)/g,"")):""},this.validNumber=function(t){return t=t.toString(),t.match(/(^\d{1,8}$)/g)},this.getReturnError=function(t,e){e||(e=-100);var n={ActionStatus:h.FAIL,ErrorCode:e,ErrorInfo:t+"["+e+"]"};return n},this.setCookie=function(t,e,n,r,o){var i=new Date;i.setTime(i.getTime()+1e3*n),document.cookie=t+"="+escape(e)+";expires="+i.toGMTString()},this.getCookie=function(t){var e=document.cookie.match(new RegExp("(^| )"+t+"=([^;]*)(;|$)"));return null!=e?unescape(e[2]):null},this.delCookie=function(t){var e=new Date;e.setTime(e.getTime()-1);var n=this.getCookie(t);null!=n&&(document.cookie=t+"="+escape(n)+";expires="+e.toGMTString())},this.getQueryString=function(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)","i"),n=location.search.substr(1).match(e);return null!=n?unescape(n[2]):null}},vt=new function(){var t=!0;this.setOn=function(e){t=e},this.getOn=function(){return t},this.error=function(e){try{t&&console.error(e," at static\\js\\webim.js:1295")}catch(n){}},this.warn=function(e){try{t&&console.warn(e," at static\\js\\webim.js:1301")}catch(n){}},this.info=function(e){try{t&&console.info(e," at static\\js\\webim.js:1307")}catch(n){}},this.debug=function(e){try{t&&console.log(e," at static\\js\\webim.js:1313")}catch(n){}}},yt=function(t){return t||(t=new Date),Math.round(t.getTime()/1e3)},_t=function(){return ut?ut+=1:ut=Math.round(1e7*Math.random()),ut},bt=function(){return Math.round(4294967296*Math.random())},It=function(){var t=null;if(window.XMLHttpRequest)t=new XMLHttpRequest;else try{t=new ActiveXObject("Msxml2.XMLHTTP")}catch(e){try{t=new ActiveXObject("Microsoft.XMLHTTP")}catch(e){return null}}return t},Mt=function(t,e,n,r,o,i,a){var s,u=It();if(!u){s="创建请求失败";var c=mt.getReturnError(s,-1);return vt.error(s),void(a&&a(c))}at++,st[at]=u,u.open(t,e,!0),u.onreadystatechange=function(){4==u.readyState&&(st[at]=null,200==u.status?(i&&i(u.responseText),u=null,q=W=0):(u=null,setTimeout(function(){var t="请求服务器失败,请检查你的网络是否正常",e=mt.getReturnError(t,-2);a&&a(e)},16)))},u.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),r||(r=N),r&&(u.timeout=r,u.ontimeout=function(t){u=null}),u.send(n)},St=function(t,e,n,r,o,i,a){Mt(t,e,JSON.stringify(n),r,o,function(t){var e=null;t&&(e=t),i&&i(e)},a)},Et=function(){return ot.sdkAppID&&ot.identifier},Ct=function(t,e){if(!Et()){if(e){var n="请登录",r=mt.getReturnError(n,-4);t&&t(r)}return!1}return!0},wt=function(){return o},At=function(t,e,r,o){var a=i;a=wt()?i.FORMAL.COMMON:i.TEST.COMMON,t==u.PIC&&(a=wt()?i.FORMAL.PIC:i.TEST.PIC);var s=a+"/"+c[t]+"/"+t+"/"+e+"?websdkappid="+n.APPID+"&v="+n.VERSION;if(Et()){if("login"==e)s+="&identifier="+encodeURIComponent(ot.identifier)+"&usersig="+ot.userSig;else if(ot.tinyid&&ot.a2)s+="&tinyid="+ot.tinyid+"&a2="+ot.a2;else if(o)return vt.error("tinyid或a2为空["+t+"]["+e+"]"),o(mt.getReturnError("tinyid或a2为空["+t+"]["+e+"]",-5)),!1;s+="&contenttype="+ot.contentType}return s+="&sdkappid="+ot.sdkAppID+"&accounttype="+ot.accountType+"&apn="+ot.apn+"&reqtime="+yt(),s},Tt=function(t,e){var n=null;return rt&&nt[0]?n="http://"+nt[0]+"/asn.com/stddownload_common_file?authkey="+rt+"&bid="+b.BUSSINESS_ID+"&subbid="+ot.sdkAppID+"&fileid="+t+"&filetype="+I.SOUND+"&openid="+e+"&ver=0":vt.error("拼接语音下载url不报错：ip或者authkey为空"),n},Ot=function(t,e,n){var r=null;return rt&&nt[0]?r="http://"+nt[0]+"/asn.com/stddownload_common_file?authkey="+rt+"&bid="+b.BUSSINESS_ID+"&subbid="+ot.sdkAppID+"&fileid="+t+"&filetype="+I.FILE+"&openid="+e+"&ver=0&filename="+encodeURIComponent(n):vt.error("拼接文件下载url不报错：ip或者authkey为空"),dt.downloadMap["uuid_"+t]=r,r},Pt=function(t,e,n,r,o,i,a){var s={From_Account:e,To_Account:o,os_platform:10,Timestamp:yt().toString(),Random:bt().toString(),request_info:[{busi_id:i,download_flag:r,type:a,uuid:t,version:S.SERVER_VERSION,auth_key:rt,ip:nt[0]}]};Ge(s,function(t){0==t.error_code&&t.response_info&&(dt.downloadMap["uuid_"+s.uuid]=t.response_info.url),onAppliedDownloadUrl&&onAppliedDownloadUrl({uuid:s.uuid,url:t.response_info.url,maps:dt.downloadMap})},function(t){vt.error("获取下载地址失败",s.uuid)})},kt=function(){for(var t in st){var e=st[t];e&&(e.abort(),st[at]=null)}at=0,st={}},xt=function(){kt(),ot={sdkAppID:null,appIDAt3rd:null,accountType:null,identifier:null,identifierNick:null,userSig:null,contentType:"json",apn:1},it={},ut=0,Q=0,Z=null,pt=[],qe.clear(),K=null},Ft=function(t,e,n,r,i){xt(),n&&(it=n),0==it.isAccessFormalEnv&&(o=it.isAccessFormalEnv),0==it.isLogOn&&vt.setOn(it.isLogOn),t||!i?t.sdkAppID||!i?t.accountType||!i?(t.identifier&&(ot.identifier=t.identifier.toString()),t.identifier&&!t.userSig&&i?i(mt.getReturnError("loginInfo.userSig is empty",-9)):(t.userSig&&(ot.userSig=t.userSig.toString()),ot.sdkAppID=t.sdkAppID,ot.accountType=t.accountType,ot.identifier&&ot.userSig?Gt(function(t,n){qe.init(e,function(e){r&&(e.identifierNick=t,e.headurl=n,r(e))},i)},i):qe.init(e,r,i))):i(mt.getReturnError("loginInfo.accountType is empty",-8)):i(mt.getReturnError("loginInfo.sdkAppID is empty",-7)):i(mt.getReturnError("loginInfo is empty",-6))},Rt=function(){a="wechat"},Ut=function(t,e,r){if("longpolling"!=t||e!=z&&e!=V){var o=l[t];if(o){var i=yt(),a=null,s={Code:e,ErrMsg:r};if(ot.a2?a=ot.a2.substring(0,10)+"_"+i+"_"+bt():ot.userSig&&(a=ot.userSig.substring(0,10)+"_"+i+"_"+bt()),a){var u={UniqKey:a,EventId:o,ReportTime:i,MsgCmdErrorCode:s};if("login"==t){var c=[];c.push(u);var f={EvtItems:c,MainVersion:n.VERSION,Version:"0"};Re(f,function(t){c=null},function(t){c=null})}else if(pt.push(u),pt.length>=ft){var p={EvtItems:pt,MainVersion:n.VERSION,Version:"0"};Re(p,function(t){pt=[]},function(t){pt=[]})}}}}},Gt=function(t,e){De.apiCall(u.OPEN_IM,"login",{State:"Online"},function(n){if(n.TinyId)ot.tinyid=n.TinyId;else if(e)return void e(mt.getReturnError("TinyId is empty",-10));if(n.A2Key)ot.a2=n.A2Key;else if(e)return void e(mt.getReturnError("A2Key is empty",-11));var r=["Tag_Profile_IM_Nick","Tag_Profile_IM_Image"],o={From_Account:ot.identifier,To_Account:[ot.identifier],LastStandardSequence:0,TagList:r};we(o,function(e){if(e.UserProfileItem&&e.UserProfileItem.length>0)for(var n in e.UserProfileItem)for(var r in e.UserProfileItem[n].ProfileItem)switch(e.UserProfileItem[n].ProfileItem[r].Tag){case"Tag_Profile_IM_Nick":var o=e.UserProfileItem[n].ProfileItem[r].Value;o&&(ot.identifierNick=o);break;case"Tag_Profile_IM_Image":var i=e.UserProfileItem[n].ProfileItem[r].Value;i&&(ot.headurl=i);break}t&&t(ot.identifierNick,ot.headurl)},e)},e)},Dt=function(t,e,n){if(!Ct(n,!1))return xt(),void(e&&e({ActionStatus:h.OK,ErrorCode:0,ErrorInfo:"logout success"}));"all"==t?De.apiCall(u.OPEN_IM,"logout",{},function(t){xt(),e&&e(t)},n):De.apiCall(u.OPEN_IM,"longpollinglogout",{LongPollingId:K},function(t){xt(),e&&e(t)},n)},Nt=function(t,e,n){if(Ct(n,!0)){var r=null;switch(t.sess.type()){case f.C2C:r={From_Account:ot.identifier,To_Account:t.sess.id().toString(),MsgTimeStamp:t.time,MsgSeq:t.seq,MsgRandom:t.random,MsgBody:[]};break;case f.GROUP:var o=t.getSubType();switch(r={GroupId:t.sess.id().toString(),From_Account:ot.identifier,Random:t.random,MsgBody:[]},o){case A.COMMON:r.MsgPriority="COMMON";break;case A.REDPACKET:r.MsgPriority="REDPACKET";break;case A.LOVEMSG:r.MsgPriority="LOVEMSG";break;case A.TIP:vt.error("不能主动发送群提示消息,subType="+o);break;default:return void vt.error("发送群消息时，出现未知子消息类型：subType="+o)}break;default:break}for(var i in t.elems){var a=t.elems[i],s=null,c=a.type;switch(c){case m.TEXT:s={Text:a.content.text};break;case m.FACE:s={Index:a.content.index,Data:a.content.data};break;case m.IMAGE:var l=[];for(var p in a.content.ImageInfoArray)l.push({Type:a.content.ImageInfoArray[p].type,Size:a.content.ImageInfoArray[p].size,Width:a.content.ImageInfoArray[p].width,Height:a.content.ImageInfoArray[p].height,URL:a.content.ImageInfoArray[p].url});s={ImageFormat:a.content.ImageFormat,UUID:a.content.UUID,ImageInfoArray:l};break;case m.SOUND:vt.warn("web端暂不支持发送语音消息");continue;case m.LOCATION:vt.warn("web端暂不支持发送地理位置消息");continue;case m.FILE:s={UUID:a.content.uuid,FileName:a.content.name,FileSize:a.content.size,DownloadFlag:a.content.downFlag};break;case m.CUSTOM:s={Data:a.content.data,Desc:a.content.desc,Ext:a.content.ext},c=m.CUSTOM;break;default:vt.warn("web端暂不支持发送"+a.type+"消息");continue}t.PushInfoBoolean&&(r.OfflinePushInfo=t.PushInfo),r.MsgBody.push({MsgType:c,MsgContent:s})}t.sess.type()==f.C2C?De.apiCall(u.OPEN_IM,"sendmsg",r,e,n):t.sess.type()==f.GROUP&&De.apiCall(u.GROUP,"send_group_msg",r,e,n)}},Lt=function(t,e,n){(o||"undefined"==typeof stopPolling||1!=stopPolling)&&Ct(n,!0)&&De.apiCall(u.OPEN_IM,"longpolling",t,e,n,B,!0)},jt=function(t,e,n,r){De.apiCall(u.BIG_GROUP_LONG_POLLING,"get_msg",t,e,n,r)},$t=function t(e,n,r,o){Ct(o,!0)&&De.apiCall(u.OPEN_IM,"getmsg",{Cookie:e,SyncFlag:n},function(e){if(e.MsgList&&e.MsgList.length)for(var n in e.MsgList)ct.push(e.MsgList[n]);1==e.SyncFlag?t(e.Cookie,e.SyncFlag,r,o):(e.MsgList=ct,ct=[],r&&r(e))},o)},qt=function(t,e,n,r){if(Ct(r,!0)){var o=[];for(var i in e){var a={To_Account:e[i].toAccount,LastedMsgTime:e[i].lastedMsgTime};o.push(a)}De.apiCall(u.OPEN_IM,"msgreaded",{C2CMsgReaded:{Cookie:t,C2CMsgReadedItem:o}},n,r)}},Bt=function(t,e,n){Ct(n,!0)&&De.apiCall(u.OPEN_IM,"deletemsg",t,e,n)},Ht=function t(e,n,r){Ct(r,!0)&&De.apiCall(u.OPEN_IM,"getroammsg",e,function(o){var i=e.MaxCnt,a=o.Complete,s=o.MaxCnt,u=o.MsgKey,c=o.LastMsgTime;if(o.MsgList&&o.MsgList.length)for(var l in o.MsgList)lt.push(o.MsgList[l]);var f=null;0==a&&s<i&&(f={Peer_Account:e.Peer_Account,MaxCnt:i-s,LastMsgTime:c,MsgKey:u}),f?t(f,n,r):(o.MsgList=lt,lt=[],n&&n(o))},r)},zt=function(t,e,n){if(Ct(n,!0)){for(var r={Type:t.Type,Name:t.Name},o=[],i=0;i<t.MemberList.length;i++)o.push({Member_Account:t.MemberList[i]});r.MemberList=o,t.GroupId&&(r.GroupId=t.GroupId),t.Owner_Account&&(r.Owner_Account=t.Owner_Account),t.Introduction&&(r.Introduction=t.Introduction),t.Notification&&(r.Notification=t.Notification),t.MaxMemberCount&&(r.MaxMemberCount=t.MaxMemberCount),t.ApplyJoinOption&&(r.ApplyJoinOption=t.ApplyJoinOption),t.AppDefinedData&&(r.AppDefinedData=t.AppDefinedData),t.FaceUrl&&(r.FaceUrl=t.FaceUrl),De.apiCall(u.GROUP,"create_group",r,e,n)}},Vt=function(t,e,n){Ct(n,!0)&&De.apiCall(u.GROUP,"create_group",t,e,n)},Kt=function(t,e,n){Ct(n,!0)&&De.apiCall(u.GROUP,"modify_group_base_info",t,e,n)},Wt=function(t,e,n){Ct(n,!0)&&De.apiCall(u.GROUP,"apply_join_group",{GroupId:t.GroupId,ApplyMsg:t.ApplyMsg,UserDefinedField:t.UserDefinedField},e,n)},Jt=function(t,e,n){var r;r=Ct(n,!1)?u.GROUP:u.BIG_GROUP,De.apiCall(r,"apply_join_group",{GroupId:t.GroupId,ApplyMsg:t.ApplyMsg,UserDefinedField:t.UserDefinedField},function(r){if(r.JoinedStatus&&"JoinedSuccess"==r.JoinedStatus){if(!r.LongPollingKey)return void(n&&n(mt.getReturnError("Join Group succeed; But the type of group is not AVChatRoom: groupid="+t.GroupId,-12)));qe.setBigGroupLongPollingOn(!0),qe.setBigGroupLongPollingKey(r.LongPollingKey),qe.setBigGroupLongPollingMsgMap(t.GroupId,0),qe.bigGroupLongPolling()}e&&e(r)},function(t){n&&n(t)})},Yt=function(t,e,n){Ct(n,!0)&&De.apiCall(u.GROUP,"handle_apply_join_group",{GroupId:t.GroupId,Applicant_Account:t.Applicant_Account,HandleMsg:t.HandleMsg,Authentication:t.Authentication,MsgKey:t.MsgKey,ApprovalMsg:t.ApprovalMsg,UserDefinedField:t.UserDefinedField},e,function(t){if(10024==t.ErrorCode){if(e){var r={ActionStatus:h.OK,ErrorCode:0,ErrorInfo:"该申请已经被处理过"};e(r)}}else n&&n(t)})},Xt=function(t,e,n){Ct(n,!0)&&De.apiCall(u.GROUP,"get_pendency",{StartTime:t.StartTime,Limit:t.Limit,Handle_Account:ot.identifier},e,function(t){})},Qt=function(t,e,n){Ct(n,!0)&&De.apiCall(u.GROUP,"report_pendency",{ReportTime:t.ReportTime,From_Account:ot.identifier},e,function(t){})},Zt=function(t,e,n){Ct(n,!0)&&De.apiCall(u.GROUP,"handle_invite_join_group",{GroupId:t.GroupId,Inviter_Account:t.Inviter_Account,HandleMsg:t.HandleMsg,Authentication:t.Authentication,MsgKey:t.MsgKey,ApprovalMsg:t.ApprovalMsg,UserDefinedField:t.UserDefinedField},e,function(t){})},te=function(t,e,n){Ct(n,!0)&&De.apiCall(u.GROUP,"quit_group",{GroupId:t.GroupId},e,n)},ee=function(t,e,n){var r;r=Ct(n,!1)?u.GROUP:u.BIG_GROUP,De.apiCall(r,"quit_group",{GroupId:t.GroupId},function(t){qe.resetBigGroupLongPollingInfo(),e&&e(t)},n)},ne=function(t,e,n){De.apiCall(u.GROUP,"search_group",t,e,n)},re=function(t,e,n){Ct(n,!0)&&De.apiCall(u.GROUP,"get_group_public_info",{GroupIdList:t.GroupIdList,ResponseFilter:{GroupBasePublicInfoFilter:t.GroupBasePublicInfoFilter}},function(t){if(t.ErrorInfo="",t.GroupInfo)for(var r in t.GroupInfo){var o=t.GroupInfo[r].ErrorCode;o>0&&(t.ActionStatus=h.FAIL,t.GroupInfo[r].ErrorInfo="["+o+"]"+t.GroupInfo[r].ErrorInfo,t.ErrorInfo+=t.GroupInfo[r].ErrorInfo+"\n")}t.ActionStatus==h.FAIL?n&&n(t):e&&e(t)},n)},oe=function(t,e,n){if(Ct(n,!0)){var r={GroupIdList:t.GroupIdList,ResponseFilter:{GroupBaseInfoFilter:t.GroupBaseInfoFilter,MemberInfoFilter:t.MemberInfoFilter}};t.AppDefinedDataFilter_Group&&(r.ResponseFilter.AppDefinedDataFilter_Group=t.AppDefinedDataFilter_Group),t.AppDefinedDataFilter_GroupMember&&(r.ResponseFilter.AppDefinedDataFilter_GroupMember=t.AppDefinedDataFilter_GroupMember),De.apiCall(u.GROUP,"get_group_info",r,e,n)}},ie=function(t,e,n){Ct(n,!0)&&De.apiCall(u.GROUP,"get_group_member_info",{GroupId:t.GroupId,Offset:t.Offset,Limit:t.Limit,MemberInfoFilter:t.MemberInfoFilter,MemberRoleFilter:t.MemberRoleFilter,AppDefinedDataFilter_GroupMember:t.AppDefinedDataFilter_GroupMember},e,n)},ae=function(t,e,n){Ct(n,!0)&&De.apiCall(u.GROUP,"add_group_member",{GroupId:t.GroupId,Silence:t.Silence,MemberList:t.MemberList},e,n)},se=function(t,e,n){if(Ct(n,!0)){var r={};t.GroupId&&(r.GroupId=t.GroupId),t.Member_Account&&(r.Member_Account=t.Member_Account),t.Role&&(r.Role=t.Role),t.MsgFlag&&(r.MsgFlag=t.MsgFlag),t.ShutUpTime&&(r.ShutUpTime=t.ShutUpTime),t.NameCard&&(r.NameCard=t.NameCard),t.AppMemberDefinedData&&(r.AppMemberDefinedData=t.AppMemberDefinedData),De.apiCall(u.GROUP,"modify_group_member_info",r,e,n)}},ue=function(t,e,n){Ct(n,!0)&&De.apiCall(u.GROUP,"delete_group_member",{GroupId:t.GroupId,Silence:t.Silence,MemberToDel_Account:t.MemberToDel_Account,Reason:t.Reason},e,n)},ce=function(t,e,n){Ct(n,!0)&&De.apiCall(u.GROUP,"destroy_group",{GroupId:t.GroupId},e,n)},le=function(t,e,n){Ct(n,!0)&&De.apiCall(u.GROUP,"change_group_owner",t,e,n)},fe=function(t,e,n){Ct(n,!0)&&De.apiCall(u.GROUP,"get_joined_group_list",{Member_Account:t.Member_Account,Limit:t.Limit,Offset:t.Offset,GroupType:t.GroupType,ResponseFilter:{GroupBaseInfoFilter:t.GroupBaseInfoFilter,SelfInfoFilter:t.SelfInfoFilter}},e,n)},pe=function(t,e,n){Ct(n,!0)&&De.apiCall(u.GROUP,"get_role_in_group",{GroupId:t.GroupId,User_Account:t.User_Account},e,n)},de=function(t,e,n){Ct(n,!0)&&De.apiCall(u.GROUP,"forbid_send_msg",{GroupId:t.GroupId,Members_Account:t.Members_Account,ShutUpTime:t.ShutUpTime},e,n)},he=function(t,e,n){Ct(n,!0)&&De.apiCall(u.GROUP,"send_group_system_notification",t,e,n)},ge=function(t,e,n){Ct(n,!0)&&De.apiCall(u.GROUP,"group_msg_get",{GroupId:t.GroupId,ReqMsgSeq:t.ReqMsgSeq,ReqMsgNumber:t.ReqMsgNumber},e,n)},me=function(t,e,n){Ct(n,!0)&&De.apiCall(u.GROUP,"msg_read_report",{GroupId:t.GroupId,MsgReadedSeq:t.MsgReadedSeq},e,n)},ve=function(t){var e=[];if(t.Fail_Account&&t.Fail_Account.length&&(e=t.Fail_Account),t.Invalid_Account&&t.Invalid_Account.length)for(var n in t.Invalid_Account)e.push(t.Invalid_Account[n]);if(e.length)for(var r in t.ActionStatus=h.FAIL,t.ErrorCode=g,t.ErrorInfo="",e){var o=e[r];for(var i in t.ResultItem)if(t.ResultItem[i].To_Account==o){var a=t.ResultItem[i].ResultCode;t.ResultItem[i].ResultInfo="["+a+"]"+t.ResultItem[i].ResultInfo,t.ErrorInfo+=t.ResultItem[i].ResultInfo+"\n";break}}return t},ye=function(t,e,n){Ct(n,!0)&&De.apiCall(u.FRIEND,"friend_add",{From_Account:ot.identifier,AddFriendItem:t.AddFriendItem},function(t){var r=ve(t);r.ActionStatus==h.FAIL?n&&n(r):e&&e(r)},n)},_e=function(t,e,n){Ct(n,!0)&&De.apiCall(u.FRIEND,"friend_delete",{From_Account:ot.identifier,To_Account:t.To_Account,DeleteType:t.DeleteType},function(t){var r=ve(t);r.ActionStatus==h.FAIL?n&&n(r):e&&e(r)},n)},be=function(t,e,n){Ct(n,!0)&&(1==t.chatType?De.apiCall(u.DEL_CHAT,"delete",{From_Account:ot.identifier,Type:t.chatType,To_Account:t.To_Account},e,n):De.apiCall(u.DEL_CHAT,"delete",{From_Account:ot.identifier,Type:t.chatType,ToGroupid:t.To_Account},e,n))},Ie=function(t,e,n){Ct(n,!0)&&De.apiCall(u.FRIEND,"pendency_get",{From_Account:ot.identifier,PendencyType:t.PendencyType,StartTime:t.StartTime,MaxLimited:t.MaxLimited,LastSequence:t.LastSequence},e,n)},Me=function(t,e,n){Ct(n,!0)&&De.apiCall(u.FRIEND,"PendencyReport",{From_Account:ot.identifier,LatestPendencyTimeStamp:t.LatestPendencyTimeStamp},e,n)},Se=function(t,e,n){Ct(n,!0)&&De.apiCall(u.FRIEND,"pendency_delete",{From_Account:ot.identifier,PendencyType:t.PendencyType,To_Account:t.To_Account},function(t){var r=ve(t);r.ActionStatus==h.FAIL?n&&n(r):e&&e(r)},n)},Ee=function(t,e,n){Ct(n,!0)&&De.apiCall(u.FRIEND,"friend_response",{From_Account:ot.identifier,ResponseFriendItem:t.ResponseFriendItem},function(t){var r=ve(t);r.ActionStatus==h.FAIL?n&&n(r):e&&e(r)},n)},Ce=function(t,e,n){Ct(n,!0)&&De.apiCall(u.FRIEND,"friend_get_all",{From_Account:ot.identifier,TimeStamp:t.TimeStamp,StartIndex:t.StartIndex,GetCount:t.GetCount,LastStandardSequence:t.LastStandardSequence,TagList:t.TagList},e,n)},we=function(t,e,n){t.To_Account.length>100&&(t.To_Account.length=100,vt.error("获取用户资料人数不能超过100人")),Ct(n,!0)&&De.apiCall(u.PROFILE,"portrait_get",{From_Account:ot.identifier,To_Account:t.To_Account,TagList:t.TagList},function(t){var r=[];if(t.Fail_Account&&t.Fail_Account.length&&(r=t.Fail_Account),t.Invalid_Account&&t.Invalid_Account.length)for(var o in t.Invalid_Account)r.push(t.Invalid_Account[o]);if(r.length)for(var i in t.ActionStatus=h.FAIL,t.ErrorCode=g,t.ErrorInfo="",r){var a=r[i];for(var s in t.UserProfileItem)if(t.UserProfileItem[s].To_Account==a){var u=t.UserProfileItem[s].ResultCode;t.UserProfileItem[s].ResultInfo="["+u+"]"+t.UserProfileItem[s].ResultInfo,t.ErrorInfo+="账号:"+a+","+t.UserProfileItem[s].ResultInfo+"\n";break}}t.ActionStatus==h.FAIL?n&&n(t):e&&e(t)},n)},Ae=function(t,e,n){Ct(n,!0)&&De.apiCall(u.PROFILE,"portrait_set",{From_Account:ot.identifier,ProfileItem:t.ProfileItem},function(n){for(var r in t.ProfileItem){var o=t.ProfileItem[r];if("Tag_Profile_IM_Nick"==o.Tag){ot.identifierNick=o.Value;break}}e&&e(n)},n)},Te=function(t,e,n){Ct(n,!0)&&De.apiCall(u.FRIEND,"black_list_add",{From_Account:ot.identifier,To_Account:t.To_Account},function(t){var r=ve(t);r.ActionStatus==h.FAIL?n&&n(r):e&&e(r)},n)},Oe=function(t,e,n){Ct(n,!0)&&De.apiCall(u.FRIEND,"black_list_delete",{From_Account:ot.identifier,To_Account:t.To_Account},function(t){var r=ve(t);r.ActionStatus==h.FAIL?n&&n(r):e&&e(r)},n)},Pe=function(t,e,n){Ct(n,!0)&&De.apiCall(u.FRIEND,"black_list_get",{From_Account:ot.identifier,StartIndex:t.StartIndex,MaxLimited:t.MaxLimited,LastSequence:t.LastSequence},e,n)},ke=function(t,e,n){Ct(n,!0)&&De.apiCall(u.RECENT_CONTACT,"get",{From_Account:ot.identifier,Count:t.Count},e,n)},xe=function(t,e,n){var r;Ct(n,!0)&&(r=wt()?"pic_up":"pic_up_test",De.apiCall(u.PIC,r,{App_Version:S.APP_VERSION,From_Account:ot.identifier,To_Account:t.To_Account,Seq:t.Seq,Timestamp:t.Timestamp,Random:t.Random,File_Str_Md5:t.File_Str_Md5,File_Size:t.File_Size,File_Type:t.File_Type,Server_Ver:S.SERVER_VERSION,Auth_Key:rt,Busi_Id:t.Busi_Id,PkgFlag:t.PkgFlag,Slice_Offset:t.Slice_Offset,Slice_Size:t.Slice_Size,Slice_Data:t.Slice_Data},e,n))},Fe=function(t,e){Ct(e,!0)&&De.apiCall(u.OPEN_IM,"authkey",{},t,e)},Re=function(t,e,n){Ct(n,!0)&&De.apiCall(u.IM_OPEN_STAT,"web_report",t,e,n)},Ue=function(t,e,n){Ct(n,!0)&&De.apiCall(u.OPEN_IM,"getlongpollingid",{},function(t){e&&e(t)},n)},Ge=function(t,e,n){De.apiCall(u.PIC,"apply_download",t,e,n)};Rt();var De=0==s?new function(){var t=null;this.init=function(e,n,r){e&&(t=e)},this.callBack=function(e){t&&t(e)},this.clear=function(){t=null},this.apiCall=function(t,e,n,r,o,i,a){var s=At(t,e,r,o);0!=s&&St("POST",s,n,i,a,function(i){i=JSON.parse(i);var a=null,u="";"pic_up"==e&&(n.Slice_Data="");var c="\n request url: \n"+s+"\n request body: \n"+JSON.stringify(n)+"\n response: \n"+JSON.stringify(i);i.ActionStatus==h.OK?(vt.info("["+t+"]["+e+"]success: "+c),r&&r(i),a=0,u=""):(a=i.ErrorCode,u=i.ErrorInfo,o&&(i.SrcErrorInfo=i.ErrorInfo,i.ErrorInfo="["+t+"]["+e+"]failed: "+c,"longpolling"==e&&i.ErrorCode==z||vt.error(i.ErrorInfo),o(i))),Ut(e,a,u)},function(t){o&&o(t),Ut(e,t.ErrorCode,t.ErrorInfo)})}}:new function(){var t=null;this.init=function(e,n,r){e&&(t=e)},this.callBack=function(e){t&&t(e)},this.clear=function(){t=null},this.apiCall=function(t,e,n,r,o,i,a){var s=At(t,e,r,o);if(0!=s){var u=Q++,c="jsonpcallback",l="jsonpRequest"+u,f=document.createElement("script"),p=0;window[l]=tt,f.type="text/javascript",s=s+"&"+c+"="+l+"&jsonpbody="+encodeURIComponent(JSON.stringify(n)),f.src=s,f.async=!0,"undefined"!==typeof f.onreadystatechange&&(f.event="onclick",f.htmlFor=f.id="_jsonpRequest_"+u),f.onload=f.onreadystatechange=function(){if(this.readyState&&"complete"!==this.readyState&&"loaded"!==this.readyState||p)return!1;f.onload=f.onreadystatechange=null,f.onclick&&f.onclick();var i=Z,a="\n request url: \n"+s+"\n request body: \n"+JSON.stringify(n)+"\n response: \n"+JSON.stringify(i);i.ActionStatus==h.OK?(vt.info("["+t+"]["+e+"]success: "+a),r&&r(i)):(i.ErrorInfo="["+t+"]["+e+"]failed "+a,"longpolling"!=e||i.ErrorCode!=z?vt.error(i.ErrorInfo):vt.warn("["+t+"]["+e+"]success: "+a),o&&o(i)),Z=void 0,document.body.removeChild(f),p=1},document.body.appendChild(f)}}},Ne=function t(e,n,r,o,i,a){this._impl={skey:t.skey(e,n),type:e,id:n,name:r,icon:o,unread:0,isAutoRead:!1,time:i>=0?i:0,curMaxMsgSeq:a>=0?a:0,msgs:[],isFinished:1}};Ne.skey=function(t,e){return t+e},Ne.prototype.type=function(){return this._impl.type},Ne.prototype.id=function(){return this._impl.id},Ne.prototype.name=function(){return this._impl.name},Ne.prototype.icon=function(){return this._impl.icon},Ne.prototype.unread=function(t){if("undefined"===typeof t)return this._impl.unread;this._impl.unread=t},Ne.prototype.isFinished=function(t){if("undefined"===typeof t)return this._impl.isFinished;this._impl.isFinished=t},Ne.prototype.time=function(){return this._impl.time},Ne.prototype.curMaxMsgSeq=function(t){if("undefined"===typeof t)return this._impl.curMaxMsgSeq;this._impl.curMaxMsgSeq=t},Ne.prototype.msgCount=function(){return this._impl.msgs.length},Ne.prototype.msg=function(t){return this._impl.msgs[t]},Ne.prototype.msgs=function(){return this._impl.msgs},Ne.prototype._impl_addMsg=function(t){this._impl.msgs.push(t),t.time>this._impl.time&&(this._impl.time=t.time),t.seq>this._impl.curMaxMsgSeq&&(this._impl.curMaxMsgSeq=t.seq),t.isSend||this._impl.isAutoRead||this._impl.unread++};var Le=function(t,e){this.toAccount=t,this.lastedMsgTime=e},je=function(t,e,n,r,o,i,a,s){this.sess=t,this.subType=a>=0?a:0,this.fromAccount=i,this.fromAccountNick=s||i,this.isSend=Boolean(e),this.seq=n>=0?n:_t(),this.random=r>=0?r:bt(),this.time=o>=0?o:yt(),this.elems=[]};je.prototype.getSession=function(){return this.sess},je.prototype.getType=function(){return this.subType},je.prototype.getSubType=function(){return this.subType},je.prototype.getFromAccount=function(){return this.fromAccount},je.prototype.getFromAccountNick=function(){return this.fromAccountNick},je.prototype.getIsSend=function(){return this.isSend},je.prototype.getSeq=function(){return this.seq},je.prototype.getTime=function(){return this.time},je.prototype.getRandom=function(){return this.random},je.prototype.getElems=function(){return this.elems},je.prototype.addText=function(t){this.addElem(new e.Msg.Elem(m.TEXT,t))},je.prototype.addFace=function(t){this.addElem(new e.Msg.Elem(m.FACE,t))},je.prototype.addImage=function(t){this.addElem(new e.Msg.Elem(m.IMAGE,t))},je.prototype.addLocation=function(t){this.addElem(new e.Msg.Elem(m.LOCATION,t))},je.prototype.addFile=function(t){this.addElem(new e.Msg.Elem(m.FILE,t))},je.prototype.addCustom=function(t){this.addElem(new e.Msg.Elem(m.CUSTOM,t))},je.prototype.addElem=function(t){this.elems.push(t)},je.prototype.toHtml=function(){var t="";for(var e in this.elems){var n=this.elems[e];t+=n.toHtml()}return t},je.Elem=function(t,e){this.type=t,this.content=e},je.Elem.prototype.getType=function(){return this.type},je.Elem.prototype.getContent=function(){return this.content},je.Elem.prototype.toHtml=function(){var t;return t=this.content.toHtml(),t},je.Elem.Text=function(t){this.text=mt.xssFilter(t)},je.Elem.Text.prototype.getText=function(){return this.text},je.Elem.Text.prototype.toHtml=function(){return this.text},je.Elem.Face=function(t,e){this.index=t,this.data=e},je.Elem.Face.prototype.getIndex=function(){return this.index},je.Elem.Face.prototype.getData=function(){return this.data},je.Elem.Face.prototype.toHtml=function(){var t=null,e=ht[this.data],n=gt[e];return n&&n[1]&&(t=n[1]),t?"<img src='"+t+"'/>":this.data},je.Elem.Location=function(t,e,n){this.latitude=e,this.longitude=t,this.desc=n},je.Elem.Location.prototype.getLatitude=function(){return this.latitude},je.Elem.Location.prototype.getLongitude=function(){return this.longitude},je.Elem.Location.prototype.getDesc=function(){return this.desc},je.Elem.Location.prototype.toHtml=function(){return"经度="+this.longitude+",纬度="+this.latitude+",描述="+this.desc},je.Elem.Images=function(t,e){this.UUID=t,"number"!==typeof e&&(e=parseInt(y[e]||y["UNKNOWN"],10)),this.ImageFormat=e,this.ImageInfoArray=[]},je.Elem.Images.prototype.addImage=function(t){this.ImageInfoArray.push(t)},je.Elem.Images.prototype.toHtml=function(){var t=this.getImage(v.SMALL),e=this.getImage(v.LARGE),n=this.getImage(v.ORIGIN);return e||(e=t),n||(n=t),"<img src='"+t.getUrl()+"#"+e.getUrl()+"#"+n.getUrl()+"' style='CURSOR: hand' id='"+this.getImageId()+"' bigImgUrl='"+e.getUrl()+"' onclick='imageClick(this)' />"},je.Elem.Images.prototype.getImageId=function(){return this.UUID},je.Elem.Images.prototype.getImageFormat=function(){return this.ImageFormat},je.Elem.Images.prototype.getImage=function(t){for(var e in this.ImageInfoArray)if(this.ImageInfoArray[e].getType()==t)return this.ImageInfoArray[e];return null},je.Elem.Images.Image=function(t,e,n,r,o){this.type=t,this.size=e,this.width=n,this.height=r,this.url=o},je.Elem.Images.Image.prototype.getType=function(){return this.type},je.Elem.Images.Image.prototype.getSize=function(){return this.size},je.Elem.Images.Image.prototype.getWidth=function(){return this.width},je.Elem.Images.Image.prototype.getHeight=function(){return this.height},je.Elem.Images.Image.prototype.getUrl=function(){return this.url},je.Elem.Sound=function(t,e,n,r,o,i,a){this.uuid=t,this.second=e,this.size=n,this.senderId=r,this.receiverId=o,this.downFlag=i,this.busiId=a==f.C2C?2:1,void 0!==i&&void 0!==busiId?Pt(t,r,e,i,o,this.busiId,M.SOUND):this.downUrl=Tt(t,r,e)},je.Elem.Sound.prototype.getUUID=function(){return this.uuid},je.Elem.Sound.prototype.getSecond=function(){return this.second},je.Elem.Sound.prototype.getSize=function(){return this.size},je.Elem.Sound.prototype.getSenderId=function(){return this.senderId},je.Elem.Sound.prototype.getDownUrl=function(){return this.downUrl},je.Elem.Sound.prototype.toHtml=function(){return"ie"==a.type&&parseInt(a.ver)<=8?"[这是一条语音消息]demo暂不支持ie8(含)以下浏览器播放语音,语音URL:"+this.downUrl:'<audio id="uuid_'+this.uuid+'" src="'+this.downUrl+'" controls="controls" onplay="onChangePlayAudio(this)" preload="none"></audio>'},je.Elem.File=function(t,e,n,r,o,i,a){this.uuid=t,this.name=e,this.size=n,this.senderId=r,this.receiverId=o,this.downFlag=i,this.busiId=a==f.C2C?2:1,void 0!==i&&void 0!==busiId?Pt(t,r,e,i,o,this.busiId,M.FILE):this.downUrl=Ot(t,r,e)},je.Elem.File.prototype.getUUID=function(){return this.uuid},je.Elem.File.prototype.getName=function(){return this.name},je.Elem.File.prototype.getSize=function(){return this.size},je.Elem.File.prototype.getSenderId=function(){return this.senderId},je.Elem.File.prototype.getDownUrl=function(){return this.downUrl},je.Elem.File.prototype.getDownFlag=function(){return this.downFlag},je.Elem.File.prototype.toHtml=function(){var t,e;return t=this.size,e="Byte",this.size>=1024&&(t=Math.round(this.size/1024),e="KB"),'<a href="javascript" onclick="webim.onDownFile("'+this.uuid+'")" title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;'+this.name+"("+t+e+")</i></a>"},je.Elem.GroupTip=function(t,e,n,r,o){this.opType=t,this.opUserId=e,this.groupId=n,this.groupName=r,this.userIdList=o||[],this.groupInfoList=[],this.memberInfoList=[],this.groupMemberNum=null},je.Elem.GroupTip.prototype.addGroupInfo=function(t){this.groupInfoList.push(t)},je.Elem.GroupTip.prototype.addMemberInfo=function(t){this.memberInfoList.push(t)},je.Elem.GroupTip.prototype.getOpType=function(){return this.opType},je.Elem.GroupTip.prototype.getOpUserId=function(){return this.opUserId},je.Elem.GroupTip.prototype.getGroupId=function(){return this.groupId},je.Elem.GroupTip.prototype.getGroupName=function(){return this.groupName},je.Elem.GroupTip.prototype.getUserIdList=function(){return this.userIdList},je.Elem.GroupTip.prototype.getGroupInfoList=function(){return this.groupInfoList},je.Elem.GroupTip.prototype.getMemberInfoList=function(){return this.memberInfoList},je.Elem.GroupTip.prototype.getGroupMemberNum=function(){return this.groupMemberNum},je.Elem.GroupTip.prototype.setGroupMemberNum=function(t){return this.groupMemberNum=t},je.Elem.GroupTip.prototype.toHtml=function(){var t="[群提示消息]",e=L-1;switch(this.opType){case O.JOIN:for(var n in t+=this.opUserId+"邀请了",this.userIdList)if(t+=this.userIdList[n]+",",this.userIdList.length>L&&n==e){t+="等"+this.userIdList.length+"人";break}t+="加入该群";break;case O.QUIT:t+=this.opUserId+"主动退出该群";break;case O.KICK:for(var n in t+=this.opUserId+"将",this.userIdList)if(t+=this.userIdList[n]+",",this.userIdList.length>L&&n==e){t+="等"+this.userIdList.length+"人";break}t+="踢出该群";break;case O.SET_ADMIN:for(var n in t+=this.opUserId+"将",this.userIdList)if(t+=this.userIdList[n]+",",this.userIdList.length>L&&n==e){t+="等"+this.userIdList.length+"人";break}t+="设为管理员";break;case O.CANCEL_ADMIN:for(var n in t+=this.opUserId+"取消",this.userIdList)if(t+=this.userIdList[n]+",",this.userIdList.length>L&&n==e){t+="等"+this.userIdList.length+"人";break}t+="的管理员资格";break;case O.MODIFY_GROUP_INFO:for(var n in t+=this.opUserId+"修改了群资料：",this.groupInfoList){var r=this.groupInfoList[n].getType(),o=this.groupInfoList[n].getValue();switch(r){case P.FACE_URL:t+="群头像为"+o+"; ";break;case P.NAME:t+="群名称为"+o+"; ";break;case P.OWNER:t+="群主为"+o+"; ";break;case P.NOTIFICATION:t+="群公告为"+o+"; ";break;case P.INTRODUCTION:t+="群简介为"+o+"; ";break;default:t+="未知信息为:type="+r+",value="+o+"; ";break}}break;case O.MODIFY_MEMBER_INFO:for(var n in t+=this.opUserId+"修改了群成员资料:",this.memberInfoList){var i=this.memberInfoList[n].getUserId(),a=this.memberInfoList[n].getShutupTime();if(t+=i+": ",t+=null!=a&&void 0!==a?0==a?"取消禁言; ":"禁言"+a+"秒; ":" shutupTime为空",this.memberInfoList.length>L&&n==e){t+="等"+this.memberInfoList.length+"人";break}}break;case O.READED:Log.info("消息已读同步");break;default:t+="未知群提示消息类型：type="+this.opType;break}return t},je.Elem.GroupTip.GroupInfo=function(t,e){this.type=t,this.value=e},je.Elem.GroupTip.GroupInfo.prototype.getType=function(){return this.type},je.Elem.GroupTip.GroupInfo.prototype.getValue=function(){return this.value},je.Elem.GroupTip.MemberInfo=function(t,e){this.userId=t,this.shutupTime=e},je.Elem.GroupTip.MemberInfo.prototype.getUserId=function(){return this.userId},je.Elem.GroupTip.MemberInfo.prototype.getShutupTime=function(){return this.shutupTime},je.Elem.Custom=function(t,e,n){this.data=t,this.desc=e,this.ext=n},je.Elem.Custom.prototype.getData=function(){return this.data},je.Elem.Custom.prototype.getDesc=function(){return this.desc},je.Elem.Custom.prototype.getExt=function(){return this.ext},je.Elem.Custom.prototype.toHtml=function(){return this.data};var $e=new function(){var e={},n=[];t={},this.cookie="",this.syncFlag=0;var r=function(t){for(var n in e)t(e[n])},o=function(e){var n=!1,r=e.sess._impl.skey,o=e.isSend+e.seq+e.random,i=t[r]&&t[r][o];return i&&(n=!0),t[r]?t[r][o]={time:e.time}:(t[r]={},t[r][o]={time:e.time}),n};this.sessMap=function(){return e},this.sessCount=function(){return n.length},this.sessByTypeId=function(t,n){var r=Ne.skey(t,n);return void 0===r||null==r?null:e[r]},this.delSessByTypeId=function(n,r){var o=Ne.skey(n,r);return void 0!==o&&null!=o&&(e[o]&&(delete e[o],delete t[o]),!0)},this.resetCookieAndSyncFlag=function(){this.cookie="",this.syncFlag=0},this.setAutoRead=function(t,e,n){if(n&&r(function(t){t._impl.isAutoRead=!1}),t&&(t._impl.isAutoRead=e,e))if(t._impl.unread=0,t._impl.type==f.C2C){var o=[];o.push(new Le(t._impl.id,t._impl.time)),qt($e.cookie,o,function(t){vt.info("[setAutoRead]: c2CMsgReaded success")},function(t){vt.error("[setAutoRead}: c2CMsgReaded failed:"+t.ErrorInfo)})}else if(t._impl.type==f.GROUP){var i={GroupId:t._impl.id,MsgReadedSeq:t._impl.curMaxMsgSeq};me(i,function(t){vt.info("groupMsgReaded success")},function(t){vt.error("groupMsgReaded failed:"+t.ErrorInfo)})}},this.c2CMsgReaded=function(t,e,n){var r=[];r.push(new Le(t.To_Account,t.LastedMsgTime)),qt($e.cookie,r,function(t){e&&(vt.info("c2CMsgReaded success"),e(t))},function(t){n&&(vt.error("c2CMsgReaded failed:"+t.ErrorInfo),n(t))})},this.addSession=function(t){e[t._impl.skey]=t},this.delSession=function(t){delete e[t._impl.skey]},this.addMsg=function(t){if(o(t))return!1;var n=t.sess;return e[n._impl.skey]||this.addSession(n),n._impl_addMsg(t),!0},this.updateTimeline=function(){var t=new Array;r(function(e){t.push(e)}),t.sort(function(t,e){return e.time-t.time}),n=t}},qe=new function(){var t=null,e=null,n={1:null,2:null,3:null,4:null,5:null,6:null,7:null,8:null,9:null,10:null,11:null,15:null,255:null,12:null},r={1:null,2:null,3:null,4:null,5:null,6:null,7:null,8:null},o={1:null},i=!1,a=0,s=0,u=null,c=!1,l=0,p=90,d=null,g={},v={92:null,96:null},y=null,_=0,b={},I={};this.setLongPollingOn=function(t){i=t},this.getLongPollingOn=function(){return i},this.resetLongPollingInfo=function(){i=!1,a=0,s=0},this.setBigGroupLongPollingOn=function(t){c=t},this.setBigGroupLongPollingKey=function(t){d=t},this.resetBigGroupLongPollingInfo=function(){c=!1,l=0,d=null,g={}},this.setBigGroupLongPollingMsgMap=function(t,e){var n=g[t];n?(n=parseInt(n)+e,g[t]=n):g[t]=e},this.clear=function(){e=null,n={1:null,2:null,3:null,4:null,5:null,6:null,7:null,8:null,9:null,10:null,11:null,15:null,255:null,12:null},r={1:null,2:null,3:null,4:null,5:null,6:null,7:null,8:null},o={1:null},t=null,i=!1,a=0,s=0,u=null,c=!1,l=0,d=null,g={},I={},nt=[],rt=null,null};var M=function(t,e){Fe(function(e){nt=e.IpList,rt=e.AuthKey,e.ExpireTime,t&&t(e)},function(t){vt.error("initIpAndAuthkey failed:"+t.ErrorInfo),e&&e(t)})},S=function(t,e){var n={Member_Account:ot.identifier,Limit:1e3,Offset:0,GroupBaseInfoFilter:["NextMsgSeq"]};fe(n,function(e){if(!e.GroupIdList||0==e.GroupIdList.length)return vt.info("initMyGroupMaxSeqs: 目前还没有加入任何群组"),void(t&&t(e));for(var n=0;n<e.GroupIdList.length;n++){var r=e.GroupIdList[n].GroupId,o=e.GroupIdList[n].NextMsgSeq-1;b[r]=o}t&&t(e)},function(t){vt.error("initMyGroupMaxSeqs failed:"+t.ErrorInfo),e&&e(t)})},C=function(t,e,n){_++;var r={GroupId:t,ReqMsgSeq:e,ReqMsgNumber:n};vt.warn("第"+_+"次补齐群消息,参数="+JSON.stringify(r)),qe.syncGroupMsgs(r)},R=function(t,e){var n=b[t];n?e>n&&(b[t]=e):b[t]=e},G=function(t,e){for(var n in t){var r=t[n];if(r.From_Account){var o=ut(r,!1,!0);o&&e.push(o),R(r.ToGroupId,r.MsgSeq)}}return e},N=function(e,n){var r={},o=[],i=99999999,a=-1;for(var u in n){var c=r[n[u].ToGroupId];c||(c=r[n[u].ToGroupId]={min:i,max:a,msgs:[]}),n[u].NoticeSeq>s&&(vt.warn("noticeSeq="+s+",msgNoticeSeq="+n[u].NoticeSeq),s=n[u].NoticeSeq),n[u].Event=e,r[n[u].ToGroupId].msgs.push(n[u]),n[u].MsgSeq<c.min&&(r[n[u].ToGroupId].min=n[u].MsgSeq),n[u].MsgSeq>c.max&&(r[n[u].ToGroupId].max=n[u].MsgSeq)}for(var l in r){var f=r[l].max-r[l].min+1,p=b[l];p?r[l].min-p>1||r[l].msgs.length<f?(vt.warn("发起一次补齐群消息请求,curMaxMsgSeq="+p+", minMsgSeq="+r[l].min+", maxMsgSeq="+r[l].max+", msgs.length="+r[l].msgs.length+", tempCount="+f),C(l,r[l].max,r[l].max-p),R(l,r[l].max)):o=G(r[l].msgs,o):(vt.warn("不存在该群的最大消息seq，群id="+l),r[l].msgs.length<f?(vt.warn("发起一次补齐群消息请求,minMsgSeq="+r[l].min+", maxMsgSeq="+r[l].max+", msgs.length="+r[l].msgs.length+", tempCount="+f),C(l,r[l].max,f),R(l,r[l].max)):o=G(r[l].msgs,o))}o.length&&$e.updateTimeline(),t&&o.length&&t(o)},L=function(e,n){var r={},o=[],i=99999999,a=-1;for(var u in n){var c=r[n[u].ToGroupId];c||(c=r[n[u].ToGroupId]={min:i,max:a,msgs:[]}),n[u].NoticeSeq>s&&(vt.warn("noticeSeq="+s+",msgNoticeSeq="+n[u].NoticeSeq),s=n[u].NoticeSeq),n[u].Event=e,r[n[u].ToGroupId].msgs.push(n[u]),n[u].MsgSeq<c.min&&(r[n[u].ToGroupId].min=n[u].MsgSeq),n[u].MsgSeq>c.max&&(r[n[u].ToGroupId].max=n[u].MsgSeq)}for(var l in r){var f=r[l].max-r[l].min+1,p=b[l];p?r[l].min-p>1||r[l].msgs.length<f?(vt.warn("发起一次补齐群消息请求,curMaxMsgSeq="+p+", minMsgSeq="+r[l].min+", maxMsgSeq="+r[l].max+", msgs.length="+r[l].msgs.length+", tempCount="+f),C(l,r[l].max,r[l].max-p),R(l,r[l].max)):o=G(r[l].msgs,o):(vt.warn("不存在该群的最大消息seq，群id="+l),r[l].msgs.length<f?(vt.warn("发起一次补齐群消息请求,minMsgSeq="+r[l].min+", maxMsgSeq="+r[l].max+", msgs.length="+r[l].msgs.length+", tempCount="+f),C(l,r[l].max,f),R(l,r[l].max)):o=G(r[l].msgs,o))}o.length&&$e.updateTimeline(),t&&o.length&&t(o)},Y=function(t,e){for(var r in t){var o=t[r],i=o.MsgBody,a=i.ReportType;0==e&&o.NoticeSeq&&o.NoticeSeq>s&&(s=o.NoticeSeq);o.GroupInfo.To_Account;if(e){var u=o.ToGroupId+"_"+a+"_"+i.Operator_Account,c=I[u];if(c){vt.warn("收到重复的群系统消息：key="+u);continue}I[u]=!0}var l={SrcFlag:0,ReportType:a,GroupId:o.ToGroupId,GroupName:o.GroupInfo.GroupName,Operator_Account:i.Operator_Account,MsgTime:o.MsgTimeStamp,groupReportTypeMsg:i};switch(a){case k.JOIN_GROUP_REQUEST:l["RemarkInfo"]=i.RemarkInfo,l["MsgKey"]=i.MsgKey,l["Authentication"]=i.Authentication,l["UserDefinedField"]=o.UserDefinedField,l["From_Account"]=o.From_Account,l["MsgSeq"]=o.ClientSeq,l["MsgRandom"]=o.MsgRandom;break;case k.JOIN_GROUP_ACCEPT:case k.JOIN_GROUP_REFUSE:l["RemarkInfo"]=i.RemarkInfo;break;case k.KICK:case k.DESTORY:case k.CREATE:case k.INVITED_JOIN_GROUP_REQUEST:case k.INVITED_JOIN_GROUP_REQUEST_AGREE:case k.QUIT:case k.SET_ADMIN:case k.CANCEL_ADMIN:case k.REVOKE:break;case k.READED:break;case k.CUSTOM:l["MsgSeq"]=o.MsgSeq,l["UserDefinedField"]=i.UserDefinedField;break;default:vt.error("未知群系统消息类型：reportType="+a);break}if(e)a==k.JOIN_GROUP_REQUEST&&n[a]&&n[a](l);else if(n[a])if(a==k.READED)for(var f=l.groupReportTypeMsg.GroupReadInfoArray,p=0,d=f.length;p<d;p++){var h=f[p];n[a](h)}else n[a](l)}},X=function(t,e){var n,o,i;for(var a in t){switch(n=t[a],o=n.PushType,0==e&&n.NoticeSeq&&n.NoticeSeq>s&&(s=n.NoticeSeq),i={Type:o},o){case x.FRIEND_ADD:i["Accounts"]=n.FriendAdd_Account;break;case x.FRIEND_DELETE:i["Accounts"]=n.FriendDel_Account;break;case x.PENDENCY_ADD:i["PendencyList"]=n.PendencyAdd;break;case x.PENDENCY_DELETE:i["Accounts"]=n.FrienPencydDel_Account;break;case x.BLACK_LIST_ADD:i["Accounts"]=n.BlackListAdd_Account;break;case x.BLACK_LIST_DELETE:i["Accounts"]=n.BlackListDel_Account;break;default:vt.error("未知好友系统通知类型：friendNotice="+JSON.stringify(n));break}e?o==x.PENDENCY_ADD&&r[o]&&r[o](i):r[o]&&r[o](i)}},Q=function(t,e){var n,r,i;for(var a in t){switch(n=t[a],r=n.PushType,0==e&&n.NoticeSeq&&n.NoticeSeq>s&&(s=n.NoticeSeq),i={Type:r},r){case F.PROFILE_MODIFY:i["Profile_Account"]=n.Profile_Account,i["ProfileList"]=n.ProfileList;break;default:vt.error("未知资料系统通知类型：profileNotice="+JSON.stringify(n));break}e?r==F.PROFILE_MODIFY&&o[r]&&o[r](i):o[r]&&o[r](i)}},Z=function(t){var e=t.MsgBody,r=e.ReportType,o=(t.GroupInfo.To_Account,{SrcFlag:1,ReportType:r,GroupId:t.ToGroupId,GroupName:t.GroupInfo.GroupName,Operator_Account:e.Operator_Account,MsgTime:t.MsgTimeStamp});switch(r){case k.JOIN_GROUP_REQUEST:o["RemarkInfo"]=e.RemarkInfo,o["MsgKey"]=e.MsgKey,o["Authentication"]=e.Authentication,o["UserDefinedField"]=t.UserDefinedField,o["From_Account"]=t.From_Account,o["MsgSeq"]=t.ClientSeq,o["MsgRandom"]=t.MsgRandom;break;case k.JOIN_GROUP_ACCEPT:case k.JOIN_GROUP_REFUSE:o["RemarkInfo"]=e.RemarkInfo;break;case k.KICK:case k.DESTORY:case k.CREATE:case k.INVITED_JOIN_GROUP_REQUEST:case k.INVITED_JOIN_GROUP_REQUEST_AGREE:case k.QUIT:case k.SET_ADMIN:case k.CANCEL_ADMIN:case k.REVOKE:break;case k.CUSTOM:o["MsgSeq"]=t.MsgSeq,o["UserDefinedField"]=e.UserDefinedField;break;default:vt.error("未知群系统消息类型：reportType="+r);break}n[r]&&n[r](o)},tt=function(t){for(var e=0,n=t.length;e<n;e++)et(t[e])},et=function(t){var e=t.SubMsgType;switch(e){case w.READED:if(t.ReadC2cMsgNotify.UinPairReadArray&&v[e])for(var n=0,r=t.ReadC2cMsgNotify.UinPairReadArray.length;n<r;n++){var o=t.ReadC2cMsgNotify.UinPairReadArray[n];v[e](o)}break;case w.KICKEDOUT:v[e]&&v[e]();break;default:vt.error("未知C2c系统消息：subType="+e);break}};this.longPolling=function(t,e){var n={Timeout:B/1e3,Cookie:{NotifySeq:a,NoticeSeq:s}};function r(){Lt(n,function(t){for(var e in t.EventArray){var n=t.EventArray[e];switch(n.Event){case E.C2C:a=n.NotifySeq,vt.warn("longpolling: received new c2c msg"),qe.syncMsgs();break;case E.GROUP_COMMON:vt.warn("longpolling: received new group msgs"),L(n.Event,n.GroupMsgArray);break;case E.GROUP_TIP:vt.warn("longpolling: received new group tips"),L(n.Event,n.GroupTips);break;case E.GROUP_TIP2:vt.warn("longpolling: received new group tips"),L(n.Event,n.GroupTips);break;case E.GROUP_SYSTEM:vt.warn("longpolling: received new group system msgs"),Y(n.GroupTips,!1);break;case E.FRIEND_NOTICE:vt.warn("longpolling: received new friend system notice"),X(n.FriendListMod,!1);break;case E.PROFILE_NOTICE:vt.warn("longpolling: received new profile system notice"),Q(n.ProfileDataMod,!1);break;case E.C2C_COMMON:s=n.C2cMsgArray[0].NoticeSeq,vt.warn("longpolling: received new c2c_common msg",s),N(n.Event,n.C2cMsgArray);break;case E.C2C_EVENT:s=n.C2cNotifyMsgArray[0].NoticeSeq,vt.warn("longpolling: received new c2c_event msg"),tt(n.C2cNotifyMsgArray);break;default:vt.error("longpolling收到未知新消息类型: Event="+n.Event);break}}var r={ActionStatus:h.OK,ErrorCode:0};it(r)},function(t){it(t),e&&e(t)})}K?(n.Cookie.LongPollingId=K,r()):Ue({},function(t){K=n.Cookie.LongPollingId=t.LongPollingId,B=t.Timeout>60?B:1e3*t.Timeout,r()})},this.bigGroupLongPolling=function(t,e){var n={StartSeq:l,HoldTime:p,Key:d};jt(n,function(e){var n=[];if(l=e.NextSeq,p=e.HoldTime,d=e.Key,e.RspMsgList&&e.RspMsgList.length>0){for(var r,o,i,a=0,s=e.RspMsgList.length-1;s>=0;s--)if(r=e.RspMsgList[s],!r.IsPlaceMsg&&r.From_Account&&r.MsgBody&&0!=r.MsgBody.length)switch(o=r.Event,o){case E.GROUP_COMMON:vt.info("bigGroupLongPolling: return new group msg"),i=ut(r,!1,!1),i&&n.push(i),a+=1;break;case E.GROUP_TIP:case E.GROUP_TIP2:vt.info("bigGroupLongPolling: return new group tip"),i=ut(r,!1,!1),i&&n.push(i);break;case E.GROUP_SYSTEM:vt.info("bigGroupLongPolling: new group system msg"),Z(r);break;default:vt.error("bigGroupLongPolling收到未知新消息类型: Event="+o);break}a>0&&(qe.setBigGroupLongPollingMsgMap(r.ToGroupId,a),vt.warn("current bigGroupLongPollingMsgMap: "+JSON.stringify(g)))}W=0;var f={ActionStatus:h.OK,ErrorCode:U.ON,ErrorInfo:"connection is ok..."};De.callBack(f),t?t(n):u&&u(n),c&&qe.bigGroupLongPolling()},function(t){if(t.ErrorCode!=z&&(vt.error(t.ErrorInfo),W++),t.ErrorCode==V&&(vt.error("多实例登录，被kick"),y&&y()),W<J)c&&qe.bigGroupLongPolling();else{var n={ActionStatus:h.FAIL,ErrorCode:U.OFF,ErrorInfo:"connection is off"};De.callBack(n)}e&&e(t)},1e3*p)};var it=function(t){if(0==t.ErrorCode||t.ErrorCode==z){var e;q=0,$=!1;var n=!1;switch(j){case U.INIT:n=!0,j=U.ON,e="create connection successfully(INIT->ON)";break;case U.ON:e="connection is on...(ON->ON)";break;case U.RECONNECT:j=U.ON,e="connection is on...(RECONNECT->ON)";break;case U.OFF:n=!0,j=U.RECONNECT,e="reconnect successfully(OFF->RECONNECT)";break}var r={ActionStatus:h.OK,ErrorCode:j,ErrorInfo:e};n&&De.callBack(r),i&&qe.longPolling()}else if(t.ErrorCode==V)vt.error("多实例登录，被kick"),y&&y();else if(q++,vt.warn("longPolling接口第"+q+"次报错: "+t.ErrorInfo),q<=J)setTimeout(at,100);else{j=U.OFF;var o={ActionStatus:h.FAIL,ErrorCode:U.OFF,ErrorInfo:"connection is off"};0==$&&De.callBack(o),$=!0,vt.warn(H+"毫秒之后,SDK会发起新的longPolling请求..."),setTimeout(at,H)}},at=(N=function(e,n){var r=[],o=[];for(var i in o=n,o){var a,s,u,c=o[i];c.From_Account==ot.identifier?(a=!0,s=c.To_Account,u=""):(a=!1,s=c.From_Account,u="");var l=$e.sessByTypeId(f.C2C,s);l||(l=new Ne(f.C2C,s,s,u,0,0));var p=new je(l,a,c.MsgSeq,c.MsgRandom,c.MsgTimeStamp,c.From_Account),d=null,h=null,g=null;for(var v in c.MsgBody){switch(d=c.MsgBody[v],g=d.MsgType,g){case m.TEXT:h=new je.Elem.Text(d.MsgContent.Text);break;case m.FACE:h=new je.Elem.Face(d.MsgContent.Index,d.MsgContent.Data);break;case m.IMAGE:for(var y in h=new je.Elem.Images(d.MsgContent.UUID,d.MsgContent.ImageFormat||""),d.MsgContent.ImageInfoArray){var _=d.MsgContent.ImageInfoArray[y];h.addImage(new je.Elem.Images.Image(_.Type,_.Size,_.Width,_.Height,_.URL))}break;case m.SOUND:d.MsgContent?h=new je.Elem.Sound(d.MsgContent.UUID,d.MsgContent.Second,d.MsgContent.Size,c.From_Account,c.To_Account,d.MsgContent.Download_Flag,f.C2C):(g=m.TEXT,h=new je.Elem.Text("[语音消息]下载地址解析出错"));break;case m.LOCATION:h=new je.Elem.Location(d.MsgContent.Longitude,d.MsgContent.Latitude,d.MsgContent.Desc);break;case m.FILE:case m.FILE+" ":g=m.FILE,d.MsgContent?h=new je.Elem.File(d.MsgContent.UUID,d.MsgContent.FileName,d.MsgContent.FileSize,c.From_Account,c.To_Account,d.MsgContent.Download_Flag,f.C2C):(g=m.TEXT,h=new je.Elem.Text("[文件消息下载地址解析出错]"));break;case m.CUSTOM:try{var b=JSON.parse(d.MsgContent.Data);if(b&&b.userAction&&b.userAction==D.ING)continue}catch(I){}g=m.CUSTOM,h=new je.Elem.Custom(d.MsgContent.Data,d.MsgContent.Desc,d.MsgContent.Ext);break;default:g=m.TEXT,h=new je.Elem.Text("web端暂不支持"+d.MsgType+"消息");break}p.elems.push(new je.Elem(g,h))}p.elems.length>0&&$e.addMsg(p)&&r.push(p)}r.length>0&&$e.updateTimeline(),r.length>0&&t&&t(r)},function(){i&&qe.longPolling()}),st=function(t){for(var e in t){var n=t[e];switch(Y(n.GroupTips,!0),n.Event){case E.GROUP_SYSTEM:vt.warn("handlerApplyJoinGroupSystemMsgs： handler new group system msg"),Y(n.GroupTips,!0);break;default:vt.error("syncMsgs收到未知的群系统消息类型: Event="+n.Event);break}}};this.syncMsgs=function(e,n){var r=[],o=[];$t($e.cookie,$e.syncFlag,function(n){for(var i in 2==n.SyncFlag&&($e.syncFlag=0),o=n.MsgList,$e.cookie=n.Cookie,o){var a,s,u,c=o[i];c.From_Account==ot.identifier?(a=!0,s=c.To_Account,u=""):(a=!1,s=c.From_Account,u="");var l=$e.sessByTypeId(f.C2C,s);l||(l=new Ne(f.C2C,s,s,u,0,0));var p=new je(l,a,c.MsgSeq,c.MsgRandom,c.MsgTimeStamp,c.From_Account),d=null,h=null,g=null;for(var v in c.MsgBody){switch(d=c.MsgBody[v],g=d.MsgType,g){case m.TEXT:h=new je.Elem.Text(d.MsgContent.Text);break;case m.FACE:h=new je.Elem.Face(d.MsgContent.Index,d.MsgContent.Data);break;case m.IMAGE:for(var y in h=new je.Elem.Images(d.MsgContent.UUID,d.MsgContent.ImageFormat),d.MsgContent.ImageInfoArray){var _=d.MsgContent.ImageInfoArray[y];h.addImage(new je.Elem.Images.Image(_.Type,_.Size,_.Width,_.Height,_.URL))}break;case m.SOUND:d.MsgContent?h=new je.Elem.Sound(d.MsgContent.UUID,d.MsgContent.Second,d.MsgContent.Size,c.From_Account,c.To_Account,d.MsgContent.Download_Flag,f.C2C):(g=m.TEXT,h=new je.Elem.Text("[语音消息]下载地址解析出错"));break;case m.LOCATION:h=new je.Elem.Location(d.MsgContent.Longitude,d.MsgContent.Latitude,d.MsgContent.Desc);break;case m.FILE:case m.FILE+" ":g=m.FILE,d.MsgContent?h=new je.Elem.File(d.MsgContent.UUID,d.MsgContent.FileName,d.MsgContent.FileSize,c.From_Account,c.To_Account,d.MsgContent.Download_Flag,f.C2C):(g=m.TEXT,h=new je.Elem.Text("[文件消息下载地址解析出错]"));break;case m.CUSTOM:try{var b=JSON.parse(d.MsgContent.Data);if(b&&b.userAction&&b.userAction==D.ING)continue}catch(I){}g=m.CUSTOM,h=new je.Elem.Custom(d.MsgContent.Data,d.MsgContent.Desc,d.MsgContent.Ext);break;default:g=m.TEXT,h=new je.Elem.Text("web端暂不支持"+d.MsgType+"消息");break}p.elems.push(new je.Elem(g,h))}p.elems.length>0&&$e.addMsg(p)&&r.push(p)}st(n.EventArray),r.length>0&&$e.updateTimeline(),e?e(r):r.length>0&&t&&t(r)},function(t){vt.error("getMsgs failed:"+t.ErrorInfo),n&&n(t)})},this.getC2CHistoryMsgs=function(t,e,n){if(t.Peer_Account||!n)if(t.MaxCnt||(t.MaxCnt=15),t.MaxCnt<=0&&n)n(mt.getReturnError("MaxCnt should be greater than 0",-14));else{if(t.MaxCnt>15)return n?void n(mt.getReturnError("MaxCnt can not be greater than 15",-15)):void 0;null!=t.MsgKey&&void 0!==t.MsgKey||(t.MsgKey="");var r={Peer_Account:t.Peer_Account,MaxCnt:t.MaxCnt,LastMsgTime:t.LastMsgTime,MsgKey:t.MsgKey};Ht(r,function(n){var r=[],o=[];o=n.MsgList;var i=$e.sessByTypeId(f.C2C,t.Peer_Account);for(var a in i||(i=new Ne(f.C2C,t.Peer_Account,t.Peer_Account,"",0,0)),o){var s,u=o[a];u.From_Account==ot.identifier?(s=!0,u.To_Account,""):(s=!1,u.From_Account,"");var c=new je(i,s,u.MsgSeq,u.MsgRandom,u.MsgTimeStamp,u.From_Account),l=null,p=null,d=null;for(var h in u.MsgBody){switch(l=u.MsgBody[h],d=l.MsgType,d){case m.TEXT:p=new je.Elem.Text(l.MsgContent.Text);break;case m.FACE:p=new je.Elem.Face(l.MsgContent.Index,l.MsgContent.Data);break;case m.IMAGE:for(var g in p=new je.Elem.Images(l.MsgContent.UUID,l.MsgContent.ImageFormat),l.MsgContent.ImageInfoArray){var v=l.MsgContent.ImageInfoArray[g];p.addImage(new je.Elem.Images.Image(v.Type,v.Size,v.Width,v.Height,v.URL))}break;case m.SOUND:l.MsgContent?p=new je.Elem.Sound(l.MsgContent.UUID,l.MsgContent.Second,l.MsgContent.Size,u.From_Account,u.To_Account,l.MsgContent.Download_Flag,f.C2C):(d=m.TEXT,p=new je.Elem.Text("[语音消息]下载地址解析出错"));break;case m.LOCATION:p=new je.Elem.Location(l.MsgContent.Longitude,l.MsgContent.Latitude,l.MsgContent.Desc);break;case m.FILE:case m.FILE+" ":d=m.FILE,l.MsgContent?p=new je.Elem.File(l.MsgContent.UUID,l.MsgContent.FileName,l.MsgContent.FileSize,u.From_Account,u.To_Account,l.MsgContent.Download_Flag,f.C2C):(d=m.TEXT,p=new je.Elem.Text("[文件消息下载地址解析出错]"));break;case m.CUSTOM:d=m.CUSTOM,p=new je.Elem.Custom(l.MsgContent.Data,l.MsgContent.Desc,l.MsgContent.Ext);break;default:d=m.TEXT,p=new je.Elem.Text("web端暂不支持"+l.MsgType+"消息");break}c.elems.push(new je.Elem(d,p))}$e.addMsg(c),r.push(c)}if($e.updateTimeline(),e){var y={Complete:n.Complete,MsgCount:r.length,LastMsgTime:n.LastMsgTime,MsgKey:n.MsgKey,MsgList:r};i.isFinished(n.Complete),e(y)}},function(t){vt.error("getC2CHistoryMsgs failed:"+t.ErrorInfo),n&&n(t)})}else n(mt.getReturnError("Peer_Account is empty",-13))},this.syncGroupMsgs=function(e,n,r){if(e.ReqMsgSeq<=0){if(r){var o="ReqMsgSeq must be greater than 0",i=mt.getReturnError(o,-16);r(i)}}else{var a={GroupId:e.GroupId,ReqMsgSeq:e.ReqMsgSeq,ReqMsgNumber:e.ReqMsgNumber};ge(a,function(e){var r=[],o=(e.GroupId,e.RspMsgList),i=e.IsFinished;if(null!=o&&void 0!==o){for(var a=o.length-1;a>=0;a--){var s=o[a];if(!s.IsPlaceMsg&&s.From_Account&&s.MsgBody&&0!=s.MsgBody.length){var u=ut(s,!0,!0,i);u&&r.push(u)}}r.length>0&&$e.updateTimeline(),n?n(r):r.length>0&&t&&t(r)}else n&&n([])},function(t){vt.error("getGroupMsgs failed:"+t.ErrorInfo),r&&r(t)})}};var ut=function(t,n,r,o){if(t.IsPlaceMsg||!t.From_Account||!t.MsgBody||0==t.MsgBody.length)return null;var i,a,s,u,c=t.ToGroupId,l=c;t.GroupInfo&&t.GroupInfo.GroupName&&(l=t.GroupInfo.GroupName),s=t.From_Account,t.GroupInfo&&(t.GroupInfo.From_AccountNick&&(s=t.GroupInfo.From_AccountNick),u=t.GroupInfo.From_AccountHeadurl?t.GroupInfo.From_AccountHeadurl:null),t.From_Account==ot.identifier?(i=!0,t.From_Account,a=""):(i=!1,t.From_Account,a="");var p=$e.sessByTypeId(f.GROUP,c);p||(p=new Ne(f.GROUP,c,l,a,0,0)),"undefined"!==typeof o&&p.isFinished(o||0);var d=A.COMMON;if(E.GROUP_TIP==t.Event||E.GROUP_TIP2==t.Event){d=A.TIP;var h=t.MsgBody;t.MsgBody=[],t.MsgBody.push({MsgType:m.GROUP_TIP,MsgContent:h})}else t.MsgPriority&&(t.MsgPriority==T.REDPACKET?d=A.REDPACKET:t.MsgPriority==T.LOVEMSG&&(d=A.LOVEMSG));var g=new je(p,i,t.MsgSeq,t.MsgRandom,t.MsgTimeStamp,t.From_Account,d,s,u),v=null,y=null,_=null;for(var b in t.MsgBody){switch(v=t.MsgBody[b],_=v.MsgType,_){case m.TEXT:y=new je.Elem.Text(v.MsgContent.Text);break;case m.FACE:y=new je.Elem.Face(v.MsgContent.Index,v.MsgContent.Data);break;case m.IMAGE:for(var I in y=new je.Elem.Images(v.MsgContent.UUID,v.MsgContent.ImageFormat||""),v.MsgContent.ImageInfoArray)y.addImage(new je.Elem.Images.Image(v.MsgContent.ImageInfoArray[I].Type,v.MsgContent.ImageInfoArray[I].Size,v.MsgContent.ImageInfoArray[I].Width,v.MsgContent.ImageInfoArray[I].Height,v.MsgContent.ImageInfoArray[I].URL));break;case m.SOUND:v.MsgContent?y=new je.Elem.Sound(v.MsgContent.UUID,v.MsgContent.Second,v.MsgContent.Size,t.From_Account,t.To_Account,v.MsgContent.Download_Flag,f.GROUP):(_=m.TEXT,y=new je.Elem.Text("[语音消息]下载地址解析出错"));break;case m.LOCATION:y=new je.Elem.Location(v.MsgContent.Longitude,v.MsgContent.Latitude,v.MsgContent.Desc);break;case m.FILE:case m.FILE+" ":_=m.FILE;Ot(v.MsgContent.UUID,t.From_Account,v.MsgContent.FileName);v.MsgContent?y=new je.Elem.File(v.MsgContent.UUID,v.MsgContent.FileName,v.MsgContent.FileSize,t.From_Account,t.To_Account,v.MsgContent.Download_Flag,f.GROUP):(_=m.TEXT,y=new je.Elem.Text("[文件消息]地址解析出错"));break;case m.GROUP_TIP:var M=v.MsgContent.OpType;if(y=new je.Elem.GroupTip(M,v.MsgContent.Operator_Account,c,t.GroupInfo.GroupName,v.MsgContent.List_Account),O.JOIN==M||O.QUIT==M)y.setGroupMemberNum(v.MsgContent.MemberNum);else if(O.MODIFY_GROUP_INFO==M){var S=!1,C={GroupId:c,GroupFaceUrl:null,GroupName:null,OwnerAccount:null,GroupNotification:null,GroupIntroduction:null},w=v.MsgContent.MsgGroupNewInfo;if(w.GroupFaceUrl){var k=new je.Elem.GroupTip.GroupInfo(P.FACE_URL,w.GroupFaceUrl);y.addGroupInfo(k),S=!0,C.GroupFaceUrl=w.GroupFaceUrl}if(w.GroupName){var x=new je.Elem.GroupTip.GroupInfo(P.NAME,w.GroupName);y.addGroupInfo(x),S=!0,C.GroupName=w.GroupName}if(w.Owner_Account){var F=new je.Elem.GroupTip.GroupInfo(P.OWNER,w.Owner_Account);y.addGroupInfo(F),S=!0,C.OwnerAccount=w.Owner_Account}if(w.GroupNotification){var R=new je.Elem.GroupTip.GroupInfo(P.NOTIFICATION,w.GroupNotification);y.addGroupInfo(R),S=!0,C.GroupNotification=w.GroupNotification}if(w.GroupIntroduction){var U=new je.Elem.GroupTip.GroupInfo(P.INTRODUCTION,w.GroupIntroduction);y.addGroupInfo(U),S=!0,C.GroupIntroduction=w.GroupIntroduction}0==n&&S&&e&&e(C)}else if(O.MODIFY_MEMBER_INFO==M){var G=v.MsgContent.MsgMemberInfo;for(var D in G){var N=G[D];y.addMemberInfo(new je.Elem.GroupTip.MemberInfo(N.User_Account,N.ShutupTime))}}break;case m.CUSTOM:_=m.CUSTOM,y=new je.Elem.Custom(v.MsgContent.Data,v.MsgContent.Desc,v.MsgContent.Ext);break;default:_=m.TEXT,y=new je.Elem.Text("web端暂不支持"+v.MsgType+"消息");break}g.elems.push(new je.Elem(_,y))}return 0==r?g:$e.addMsg(g)?g:null};this.init=function(a,s,c){if(a.onMsgNotify||vt.warn("listeners.onMsgNotify is empty"),t=a.onMsgNotify,a.onBigGroupMsgNotify?u=a.onBigGroupMsgNotify:vt.warn("listeners.onBigGroupMsgNotify is empty"),a.onC2cEventNotifys?v=a.onC2cEventNotifys:vt.warn("listeners.onC2cEventNotifys is empty"),a.onGroupSystemNotifys?n=a.onGroupSystemNotifys:vt.warn("listeners.onGroupSystemNotifys is empty"),a.onGroupInfoChangeNotify?e=a.onGroupInfoChangeNotify:vt.warn("listeners.onGroupInfoChangeNotify is empty"),a.onFriendSystemNotifys?r=a.onFriendSystemNotifys:vt.warn("listeners.onFriendSystemNotifys is empty"),a.onProfileSystemNotifys?o=a.onProfileSystemNotifys:vt.warn("listeners.onProfileSystemNotifys is empty"),a.onKickedEventCall?y=a.onKickedEventCall:vt.warn("listeners.onKickedEventCall is empty"),a.onAppliedDownloadUrl?a.onAppliedDownloadUrl:vt.warn("listeners.onAppliedDownloadUrl is empty"),ot.identifier&&ot.userSig)S(function(t){vt.info("initMyGroupMaxSeqs success"),M(function(t){if(vt.info("initIpAndAuthkey success"),s){vt.info("login success(have login state))");var e={ActionStatus:h.OK,ErrorCode:0,ErrorInfo:"login success"};s(e)}qe.setLongPollingOn(!0),i&&qe.longPolling(s)},c)},c);else if(s){var l={ActionStatus:h.OK,ErrorCode:0,ErrorInfo:"login success(no login state)"};s(l)}},this.sendMsg=function(t,e,n){Nt(t,function(r){if(t.sess.type()==f.C2C){if(!$e.addMsg(t)){var o="sendMsg: addMsg failed!",i=mt.getReturnError(o,-17);return vt.error(o),void(n&&n(i))}$e.updateTimeline()}e&&e(r)},function(t){n&&n(t)})}},Be=new function(){this.fileMd5=null;var t=function(t,e,n){var r=null;try{r=new FileReader}catch(l){if(n)return void n(mt.getReturnError("当前浏览器不支持FileReader",-18))}var o=File.prototype.mozSlice||File.prototype.webkitSlice||File.prototype.slice;if(o||!n){var i=2097152,a=Math.ceil(t.size/i),s=0,u=new SparkMD5;r.onload=function(t){for(var n="",r=new Uint8Array(t.target.result),o=r.byteLength,i=0;i<o;i++)n+=String.fromCharCode(r[i]);u.appendBinary(n),s++,s<a?c():(this.fileMd5=u.end(),e&&e(this.fileMd5))},c()}else n(mt.getReturnError("当前浏览器不支持FileAPI",-19));function c(){var e=s*i,n=e+i>=t.size?t.size:e+i,a=o.call(t,e,n);r.readAsArrayBuffer(a)}};this.submitUploadFileForm=function(t,e,n){var r,o,i=t.formId,a=t.fileId,s=et++,u="uploadResultIframe_"+s,c=t.To_Account,l=t.businessType,f=document.getElementById(i);if(!f)return r="获取表单对象为空: formId="+i+"(formId非法)",o=mt.getReturnError(r,-20),void(n&&n(o));var p=document.getElementById(a);if(!p)return r="获取文件对象为空: fileId="+a+"(没有选择文件或者fileId非法)",o=mt.getReturnError(r,-21),void(n&&n(o));p.name="file";var d,g=document.createElement("iframe");g.name=u,g.id=u,g.style.display="none",document.body.appendChild(g),d=wt()?"pic_up":"pic_up_test";var m="https://pic.tim.qq.com/v4/openpic/"+d+"?tinyid="+ot.tinyid+"&a2="+ot.a2+"&sdkappid="+ot.sdkAppID+"&accounttype="+ot.accountType+"&contenttype=http";function v(t,e){var n=document.createElement("input");n.type="hidden",n.name=t,n.value=e,f.appendChild(n)}function y(){var t;try{t=JSON.parse(g.contentWindow.name)||{}}catch(r){t={}}t.ActionStatus?(g.src="about:blank",g.parentNode.removeChild(g),g=null,t.ActionStatus==h.OK?e&&e(t):n&&n(t)):setTimeout(y,100)}f.action=m,f.method="post",f.target=u,v("App_Version",S.APP_VERSION),v("From_Account",ot.identifier),v("To_Account",c),v("Seq",_t().toString()),v("Timestamp",yt().toString()),v("Random",bt().toString()),v("Busi_Id",l),v("PkgFlag",_.RAW_DATA.toString()),v("Auth_Key",rt),v("Server_Ver",S.SERVER_VERSION.toString()),v("File_Type",t.fileType),setTimeout(y,500),f.submit()},this.uploadFile=function(e,n,r){var o={init:function(t,e,n){var r=this;r.file=t.file,r.onProgressCallBack=t.onProgressCallBack,t.abortButton&&(t.abortButton.onclick=r.abortHandler),r.total=r.file.size,r.loaded=0,r.step=1105920,r.sliceSize=0,r.sliceOffset=0,r.timestamp=yt(),r.seq=_t(),r.random=bt(),r.fromAccount=ot.identifier,r.toAccount=t.To_Account,r.fileMd5=t.fileMd5,r.businessType=t.businessType,r.fileType=t.fileType,r.cbOk=e,r.cbErr=n,r.reader=new FileReader,r.blobSlice=File.prototype.mozSlice||File.prototype.webkitSlice||File.prototype.slice,r.reader.onloadstart=r.onLoadStart,r.reader.onprogress=r.onProgress,r.reader.onabort=r.onAbort,r.reader.onerror=r.onerror,r.reader.onload=r.onLoad,r.reader.onloadend=r.onLoadEnd},upload:function(){var t=o;t.readBlob(0)},onLoadStart:function(){},onProgress:function(t){var e=o;e.loaded+=t.loaded,e.onProgressCallBack&&e.onProgressCallBack(e.loaded,e.total)},onAbort:function(){},onError:function(){},onLoad:function(t){var e=o;if(t.target.readyState==FileReader.DONE){var n=t.target.result,r=n.indexOf(",");-1!=r&&(n=n.substr(r+1));var i={From_Account:e.fromAccount,To_Account:e.toAccount,Busi_Id:e.businessType,File_Type:e.fileType,File_Str_Md5:e.fileMd5,PkgFlag:_.BASE64_DATA,File_Size:e.total,Slice_Offset:e.sliceOffset,Slice_Size:e.sliceSize,Slice_Data:n,Seq:e.seq,Timestamp:e.timestamp,Random:e.random},a=function(t){if(0==t.IsFinish)e.loaded=t.Next_Offset,e.loaded<e.total?e.readBlob(e.loaded):e.loaded=e.total;else if(e.cbOk){var n={ActionStatus:t.ActionStatus,ErrorCode:t.ErrorCode,ErrorInfo:t.ErrorInfo,File_UUID:t.File_UUID,File_Size:t.Next_Offset,URL_INFO:t.URL_INFO,Download_Flag:t.Download_Flag};e.fileType==M.FILE&&(n.URL_INFO=Ot(t.File_UUID,ot.identifier,e.file.name)),e.cbOk(n)}Y=0},s=function t(n){Y<X?(Y++,setTimeout(function(){xe(i,a,t)},1e3)):e.cbErr(n)};xe(i,a,s)}},onLoadEnd:function(){},readBlob:function(t){var e,n=o,r=n.file,i=t+n.step;i>n.total?(i=n.total,n.sliceSize=i-t):n.sliceSize=n.step,n.sliceOffset=t,e=n.blobSlice.call(r,t,i),n.reader.readAsDataURL(e)},abortHandler:function(){var t=o;t.reader&&t.reader.abort()}};t(e.file,function(t){vt.info("fileMd5: "+t),e.fileMd5=t,o.init(e,n,r),o.upload()},r)}};e.SESSION_TYPE=f,e.MSG_MAX_LENGTH=d,e.C2C_MSG_SUB_TYPE=C,e.GROUP_MSG_SUB_TYPE=A,e.MSG_ELEMENT_TYPE=m,e.GROUP_TIP_TYPE=O,e.IMAGE_TYPE=v,e.GROUP_SYSTEM_TYPE=k,e.FRIEND_NOTICE_TYPE=x,e.GROUP_TIP_MODIFY_GROUP_INFO_TYPE=P,e.BROWSER_INFO=a,e.Emotions=e.EmotionPicData=gt,e.EmotionDataIndexs=e.EmotionPicDataIndex=ht,e.TLS_ERROR_CODE=R,e.CONNECTION_STATUS=U,e.UPLOAD_PIC_BUSSINESS_TYPE=G,e.RECENT_CONTACT_TYPE=p,e.UPLOAD_RES_TYPE=M,e.Tool=mt,e.Log=vt,e.Msg=je,e.Session=Ne,e.MsgStore={sessMap:function(){return $e.sessMap()},sessCount:function(){return $e.sessCount()},sessByTypeId:function(t,e){return $e.sessByTypeId(t,e)},delSessByTypeId:function(t,e){return $e.delSessByTypeId(t,e)},resetCookieAndSyncFlag:function(){return $e.resetCookieAndSyncFlag()}},e.Resources=dt,e.login=e.init=function(t,e,n,r,o){De.init(e.onConnNotify,r,o),e.jsonpCallback&&(tt=e.jsonpCallback),Ft(t,e,n,r,o)},e.logout=e.offline=function(t,e){return Dt("instance",t,e)},e.logoutAll=function(t,e){return Dt("all",t,e)},e.sendMsg=function(t,e,n){return qe.sendMsg(t,e,n)},e.syncMsgs=function(t,e){return qe.syncMsgs(t,e)},e.getC2CHistoryMsgs=function(t,e,n){return qe.getC2CHistoryMsgs(t,e,n)},e.syncGroupMsgs=function(t,e,n){return qe.syncGroupMsgs(t,e,n)},e.c2CMsgReaded=function(t,e,n){return $e.c2CMsgReaded(t,e,n)},e.groupMsgReaded=function(t,e,n){return me(t,e,n)},e.setAutoRead=function(t,e,n){return $e.setAutoRead(t,e,n)},e.createGroup=function(t,e,n){return zt(t,e,n)},e.createGroupHigh=function(t,e,n){return Vt(t,e,n)},e.applyJoinGroup=function(t,e,n){return Wt(t,e,n)},e.handleApplyJoinGroupPendency=function(t,e,n){return Yt(t,e,n)},e.getPendencyGroup=function(t,e,n){return Xt(t,e,n)},e.getPendencyGroupRead=function(t,e,n){return Qt(t,e,n)},e.handleInviteJoinGroupRequest=function(t,e,n){return Zt(t,e,n)},e.deleteApplyJoinGroupPendency=function(t,e,n){return Bt(t,e,n)},e.quitGroup=function(t,e,n){return te(t,e,n)},e.searchGroupByName=function(t,e,n){return ne(t,e,n)},e.getGroupPublicInfo=function(t,e,n){return re(t,e,n)},e.getGroupInfo=function(t,e,n){return oe(t,e,n)},e.modifyGroupBaseInfo=function(t,e,n){return Kt(t,e,n)},e.getGroupMemberInfo=function(t,e,n){return ie(t,e,n)},e.addGroupMember=function(t,e,n){return ae(t,e,n)},e.modifyGroupMember=function(t,e,n){return se(t,e,n)},e.deleteGroupMember=function(t,e,n){return ue(t,e,n)},e.destroyGroup=function(t,e,n){return ce(t,e,n)},e.changeGroupOwner=function(t,e,n){return le(t,e,n)},e.getJoinedGroupListHigh=function(t,e,n){return fe(t,e,n)},e.getRoleInGroup=function(t,e,n){return pe(t,e,n)},e.forbidSendMsg=function(t,e,n){return de(t,e,n)},e.sendCustomGroupNotify=function(t,e,n){return he(t,e,n)},e.applyJoinBigGroup=function(t,e,n){return Jt(t,e,n)},e.quitBigGroup=function(t,e,n){return ee(t,e,n)},e.getProfilePortrait=function(t,e,n){return we(t,e,n)},e.setProfilePortrait=function(t,e,n){return Ae(t,e,n)},e.applyAddFriend=function(t,e,n){return ye(t,e,n)},e.getPendency=function(t,e,n){return Ie(t,e,n)},e.getPendencyReport=function(t,e,n){return Me(t,e,n)},e.deletePendency=function(t,e,n){return Se(t,e,n)},e.responseFriend=function(t,e,n){return Ee(t,e,n)},e.getAllFriend=function(t,e,n){return Ce(t,e,n)},e.deleteChat=function(t,e,n){return be(t,e,n)},e.deleteFriend=function(t,e,n){return _e(t,e,n)},e.addBlackList=function(t,e,n){return Te(t,e,n)},e.deleteBlackList=function(t,e,n){return Oe(t,e,n)},e.getBlackList=function(t,e,n){return Pe(t,e,n)},e.getRecentContactList=function(t,e,n){return ke(t,e,n)},e.uploadFile=e.uploadPic=function(t,e,n){return Be.uploadFile(t,e,n)},e.submitUploadFileForm=function(t,e,n){return Be.submitUploadFileForm(t,e,n)},e.uploadFileByBase64=e.uploadPicByBase64=function(t,e,n){var r={To_Account:t.toAccount,Busi_Id:t.businessType,File_Type:t.File_Type,File_Str_Md5:t.fileMd5,PkgFlag:_.BASE64_DATA,File_Size:t.totalSize,Slice_Offset:0,Slice_Size:t.totalSize,Slice_Data:t.base64Str,Seq:_t(),Timestamp:yt(),Random:bt()};return xe(r,e,n)},e.setJsonpLastRspData=function(t){Z="string"==typeof t?JSON.parse(t):t},e.getLongPollingId=function(t,e,n){return Ue(t,e,n)},e.applyDownload=function(t,e,n){return Ge(t,e,n)},e.onDownFile=function(t){window.open(dt.downloadMap["uuid_"+t])},e.checkLogin=function(t,e){return Ct(t,e)}}(e),e}()},c4e7:function(t,e,r){"use strict";!function(e,n){t.exports=n()}("undefined"!=typeof self&&self,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=58)}([function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n=t.exports={version:"2.6.5"};"number"==typeof __e&&(__e=n)},function(t,e,n){var r=n(30)("wks"),o=n(22),i=n(0).Symbol,a="function"==typeof i;(t.exports=function(t){return r[t]||(r[t]=a&&i[t]||(a?i:o)("Symbol."+t))}).store=r},function(t,e,n){var r=n(7);t.exports=function(t){if(!r(t))throw TypeError(t+" is not an object!");return t}},function(t,e,n){var r=n(0),o=n(1),i=n(19),a=n(5),s=n(9),u=function t(e,n,u){var c,l,f,p=e&t.F,d=e&t.G,h=e&t.S,g=e&t.P,m=e&t.B,v=e&t.W,y=d?o:o[n]||(o[n]={}),_=y.prototype,b=d?r:h?r[n]:(r[n]||{}).prototype;for(c in d&&(u=n),u)(l=!p&&b&&void 0!==b[c])&&s(y,c)||(f=l?b[c]:u[c],y[c]=d&&"function"!=typeof b[c]?u[c]:m&&l?i(f,r):v&&b[c]==f?function(t){var e=function(e,n,r){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,r)}return t.apply(this,arguments)};return e.prototype=t.prototype,e}(f):g&&"function"==typeof f?i(Function.call,f):f,g&&((y.virtual||(y.virtual={}))[c]=f,e&t.R&&_&&!_[c]&&a(_,c,f)))};u.F=1,u.G=2,u.S=4,u.P=8,u.B=16,u.W=32,u.U=64,u.R=128,t.exports=u},function(t,e,n){var r=n(6),o=n(21);t.exports=n(8)?function(t,e,n){return r.f(t,e,o(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var r=n(3),o=n(43),i=n(28),a=Object.defineProperty;e.f=n(8)?Object.defineProperty:function(t,e,n){if(r(t),e=i(e,!0),r(n),o)try{return a(t,e,n)}catch(t){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){t.exports=!n(10)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e){t.exports=function(t){try{return!!t()}catch(t){return!0}}},function(t,e,n){var r=n(47),o=n(26);t.exports=function(t){return r(o(t))}},function(t,e,n){function r(t){return t&&t.__esModule?t:{default:t}}function o(t){var e=t+864e5;return(new Date).getTime()>e}function i(t){return(0,m.default)(t).filter(function(t){return t.startsWith("x:")}).map(function(e){return[e,t[e].toString()]})}function a(t){return"qiniu_js_sdk_upload_file_"+t.name+"_size_"+t.size}function s(t){try{return JSON.parse(localStorage.getItem(a(t)))||[]}catch(t){return window.console&&window.console.warn&&console.warn("getLocalFileInfo failed"," at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"),[]}}function u(t){return{Authorization:"UpToken "+t}}function c(){return window.XMLHttpRequest?new XMLHttpRequest:new window.ActiveXObject("Microsoft.XMLHTTP")}function l(t){return new d.default(function(e,n){var r=new FileReader;r.readAsArrayBuffer(t),r.onload=function(t){var n=t.target.result;e(n)},r.onerror=function(){n(new Error("fileReader 读取错误"))}})}function f(t,e){return new d.default(function(n,r){var o=c();o.open(e.method,t),e.onCreate&&e.onCreate(o),e.headers&&(0,m.default)(e.headers).forEach(function(t){return o.setRequestHeader(t,e.headers[t])}),o.upload.addEventListener("progress",function(t){t.lengthComputable&&e.onProgress&&e.onProgress({loaded:t.loaded,total:t.total})}),o.onreadystatechange=function(){var t=o.responseText;if(4===o.readyState){var e=o.getResponseHeader("x-reqId")||"";if(200!==o.status){var i="xhr request failed, code: "+o.status+";";return t&&(i=i+" response: "+t),void r({code:o.status,message:i,reqId:e,isRequestError:!0})}try{n({data:JSON.parse(t),reqId:e})}catch(t){r(t)}}},o.send(e.body)})}function p(){return"http:"===window.location.protocol?"http:":"https:"}e.__esModule=!0;var d=r(n(18)),h=r(n(34)),g=r(n(86)),m=r(n(36));e.isChunkExpired=o,e.getChunks=function(t,e){for(var n=[],r=Math.ceil(t.size/e),o=0;o<r;o++){var i=t.slice(e*o,o===r-1?t.size:e*(o+1));n.push(i)}return n},e.filterParams=i,e.sum=function(t){return t.reduce(function(t,e){return t+e},0)},e.setLocalFileInfo=function(t,e){try{localStorage.setItem(a(t),(0,g.default)(e))}catch(t){window.console&&window.console.warn&&console.warn("setLocalFileInfo failed"," at node_modules\\qiniu-js\\dist\\qiniu.min.js:1")}},e.removeLocalFileInfo=function(t){try{localStorage.removeItem(a(t))}catch(t){window.console&&window.console.warn&&console.warn("removeLocalFileInfo failed"," at node_modules\\qiniu-js\\dist\\qiniu.min.js:1")}},e.getLocalFileInfo=s,e.getResumeUploadedSize=function(t){return s(t).filter(function(t){return t&&!o(t.time)}).reduce(function(t,e){return t+e.size},0)},e.createMkFileUrl=function(t,e,n,r){var o=t+"/mkfile/"+e;null!=n&&(o+="/key/"+(0,v.urlSafeBase64Encode)(n)),r.mimeType&&(o+="/mimeType/"+(0,v.urlSafeBase64Encode)(r.mimeType));var a=r.fname;return a&&(o+="/fname/"+(0,v.urlSafeBase64Encode)(a)),r.params&&i(r.params).forEach(function(t){return o+="/"+encodeURIComponent(t[0])+"/"+(0,v.urlSafeBase64Encode)(t[1])}),o},e.getHeadersForChunkUpload=function(t){var e=u(t);return(0,h.default)({"content-type":"application/octet-stream"},e)},e.getHeadersForMkFile=function(t){var e=u(t);return(0,h.default)({"content-type":"text/plain"},e)},e.createXHR=c,e.computeMd5=function(t){return l(t).then(function(t){var e=new _.default.ArrayBuffer;return e.append(t),e.end()})},e.readAsArrayBuffer=l,e.request=f,e.getPortFromUrl=function(t){if(t&&t.match){var e=t.match(/(^https?)/);if(!e)return"";var n=e[1];return(e=t.match(/^https?:\/\/([^:^\/]*):(\d*)/))?e[2]:"http"===n?"80":"443"}return""},e.getDomainFromUrl=function(t){if(t&&t.match){var e=t.match(/^https?:\/\/([^:^\/]*)/);return e?e[1]:""}return""},e.getUploadUrl=function(t,e){var n=p();if(null!=t.uphost)return d.default.resolve(n+"//"+t.uphost);if(null!=t.region){var r=y.regionUphostMap[t.region],o=t.useCdnDomain?r.cdnUphost:r.srcUphost;return d.default.resolve(n+"//"+o)}return function(t){try{var e=function(t){var e=t.split(":"),n=e[0],r=JSON.parse((0,v.urlSafeBase64Decode)(e[2]));return r.ak=n,r.bucket=r.scope.split(":")[0],r}(t);return f(p()+"//api.qiniu.com/v2/query?ak="+e.ak+"&bucket="+e.bucket,{method:"GET"})}catch(t){return d.default.reject(t)}}(e).then(function(t){var e=t.data.up.acc.main;return n+"//"+e[0]})},e.isContainFileMimeType=function(t,e){return e.indexOf(t)>-1},e.createObjectURL=function(t){return(window.URL||window.webkitURL||window.mozURL).createObjectURL(t)},e.getTransform=function(t,e){var n=t.width,r=t.height;switch(e){case 1:return{width:n,height:r,matrix:[1,0,0,1,0,0]};case 2:return{width:n,height:r,matrix:[-1,0,0,1,n,0]};case 3:return{width:n,height:r,matrix:[-1,0,0,-1,n,r]};case 4:return{width:n,height:r,matrix:[1,0,0,-1,0,r]};case 5:return{width:r,height:n,matrix:[0,1,1,0,0,0]};case 6:return{width:r,height:n,matrix:[0,1,-1,0,r,0]};case 7:return{width:r,height:n,matrix:[0,-1,-1,0,r,n]};case 8:return{width:r,height:n,matrix:[0,-1,1,0,0,n]}}};var v=n(56),y=n(39),_=r(n(91))},function(t,e){t.exports=!0},function(t,e){t.exports={}},function(t,e,n){var r=n(46),o=n(31);t.exports=Object.keys||function(t){return r(t,o)}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){e.__esModule=!0,e.default=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e,n){t.exports={default:n(59),__esModule:!0}},function(t,e,n){var r=n(20);t.exports=function(t,e,n){if(r(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,r){return t.call(e,n,r)};case 3:return function(n,r,o){return t.call(e,n,r,o)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n=0,r=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+r).toString(36))}},function(t,e,n){var r=n(6).f,o=n(9),i=n(2)("toStringTag");t.exports=function(t,e,n){t&&!o(t=n?t:t.prototype,i)&&r(t,i,{configurable:!0,value:e})}},function(t,e){e.f={}.propertyIsEnumerable},function(t,e){var n=Math.ceil,r=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?r:n)(t)}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){var r=n(7),o=n(0).document,i=r(o)&&r(o.createElement);t.exports=function(t){return i?o.createElement(t):{}}},function(t,e,n){var r=n(7);t.exports=function(t,e){if(!r(t))return t;var n,o;if(e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;if("function"==typeof(n=t.valueOf)&&!r(o=n.call(t)))return o;if(!e&&"function"==typeof(n=t.toString)&&!r(o=n.call(t)))return o;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var r=n(30)("keys"),o=n(22);t.exports=function(t){return r[t]||(r[t]=o(t))}},function(t,e,n){var r=n(1),o=n(0),i=o["__core-js_shared__"]||(o["__core-js_shared__"]={});(t.exports=function(t,e){return i[t]||(i[t]=void 0!==e?e:{})})("versions",[]).push({version:r.version,mode:n(13)?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var r=n(26);t.exports=function(t){return Object(r(t))}},function(t,e,n){var r=n(20);t.exports.f=function(t){return new function(t){var e,n;this.promise=new t(function(t,r){if(void 0!==e||void 0!==n)throw TypeError("Bad Promise constructor");e=t,n=r}),this.resolve=r(e),this.reject=r(n)}(t)}},function(t,e,n){t.exports={default:n(83),__esModule:!0}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){t.exports={default:n(88),__esModule:!0}},function(t,e,n){e.f=n(2)},function(t,e,n){var r=n(0),o=n(1),i=n(13),a=n(37),s=n(6).f;t.exports=function(t){var e=o.Symbol||(o.Symbol=i?{}:r.Symbol||{});"_"==t.charAt(0)||t in e||s(e,t,{value:a.f(t)})}},function(t,e,n){e.__esModule=!0,e.regionUphostMap={z0:{srcUphost:"up.qiniup.com",cdnUphost:"upload.qiniup.com"},z1:{srcUphost:"up-z1.qiniup.com",cdnUphost:"upload-z1.qiniup.com"},z2:{srcUphost:"up-z2.qiniup.com",cdnUphost:"upload-z2.qiniup.com"},na0:{srcUphost:"up-na0.qiniup.com",cdnUphost:"upload-na0.qiniup.com"},as0:{srcUphost:"up-as0.qiniup.com",cdnUphost:"upload-as0.qiniup.com"}},e.region={z0:"z0",z1:"z1",z2:"z2",na0:"na0",as0:"as0"}},function(t,e){},function(t,e,n){var r=n(60)(!0);n(42)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){var r=n(13),o=n(4),i=n(44),a=n(5),s=n(14),u=n(61),c=n(23),l=n(65),f=n(2)("iterator"),p=!([].keys&&"next"in[].keys()),d=function(){return this};t.exports=function(t,e,n,h,g,m,v){u(n,e,h);var y,_,b,I=function(t){if(!p&&t in C)return C[t];switch(t){case"keys":case"values":return function(){return new n(this,t)}}return function(){return new n(this,t)}},M=e+" Iterator",S="values"==g,E=!1,C=t.prototype,w=C[f]||C["@@iterator"]||g&&C[g],A=w||I(g),T=g?S?I("entries"):A:void 0,O="Array"==e&&C.entries||w;if(O&&(b=l(O.call(new t)))!==Object.prototype&&b.next&&(c(b,M,!0),r||"function"==typeof b[f]||a(b,f,d)),S&&w&&"values"!==w.name&&(E=!0,A=function(){return w.call(this)}),r&&!v||!p&&!E&&C[f]||a(C,f,A),s[e]=A,s[M]=d,g)if(y={values:S?A:I("values"),keys:m?A:I("keys"),entries:T},v)for(_ in y)_ in C||i(C,_,y[_]);else o(o.P+o.F*(p||E),e,y);return y}},function(t,e,n){t.exports=!n(8)&&!n(10)(function(){return 7!=Object.defineProperty(n(27)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){t.exports=n(5)},function(t,e,n){var r=n(3),o=n(62),i=n(31),a=n(29)("IE_PROTO"),s=function(){},u=function(){var t,e=n(27)("iframe"),r=i.length;for(e.style.display="none",n(49).appendChild(e),e.src="javascript:",(t=e.contentWindow.document).open(),t.write("<script>document.F=Object<\/script>"),t.close(),u=t.F;r--;)delete u.prototype[i[r]];return u()};t.exports=Object.create||function(t,e){var n;return null!==t?(s.prototype=r(t),n=new s,s.prototype=null,n[a]=t):n=u(),void 0===e?n:o(n,e)}},function(t,e,n){var r=n(9),o=n(11),i=n(63)(!1),a=n(29)("IE_PROTO");t.exports=function(t,e){var n,s=o(t),u=0,c=[];for(n in s)n!=a&&r(s,n)&&c.push(n);for(;e.length>u;)r(s,n=e[u++])&&(~i(c,n)||c.push(n));return c}},function(t,e,n){var r=n(16);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==r(t)?t.split(""):Object(t)}},function(t,e,n){var r=n(25),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},function(t,e,n){var r=n(0).document;t.exports=r&&r.documentElement},function(t,e,n){n(66);for(var r=n(0),o=n(5),i=n(14),a=n(2)("toStringTag"),s="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),u=0;u<s.length;u++){var c=s[u],l=r[c],f=l&&l.prototype;f&&!f[a]&&o(f,a,c),i[c]=i.Array}},function(t,e,n){var r=n(16),o=n(2)("toStringTag"),i="Arguments"==r(function(){return arguments}());t.exports=function(t){var e,n,a;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=function(t,e){try{return t[e]}catch(t){}}(e=Object(t),o))?n:i?r(e):"Object"==(a=r(e))&&"function"==typeof e.callee?"Arguments":a}},function(t,e,n){var r=n(3),o=n(20),i=n(2)("species");t.exports=function(t,e){var n,a=r(t).constructor;return void 0===a||void 0==(n=r(a)[i])?e:o(n)}},function(t,e,n){var r,o,i,a=n(19),s=n(75),u=n(49),c=n(27),l=n(0),f=l.process,p=l.setImmediate,d=l.clearImmediate,h=l.MessageChannel,g=l.Dispatch,m=0,v={},y=function(){var t=+this;if(v.hasOwnProperty(t)){var e=v[t];delete v[t],e()}},_=function(t){y.call(t.data)};p&&d||(p=function(t){for(var e=[],n=1;arguments.length>n;)e.push(arguments[n++]);return v[++m]=function(){s("function"==typeof t?t:Function(t),e)},r(m),m},d=function(t){delete v[t]},"process"==n(16)(f)?r=function(t){f.nextTick(a(y,t,1))}:g&&g.now?r=function(t){g.now(a(y,t,1))}:h?(i=(o=new h).port2,o.port1.onmessage=_,r=a(i.postMessage,i,1)):l.addEventListener&&"function"==typeof postMessage&&!l.importScripts?(r=function(t){l.postMessage(t+"","*")},l.addEventListener("message",_,!1)):r="onreadystatechange"in c("script")?function(t){u.appendChild(c("script")).onreadystatechange=function(){u.removeChild(this),y.call(t)}}:function(t){setTimeout(a(y,t,1),0)}),t.exports={set:p,clear:d}},function(t,e){t.exports=function(t){try{return{e:!1,v:t()}}catch(t){return{e:!0,v:t}}}},function(t,e,n){var r=n(3),o=n(7),i=n(33);t.exports=function(t,e){if(r(t),o(e)&&e.constructor===t)return e;var n=i.f(t);return(0,n.resolve)(e),n.promise}},function(t,e,n){e.__esModule=!0,e.urlSafeBase64Encode=function(t){return(t=function(t){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n=void 0,r=void 0,o=void 0,i=void 0,a=void 0,s=void 0,u=void 0,c=void 0,l=0,f=0,p="",d=[];if(!t)return t;t=function(t){if(null===t||void 0===t)return"";var e=t+"",n="",r=void 0,o=void 0,i=0;r=o=0,i=e.length;for(var a=0;a<i;a++){var s=e.charCodeAt(a),u=null;if(s<128)o++;else if(s>127&&s<2048)u=String.fromCharCode(s>>6|192,63&s|128);else if(63488&s^!0)u=String.fromCharCode(s>>12|224,s>>6&63|128,63&s|128);else{if(64512&s^!0)throw new RangeError("Unmatched trail surrogate at "+a);var c=e.charCodeAt(++a);if(64512&c^!0)throw new RangeError("Unmatched lead surrogate at "+(a-1));s=((1023&s)<<10)+(1023&c)+65536,u=String.fromCharCode(s>>18|240,s>>12&63|128,s>>6&63|128,63&s|128)}null!==u&&(o>r&&(n+=e.slice(r,o)),n+=u,r=o=a+1)}return o>r&&(n+=e.slice(r,i)),n}(t+"");do{n=t.charCodeAt(l++),r=t.charCodeAt(l++),o=t.charCodeAt(l++),i=(c=n<<16|r<<8|o)>>18&63,a=c>>12&63,s=c>>6&63,u=63&c,d[f++]=e.charAt(i)+e.charAt(a)+e.charAt(s)+e.charAt(u)}while(l<t.length);switch(p=d.join(""),t.length%3){case 1:p=p.slice(0,-2)+"==";break;case 2:p=p.slice(0,-1)+"="}return p}(t)).replace(/\//g,"_").replace(/\+/g,"-")},e.urlSafeBase64Decode=function(t){return function(t){var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",n=void 0,r=void 0,o=void 0,i=void 0,a=void 0,s=void 0,u=void 0,c=void 0,l=0,f=0,p=[];if(!t)return t;t+="";do{i=e.indexOf(t.charAt(l++)),a=e.indexOf(t.charAt(l++)),s=e.indexOf(t.charAt(l++)),u=e.indexOf(t.charAt(l++)),n=(c=i<<18|a<<12|s<<6|u)>>16&255,r=c>>8&255,o=255&c,p[f++]=64===s?String.fromCharCode(n):64===u?String.fromCharCode(n,r):String.fromCharCode(n,r,o)}while(l<t.length);return p.join("")}(t=t.replace(/_/g,"/").replace(/-/g,"+"))}},function(t,e,n){var r=n(46),o=n(31).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},function(t,e,n){e.__esModule=!0,e.pipeline=e.compressImage=e.exif=e.imageInfo=e.watermark=e.imageMogr2=e.getUploadUrl=e.filterParams=e.getHeadersForMkFile=e.getResumeUploadedSize=e.getHeadersForChunkUpload=e.createMkFileUrl=e.region=e.upload=void 0;var r=n(39),o=n(12),i=n(92),a=n(94),s=n(95),u=n(109),c=function(t){return t&&t.__esModule?t:{default:t}}(n(110)),l=new u.StatisticsLogger;e.upload=function(t,e,n,r,o){var a={file:t,key:e,token:n,putExtra:r,config:o};return new s.Observable(function(t){var e=new i.UploadManager(a,{onData:function(e){return t.next(e)},onError:function(e){return t.error(e)},onComplete:function(e){return t.complete(e)}},l);return e.putFile(),e.stop.bind(e)})},e.region=r.region,e.createMkFileUrl=o.createMkFileUrl,e.getHeadersForChunkUpload=o.getHeadersForChunkUpload,e.getResumeUploadedSize=o.getResumeUploadedSize,e.getHeadersForMkFile=o.getHeadersForMkFile,e.filterParams=o.filterParams,e.getUploadUrl=o.getUploadUrl,e.imageMogr2=a.imageMogr2,e.watermark=a.watermark,e.imageInfo=a.imageInfo,e.exif=a.exif,e.compressImage=c.default,e.pipeline=a.pipeline},function(t,e,n){n(40),n(41),n(50),n(69),n(81),n(82),t.exports=n(1).Promise},function(t,e,n){var r=n(25),o=n(26);t.exports=function(t){return function(e,n){var i,a,s=String(o(e)),u=r(n),c=s.length;return u<0||u>=c?t?"":void 0:(i=s.charCodeAt(u))<55296||i>56319||u+1===c||(a=s.charCodeAt(u+1))<56320||a>57343?t?s.charAt(u):i:t?s.slice(u,u+2):a-56320+(i-55296<<10)+65536}}},function(t,e,n){var r=n(45),o=n(21),i=n(23),a={};n(5)(a,n(2)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=r(a,{next:o(1,n)}),i(t,e+" Iterator")}},function(t,e,n){var r=n(6),o=n(3),i=n(15);t.exports=n(8)?Object.defineProperties:function(t,e){o(t);for(var n,a=i(e),s=a.length,u=0;s>u;)r.f(t,n=a[u++],e[n]);return t}},function(t,e,n){var r=n(11),o=n(48),i=n(64);t.exports=function(t){return function(e,n,a){var s,u=r(e),c=o(u.length),l=i(a,c);if(t&&n!=n){for(;c>l;)if((s=u[l++])!=s)return!0}else for(;c>l;l++)if((t||l in u)&&u[l]===n)return t||l||0;return!t&&-1}}},function(t,e,n){var r=n(25),o=Math.max,i=Math.min;t.exports=function(t,e){return(t=r(t))<0?o(t+e,0):i(t,e)}},function(t,e,n){var r=n(9),o=n(32),i=n(29)("IE_PROTO"),a=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=o(t),r(t,i)?t[i]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?a:null}},function(t,e,n){var r=n(67),o=n(68),i=n(14),a=n(11);t.exports=n(42)(Array,"Array",function(t,e){this._t=a(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,o(1)):o(0,"keys"==e?n:"values"==e?t[n]:[n,t[n]])},"values"),i.Arguments=i.Array,r("keys"),r("values"),r("entries")},function(t,e){t.exports=function(){}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var r,o,i,a,s=n(13),u=n(0),c=n(19),l=n(51),f=n(4),p=n(7),d=n(20),h=n(70),g=n(71),m=n(52),v=n(53).set,y=n(76)(),_=n(33),b=n(54),I=n(77),M=n(55),S=u.TypeError,E=u.process,C=E&&E.versions,w=C&&C.v8||"",A=u.Promise,T="process"==l(E),O=function(){},P=o=_.f,k=!!function(){try{var t=A.resolve(1),e=(t.constructor={})[n(2)("species")]=function(t){t(O,O)};return(T||"function"==typeof PromiseRejectionEvent)&&t.then(O)instanceof e&&0!==w.indexOf("6.6")&&-1===I.indexOf("Chrome/66")}catch(t){}}(),x=function(t){var e;return!(!p(t)||"function"!=typeof(e=t.then))&&e},F=function(t,e){if(!t._n){t._n=!0;var n=t._c;y(function(){for(var r=t._v,o=1==t._s,i=0;n.length>i;)!function(e){var n,i,a,s=o?e.ok:e.fail,u=e.resolve,c=e.reject,l=e.domain;try{s?(o||(2==t._h&&G(t),t._h=1),!0===s?n=r:(l&&l.enter(),n=s(r),l&&(l.exit(),a=!0)),n===e.promise?c(S("Promise-chain cycle")):(i=x(n))?i.call(n,u,c):u(n)):c(r)}catch(t){l&&!a&&l.exit(),c(t)}}(n[i++]);t._c=[],t._n=!1,e&&!t._h&&R(t)})}},R=function(t){v.call(u,function(){var e,n,r,o=t._v,i=U(t);if(i&&(e=b(function(){T?E.emit("unhandledRejection",o,t):(n=u.onunhandledrejection)?n({promise:t,reason:o}):(r=u.console)&&r.error&&r.error("Unhandled promise rejection",o)}),t._h=T||U(t)?2:1),t._a=void 0,i&&e.e)throw e.v})},U=function(t){return 1!==t._h&&0===(t._a||t._c).length},G=function(t){v.call(u,function(){var e;T?E.emit("rejectionHandled",t):(e=u.onrejectionhandled)&&e({promise:t,reason:t._v})})},D=function(t){var e=this;e._d||(e._d=!0,(e=e._w||e)._v=t,e._s=2,e._a||(e._a=e._c.slice()),F(e,!0))},N=function t(e){var n,r=this;if(!r._d){r._d=!0,r=r._w||r;try{if(r===e)throw S("Promise can't be resolved itself");(n=x(e))?y(function(){var o={_w:r,_d:!1};try{n.call(e,c(t,o,1),c(D,o,1))}catch(e){D.call(o,e)}}):(r._v=e,r._s=1,F(r,!1))}catch(e){D.call({_w:r,_d:!1},e)}}};k||(A=function(t){h(this,A,"Promise","_h"),d(t),r.call(this);try{t(c(N,this,1),c(D,this,1))}catch(t){D.call(this,t)}},(r=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1}).prototype=n(78)(A.prototype,{then:function(t,e){var n=P(m(this,A));return n.ok="function"!=typeof t||t,n.fail="function"==typeof e&&e,n.domain=T?E.domain:void 0,this._c.push(n),this._a&&this._a.push(n),this._s&&F(this,!1),n.promise},catch:function(t){return this.then(void 0,t)}}),i=function(){var t=new r;this.promise=t,this.resolve=c(N,t,1),this.reject=c(D,t,1)},_.f=P=function(t){return t===A||t===a?new i(t):o(t)}),f(f.G+f.W+f.F*!k,{Promise:A}),n(23)(A,"Promise"),n(79)("Promise"),a=n(1).Promise,f(f.S+f.F*!k,"Promise",{reject:function(t){var e=P(this);return(0,e.reject)(t),e.promise}}),f(f.S+f.F*(s||!k),"Promise",{resolve:function(t){return M(s&&this===a?A:this,t)}}),f(f.S+f.F*!(k&&n(80)(function(t){A.all(t).catch(O)})),"Promise",{all:function(t){var e=this,n=P(e),r=n.resolve,o=n.reject,i=b(function(){var n=[],i=0,a=1;g(t,!1,function(t){var s=i++,u=!1;n.push(void 0),a++,e.resolve(t).then(function(t){u||(u=!0,n[s]=t,--a||r(n))},o)}),--a||r(n)});return i.e&&o(i.v),n.promise},race:function(t){var e=this,n=P(e),r=n.reject,o=b(function(){g(t,!1,function(t){e.resolve(t).then(n.resolve,r)})});return o.e&&r(o.v),n.promise}})},function(t,e){t.exports=function(t,e,n,r){if(!(t instanceof e)||void 0!==r&&r in t)throw TypeError(n+": incorrect invocation!");return t}},function(t,e,n){var r=n(19),o=n(72),i=n(73),a=n(3),s=n(48),u=n(74),c={},l={};(e=t.exports=function(t,e,n,f,p){var d,h,g,m,v=p?function(){return t}:u(t),y=r(n,f,e?2:1),_=0;if("function"!=typeof v)throw TypeError(t+" is not iterable!");if(i(v)){for(d=s(t.length);d>_;_++)if((m=e?y(a(h=t[_])[0],h[1]):y(t[_]))===c||m===l)return m}else for(g=v.call(t);!(h=g.next()).done;)if((m=o(g,y,h.value,e))===c||m===l)return m}).BREAK=c,e.RETURN=l},function(t,e,n){var r=n(3);t.exports=function(t,e,n,o){try{return o?e(r(n)[0],n[1]):e(n)}catch(e){var i=t.return;throw void 0!==i&&r(i.call(t)),e}}},function(t,e,n){var r=n(14),o=n(2)("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||i[o]===t)}},function(t,e,n){var r=n(51),o=n(2)("iterator"),i=n(14);t.exports=n(1).getIteratorMethod=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||i[r(t)]}},function(t,e){t.exports=function(t,e,n){var r=void 0===n;switch(e.length){case 0:return r?t():t.call(n);case 1:return r?t(e[0]):t.call(n,e[0]);case 2:return r?t(e[0],e[1]):t.call(n,e[0],e[1]);case 3:return r?t(e[0],e[1],e[2]):t.call(n,e[0],e[1],e[2]);case 4:return r?t(e[0],e[1],e[2],e[3]):t.call(n,e[0],e[1],e[2],e[3])}return t.apply(n,e)}},function(t,e,n){var r=n(0),o=n(53).set,i=r.MutationObserver||r.WebKitMutationObserver,a=r.process,s=r.Promise,u="process"==n(16)(a);t.exports=function(){var t,e,n,c=function(){var r,o;for(u&&(r=a.domain)&&r.exit();t;){o=t.fn,t=t.next;try{o()}catch(r){throw t?n():e=void 0,r}}e=void 0,r&&r.enter()};if(u)n=function(){a.nextTick(c)};else if(!i||r.navigator&&r.navigator.standalone)if(s&&s.resolve){var l=s.resolve(void 0);n=function(){l.then(c)}}else n=function(){o.call(r,c)};else{var f=!0,p=document.createTextNode("");new i(c).observe(p,{characterData:!0}),n=function(){p.data=f=!f}}return function(r){var o={fn:r,next:void 0};e&&(e.next=o),t||(t=o,n()),e=o}}},function(t,e,n){var r=n(0).navigator;t.exports=r&&r.userAgent||""},function(t,e,n){var r=n(5);t.exports=function(t,e,n){for(var o in e)n&&t[o]?t[o]=e[o]:r(t,o,e[o]);return t}},function(t,e,n){var r=n(0),o=n(1),i=n(6),a=n(8),s=n(2)("species");t.exports=function(t){var e="function"==typeof o[t]?o[t]:r[t];a&&e&&!e[s]&&i.f(e,s,{configurable:!0,get:function(){return this}})}},function(t,e,n){var r=n(2)("iterator"),o=!1;try{var i=[7][r]();i.return=function(){o=!0},Array.from(i,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!o)return!1;var n=!1;try{var i=[7],a=i[r]();a.next=function(){return{done:n=!0}},i[r]=function(){return a},t(i)}catch(t){}return n}},function(t,e,n){var r=n(4),o=n(1),i=n(0),a=n(52),s=n(55);r(r.P+r.R,"Promise",{finally:function(t){var e=a(this,o.Promise||i.Promise),n="function"==typeof t;return this.then(n?function(n){return s(e,t()).then(function(){return n})}:t,n?function(n){return s(e,t()).then(function(){throw n})}:t)}})},function(t,e,n){var r=n(4),o=n(33),i=n(54);r(r.S,"Promise",{try:function(t){var e=o.f(this),n=i(t);return(n.e?e.reject:e.resolve)(n.v),e.promise}})},function(t,e,n){n(84),t.exports=n(1).Object.assign},function(t,e,n){var r=n(4);r(r.S+r.F,"Object",{assign:n(85)})},function(t,e,n){var r=n(15),o=n(35),i=n(24),a=n(32),s=n(47),u=Object.assign;t.exports=!u||n(10)(function(){var t={},e={},n=Symbol(),r="abcdefghijklmnopqrst";return t[n]=7,r.split("").forEach(function(t){e[t]=t}),7!=u({},t)[n]||Object.keys(u({},e)).join("")!=r})?function(t,e){for(var n=a(t),u=arguments.length,c=1,l=o.f,f=i.f;u>c;)for(var p,d=s(arguments[c++]),h=l?r(d).concat(l(d)):r(d),g=h.length,m=0;g>m;)f.call(d,p=h[m++])&&(n[p]=d[p]);return n}:u},function(t,e,n){t.exports={default:n(87),__esModule:!0}},function(t,e,n){var r=n(1),o=r.JSON||(r.JSON={stringify:JSON.stringify});t.exports=function(t){return o.stringify.apply(o,arguments)}},function(t,e,n){n(89),t.exports=n(1).Object.keys},function(t,e,n){var r=n(32),o=n(15);n(90)("keys",function(){return function(t){return o(r(t))}})},function(t,e,n){var r=n(4),o=n(1),i=n(10);t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],a={};a[t]=e(n),r(r.S+r.F*i(function(){n(1)}),"Object",a)}},function(t,e,n){!function(e){t.exports=function(t){function e(t,e){var n=t[0],r=t[1],o=t[2],i=t[3];r=((r+=((o=((o+=((i=((i+=((n=((n+=(r&o|~r&i)+e[0]-680876936|0)<<7|n>>>25)+r|0)&r|~n&o)+e[1]-389564586|0)<<12|i>>>20)+n|0)&n|~i&r)+e[2]+606105819|0)<<17|o>>>15)+i|0)&i|~o&n)+e[3]-1044525330|0)<<22|r>>>10)+o|0,r=((r+=((o=((o+=((i=((i+=((n=((n+=(r&o|~r&i)+e[4]-176418897|0)<<7|n>>>25)+r|0)&r|~n&o)+e[5]+1200080426|0)<<12|i>>>20)+n|0)&n|~i&r)+e[6]-1473231341|0)<<17|o>>>15)+i|0)&i|~o&n)+e[7]-45705983|0)<<22|r>>>10)+o|0,r=((r+=((o=((o+=((i=((i+=((n=((n+=(r&o|~r&i)+e[8]+1770035416|0)<<7|n>>>25)+r|0)&r|~n&o)+e[9]-1958414417|0)<<12|i>>>20)+n|0)&n|~i&r)+e[10]-42063|0)<<17|o>>>15)+i|0)&i|~o&n)+e[11]-1990404162|0)<<22|r>>>10)+o|0,r=((r+=((o=((o+=((i=((i+=((n=((n+=(r&o|~r&i)+e[12]+1804603682|0)<<7|n>>>25)+r|0)&r|~n&o)+e[13]-40341101|0)<<12|i>>>20)+n|0)&n|~i&r)+e[14]-1502002290|0)<<17|o>>>15)+i|0)&i|~o&n)+e[15]+1236535329|0)<<22|r>>>10)+o|0,r=((r+=((o=((o+=((i=((i+=((n=((n+=(r&i|o&~i)+e[1]-165796510|0)<<5|n>>>27)+r|0)&o|r&~o)+e[6]-1069501632|0)<<9|i>>>23)+n|0)&r|n&~r)+e[11]+643717713|0)<<14|o>>>18)+i|0)&n|i&~n)+e[0]-373897302|0)<<20|r>>>12)+o|0,r=((r+=((o=((o+=((i=((i+=((n=((n+=(r&i|o&~i)+e[5]-701558691|0)<<5|n>>>27)+r|0)&o|r&~o)+e[10]+38016083|0)<<9|i>>>23)+n|0)&r|n&~r)+e[15]-660478335|0)<<14|o>>>18)+i|0)&n|i&~n)+e[4]-405537848|0)<<20|r>>>12)+o|0,r=((r+=((o=((o+=((i=((i+=((n=((n+=(r&i|o&~i)+e[9]+568446438|0)<<5|n>>>27)+r|0)&o|r&~o)+e[14]-1019803690|0)<<9|i>>>23)+n|0)&r|n&~r)+e[3]-187363961|0)<<14|o>>>18)+i|0)&n|i&~n)+e[8]+1163531501|0)<<20|r>>>12)+o|0,r=((r+=((o=((o+=((i=((i+=((n=((n+=(r&i|o&~i)+e[13]-1444681467|0)<<5|n>>>27)+r|0)&o|r&~o)+e[2]-51403784|0)<<9|i>>>23)+n|0)&r|n&~r)+e[7]+1735328473|0)<<14|o>>>18)+i|0)&n|i&~n)+e[12]-1926607734|0)<<20|r>>>12)+o|0,r=((r+=((o=((o+=((i=((i+=((n=((n+=(r^o^i)+e[5]-378558|0)<<4|n>>>28)+r|0)^r^o)+e[8]-2022574463|0)<<11|i>>>21)+n|0)^n^r)+e[11]+1839030562|0)<<16|o>>>16)+i|0)^i^n)+e[14]-35309556|0)<<23|r>>>9)+o|0,r=((r+=((o=((o+=((i=((i+=((n=((n+=(r^o^i)+e[1]-1530992060|0)<<4|n>>>28)+r|0)^r^o)+e[4]+1272893353|0)<<11|i>>>21)+n|0)^n^r)+e[7]-155497632|0)<<16|o>>>16)+i|0)^i^n)+e[10]-1094730640|0)<<23|r>>>9)+o|0,r=((r+=((o=((o+=((i=((i+=((n=((n+=(r^o^i)+e[13]+681279174|0)<<4|n>>>28)+r|0)^r^o)+e[0]-358537222|0)<<11|i>>>21)+n|0)^n^r)+e[3]-722521979|0)<<16|o>>>16)+i|0)^i^n)+e[6]+76029189|0)<<23|r>>>9)+o|0,r=((r+=((o=((o+=((i=((i+=((n=((n+=(r^o^i)+e[9]-640364487|0)<<4|n>>>28)+r|0)^r^o)+e[12]-421815835|0)<<11|i>>>21)+n|0)^n^r)+e[15]+530742520|0)<<16|o>>>16)+i|0)^i^n)+e[2]-995338651|0)<<23|r>>>9)+o|0,r=((r+=((i=((i+=(r^((n=((n+=(o^(r|~i))+e[0]-198630844|0)<<6|n>>>26)+r|0)|~o))+e[7]+1126891415|0)<<10|i>>>22)+n|0)^((o=((o+=(n^(i|~r))+e[14]-1416354905|0)<<15|o>>>17)+i|0)|~n))+e[5]-57434055|0)<<21|r>>>11)+o|0,r=((r+=((i=((i+=(r^((n=((n+=(o^(r|~i))+e[12]+1700485571|0)<<6|n>>>26)+r|0)|~o))+e[3]-1894986606|0)<<10|i>>>22)+n|0)^((o=((o+=(n^(i|~r))+e[10]-1051523|0)<<15|o>>>17)+i|0)|~n))+e[1]-2054922799|0)<<21|r>>>11)+o|0,r=((r+=((i=((i+=(r^((n=((n+=(o^(r|~i))+e[8]+1873313359|0)<<6|n>>>26)+r|0)|~o))+e[15]-30611744|0)<<10|i>>>22)+n|0)^((o=((o+=(n^(i|~r))+e[6]-1560198380|0)<<15|o>>>17)+i|0)|~n))+e[13]+1309151649|0)<<21|r>>>11)+o|0,r=((r+=((i=((i+=(r^((n=((n+=(o^(r|~i))+e[4]-145523070|0)<<6|n>>>26)+r|0)|~o))+e[11]-1120210379|0)<<10|i>>>22)+n|0)^((o=((o+=(n^(i|~r))+e[2]+718787259|0)<<15|o>>>17)+i|0)|~n))+e[9]-343485551|0)<<21|r>>>11)+o|0,t[0]=n+t[0]|0,t[1]=r+t[1]|0,t[2]=o+t[2]|0,t[3]=i+t[3]|0}function n(t){var e,n=[];for(e=0;e<64;e+=4)n[e>>2]=t.charCodeAt(e)+(t.charCodeAt(e+1)<<8)+(t.charCodeAt(e+2)<<16)+(t.charCodeAt(e+3)<<24);return n}function r(t){var e,n=[];for(e=0;e<64;e+=4)n[e>>2]=t[e]+(t[e+1]<<8)+(t[e+2]<<16)+(t[e+3]<<24);return n}function o(t){var r,o,i,a,s,u,c=t.length,l=[1732584193,-271733879,-1732584194,271733878];for(r=64;r<=c;r+=64)e(l,n(t.substring(r-64,r)));for(o=(t=t.substring(r-64)).length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],r=0;r<o;r+=1)i[r>>2]|=t.charCodeAt(r)<<(r%4<<3);if(i[r>>2]|=128<<(r%4<<3),r>55)for(e(l,i),r=0;r<16;r+=1)i[r]=0;return a=(a=8*c).toString(16).match(/(.*?)(.{0,8})$/),s=parseInt(a[2],16),u=parseInt(a[1],16)||0,i[14]=s,i[15]=u,e(l,i),l}function i(t){var e,n="";for(e=0;e<4;e+=1)n+=l[t>>8*e+4&15]+l[t>>8*e&15];return n}function a(t){var e;for(e=0;e<t.length;e+=1)t[e]=i(t[e]);return t.join("")}function s(t){return/[\u0080-\uFFFF]/.test(t)&&(t=unescape(encodeURIComponent(t))),t}function u(t){var e,n=[],r=t.length;for(e=0;e<r-1;e+=2)n.push(parseInt(t.substr(e,2),16));return String.fromCharCode.apply(String,n)}function c(){this.reset()}var l=["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];return a(o("hello")),"undefined"==typeof ArrayBuffer||ArrayBuffer.prototype.slice||function(){function e(t,e){return(t=0|t||0)<0?Math.max(t+e,0):Math.min(t,e)}ArrayBuffer.prototype.slice=function(n,r){var o,i,a,s,u=this.byteLength,c=e(n,u),l=u;return r!==t&&(l=e(r,u)),c>l?new ArrayBuffer(0):(o=l-c,i=new ArrayBuffer(o),a=new Uint8Array(i),s=new Uint8Array(this,c,o),a.set(s),i)}}(),c.prototype.append=function(t){return this.appendBinary(s(t)),this},c.prototype.appendBinary=function(t){this._buff+=t,this._length+=t.length;var r,o=this._buff.length;for(r=64;r<=o;r+=64)e(this._hash,n(this._buff.substring(r-64,r)));return this._buff=this._buff.substring(r-64),this},c.prototype.end=function(t){var e,n,r=this._buff,o=r.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(e=0;e<o;e+=1)i[e>>2]|=r.charCodeAt(e)<<(e%4<<3);return this._finish(i,o),n=a(this._hash),t&&(n=u(n)),this.reset(),n},c.prototype.reset=function(){return this._buff="",this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},c.prototype.getState=function(){return{buff:this._buff,length:this._length,hash:this._hash}},c.prototype.setState=function(t){return this._buff=t.buff,this._length=t.length,this._hash=t.hash,this},c.prototype.destroy=function(){delete this._hash,delete this._buff,delete this._length},c.prototype._finish=function(t,n){var r,o,i,a=n;if(t[a>>2]|=128<<(a%4<<3),a>55)for(e(this._hash,t),a=0;a<16;a+=1)t[a]=0;r=(r=8*this._length).toString(16).match(/(.*?)(.{0,8})$/),o=parseInt(r[2],16),i=parseInt(r[1],16)||0,t[14]=o,t[15]=i,e(this._hash,t)},c.hash=function(t,e){return c.hashBinary(s(t),e)},c.hashBinary=function(t,e){var n=a(o(t));return e?u(n):n},c.ArrayBuffer=function(){this.reset()},c.ArrayBuffer.prototype.append=function(t){var n,o=function(t,e,n){var r=new Uint8Array(t.byteLength+e.byteLength);return r.set(new Uint8Array(t)),r.set(new Uint8Array(e),t.byteLength),r}(this._buff.buffer,t),i=o.length;for(this._length+=t.byteLength,n=64;n<=i;n+=64)e(this._hash,r(o.subarray(n-64,n)));return this._buff=n-64<i?new Uint8Array(o.buffer.slice(n-64)):new Uint8Array(0),this},c.ArrayBuffer.prototype.end=function(t){var e,n,r=this._buff,o=r.length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];for(e=0;e<o;e+=1)i[e>>2]|=r[e]<<(e%4<<3);return this._finish(i,o),n=a(this._hash),t&&(n=u(n)),this.reset(),n},c.ArrayBuffer.prototype.reset=function(){return this._buff=new Uint8Array(0),this._length=0,this._hash=[1732584193,-271733879,-1732584194,271733878],this},c.ArrayBuffer.prototype.getState=function(){var t=c.prototype.getState.call(this);return t.buff=function(t){return String.fromCharCode.apply(null,new Uint8Array(t))}(t.buff),t},c.ArrayBuffer.prototype.setState=function(t){return t.buff=function(t,e){var n,r=t.length,o=new ArrayBuffer(r),i=new Uint8Array(o);for(n=0;n<r;n+=1)i[n]=t.charCodeAt(n);return i}(t.buff),c.prototype.setState.call(this,t)},c.ArrayBuffer.prototype.destroy=c.prototype.destroy,c.ArrayBuffer.prototype._finish=c.prototype._finish,c.ArrayBuffer.hash=function(t,n){var o=a(function(t){var n,o,i,a,s,u,c=t.length,l=[1732584193,-271733879,-1732584194,271733878];for(n=64;n<=c;n+=64)e(l,r(t.subarray(n-64,n)));for(o=(t=n-64<c?t.subarray(n-64):new Uint8Array(0)).length,i=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],n=0;n<o;n+=1)i[n>>2]|=t[n]<<(n%4<<3);if(i[n>>2]|=128<<(n%4<<3),n>55)for(e(l,i),n=0;n<16;n+=1)i[n]=0;return a=(a=8*c).toString(16).match(/(.*?)(.{0,8})$/),s=parseInt(a[2],16),u=parseInt(a[1],16)||0,i[14]=s,i[15]=u,e(l,i),l}(new Uint8Array(t)));return n?u(o):o},c}()}()},function(t,e,n){function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0,e.UploadManager=void 0;var o=r(n(18)),i=r(n(34)),a=r(n(17)),s=n(12),u=n(93);e.UploadManager=function(){function t(e,n,r){var o=this;(0,a.default)(this,t),this.config=(0,i.default)({useCdnDomain:!0,disableStatisticsReport:!1,retryCount:3,checkByMD5:!1,uphost:null,forceDirect:!1,concurrentRequestLimit:3,region:null},e.config),this.putExtra=(0,i.default)({fname:"",params:{},mimeType:null},e.putExtra),this.statisticsLogger=r,this.progress=null,this.xhrList=[],this.xhrHandler=function(t){return o.xhrList.push(t)},this.aborted=!1,this.file=e.file,this.key=e.key,this.token=e.token,this.onData=function(){},this.onError=function(){},this.onComplete=function(){},this.retryCount=0,(0,i.default)(this,n)}return t.prototype.putFile=function(){var t=this;if(this.aborted=!1,this.putExtra.fname||(this.putExtra.fname=this.file.name),!this.putExtra.mimeType||!this.putExtra.mimeType.length||(0,s.isContainFileMimeType)(this.file.type,this.putExtra.mimeType)){var e=(0,s.getUploadUrl)(this.config,this.token).then(function(e){return t.uploadUrl=e,t.uploadAt=(new Date).getTime(),t.config.forceDirect?t.directUpload():t.file.size>4194304?t.resumeUpload():t.directUpload()});return e.then(function(e){t.onComplete(e.data),t.config.disableStatisticsReport||t.sendLog(e.reqId,200)},function(e){if(t.clear(),e.isRequestError&&!t.config.disableStatisticsReport){var n=t.aborted?"":e.reqId,r=t.aborted?-2:e.code;t.sendLog(n,r)}var o=e.isRequestError&&0===e.code&&!t.aborted,i=++t.retryCount<=t.config.retryCount;o&&i?t.putFile():t.onError(e)}),e}var n=new Error("file type doesn't match with what you specify");this.onError(n)},t.prototype.clear=function(){this.xhrList.forEach(function(t){return t.abort()}),this.xhrList=[]},t.prototype.stop=function(){this.clear(),this.aborted=!0},t.prototype.sendLog=function(t,e){this.statisticsLogger.log({code:e,reqId:t,host:(0,s.getDomainFromUrl)(this.uploadUrl),remoteIp:"",port:(0,s.getPortFromUrl)(this.uploadUrl),duration:((new Date).getTime()-this.uploadAt)/1e3,time:Math.floor(this.uploadAt/1e3),bytesSent:this.progress?this.progress.total.loaded:0,upType:"jssdk-h5",size:this.file.size},this.token)},t.prototype.directUpload=function(){var t=this,e=new FormData;return e.append("file",this.file),e.append("token",this.token),null!=this.key&&e.append("key",this.key),e.append("fname",this.putExtra.fname),(0,s.filterParams)(this.putExtra.params).forEach(function(t){return e.append(t[0],t[1])}),(0,s.request)(this.uploadUrl,{method:"POST",body:e,onProgress:function(e){t.updateDirectProgress(e.loaded,e.total)},onCreate:this.xhrHandler}).then(function(e){return t.finishDirectProgress(),e})},t.prototype.resumeUpload=function(){var t=this;this.loaded={mkFileProgress:0,chunks:null},this.ctxList=[],this.localInfo=(0,s.getLocalFileInfo)(this.file),this.chunks=(0,s.getChunks)(this.file,4194304),this.initChunksProgress();var e=new u.Pool(function(e){return t.uploadChunk(e)},this.config.concurrentRequestLimit),n=this.chunks.map(function(t,n){return e.enqueue({chunk:t,index:n})}),r=o.default.all(n).then(function(){return t.mkFileReq()});return r.then(function(e){(0,s.removeLocalFileInfo)(t.file)},function(e){701!==e.code||(0,s.removeLocalFileInfo)(t.file)}),r},t.prototype.uploadChunk=function(t){var e=this,n=t.index,r=t.chunk,i=this.localInfo[n],a=this.uploadUrl+"/mkblk/"+r.size,u=i&&!(0,s.isChunkExpired)(i.time),c=this.config.checkByMD5,l=function(){return e.updateChunkProgress(r.size,n),e.ctxList[n]={ctx:i.ctx,size:i.size,time:i.time,md5:i.md5},o.default.resolve(null)};return u&&!c?l():(0,s.computeMd5)(r).then(function(t){if(u&&t===i.md5)return l();var o=(0,s.getHeadersForChunkUpload)(e.token),c=function(t){e.updateChunkProgress(t.loaded,n)},f=e.xhrHandler;return(0,s.request)(a,{method:"POST",headers:o,body:r,onProgress:c,onCreate:f}).then(function(o){c({loaded:r.size}),e.ctxList[n]={time:(new Date).getTime(),ctx:o.data.ctx,size:r.size,md5:t},(0,s.setLocalFileInfo)(e.file,e.ctxList)})})},t.prototype.mkFileReq=function(){var t=this,e=(0,i.default)({mimeType:"application/octet-stream"},this.putExtra),n=(0,s.createMkFileUrl)(this.uploadUrl,this.file.size,this.key,e),r=this.ctxList.map(function(t){return t.ctx}).join(","),a=(0,s.getHeadersForMkFile)(this.token),u=this.xhrHandler;return(0,s.request)(n,{method:"POST",body:r,headers:a,onCreate:u}).then(function(e){return t.updateMkFileProgress(1),o.default.resolve(e)})},t.prototype.updateDirectProgress=function(t,e){this.progress={total:this.getProgressInfoItem(t,e+1)},this.onData(this.progress)},t.prototype.finishDirectProgress=function(){if(!this.progress)return this.progress={total:this.getProgressInfoItem(this.file.size,this.file.size)},void this.onData(this.progress);var t=this.progress.total;this.progress={total:this.getProgressInfoItem(t.loaded+1,t.size)},this.onData(this.progress)},t.prototype.initChunksProgress=function(){this.loaded.chunks=this.chunks.map(function(t){return 0}),this.notifyResumeProgress()},t.prototype.updateChunkProgress=function(t,e){this.loaded.chunks[e]=t,this.notifyResumeProgress()},t.prototype.updateMkFileProgress=function(t){this.loaded.mkFileProgress=t,this.notifyResumeProgress()},t.prototype.notifyResumeProgress=function(){var t=this;this.progress={total:this.getProgressInfoItem((0,s.sum)(this.loaded.chunks)+this.loaded.mkFileProgress,this.file.size+1),chunks:this.chunks.map(function(e,n){return t.getProgressInfoItem(t.loaded.chunks[n],e.size)})},this.onData(this.progress)},t.prototype.getProgressInfoItem=function(t,e){return{loaded:t,size:e,percent:t/e*100}},t}()},function(t,e,n){function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0,e.Pool=void 0;var o=r(n(18)),i=r(n(17));e.Pool=function(){function t(e,n){(0,i.default)(this,t),this.runTask=e,this.queue=[],this.processing=[],this.limit=n}return t.prototype.enqueue=function(t){var e=this;return new o.default(function(n,r){e.queue.push({task:t,resolve:n,reject:r}),e.check()})},t.prototype.run=function(t){var e=this;this.queue=this.queue.filter(function(e){return e!==t}),this.processing.push(t),this.runTask(t.task).then(function(){e.processing=e.processing.filter(function(e){return e!==t}),t.resolve(),e.check()},function(e){return t.reject(e)})},t.prototype.check=function(){var t=this,e=this.processing.length,n=this.limit-e;this.queue.slice(0,n).forEach(function(e,n){t.run(e)})},t}()},function(t,e,n){function r(t,e){return t=encodeURIComponent(t),"/"!==e.slice(e.length-1)&&(e+="/"),e+t}function o(t,e,n){if(!/^\d$/.test(t.mode))throw"mode should be number in imageView2";var o=t.mode,i=t.w,a=t.h,s=t.q,u=t.format;if(!i&&!a)throw"param w and h is empty in imageView2";var c="imageView2/"+encodeURIComponent(o);return c+=i?"/w/"+encodeURIComponent(i):"",c+=a?"/h/"+encodeURIComponent(a):"",c+=s?"/q/"+encodeURIComponent(s):"",c+=u?"/format/"+encodeURIComponent(u):"",e&&(c=r(e,n)+"?"+c),c}function i(t,e,n){var o=t["auto-orient"],i=t.thumbnail,a=t.strip,s=t.gravity,u=t.crop,c=t.quality,l=t.rotate,f=t.format,p=t.blur,d="imageMogr2";return d+=o?"/auto-orient":"",d+=i?"/thumbnail/"+encodeURIComponent(i):"",d+=a?"/strip":"",d+=s?"/gravity/"+encodeURIComponent(s):"",d+=c?"/quality/"+encodeURIComponent(c):"",d+=u?"/crop/"+encodeURIComponent(u):"",d+=l?"/rotate/"+encodeURIComponent(l):"",d+=f?"/format/"+encodeURIComponent(f):"",d+=p?"/blur/"+encodeURIComponent(p):"",e&&(d=r(e,n)+"?"+d),d}function a(t,e,n){var o=t.mode;if(!o)throw"mode can't be empty in watermark";var i="watermark/"+o;if(1!==o&&2!==o)throw"mode is wrong";if(1===o){var a=t.image;if(!a)throw"image can't be empty in watermark";i+=a?"/image/"+(0,u.urlSafeBase64Encode)(a):""}if(2===o){var s=t.text,c=t.font,l=t.fontsize,f=t.fill;if(!s)throw"text can't be empty in watermark";i+=s?"/text/"+(0,u.urlSafeBase64Encode)(s):"",i+=c?"/font/"+(0,u.urlSafeBase64Encode)(c):"",i+=l?"/fontsize/"+l:"",i+=f?"/fill/"+(0,u.urlSafeBase64Encode)(f):""}var p=t.dissolve,d=t.gravity,h=t.dx,g=t.dy;return i+=p?"/dissolve/"+encodeURIComponent(p):"",i+=d?"/gravity/"+encodeURIComponent(d):"",i+=h?"/dx/"+encodeURIComponent(h):"",i+=g?"/dy/"+encodeURIComponent(g):"",e&&(i=r(e,n)+"?"+i),i}e.__esModule=!0,e.imageView2=o,e.imageMogr2=i,e.watermark=a,e.imageInfo=function(t,e){var n=r(t,e)+"?imageInfo";return(0,s.request)(n,{method:"GET"})},e.exif=function(t,e){var n=r(t,e)+"?exif";return(0,s.request)(n,{method:"GET"})},e.pipeline=function(t,e,n){var s=void 0,u=void 0,c="";if("[object Array]"===Object.prototype.toString.call(t)){for(var l=0,f=t.length;l<f;l++){if(!(s=t[l]).fop)throw"fop can't be empty in pipeline";switch(s.fop){case"watermark":c+=a(s)+"|";break;case"imageView2":c+=o(s)+"|";break;case"imageMogr2":c+=i(s)+"|";break;default:u=!0}if(u)throw"fop is wrong in pipeline"}if(e){var p=(c=r(e,n)+"?"+c).length;"|"===c.slice(p-1)&&(c=c.slice(0,p-1))}return c}throw"pipeline's first param should be array"};var s=n(12),u=n(56)},function(t,e,n){function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0,e.Observable=void 0;var o=r(n(96)),i=r(n(17));e.Observable=function(){function t(e){(0,i.default)(this,t),this.subscribeAction=e}return t.prototype.subscribe=function(t,e,n){var r=new a(t,e,n),o=this.subscribeAction(r);return new s(r,o)},t}();var a=function(){function t(e,n,r){(0,i.default)(this,t),this.isStopped=!1,"object"===(void 0===e?"undefined":(0,o.default)(e))?(this._onNext=e.next,this._onError=e.error,this._onCompleted=e.complete):(this._onNext=e,this._onError=n,this._onCompleted=r)}return t.prototype.next=function(t){!this.isStopped&&this._onNext&&this._onNext(t)},t.prototype.error=function(t){!this.isStopped&&this._onError&&(this.isStopped=!0,this._onError(t))},t.prototype.complete=function(t){!this.isStopped&&this._onCompleted&&(this.isStopped=!0,this._onCompleted(t))},t}(),s=function(){function t(e,n){(0,i.default)(this,t),this.observer=e,this.result=n}return t.prototype.unsubscribe=function(){this.observer.isStopped=!0,this.result()},t}()},function(t,e,n){function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var o=r(n(97)),i=r(n(99)),a="function"==typeof i.default&&"symbol"==typeof o.default?function(t){return typeof t}:function(t){return t&&"function"==typeof i.default&&t.constructor===i.default&&t!==i.default.prototype?"symbol":typeof t};e.default="function"==typeof i.default&&"symbol"===a(o.default)?function(t){return void 0===t?"undefined":a(t)}:function(t){return t&&"function"==typeof i.default&&t.constructor===i.default&&t!==i.default.prototype?"symbol":void 0===t?"undefined":a(t)}},function(t,e,n){t.exports={default:n(98),__esModule:!0}},function(t,e,n){n(41),n(50),t.exports=n(37).f("iterator")},function(t,e,n){t.exports={default:n(100),__esModule:!0}},function(t,e,n){n(101),n(40),n(107),n(108),t.exports=n(1).Symbol},function(t,e,n){var r=n(0),o=n(9),i=n(8),a=n(4),s=n(44),u=n(102).KEY,c=n(10),l=n(30),f=n(23),p=n(22),d=n(2),h=n(37),g=n(38),m=n(103),v=n(104),y=n(3),_=n(7),b=n(11),I=n(28),M=n(21),S=n(45),E=n(105),C=n(106),w=n(6),A=n(15),T=C.f,O=w.f,P=E.f,k=r.Symbol,x=r.JSON,F=x&&x.stringify,R=d("_hidden"),U=d("toPrimitive"),G={}.propertyIsEnumerable,D=l("symbol-registry"),N=l("symbols"),L=l("op-symbols"),j=Object.prototype,$="function"==typeof k,q=r.QObject,B=!q||!q.prototype||!q.prototype.findChild,H=i&&c(function(){return 7!=S(O({},"a",{get:function(){return O(this,"a",{value:7}).a}})).a})?function(t,e,n){var r=T(j,e);r&&delete j[e],O(t,e,n),r&&t!==j&&O(j,e,r)}:O,z=function(t){var e=N[t]=S(k.prototype);return e._k=t,e},V=$&&"symbol"==typeof k.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof k},K=function t(e,n,r){return e===j&&t(L,n,r),y(e),n=I(n,!0),y(r),o(N,n)?(r.enumerable?(o(e,R)&&e[R][n]&&(e[R][n]=!1),r=S(r,{enumerable:M(0,!1)})):(o(e,R)||O(e,R,M(1,{})),e[R][n]=!0),H(e,n,r)):O(e,n,r)},W=function(t,e){y(t);for(var n,r=m(e=b(e)),o=0,i=r.length;i>o;)K(t,n=r[o++],e[n]);return t},J=function(t){var e=G.call(this,t=I(t,!0));return!(this===j&&o(N,t)&&!o(L,t))&&(!(e||!o(this,t)||!o(N,t)||o(this,R)&&this[R][t])||e)},Y=function(t,e){if(t=b(t),e=I(e,!0),t!==j||!o(N,e)||o(L,e)){var n=T(t,e);return!n||!o(N,e)||o(t,R)&&t[R][e]||(n.enumerable=!0),n}},X=function(t){for(var e,n=P(b(t)),r=[],i=0;n.length>i;)o(N,e=n[i++])||e==R||e==u||r.push(e);return r},Q=function(t){for(var e,n=t===j,r=P(n?L:b(t)),i=[],a=0;r.length>a;)!o(N,e=r[a++])||n&&!o(j,e)||i.push(N[e]);return i};$||(s((k=function(){if(this instanceof k)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function e(n){this===j&&e.call(L,n),o(this,R)&&o(this[R],t)&&(this[R][t]=!1),H(this,t,M(1,n))};return i&&B&&H(j,t,{configurable:!0,set:e}),z(t)}).prototype,"toString",function(){return this._k}),C.f=Y,w.f=K,n(57).f=E.f=X,n(24).f=J,n(35).f=Q,i&&!n(13)&&s(j,"propertyIsEnumerable",J,!0),h.f=function(t){return z(d(t))}),a(a.G+a.W+a.F*!$,{Symbol:k});for(var Z="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),tt=0;Z.length>tt;)d(Z[tt++]);for(var et=A(d.store),nt=0;et.length>nt;)g(et[nt++]);a(a.S+a.F*!$,"Symbol",{for:function(t){return o(D,t+="")?D[t]:D[t]=k(t)},keyFor:function(t){if(!V(t))throw TypeError(t+" is not a symbol!");for(var e in D)if(D[e]===t)return e},useSetter:function(){B=!0},useSimple:function(){B=!1}}),a(a.S+a.F*!$,"Object",{create:function(t,e){return void 0===e?S(t):W(S(t),e)},defineProperty:K,defineProperties:W,getOwnPropertyDescriptor:Y,getOwnPropertyNames:X,getOwnPropertySymbols:Q}),x&&a(a.S+a.F*(!$||c(function(){var t=k();return"[null]"!=F([t])||"{}"!=F({a:t})||"{}"!=F(Object(t))})),"JSON",{stringify:function(t){for(var e,n,r=[t],o=1;arguments.length>o;)r.push(arguments[o++]);if(n=e=r[1],(_(e)||void 0!==t)&&!V(t))return v(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!V(e))return e}),r[1]=e,F.apply(x,r)}}),k.prototype[U]||n(5)(k.prototype,U,k.prototype.valueOf),f(k,"Symbol"),f(Math,"Math",!0),f(r.JSON,"JSON",!0)},function(t,e,n){var r=n(22)("meta"),o=n(7),i=n(9),a=n(6).f,s=0,u=Object.isExtensible||function(){return!0},c=!n(10)(function(){return u(Object.preventExtensions({}))}),l=function(t){a(t,r,{value:{i:"O"+ ++s,w:{}}})},f=t.exports={KEY:r,NEED:!1,fastKey:function(t,e){if(!o(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!i(t,r)){if(!u(t))return"F";if(!e)return"E";l(t)}return t[r].i},getWeak:function(t,e){if(!i(t,r)){if(!u(t))return!0;if(!e)return!1;l(t)}return t[r].w},onFreeze:function(t){return c&&f.NEED&&u(t)&&!i(t,r)&&l(t),t}}},function(t,e,n){var r=n(15),o=n(35),i=n(24);t.exports=function(t){var e=r(t),n=o.f;if(n)for(var a,s=n(t),u=i.f,c=0;s.length>c;)u.call(t,a=s[c++])&&e.push(a);return e}},function(t,e,n){var r=n(16);t.exports=Array.isArray||function(t){return"Array"==r(t)}},function(t,e,n){var r=n(11),o=n(57).f,i={}.toString,a="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[];t.exports.f=function(t){return a&&"[object Window]"==i.call(t)?function(t){try{return o(t)}catch(t){return a.slice()}}(t):o(r(t))}},function(t,e,n){var r=n(24),o=n(21),i=n(11),a=n(28),s=n(9),u=n(43),c=Object.getOwnPropertyDescriptor;e.f=n(8)?c:function(t,e){if(t=i(t),e=a(e,!0),u)try{return c(t,e)}catch(t){}if(s(t,e))return o(!r.f.call(t,e),t[e])}},function(t,e,n){n(38)("asyncIterator")},function(t,e,n){n(38)("observable")},function(t,e,n){function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0,e.StatisticsLogger=void 0;var o=r(n(36)),i=r(n(17)),a=n(12);e.StatisticsLogger=function(){function t(){(0,i.default)(this,t)}return t.prototype.log=function(t,e){var n="";(0,o.default)(t).forEach(function(e){return n+=t[e]+","}),this.send(n,e,0)},t.prototype.send=function(t,e,n){var r=(0,a.createXHR)(),o=this;r.open("POST","https://uplog.qbox.me/log/3"),r.setRequestHeader("Content-type","application/x-www-form-urlencoded"),r.setRequestHeader("Authorization","UpToken "+e),r.onreadystatechange=function(){4===r.readyState&&200!==r.status&&++n<=3&&o.send(t,e,n)},r.send(t)},t}()},function(t,e,n){function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var o=r(n(18)),i=r(n(34)),a=r(n(17)),s=r(n(36)),u=n(111),c=n(12),l={PNG:"image/png",JPEG:"image/jpeg",WEBP:"image/webp",BMP:"image/bmp"},f=Math.log(2),p=(0,s.default)(l).map(function(t){return l[t]}),d=l.JPEG,h=function(){function t(e,n){(0,a.default)(this,t),this.config=(0,i.default)({quality:.92,noCompressIfLarger:!1},n),this.file=e}return t.prototype.process=function(){var t=this;this.outputType=this.file.type;var e={};return function(t){return p.includes(t)}(this.file.type)?this.getOriginImage().then(function(e){return t.getCanvas(e)}).then(function(n){var r=1;return t.config.maxWidth&&(r=Math.min(1,t.config.maxWidth/n.width)),t.config.maxHeight&&(r=Math.min(1,r,t.config.maxHeight/n.height)),e.width=n.width,e.height=n.height,t.doScale(n,r)}).then(function(n){var r=t.toBlob(n);return r.size>t.file.size&&t.config.noCompressIfLarger?{dist:t.file,width:e.width,height:e.height}:{dist:r,width:n.width,height:n.height}}):o.default.reject(new Error("unsupported file type: "+this.file.type))},t.prototype.clear=function(t,e,n){this.outputType===d?(t.fillStyle="#fff",t.fillRect(0,0,e,n)):t.clearRect(0,0,e,n)},t.prototype.getOriginImage=function(){var t=this;return new o.default(function(e,n){var r=(0,c.createObjectURL)(t.file),o=new Image;o.onload=function(){e(o)},o.onerror=function(){n("image load error")},o.src=r})},t.prototype.getCanvas=function(t){var e=this;return new o.default(function(n,r){u.EXIF.getData(t,function(){var r=u.EXIF.getTag(t,"Orientation")||1,o=(0,c.getTransform)(t,r),i=o.width,a=o.height,s=o.matrix,l=document.createElement("canvas"),f=l.getContext("2d");l.width=i,l.height=a,e.clear(f,i,a),f.transform.apply(f,s),f.drawImage(t,0,0),n(l)})})},t.prototype.doScale=function(t,e){if(1===e)return o.default.resolve(t);var n=t.getContext("2d"),r=Math.min(4,Math.ceil(1/e/f)),i=Math.pow(e,1/r),a=document.createElement("canvas"),s=a.getContext("2d"),u=t.width,c=t.height,l=u,p=c;a.width=u,a.height=c;for(var d=void 0,h=void 0,g=0;g<r;g++){var m=u*i|0,v=c*i|0;g===r-1&&(m=l*e,v=p*e),g%2==0?(d=t,h=s):(d=a,h=n),this.clear(h,u,c),h.drawImage(d,0,0,u,c,0,0,m,v),u=m,c=v}var y=d===t?a:t,_=h.getImageData(0,0,u,c);return y.width=u,y.height=c,h.putImageData(_,0,0),o.default.resolve(y)},t.prototype.toBlob=function(t){var e=t.toDataURL(this.outputType,this.config.quality),n=atob(e.split(",")[1]).split("").map(function(t){return t.charCodeAt(0)});return new Blob([new Uint8Array(n)],{type:this.outputType})},t}();e.default=function(t,e){return new h(t,e).process()}},function(t,e,r){var o;(function(){function r(t){return!!t.exifdata}function i(t,e){function n(n){var r=a(n);t.exifdata=r||{};var o=function(t){var e=new DataView(t);if(h&&console.log("Got file of length "+t.byteLength," at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"),255!=e.getUint8(0)||216!=e.getUint8(1))return h&&console.log("Not a valid JPEG"," at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"),!1;for(var n=2,r=t.byteLength;n<r;){if(function(t,e){return 56===t.getUint8(e)&&66===t.getUint8(e+1)&&73===t.getUint8(e+2)&&77===t.getUint8(e+3)&&4===t.getUint8(e+4)&&4===t.getUint8(e+5)}(e,n)){var o=e.getUint8(n+7);return o%2!=0&&(o+=1),0===o&&(o=4),s(t,n+8+o,e.getUint16(n+6+o))}n++}}(n);if(t.iptcdata=o||{},g.isXmpEnabled){var i=function(t){if("DOMParser"in self){var e=new DataView(t);if(h&&console.log("Got file of length "+t.byteLength," at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"),255!=e.getUint8(0)||216!=e.getUint8(1))return h&&console.log("Not a valid JPEG"," at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"),!1;for(var n=2,r=t.byteLength,o=new DOMParser;n<r-4;){if("http"==l(e,n,4)){var i=n-1,a=e.getUint16(n-2)-1,s=l(e,i,a),u=s.indexOf("xmpmeta>")+8,c=(s=s.substring(s.indexOf("<x:xmpmeta"),u)).indexOf("x:xmpmeta")+10;return s=s.slice(0,c)+'xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:tiff="http://ns.adobe.com/tiff/1.0/" xmlns:plus="http://schemas.android.com/apk/lib/com.google.android.gms.plus" xmlns:ext="http://www.gettyimages.com/xsltExtension/1.0" xmlns:exif="http://ns.adobe.com/exif/1.0/" xmlns:stEvt="http://ns.adobe.com/xap/1.0/sType/ResourceEvent#" xmlns:stRef="http://ns.adobe.com/xap/1.0/sType/ResourceRef#" xmlns:crs="http://ns.adobe.com/camera-raw-settings/1.0/" xmlns:xapGImg="http://ns.adobe.com/xap/1.0/g/img/" xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/" '+s.slice(c),d(o.parseFromString(s,"text/xml"))}n++}}}(n);t.xmpdata=i||{}}e&&e.call(t)}if(t.src)if(/^data\:/i.test(t.src))n(function(t,e){e=e||t.match(/^data\:([^\;]+)\;base64,/im)[1]||"",t=t.replace(/^data\:([^\;]+)\;base64,/gim,"");for(var n=atob(t),r=n.length,o=new ArrayBuffer(r),i=new Uint8Array(o),a=0;a<r;a++)i[a]=n.charCodeAt(a);return o}(t.src));else if(/^blob\:/i.test(t.src))(o=new FileReader).onload=function(t){n(t.target.result)},function(t,e){var n=new XMLHttpRequest;n.open("GET",t,!0),n.responseType="blob",n.onload=function(t){200!=this.status&&0!==this.status||e(this.response)},n.send()}(t.src,function(t){o.readAsArrayBuffer(t)});else{var r=new XMLHttpRequest;r.onload=function(){if(200!=this.status&&0!==this.status)throw"Could not load image";n(r.response),r=null},r.open("GET",t.src,!0),r.responseType="arraybuffer",r.send(null)}else if(self.FileReader&&(t instanceof self.Blob||t instanceof self.File)){var o;(o=new FileReader).onload=function(t){h&&console.log("Got file of length "+t.target.result.byteLength," at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"),n(t.target.result)},o.readAsArrayBuffer(t)}}function a(t){var e=new DataView(t);if(h&&console.log("Got file of length "+t.byteLength," at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"),255!=e.getUint8(0)||216!=e.getUint8(1))return h&&console.log("Not a valid JPEG"," at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"),!1;for(var n,r=2,o=t.byteLength;r<o;){if(255!=e.getUint8(r))return h&&console.log("Not a valid marker at offset "+r+", found: "+e.getUint8(r)," at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"),!1;if(n=e.getUint8(r+1),h&&console.log(n," at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"),225==n)return h&&console.log("Found 0xFFE1 marker"," at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"),f(e,r+4,e.getUint16(r+2));r+=2+e.getUint16(r+2)}}function s(t,e,n){for(var r,o,i,a,s=new DataView(t),u={},c=e;c<e+n;)28===s.getUint8(c)&&2===s.getUint8(c+1)&&(a=s.getUint8(c+2))in I&&(i=s.getInt16(c+3),o=I[a],r=l(s,c+5,i),u.hasOwnProperty(o)?u[o]instanceof Array?u[o].push(r):u[o]=[u[o],r]:u[o]=r),c++;return u}function u(t,e,n,r,o){var i,a,s,u=t.getUint16(n,!o),l={};for(s=0;s<u;s++)i=n+12*s+2,!(a=r[t.getUint16(i,!o)])&&h&&console.log("Unknown tag: "+t.getUint16(i,!o)," at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"),l[a]=c(t,i,e,n,o);return l}function c(t,e,n,r,o){var i,a,s,u,c,f,p=t.getUint16(e+2,!o),d=t.getUint32(e+4,!o),h=t.getUint32(e+8,!o)+n;switch(p){case 1:case 7:if(1==d)return t.getUint8(e+8,!o);for(i=d>4?h:e+8,a=[],u=0;u<d;u++)a[u]=t.getUint8(i+u);return a;case 2:return l(t,i=d>4?h:e+8,d-1);case 3:if(1==d)return t.getUint16(e+8,!o);for(i=d>2?h:e+8,a=[],u=0;u<d;u++)a[u]=t.getUint16(i+2*u,!o);return a;case 4:if(1==d)return t.getUint32(e+8,!o);for(a=[],u=0;u<d;u++)a[u]=t.getUint32(h+4*u,!o);return a;case 5:if(1==d)return c=t.getUint32(h,!o),f=t.getUint32(h+4,!o),(s=new Number(c/f)).numerator=c,s.denominator=f,s;for(a=[],u=0;u<d;u++)c=t.getUint32(h+8*u,!o),f=t.getUint32(h+4+8*u,!o),a[u]=new Number(c/f),a[u].numerator=c,a[u].denominator=f;return a;case 9:if(1==d)return t.getInt32(e+8,!o);for(a=[],u=0;u<d;u++)a[u]=t.getInt32(h+4*u,!o);return a;case 10:if(1==d)return t.getInt32(h,!o)/t.getInt32(h+4,!o);for(a=[],u=0;u<d;u++)a[u]=t.getInt32(h+8*u,!o)/t.getInt32(h+4+8*u,!o);return a}}function l(t,e,r){var o="";for(n=e;n<e+r;n++)o+=String.fromCharCode(t.getUint8(n));return o}function f(t,e){if("Exif"!=l(t,e,4))return h&&console.log("Not valid EXIF data! "+l(t,e,4)," at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"),!1;var n,r,o,i,a,s=e+6;if(18761==t.getUint16(s))n=!1;else{if(19789!=t.getUint16(s))return h&&console.log("Not valid TIFF data! (no 0x4949 or 0x4D4D)"," at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"),!1;n=!0}if(42!=t.getUint16(s+2,!n))return h&&console.log("Not valid TIFF data! (no 0x002A)"," at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"),!1;var c=t.getUint32(s+4,!n);if(c<8)return h&&console.log("Not valid TIFF data! (First offset less than 8)",t.getUint32(s+4,!n)," at node_modules\\qiniu-js\\dist\\qiniu.min.js:1"),!1;if((r=u(t,s,s+c,v,n)).ExifIFDPointer)for(o in i=u(t,s,s+r.ExifIFDPointer,m,n)){switch(o){case"LightSource":case"Flash":case"MeteringMode":case"ExposureProgram":case"SensingMethod":case"SceneCaptureType":case"SceneType":case"CustomRendered":case"WhiteBalance":case"GainControl":case"Contrast":case"Saturation":case"Sharpness":case"SubjectDistanceRange":case"FileSource":i[o]=b[o][i[o]];break;case"ExifVersion":case"FlashpixVersion":i[o]=String.fromCharCode(i[o][0],i[o][1],i[o][2],i[o][3]);break;case"ComponentsConfiguration":i[o]=b.Components[i[o][0]]+b.Components[i[o][1]]+b.Components[i[o][2]]+b.Components[i[o][3]]}r[o]=i[o]}if(r.GPSInfoIFDPointer)for(o in a=u(t,s,s+r.GPSInfoIFDPointer,y,n)){switch(o){case"GPSVersionID":a[o]=a[o][0]+"."+a[o][1]+"."+a[o][2]+"."+a[o][3]}r[o]=a[o]}return r.thumbnail=function(t,e,n,r){var o=function(t,e,n){var r=t.getUint16(e,!n);return t.getUint32(e+2+12*r,!n)}(t,e+n,r);if(!o)return{};if(o>t.byteLength)return{};var i=u(t,e,e+o,_,r);if(i.Compression)switch(i.Compression){case 6:if(i.JpegIFOffset&&i.JpegIFByteCount){var a=e+i.JpegIFOffset,s=i.JpegIFByteCount;i.blob=new Blob([new Uint8Array(t.buffer,a,s)],{type:"image/jpeg"})}break;case 1:console.log("Thumbnail image format is TIFF, which is not implemented."," at node_modules\\qiniu-js\\dist\\qiniu.min.js:1");break;default:console.log("Unknown thumbnail image format '%s'",i.Compression," at node_modules\\qiniu-js\\dist\\qiniu.min.js:1")}else 2==i.PhotometricInterpretation&&console.log("Thumbnail image format is RGB, which is not implemented."," at node_modules\\qiniu-js\\dist\\qiniu.min.js:1");return i}(t,s,c,n),r}function p(t){var e={};if(1==t.nodeType){if(t.attributes.length>0){e["@attributes"]={};for(var n=0;n<t.attributes.length;n++){var r=t.attributes.item(n);e["@attributes"][r.nodeName]=r.nodeValue}}}else if(3==t.nodeType)return t.nodeValue;if(t.hasChildNodes())for(var o=0;o<t.childNodes.length;o++){var i=t.childNodes.item(o),a=i.nodeName;if(null==e[a])e[a]=p(i);else{if(null==e[a].push){var s=e[a];e[a]=[],e[a].push(s)}e[a].push(p(i))}}return e}function d(t){try{var e={};if(t.children.length>0)for(var n=0;n<t.children.length;n++){var r=t.children.item(n),o=r.attributes;for(var i in o){var a=o[i],s=a.nodeName,u=a.nodeValue;void 0!==s&&(e[s]=u)}var c=r.nodeName;if(void 0===e[c])e[c]=p(r);else{if(void 0===e[c].push){var l=e[c];e[c]=[],e[c].push(l)}e[c].push(p(r))}}else e=t.textContent;return e}catch(t){console.log(t.message," at node_modules\\qiniu-js\\dist\\qiniu.min.js:1")}}var h=!1,g=function t(e){return e instanceof t?e:this instanceof t?void(this.EXIFwrapped=e):new t(e)};void 0!==t&&t.exports&&(e=t.exports=g),e.EXIF=g;var m=g.Tags={36864:"ExifVersion",40960:"FlashpixVersion",40961:"ColorSpace",40962:"PixelXDimension",40963:"PixelYDimension",37121:"ComponentsConfiguration",37122:"CompressedBitsPerPixel",37500:"MakerNote",37510:"UserComment",40964:"RelatedSoundFile",36867:"DateTimeOriginal",36868:"DateTimeDigitized",37520:"SubsecTime",37521:"SubsecTimeOriginal",37522:"SubsecTimeDigitized",33434:"ExposureTime",33437:"FNumber",34850:"ExposureProgram",34852:"SpectralSensitivity",34855:"ISOSpeedRatings",34856:"OECF",37377:"ShutterSpeedValue",37378:"ApertureValue",37379:"BrightnessValue",37380:"ExposureBias",37381:"MaxApertureValue",37382:"SubjectDistance",37383:"MeteringMode",37384:"LightSource",37385:"Flash",37396:"SubjectArea",37386:"FocalLength",41483:"FlashEnergy",41484:"SpatialFrequencyResponse",41486:"FocalPlaneXResolution",41487:"FocalPlaneYResolution",41488:"FocalPlaneResolutionUnit",41492:"SubjectLocation",41493:"ExposureIndex",41495:"SensingMethod",41728:"FileSource",41729:"SceneType",41730:"CFAPattern",41985:"CustomRendered",41986:"ExposureMode",41987:"WhiteBalance",41988:"DigitalZoomRation",41989:"FocalLengthIn35mmFilm",41990:"SceneCaptureType",41991:"GainControl",41992:"Contrast",41993:"Saturation",41994:"Sharpness",41995:"DeviceSettingDescription",41996:"SubjectDistanceRange",40965:"InteroperabilityIFDPointer",42016:"ImageUniqueID"},v=g.TiffTags={256:"ImageWidth",257:"ImageHeight",34665:"ExifIFDPointer",34853:"GPSInfoIFDPointer",40965:"InteroperabilityIFDPointer",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",274:"Orientation",277:"SamplesPerPixel",284:"PlanarConfiguration",530:"YCbCrSubSampling",531:"YCbCrPositioning",282:"XResolution",283:"YResolution",296:"ResolutionUnit",273:"StripOffsets",278:"RowsPerStrip",279:"StripByteCounts",513:"JPEGInterchangeFormat",514:"JPEGInterchangeFormatLength",301:"TransferFunction",318:"WhitePoint",319:"PrimaryChromaticities",529:"YCbCrCoefficients",532:"ReferenceBlackWhite",306:"DateTime",270:"ImageDescription",271:"Make",272:"Model",305:"Software",315:"Artist",33432:"Copyright"},y=g.GPSTags={0:"GPSVersionID",1:"GPSLatitudeRef",2:"GPSLatitude",3:"GPSLongitudeRef",4:"GPSLongitude",5:"GPSAltitudeRef",6:"GPSAltitude",7:"GPSTimeStamp",8:"GPSSatellites",9:"GPSStatus",10:"GPSMeasureMode",11:"GPSDOP",12:"GPSSpeedRef",13:"GPSSpeed",14:"GPSTrackRef",15:"GPSTrack",16:"GPSImgDirectionRef",17:"GPSImgDirection",18:"GPSMapDatum",19:"GPSDestLatitudeRef",20:"GPSDestLatitude",21:"GPSDestLongitudeRef",22:"GPSDestLongitude",23:"GPSDestBearingRef",24:"GPSDestBearing",25:"GPSDestDistanceRef",26:"GPSDestDistance",27:"GPSProcessingMethod",28:"GPSAreaInformation",29:"GPSDateStamp",30:"GPSDifferential"},_=g.IFD1Tags={256:"ImageWidth",257:"ImageHeight",258:"BitsPerSample",259:"Compression",262:"PhotometricInterpretation",273:"StripOffsets",274:"Orientation",277:"SamplesPerPixel",278:"RowsPerStrip",279:"StripByteCounts",282:"XResolution",283:"YResolution",284:"PlanarConfiguration",296:"ResolutionUnit",513:"JpegIFOffset",514:"JpegIFByteCount",529:"YCbCrCoefficients",530:"YCbCrSubSampling",531:"YCbCrPositioning",532:"ReferenceBlackWhite"},b=g.StringValues={ExposureProgram:{0:"Not defined",1:"Manual",2:"Normal program",3:"Aperture priority",4:"Shutter priority",5:"Creative program",6:"Action program",7:"Portrait mode",8:"Landscape mode"},MeteringMode:{0:"Unknown",1:"Average",2:"CenterWeightedAverage",3:"Spot",4:"MultiSpot",5:"Pattern",6:"Partial",255:"Other"},LightSource:{0:"Unknown",1:"Daylight",2:"Fluorescent",3:"Tungsten (incandescent light)",4:"Flash",9:"Fine weather",10:"Cloudy weather",11:"Shade",12:"Daylight fluorescent (D 5700 - 7100K)",13:"Day white fluorescent (N 4600 - 5400K)",14:"Cool white fluorescent (W 3900 - 4500K)",15:"White fluorescent (WW 3200 - 3700K)",17:"Standard light A",18:"Standard light B",19:"Standard light C",20:"D55",21:"D65",22:"D75",23:"D50",24:"ISO studio tungsten",255:"Other"},Flash:{0:"Flash did not fire",1:"Flash fired",5:"Strobe return light not detected",7:"Strobe return light detected",9:"Flash fired, compulsory flash mode",13:"Flash fired, compulsory flash mode, return light not detected",15:"Flash fired, compulsory flash mode, return light detected",16:"Flash did not fire, compulsory flash mode",24:"Flash did not fire, auto mode",25:"Flash fired, auto mode",29:"Flash fired, auto mode, return light not detected",31:"Flash fired, auto mode, return light detected",32:"No flash function",65:"Flash fired, red-eye reduction mode",69:"Flash fired, red-eye reduction mode, return light not detected",71:"Flash fired, red-eye reduction mode, return light detected",73:"Flash fired, compulsory flash mode, red-eye reduction mode",77:"Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected",79:"Flash fired, compulsory flash mode, red-eye reduction mode, return light detected",89:"Flash fired, auto mode, red-eye reduction mode",93:"Flash fired, auto mode, return light not detected, red-eye reduction mode",95:"Flash fired, auto mode, return light detected, red-eye reduction mode"},SensingMethod:{1:"Not defined",2:"One-chip color area sensor",3:"Two-chip color area sensor",4:"Three-chip color area sensor",5:"Color sequential area sensor",7:"Trilinear sensor",8:"Color sequential linear sensor"},SceneCaptureType:{0:"Standard",1:"Landscape",2:"Portrait",3:"Night scene"},SceneType:{1:"Directly photographed"},CustomRendered:{0:"Normal process",1:"Custom process"},WhiteBalance:{0:"Auto white balance",1:"Manual white balance"},GainControl:{0:"None",1:"Low gain up",2:"High gain up",3:"Low gain down",4:"High gain down"},Contrast:{0:"Normal",1:"Soft",2:"Hard"},Saturation:{0:"Normal",1:"Low saturation",2:"High saturation"},Sharpness:{0:"Normal",1:"Soft",2:"Hard"},SubjectDistanceRange:{0:"Unknown",1:"Macro",2:"Close view",3:"Distant view"},FileSource:{3:"DSC"},Components:{0:"",1:"Y",2:"Cb",3:"Cr",4:"R",5:"G",6:"B"}},I={120:"caption",110:"credit",25:"keywords",55:"dateCreated",80:"byline",85:"bylineTitle",122:"captionWriter",105:"headline",116:"copyright",15:"category"};g.enableXmp=function(){g.isXmpEnabled=!0},g.disableXmp=function(){g.isXmpEnabled=!1},g.getData=function(t,e){return!((self.Image&&t instanceof self.Image||self.HTMLImageElement&&t instanceof self.HTMLImageElement)&&!t.complete||(r(t)?e&&e.call(t):i(t,e),0))},g.getTag=function(t,e){if(r(t))return t.exifdata[e]},g.getIptcTag=function(t,e){if(r(t))return t.iptcdata[e]},g.getAllTags=function(t){if(!r(t))return{};var e,n=t.exifdata,o={};for(e in n)n.hasOwnProperty(e)&&(o[e]=n[e]);return o},g.getAllIptcTags=function(t){if(!r(t))return{};var e,n=t.iptcdata,o={};for(e in n)n.hasOwnProperty(e)&&(o[e]=n[e]);return o},g.pretty=function(t){if(!r(t))return"";var e,n=t.exifdata,o="";for(e in n)n.hasOwnProperty(e)&&("object"==typeof n[e]?n[e]instanceof Number?o+=e+" : "+n[e]+" ["+n[e].numerator+"/"+n[e].denominator+"]\r\n":o+=e+" : ["+n[e].length+" values]\r\n":o+=e+" : "+n[e]+"\r\n");return o},g.readFromBinaryFile=function(t){return a(t)},void 0===(o=function(){return g}.apply(e,[]))||(t.exports=o)}).call(this)}])})},c8ba:function(t,e){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(r){"object"===typeof window&&(n=window)}t.exports=n},d2c1:function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("fd71"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},d48a:function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("cbe0"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},df5e:function(t,e,n){"use strict";function r(t){this.key=t.key,this.requestConfig={key:t.key,s:"rsx",platform:"WXJS",appname:t.key,sdkversion:"1.2.0",logversion:"2.0"}}r.prototype.getWxLocation=function(t,e){wx.getLocation({type:"gcj02",success:function(t){var n=t.longitude+","+t.latitude;wx.setStorage({key:"userLocation",data:n}),e(n)},fail:function(n){wx.getStorage({key:"userLocation",success:function(t){t.data&&e(t.data)}}),t.fail({errCode:"0",errMsg:n.errMsg||""})}})},r.prototype.getRegeo=function(t){function e(e){var r=n.requestConfig;wx.request({url:"https://restapi.amap.com/v3/geocode/regeo",data:{key:n.key,location:e,extensions:"all",s:r.s,platform:r.platform,appname:n.key,sdkversion:r.sdkversion,logversion:r.logversion},method:"GET",header:{"content-type":"application/json"},success:function(n){var r,o,i,a,s,u,c,l,f;n.data.status&&"1"==n.data.status?(r=n.data.regeocode,o=r.addressComponent,i=[],a="",r&&r.roads[0]&&r.roads[0].name&&(a=r.roads[0].name+"附近"),s=e.split(",")[0],u=e.split(",")[1],r.pois&&r.pois[0]&&(a=r.pois[0].name+"附近",c=r.pois[0].location,c&&(s=parseFloat(c.split(",")[0]),u=parseFloat(c.split(",")[1]))),o.provice&&i.push(o.provice),o.city&&i.push(o.city),o.district&&i.push(o.district),o.streetNumber&&o.streetNumber.street&&o.streetNumber.number?(i.push(o.streetNumber.street),i.push(o.streetNumber.number)):(l="",r&&r.roads[0]&&r.roads[0].name&&(l=r.roads[0].name),i.push(l)),i=i.join(""),f=[{iconPath:t.iconPath,width:t.iconWidth,height:t.iconHeight,name:i,desc:a,longitude:s,latitude:u,id:0,regeocodeData:r}],t.success(f)):t.fail({errCode:n.data.infocode,errMsg:n.data.info})},fail:function(e){t.fail({errCode:"0",errMsg:e.errMsg||""})}})}var n=this;t.location?e(t.location):n.getWxLocation(t,function(t){e(t)})},r.prototype.getWeather=function(t){function e(e){var n="base";t.type&&"forecast"==t.type&&(n="all"),wx.request({url:"https://restapi.amap.com/v3/weather/weatherInfo",data:{key:r.key,city:e,extensions:n,s:o.s,platform:o.platform,appname:r.key,sdkversion:o.sdkversion,logversion:o.logversion},method:"GET",header:{"content-type":"application/json"},success:function(e){function n(t){var e={city:{text:"城市",data:t.city},weather:{text:"天气",data:t.weather},temperature:{text:"温度",data:t.temperature},winddirection:{text:"风向",data:t.winddirection+"风"},windpower:{text:"风力",data:t.windpower+"级"},humidity:{text:"湿度",data:t.humidity+"%"}};return e}var r,o;e.data.status&&"1"==e.data.status?e.data.lives?(r=e.data.lives,r&&r.length>0&&(r=r[0],o=n(r),o["liveData"]=r,t.success(o))):e.data.forecasts&&e.data.forecasts[0]&&t.success({forecast:e.data.forecasts[0]}):t.fail({errCode:e.data.infocode,errMsg:e.data.info})},fail:function(e){t.fail({errCode:"0",errMsg:e.errMsg||""})}})}function n(n){wx.request({url:"https://restapi.amap.com/v3/geocode/regeo",data:{key:r.key,location:n,extensions:"all",s:o.s,platform:o.platform,appname:r.key,sdkversion:o.sdkversion,logversion:o.logversion},method:"GET",header:{"content-type":"application/json"},success:function(n){var r,o;n.data.status&&"1"==n.data.status?(o=n.data.regeocode,o.addressComponent?r=o.addressComponent.adcode:o.aois&&o.aois.length>0&&(r=o.aois[0].adcode),e(r)):t.fail({errCode:n.data.infocode,errMsg:n.data.info})},fail:function(e){t.fail({errCode:"0",errMsg:e.errMsg||""})}})}var r=this,o=r.requestConfig;t.city?e(t.city):r.getWxLocation(t,function(t){n(t)})},r.prototype.getPoiAround=function(t){function e(e){var o={key:n.key,location:e,s:r.s,platform:r.platform,appname:n.key,sdkversion:r.sdkversion,logversion:r.logversion};t.querytypes&&(o["types"]=t.querytypes),t.querykeywords&&(o["keywords"]=t.querykeywords),wx.request({url:"https://restapi.amap.com/v3/place/around",data:o,method:"GET",header:{"content-type":"application/json"},success:function(e){var n,r,o,i;if(e.data.status&&"1"==e.data.status){if(e=e.data,e&&e.pois){for(n=[],r=0;r<e.pois.length;r++)o=0==r?t.iconPathSelected:t.iconPath,n.push({latitude:parseFloat(e.pois[r].location.split(",")[1]),longitude:parseFloat(e.pois[r].location.split(",")[0]),iconPath:o,width:22,height:32,id:r,name:e.pois[r].name,address:e.pois[r].address});i={markers:n,poisData:e.pois},t.success(i)}}else t.fail({errCode:e.data.infocode,errMsg:e.data.info})},fail:function(e){t.fail({errCode:"0",errMsg:e.errMsg||""})}})}var n=this,r=n.requestConfig;t.location?e(t.location):n.getWxLocation(t,function(t){e(t)})},r.prototype.getStaticmap=function(t){function e(e){o.push("location="+e),t.zoom&&o.push("zoom="+t.zoom),t.size&&o.push("size="+t.size),t.scale&&o.push("scale="+t.scale),t.markers&&o.push("markers="+t.markers),t.labels&&o.push("labels="+t.labels),t.paths&&o.push("paths="+t.paths),t.traffic&&o.push("traffic="+t.traffic);var n=i+o.join("&");t.success({url:n})}var n,r=this,o=[],i="https://restapi.amap.com/v3/staticmap?";o.push("key="+r.key),n=r.requestConfig,o.push("s="+n.s),o.push("platform="+n.platform),o.push("appname="+n.appname),o.push("sdkversion="+n.sdkversion),o.push("logversion="+n.logversion),t.location?e(t.location):r.getWxLocation(t,function(t){e(t)})},r.prototype.getInputtips=function(t){var e=this,n=e.requestConfig,r={key:e.key,s:n.s,platform:n.platform,appname:e.key,sdkversion:n.sdkversion,logversion:n.logversion};t.location&&(r["location"]=t.location),t.keywords&&(r["keywords"]=t.keywords),t.type&&(r["type"]=t.type),t.city&&(r["city"]=t.city),t.citylimit&&(r["citylimit"]=t.citylimit),wx.request({url:"https://restapi.amap.com/v3/assistant/inputtips",data:r,method:"GET",header:{"content-type":"application/json"},success:function(e){e&&e.data&&e.data.tips&&t.success({tips:e.data.tips})},fail:function(e){t.fail({errCode:"0",errMsg:e.errMsg||""})}})},r.prototype.getDrivingRoute=function(t){var e=this,n=e.requestConfig,r={key:e.key,s:n.s,platform:n.platform,appname:e.key,sdkversion:n.sdkversion,logversion:n.logversion};t.origin&&(r["origin"]=t.origin),t.destination&&(r["destination"]=t.destination),t.strategy&&(r["strategy"]=t.strategy),t.waypoints&&(r["waypoints"]=t.waypoints),t.avoidpolygons&&(r["avoidpolygons"]=t.avoidpolygons),t.avoidroad&&(r["avoidroad"]=t.avoidroad),wx.request({url:"https://restapi.amap.com/v3/direction/driving",data:r,method:"GET",header:{"content-type":"application/json"},success:function(e){e&&e.data&&e.data.route&&t.success({paths:e.data.route.paths,taxi_cost:e.data.route.taxi_cost||""})},fail:function(e){t.fail({errCode:"0",errMsg:e.errMsg||""})}})},r.prototype.getWalkingRoute=function(t){var e=this,n=e.requestConfig,r={key:e.key,s:n.s,platform:n.platform,appname:e.key,sdkversion:n.sdkversion,logversion:n.logversion};t.origin&&(r["origin"]=t.origin),t.destination&&(r["destination"]=t.destination),wx.request({url:"https://restapi.amap.com/v3/direction/walking",data:r,method:"GET",header:{"content-type":"application/json"},success:function(e){e&&e.data&&e.data.route&&t.success({paths:e.data.route.paths})},fail:function(e){t.fail({errCode:"0",errMsg:e.errMsg||""})}})},r.prototype.getTransitRoute=function(t){var e=this,n=e.requestConfig,r={key:e.key,s:n.s,platform:n.platform,appname:e.key,sdkversion:n.sdkversion,logversion:n.logversion};t.origin&&(r["origin"]=t.origin),t.destination&&(r["destination"]=t.destination),t.strategy&&(r["strategy"]=t.strategy),t.city&&(r["city"]=t.city),t.cityd&&(r["cityd"]=t.cityd),wx.request({url:"https://restapi.amap.com/v3/direction/transit/integrated",data:r,method:"GET",header:{"content-type":"application/json"},success:function(e){if(e&&e.data&&e.data.route){var n=e.data.route;t.success({distance:n.distance||"",taxi_cost:n.taxi_cost||"",transits:n.transits})}},fail:function(e){t.fail({errCode:"0",errMsg:e.errMsg||""})}})},r.prototype.getRidingRoute=function(t){var e=this,n=e.requestConfig,r={key:e.key,s:n.s,platform:n.platform,appname:e.key,sdkversion:n.sdkversion,logversion:n.logversion};t.origin&&(r["origin"]=t.origin),t.destination&&(r["destination"]=t.destination),wx.request({url:"https://restapi.amap.com/v4/direction/bicycling",data:r,method:"GET",header:{"content-type":"application/json"},success:function(e){e&&e.data&&e.data.data&&t.success({paths:e.data.data.paths})},fail:function(e){t.fail({errCode:"0",errMsg:e.errMsg||""})}})},t.exports.AMapWX=r},e223:function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("5d32"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},efd7:function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("dd7b"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},f3b0:function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("04f4"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},f9f7:function(t,e,n){"use strict";(function(t){n("5d6c");r(n("66fd"));var e=r(n("8b40"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])}}]);
});
define('static/js/webim.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = function () {
  /* webim javascript SDK
   * VER 1.7.0
   */

  /* webim API definitions
   */
  var msgCache = {};
  var webim = {
    // namespace object webim

    /* function init
     *   sdk登录
     * params:
     *   loginInfo      - Object, 登录身份相关参数集合，详见下面
     *   {
     *     sdkAppID     - String, 用户标识接入SDK的应用ID，必填
     *     accountType  - int, 账号类型，必填
     *     identifier   - String, 用户帐号,必须是字符串类型，必填
     *     identifierNick   - String, 用户昵称，选填
     *     userSig      - String, 鉴权Token，必须是字符串类型，必填
     *   }
     *   listeners      - Object, 事件回调函数集合, 详见下面
     *   {
     *     onConnNotify - function(connInfo), 用于收到连接状态相关通知的回调函数,目前未使用
     *     jsonpCallback -function(rspData),//IE9(含)以下浏览器用到的jsonp回调函数
     *     onMsgNotify  - function(newMsgList), 用于收到消息通知的回调函数,
     *      newMsgList为新消息数组，格式为[Msg对象]
     *      使用方有两种处理回调: 1)处理newMsgList中的增量消息,2)直接访问webim.MsgStore获取最新的消息
     *     onGroupInfoChangeNotify  - function(groupInfo), 用于监听群组资料变更的回调函数,
     *          groupInfo为新的群组资料信息
     *     onGroupSystemNotifys - Object, 用于监听（多终端同步）群系统消息的回调函数对象
     *
     *   }
     *   options        - Object, 其它选项, 目前未使用
     * return:
     *   (无)
     */
    login: function login(loginInfo, listeners, options) {},

    /* function syncMsgs
     *   拉取最新C2C消息
     *   一般不需要使用方直接调用, SDK底层会自动同步最新消息并通知使用方, 一种有用的调用场景是用户手动触发刷新消息
     * params:
     *   cbOk   - function(msgList)类型, 当同步消息成功时的回调函数, msgList为新消息数组，格式为[Msg对象],
     *            如果此参数为null或undefined则同步消息成功后会像自动同步那样回调cbNotify
     *   cbErr  - function(err)类型, 当同步消息失败时的回调函数, err为错误对象
     * return:
     *   (无)
     */
    syncMsgs: function syncMsgs(cbOk, cbErr) {},

    /* function getC2CHistoryMsgs
     * 拉取C2C漫游消息
     * params:
     *   options    - 请求参数
     *   cbOk   - function(msgList)类型, 成功时的回调函数, msgList为消息数组，格式为[Msg对象],
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    getC2CHistoryMsgs: function getC2CHistoryMsgs(options, cbOk, cbErr) {},

    /* function syncGroupMsgs
     * 拉取群漫游消息
     * params:
     *   options    - 请求参数
     *   cbOk   - function(msgList)类型, 成功时的回调函数, msgList为消息数组，格式为[Msg对象],
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    syncGroupMsgs: function syncGroupMsgs(options, cbOk, cbErr) {},

    /* function sendMsg
     *   发送一条消息
     * params:
     *   msg    - webim.Msg类型, 要发送的消息对象
     *   cbOk   - function()类型, 当发送消息成功时的回调函数
     *   cbErr  - function(err)类型, 当发送消息失败时的回调函数, err为错误对象
     * return:
     *   (无)
     */
    sendMsg: function sendMsg(msg, cbOk, cbErr) {},

    /* function logout
     *   sdk登出
     * params:
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    logout: function logout(cbOk, cbErr) {},

    /* function setAutoRead
     * 设置会话自动已读上报标志
     * params:
     *   selSess    - webim.Session类型, 当前会话
     *   isOn   - boolean, 将selSess的自动已读消息标志改为isOn，同时是否上报当前会话已读消息
     *   isResetAll - boolean，是否重置所有会话的自动已读标志
     * return:
     *   (无)
     */
    setAutoRead: function setAutoRead(selSess, isOn, isResetAll) {},

    /* function getProfilePortrait
     *   拉取资料（搜索用户）
     * params:
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    getProfilePortrait: function getProfilePortrait(options, cbOk, cbErr) {},

    /* function setProfilePortrait
     *   设置个人资料
     * params:
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    setProfilePortrait: function setProfilePortrait(options, cbOk, cbErr) {},

    /* function applyAddFriend
     *   申请添加好友
     * params:
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    applyAddFriend: function applyAddFriend(options, cbOk, cbErr) {},

    /* function getPendency
     *   拉取好友申请
     * params:
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    getPendency: function getPendency(options, cbOk, cbErr) {},

    /* function deletePendency
     *   删除好友申请
     * params:
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    deletePendency: function deletePendency(options, cbOk, cbErr) {},

    /* function responseFriend
     *   响应好友申请
     * params:
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    responseFriend: function responseFriend(options, cbOk, cbErr) {},

    /* function getAllFriend
     *   拉取我的好友
     * params:
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    getAllFriend: function getAllFriend(options, cbOk, cbErr) {},

    /* function deleteFriend
     *   删除好友
     * params:
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    deleteFriend: function deleteFriend(options, cbOk, cbErr) {},

    /* function addBlackList
     *   增加黑名单
     * params:
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    addBlackList: function addBlackList(options, cbOk, cbErr) {},

    /* function getBlackList
     *   删除黑名单
     * params:
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    getBlackList: function getBlackList(options, cbOk, cbErr) {},

    /* function deleteBlackList
     *   我的黑名单
     * params:
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    deleteBlackList: function deleteBlackList(options, cbOk, cbErr) {},

    /* function uploadPic
     *   上传图片
     * params:
     *   options    - 请求参数，详见api文档
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    uploadPic: function uploadPic(options, cbOk, cbErr) {},

    /* function createGroup
     *   创建群
     * params:
     *   options    - 请求参数，详见api文档
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    createGroup: function createGroup(options, cbOk, cbErr) {},

    /* function applyJoinGroup
     *   申请加群
     * params:
     *   options    - 请求参数，详见api文档
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    applyJoinGroup: function applyJoinGroup(options, cbOk, cbErr) {},

    /* function handleApplyJoinGroup
     *   处理申请加群(同意或拒绝)
     * params:
     *   options    - 请求参数，详见api文档
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    handleApplyJoinGroup: function handleApplyJoinGroup(options, cbOk, cbErr) {},

    /* function deleteApplyJoinGroupPendency
     *   删除加群申请
     * params:
     *   options    - 请求参数，详见api文档
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    deleteApplyJoinGroupPendency: function deleteApplyJoinGroupPendency(options, cbOk, cbErr) {},

    /* function quitGroup
     *  主动退群
     * params:
     *   options    - 请求参数，详见api文档
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    quitGroup: function quitGroup(options, cbOk, cbErr) {},

    /* function getGroupPublicInfo
     *   读取群公开资料-高级接口
     * params:
     *   options    - 请求参数，详见api文档
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    getGroupPublicInfo: function getGroupPublicInfo(options, cbOk, cbErr) {},

    /* function getGroupInfo
     *   读取群详细资料-高级接口
     * params:
     *   options    - 请求参数，详见api文档
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    getGroupInfo: function getGroupInfo(options, cbOk, cbErr) {},

    /* function modifyGroupBaseInfo
     *   修改群基本资料
     * params:
     *   options    - 请求参数，详见api文档
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    modifyGroupBaseInfo: function modifyGroupBaseInfo(options, cbOk, cbErr) {},

    /* function destroyGroup
     *  解散群
     * params:
     *   options    - 请求参数，详见api文档
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    destroyGroup: function destroyGroup(options, cbOk, cbErr) {},

    /* function getJoinedGroupListHigh
     *   获取我的群组-高级接口
     * params:
     *   options    - 请求参数，详见api文档
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    getJoinedGroupListHigh: function getJoinedGroupListHigh(options, cbOk, cbErr) {},

    /* function getGroupMemberInfo
     *   获取群组成员列表
     * params:
     *   options    - 请求参数，详见api文档
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    getGroupMemberInfo: function getGroupMemberInfo(options, cbOk, cbErr) {},

    /* function addGroupMember
     *   邀请好友加群
     * params:
     *   options    - 请求参数，详见api文档
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    addGroupMember: function addGroupMember(options, cbOk, cbErr) {},

    /* function modifyGroupMember
     *   修改群成员资料（角色或者群消息提类型示）
     * params:
     *   options    - 请求参数，详见api文档
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    modifyGroupMember: function modifyGroupMember(options, cbOk, cbErr) {},

    /* function forbidSendMsg
     *   设置群成员禁言时间
     * params:
     *   options    - 请求参数，详见api文档
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    forbidSendMsg: function forbidSendMsg(options, cbOk, cbErr) {},

    /* function deleteGroupMember
     *   删除群成员
     * params:
     *   options    - 请求参数，详见api文档
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    deleteGroupMember: function deleteGroupMember(options, cbOk, cbErr) {},

    /* function getPendencyGroup
     *   获取群组未决列表
     * params:
     *   options    - 请求参数，详见api文档
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    getPendencyGroup: function getPendencyGroup(options, cbOk, cbErr) {},

    /* function getPendencyReport
     *   好友未决已读上报
     * params:
     *   options    - 请求参数，详见api文档
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    getPendencyReport: function getPendencyReport(options, cbOk, cbErr) {},

    /* function getPendencyGroupRead
     *   群组未决已读上报
     * params:
     *   options    - 请求参数，详见api文档
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    getPendencyGroupRead: function getPendencyGroupRead(options, cbOk, cbErr) {},

    /* function sendCustomGroupNotify
     *   发送自定义群通知
     * params:
     *   options    - 请求参数，详见api文档
     *   cbOk   - function()类型, 成功时回调函数
     *   cbErr  - function(err)类型, 失败时回调函数, err为错误对象
     * return:
     *   (无)
     */
    sendCustomGroupNotify: function sendCustomGroupNotify(options, cbOk, cbErr) {},

    /* class webim.Msg
     *   一条消息的描述类, 消息发送、接收的API中都会涉及此类型的对象
     * properties:
     *   sess   - Session object-ref, 消息所属的会话(e.g:我与好友A的C2C会话，我与群组G的GROUP会话)
     *   isSend - Boolean, true表示是我发出消息, false表示是发给我的消息)
     *   seq    - Integer, 消息序列号, 用于判断消息是否同一条
     *   random - Integer, 消息随机数,用于判断消息是否同一条
     *   time   - Integer, 消息时间戳, 为unix timestamp
     *   fromAccount -String,  消息发送者帐号
     *   subType -Integer,  消息子类型，c2c消息时，0-表示普通消息；群消息时，0-普通消息，1-点赞消息，2-提示消息
     *   fromAccountNick -String,  消息发送者昵称
     *   elems  - Array of webim.Msg.Elem, 描述消息内容的元素列表
     * constructor:
     *   Msg(sess, isSend, seq,random time,fromAccount) - 构造函数, 参数定义同上面properties中定义
     * methods:
     *   addText(text)  - 向elems中添加一个TEXT元素
     *   addFace(face)  - 向elems中添加一个FACE元素
     *   toHtml()       - 转成可展示的html String
     *addFace
     * sub-class webim.Msg.Elem
     *   消息中一个组成元素的描述类, 一条消息的内容被抽象描述为N个元素的有序列表
     * properties:
     *   type   - 元素类型, 目前有TEXT(文本)、FACE(表情)、IMAGE(图片)等
     *   content- 元素内容体, 当TEXT时为String, 当PIC时为UrlString
     * constructor:
     *   Elem(type, content) - 构造函数, 参数定义同上面properties中定义
     *
     * sub-class webim.Msg.Elem.TextElem
     *   文本
     * properties:
     *   text  - String 内容
     * constructor:
     *   TextElem(text) - 构造函数, 参数定义同上面properties中定义
     *
     * sub-class webim.Msg.Elem.FaceElem
     *   表情
     * properties:
     *   index  - Integer 表情索引, 用户自定义
     *   data   - String 额外数据，用户自定义
     * constructor:
     *   FaceElem(index,data) - 构造函数, 参数定义同上面properties中定义
     *
     *
     */
    Msg: function Msg(sess, isSend, seq, random, time, fromAccount, subType, fromAccountNick) {
      /*Class constructor*/
    },

    /* singleton object MsgStore
     * webim.MsgStore是消息数据的Model对象(参考MVC概念), 它提供接口访问当前存储的会话和消息数据
     * 下面说明下会话数据类型: Session
     *
     * class Session
     *   一个Session对象描述一个会话，会话可简单理解为最近会话列表的一个条目，它由两个字段唯一标识:
     *     type - String, 会话类型(如"C2C", "GROUP", ...)
     *     id   - String, 会话ID(如C2C类型中为对方帐号,"C2C"时为好友ID,"GROUP"时为群ID)
     * properties:
     *   (Session对象未对外暴露任何属性字段, 所有访问通过下面的getter方法进行)
     * methods:
     *   type()     - String, 返回会话类型,"C2C"表示与好友私聊，"GROUP"表示群聊
     *   id()       - String, 返回会话ID
     *   name()     - String, 返回会话标题(如C2C类型中为对方的昵称,暂不支持)
     *   icon()     - String, 返回会话图标(对C2C类型中为对方的头像URL，暂不支持)
     *   unread()           - Integer, 返回会话未读条数
     *   time()     - Integer, 返回会话最后活跃时间, 为unix timestamp
     *   curMaxMsgSeq() - Integer, 返回会话最大消息序列号
     *   msgCount() - Integer, 返回会话中所有消息条数
     *   msg(index) - webim.Msg, 返回会话中第index条消息
     */
    MsgStore: {
      /* function sessMap
       *   获取所有会话
       * return:
       *   所有会话对象
       */
      sessMap: function sessMap() {
        return {
          /*Object*/
        };
      },

      /* function sessCount
       *   获取当前会话的个数
       * return:
       *   Integer, 会话个数
       */
      sessCount: function sessCount() {
        return 0;
      },

      /* function sessByTypeId
       *   根据会话类型和会话ID取得相应会话
       * params:
       *   type   - String, 会话类型(如"C2C", "GROUP", ...)
       *   id     - String, 会话ID(如对方ID)
       * return:
       *   Session, 会话对象(说明见上面)
       */
      sessByTypeId: function sessByTypeId(type, id) {
        return {
          /*Session Object*/
        };
      },

      /* function delSessByTypeId
       *   根据会话类型和会话ID删除相应会话
       * params:
       *   type   - String, 会话类型(如"C2C", "GROUP", ...)
       *   id     - String, 会话ID(如对方ID)
       * return:
       *   Boolean, 布尔类型
       */
      delSessByTypeId: function delSessByTypeId(type, id) {
        return true;
      },

      /* function resetCookieAndSyncFlag
       *   重置上一次读取新c2c消息Cookie和是否继续拉取标记
       * return:
       *
       */
      resetCookieAndSyncFlag: function resetCookieAndSyncFlag() {},
      downloadMap: {}
    }
  };
  /* webim API implementation
   */

  (function (webim) {
    //sdk版本
    var SDK = {
      'VERSION': '1.7.0',
      //sdk版本号
      'APPID': '537048168',
      //web im sdk 版本 APPID
      'PLAATFORM': "10" //发送请求时判断其是来自web端的请求

    }; //是否启用正式环境，默认启用

    var isAccessFormaEnvironment = true; // var isAccessFormaEnvironment = false;
    //后台接口主机

    var SRV_HOST = {
      'FORMAL': {
        'COMMON': 'https://webim.tim.qq.com',
        'PIC': 'https://pic.tim.qq.com'
      },
      'TEST': {
        'COMMON': 'https://test.tim.qq.com',
        'PIC': 'https://pic.tim.qq.com'
      }
    }; //浏览器版本信息

    var BROWSER_INFO = {}; //是否为ie9（含）以下

    var lowerBR = false; //服务名称

    var SRV_NAME = {
      'OPEN_IM': 'openim',
      //私聊（拉取未读c2c消息，长轮询，c2c消息已读上报等）服务名
      'GROUP': 'group_open_http_svc',
      //群组管理（拉取群消息，创建群，群成员管理，群消息已读上报等）服务名
      'FRIEND': 'sns',
      //关系链管理（好友管理，黑名单管理等）服务名
      'PROFILE': 'profile',
      //资料管理（查询，设置个人资料等）服务名
      'RECENT_CONTACT': 'recentcontact',
      //最近联系人服务名
      'PIC': 'openpic',
      //图片（或文件）服务名
      'BIG_GROUP': 'group_open_http_noauth_svc',
      //直播大群 群组管理（申请加大群）服务名
      'BIG_GROUP_LONG_POLLING': 'group_open_long_polling_http_noauth_svc',
      //直播大群 长轮询（拉取消息等）服务名
      'IM_OPEN_STAT': 'imopenstat',
      //质量上报，统计接口错误率
      'DEL_CHAT': 'recentcontact' //删除会话

    }; //不同服务对应的版本号

    var SRV_NAME_VER = _defineProperty({
      'openim': 'v4',
      'group_open_http_svc': 'v4',
      'sns': 'v4',
      'profile': 'v4',
      'recentcontact': 'v4',
      'openpic': 'v4',
      'group_open_http_noauth_svc': 'v1',
      'group_open_long_polling_http_noauth_svc': 'v1',
      'imopenstat': 'v4'
    }, "recentcontact", 'v4'); //不同的命令名对应的上报类型ID，用于接口质量上报


    var CMD_EVENT_ID_MAP = {
      'login': 1,
      //登录
      'pic_up': 3,
      //上传图片
      'apply_join_group': 9,
      //申请加入群组
      'create_group': 10,
      //创建群组
      'longpolling': 18,
      //普通长轮询
      'send_group_msg': 19,
      //群聊
      'sendmsg': 20 //私聊

    }; //聊天类型

    var SESSION_TYPE = {
      'C2C': 'C2C',
      //私聊
      'GROUP': 'GROUP' //群聊

    }; //最近联系人类型

    var RECENT_CONTACT_TYPE = {
      'C2C': 1,
      //好友
      'GROUP': 2 //群

    }; //消息最大长度（字节）

    var MSG_MAX_LENGTH = {
      'C2C': 12000,
      //私聊消息
      'GROUP': 8898 //群聊

    }; //后台接口返回类型

    var ACTION_STATUS = {
      'OK': 'OK',
      //成功
      'FAIL': 'FAIL' //失败

    };
    var ERROR_CODE_CUSTOM = 99999; //自定义后台接口返回错误码
    //消息元素类型

    var MSG_ELEMENT_TYPE = {
      'TEXT': 'TIMTextElem',
      //文本
      'FACE': 'TIMFaceElem',
      //表情
      'IMAGE': 'TIMImageElem',
      //图片
      'CUSTOM': 'TIMCustomElem',
      //自定义
      'SOUND': 'TIMSoundElem',
      //语音,只支持显示
      'FILE': 'TIMFileElem',
      //文件,只支持显示
      'LOCATION': 'TIMLocationElem',
      //地理位置
      'GROUP_TIP': 'TIMGroupTipElem' //群提示消息,只支持显示

    }; //图片类型

    var IMAGE_TYPE = {
      'ORIGIN': 1,
      //原图
      'LARGE': 2,
      //缩略大图
      'SMALL': 3 //缩略小图

    }; //图片格式

    var IMAGE_FORMAT = {
      JPG: 0x1,
      JPEG: 0x1,
      GIF: 0x2,
      PNG: 0x3,
      BMP: 0x4,
      UNKNOWN: 0xff
    }; //上传资源包类型

    var UPLOAD_RES_PKG_FLAG = {
      'RAW_DATA': 0,
      //原始数据
      'BASE64_DATA': 1 //base64编码数据

    }; //下载文件配置

    var DOWNLOAD_FILE = {
      'BUSSINESS_ID': '10001',
      //下载文件业务ID
      'AUTH_KEY': '617574686b6579',
      //下载文件authkey
      'SERVER_IP': '182.140.186.147' //下载文件服务器IP

    }; //下载文件类型

    var DOWNLOAD_FILE_TYPE = {
      "SOUND": 2106,
      //语音
      "FILE": 2107 //普通文件

    }; //上传资源类型

    var UPLOAD_RES_TYPE = {
      "IMAGE": 1,
      //图片
      "FILE": 2,
      //文件
      "SHORT_VIDEO": 3,
      //短视频
      "SOUND": 4 //语音，PTT

    }; //版本号，用于上传图片或文件接口

    var VERSION_INFO = {
      'APP_VERSION': '2.1',
      //应用版本号
      'SERVER_VERSION': 1 //服务端版本号

    }; //长轮询消息类型

    var LONG_POLLINNG_EVENT_TYPE = {
      "C2C": 1 //新的c2c消息通知
      ,
      "GROUP_COMMON": 3 //新的群普通消息
      ,
      "GROUP_TIP": 4 //新的群提示消息
      ,
      "GROUP_SYSTEM": 5 //新的群系统消息
      ,
      "GROUP_TIP2": 6 //新的群提示消息2
      ,
      "FRIEND_NOTICE": 7 //好友系统通知
      ,
      "PROFILE_NOTICE": 8 //资料系统通知
      ,
      "C2C_COMMON": 9 //新的C2C消息
      ,
      "C2C_EVENT": 10
    }; //c2c消息子类型

    var C2C_MSG_SUB_TYPE = {
      "COMMON": 0 //普通消息

    }; //c2c消息子类型

    var C2C_EVENT_SUB_TYPE = {
      "READED": 92,
      //已读消息同步
      "KICKEDOUT": 96
    }; //群消息子类型

    var GROUP_MSG_SUB_TYPE = {
      "COMMON": 0,
      //普通消息
      "LOVEMSG": 1,
      //点赞消息
      "TIP": 2,
      //提示消息
      "REDPACKET": 3 //红包消息

    }; //群消息优先级类型

    var GROUP_MSG_PRIORITY_TYPE = {
      "REDPACKET": 1,
      //红包消息
      "COMMON": 2,
      //普通消息
      "LOVEMSG": 3 //点赞消息

    }; //群提示消息类型

    var GROUP_TIP_TYPE = {
      "JOIN": 1,
      //加入群组
      "QUIT": 2,
      //退出群组
      "KICK": 3,
      //被踢出群组
      "SET_ADMIN": 4,
      //被设置为管理员
      "CANCEL_ADMIN": 5,
      //被取消管理员
      "MODIFY_GROUP_INFO": 6,
      //修改群资料
      "MODIFY_MEMBER_INFO": 7 //修改群成员信息

    }; //群提示消息-群资料变更类型

    var GROUP_TIP_MODIFY_GROUP_INFO_TYPE = {
      "FACE_URL": 1,
      //修改群头像URL
      "NAME": 2,
      //修改群名称
      "OWNER": 3,
      //修改群主
      "NOTIFICATION": 4,
      //修改群公告
      "INTRODUCTION": 5 //修改群简介

    }; //群系统消息类型

    var GROUP_SYSTEM_TYPE = {
      "JOIN_GROUP_REQUEST": 1,
      //申请加群请求（只有管理员会收到）
      "JOIN_GROUP_ACCEPT": 2,
      //申请加群被同意（只有申请人能够收到）
      "JOIN_GROUP_REFUSE": 3,
      //申请加群被拒绝（只有申请人能够收到）
      "KICK": 4,
      //被管理员踢出群(只有被踢者接收到)
      "DESTORY": 5,
      //群被解散(全员接收)
      "CREATE": 6,
      //创建群(创建者接收, 不展示)
      "INVITED_JOIN_GROUP_REQUEST": 7,
      //邀请加群(被邀请者接收)
      "QUIT": 8,
      //主动退群(主动退出者接收, 不展示)
      "SET_ADMIN": 9,
      //设置管理员(被设置者接收)
      "CANCEL_ADMIN": 10,
      //取消管理员(被取消者接收)
      "REVOKE": 11,
      //群已被回收(全员接收, 不展示)
      "READED": 15,
      //群消息已读同步
      "CUSTOM": 255,
      //用户自定义通知(默认全员接收)
      "INVITED_JOIN_GROUP_REQUEST_AGREE": 12 //邀请加群(被邀请者需同意)

    }; //好友系统通知子类型

    var FRIEND_NOTICE_TYPE = {
      "FRIEND_ADD": 1,
      //好友表增加
      "FRIEND_DELETE": 2,
      //好友表删除
      "PENDENCY_ADD": 3,
      //未决增加
      "PENDENCY_DELETE": 4,
      //未决删除
      "BLACK_LIST_ADD": 5,
      //黑名单增加
      "BLACK_LIST_DELETE": 6,
      //黑名单删除
      "PENDENCY_REPORT": 7,
      //未决已读上报
      "FRIEND_UPDATE": 8 //好友数据更新

    }; //资料系统通知子类型

    var PROFILE_NOTICE_TYPE = {
      "PROFILE_MODIFY": 1 //资料修改

    }; //腾讯登录服务错误码（用于托管模式）

    var TLS_ERROR_CODE = {
      'OK': 0,
      //成功
      'SIGNATURE_EXPIRATION': 11 //用户身份凭证过期

    }; //长轮询连接状态

    var CONNECTION_STATUS = {
      'INIT': -1,
      //初始化
      'ON': 0,
      //连接正常
      'RECONNECT': 1,
      //连接恢复正常
      'OFF': 9999 //连接已断开,可能是用户网络问题，或者长轮询接口报错引起的

    };
    var UPLOAD_PIC_BUSSINESS_TYPE = {
      //图片业务类型
      'GROUP_MSG': 1,
      //私聊图片
      'C2C_MSG': 2,
      //群聊图片
      'USER_HEAD': 3,
      //用户头像
      'GROUP_HEAD': 4 //群头像

    };
    var FRIEND_WRITE_MSG_ACTION = {
      //好友输入消息状态
      'ING': 14,
      //正在输入
      'STOP': 15 //停止输入

    }; //ajax默认超时时间，单位：毫秒

    var ajaxDefaultTimeOut = 15000; //大群长轮询接口返回正常时，延时一定时间再发起下一次请求

    var OK_DELAY_TIME = 1000; //大群长轮询接口发生错误时，延时一定时间再发起下一次请求

    var ERROR_DELAY_TIME = 5000; //群提示消息最多显示人数

    var GROUP_TIP_MAX_USER_COUNT = 10; //长轮询连接状态

    var curLongPollingStatus = CONNECTION_STATUS.INIT; //当长轮询连接断开后，是否已经回调过

    var longPollingOffCallbackFlag = false; //当前长轮询返回错误次数

    var curLongPollingRetErrorCount = 0; //长轮询默认超时时间，单位：毫秒

    var longPollingDefaultTimeOut = 60000; //长轮询返回错误次数达到一定值后，发起新的长轮询请求间隔时间，单位：毫秒

    var longPollingIntervalTime = 5000; //没有新消息时，长轮询返回60008错误码是正常的

    var longPollingTimeOutErrorCode = 60008; //多实例登录被kick的错误码

    var longPollingKickedErrorCode = 91101;
    var LongPollingId = null; //当前大群长轮询返回错误次数

    var curBigGroupLongPollingRetErrorCount = 0; //最大允许长轮询返回错误次数

    var LONG_POLLING_MAX_RET_ERROR_COUNT = 10; //上传重试累计

    var Upload_Retry_Times = 0; //最大上传重试

    var Upload_Retry_Max_Times = 20; //ie7/8/9采用jsonp方法解决ajax跨域限制

    var jsonpRequestId = 0; //jsonp请求id
    //最新jsonp请求返回的json数据

    var jsonpLastRspData = null; //兼容ie7/8/9,jsonp回调函数

    var jsonpCallback = null;
    var uploadResultIframeId = 0; //用于上传图片的iframe id

    var ipList = []; //文件下载地址

    var authkey = null; //文件下载票据

    var expireTime = null; //文件下载票据超时时间
    //错误码

    var ERROR = {}; //当前登录用户

    var ctx = {
      sdkAppID: null,
      appIDAt3rd: null,
      accountType: null,
      identifier: null,
      tinyid: null,
      identifierNick: null,
      userSig: null,
      a2: null,
      contentType: 'json',
      apn: 1
    };
    var opt = {};
    var xmlHttpObjSeq = 0; //ajax请求id

    var xmlHttpObjMap = {}; //发起的ajax请求

    var curSeq = 0; //消息seq

    var tempC2CMsgList = []; //新c2c消息临时缓存

    var tempC2CHistoryMsgList = []; //漫游c2c消息临时缓存

    var maxApiReportItemCount = 20; //一次最多上报条数

    var apiReportItems = []; //暂存api接口质量上报数据

    var Resources = {
      downloadMap: {}
    }; //表情标识字符和索引映射关系对象，用户可以自定义

    var emotionDataIndexs = {
      "[惊讶]": 0,
      "[撇嘴]": 1,
      "[色]": 2,
      "[发呆]": 3,
      "[得意]": 4,
      "[流泪]": 5,
      "[害羞]": 6,
      "[闭嘴]": 7,
      "[睡]": 8,
      "[大哭]": 9,
      "[尴尬]": 10,
      "[发怒]": 11,
      "[调皮]": 12,
      "[龇牙]": 13,
      "[微笑]": 14,
      "[难过]": 15,
      "[酷]": 16,
      "[冷汗]": 17,
      "[抓狂]": 18,
      "[吐]": 19,
      "[偷笑]": 20,
      "[可爱]": 21,
      "[白眼]": 22,
      "[傲慢]": 23,
      "[饿]": 24,
      "[困]": 25,
      "[惊恐]": 26,
      "[流汗]": 27,
      "[憨笑]": 28,
      "[大兵]": 29,
      "[奋斗]": 30,
      "[咒骂]": 31,
      "[疑问]": 32,
      "[嘘]": 33,
      "[晕]": 34
    }; //表情对象，用户可以自定义

    var emotions = {}; //工具类

    var tool = new function () {
      //格式化时间戳
      //format格式如下：
      //yyyy-MM-dd hh:mm:ss 年月日时分秒(默认格式)
      //yyyy-MM-dd 年月日
      //hh:mm:ss 时分秒
      this.formatTimeStamp = function (timestamp, format) {
        if (!timestamp) {
          return 0;
        }

        var formatTime;
        format = format || 'yyyy-MM-dd hh:mm:ss';
        var date = new Date(timestamp * 1000);
        var o = {
          "M+": date.getMonth() + 1,
          //月份
          "d+": date.getDate(),
          //日
          "h+": date.getHours(),
          //小时
          "m+": date.getMinutes(),
          //分
          "s+": date.getSeconds() //秒

        };

        if (/(y+)/.test(format)) {
          formatTime = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        } else {
          formatTime = format;
        }

        for (var k in o) {
          if (new RegExp("(" + k + ")").test(formatTime)) formatTime = formatTime.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }

        return formatTime;
      }; //根据群类型英文名转换成中文名


      this.groupTypeEn2Ch = function (type_en) {
        var type_ch = null;

        switch (type_en) {
          case 'Public':
            type_ch = '公开群';
            break;

          case 'ChatRoom':
            type_ch = '聊天室';
            break;

          case 'Private':
            type_ch = '私有群'; //即讨论组

            break;

          case 'AVChatRoom':
            type_ch = '直播聊天室';
            break;

          default:
            type_ch = type_en;
            break;
        }

        return type_ch;
      }; //根据群类型中文名转换成英文名


      this.groupTypeCh2En = function (type_ch) {
        var type_en = null;

        switch (type_ch) {
          case '公开群':
            type_en = 'Public';
            break;

          case '聊天室':
            type_en = 'ChatRoom';
            break;

          case '私有群':
            //即讨论组
            type_en = 'Private';
            break;

          case '直播聊天室':
            type_en = 'AVChatRoom';
            break;

          default:
            type_en = type_ch;
            break;
        }

        return type_en;
      }; //根据群身份英文名转换成群身份中文名


      this.groupRoleEn2Ch = function (role_en) {
        var role_ch = null;

        switch (role_en) {
          case 'Member':
            role_ch = '成员';
            break;

          case 'Admin':
            role_ch = '管理员';
            break;

          case 'Owner':
            role_ch = '群主';
            break;

          default:
            role_ch = role_en;
            break;
        }

        return role_ch;
      }; //根据群身份中文名转换成群身份英文名


      this.groupRoleCh2En = function (role_ch) {
        var role_en = null;

        switch (role_ch) {
          case '成员':
            role_en = 'Member';
            break;

          case '管理员':
            role_en = 'Admin';
            break;

          case '群主':
            role_en = 'Owner';
            break;

          default:
            role_en = role_ch;
            break;
        }

        return role_en;
      }; //根据群消息提示类型英文转换中文


      this.groupMsgFlagEn2Ch = function (msg_flag_en) {
        var msg_flag_ch = null;

        switch (msg_flag_en) {
          case 'AcceptAndNotify':
            msg_flag_ch = '接收并提示';
            break;

          case 'AcceptNotNotify':
            msg_flag_ch = '接收不提示';
            break;

          case 'Discard':
            msg_flag_ch = '屏蔽';
            break;

          default:
            msg_flag_ch = msg_flag_en;
            break;
        }

        return msg_flag_ch;
      }; //根据群消息提示类型中文名转换英文名


      this.groupMsgFlagCh2En = function (msg_flag_ch) {
        var msg_flag_en = null;

        switch (msg_flag_ch) {
          case '接收并提示':
            msg_flag_en = 'AcceptAndNotify';
            break;

          case '接收不提示':
            msg_flag_en = 'AcceptNotNotify';
            break;

          case '屏蔽':
            msg_flag_en = 'Discard';
            break;

          default:
            msg_flag_en = msg_flag_ch;
            break;
        }

        return msg_flag_en;
      }; //将空格和换行符转换成HTML标签


      this.formatText2Html = function (text) {
        var html = text;

        if (html) {
          html = this.xssFilter(html); //用户昵称或群名称等字段会出现脚本字符串

          html = html.replace(/ /g, "&nbsp;");
          html = html.replace(/\n/g, "<br/>");
        }

        return html;
      }; //将HTML标签转换成空格和换行符


      this.formatHtml2Text = function (html) {
        var text = html;

        if (text) {
          text = text.replace(/&nbsp;/g, " ");
          text = text.replace(/<br\/>/g, "\n");
        }

        return text;
      }; //获取字符串(UTF-8编码)所占字节数
      //参考：http://zh.wikipedia.org/zh-cn/UTF-8


      this.getStrBytes = function (str) {
        if (str == null || str === undefined) return 0;

        if (typeof str != "string") {
          return 0;
        }

        var total = 0,
            charCode,
            i,
            len;

        for (i = 0, len = str.length; i < len; i++) {
          charCode = str.charCodeAt(i);

          if (charCode <= 0x007f) {
            total += 1; //字符代码在000000 – 00007F之间的，用一个字节编码
          } else if (charCode <= 0x07ff) {
            total += 2; //000080 – 0007FF之间的字符用两个字节
          } else if (charCode <= 0xffff) {
            total += 3; //000800 – 00D7FF 和 00E000 – 00FFFF之间的用三个字节，注: Unicode在范围 D800-DFFF 中不存在任何字符
          } else {
            total += 4; //010000 – 10FFFF之间的用4个字节
          }
        }

        return total;
      }; //防止XSS攻击


      this.xssFilter = function (val) {
        val = val.toString();
        val = val.replace(/[<]/g, "&lt;");
        val = val.replace(/[>]/g, "&gt;");
        val = val.replace(/"/g, "&quot;"); //val = val.replace(/'/g, "&#039;");

        return val;
      }; //去掉头尾空白符


      this.trimStr = function (str) {
        if (!str) return '';
        str = str.toString();
        return str.replace(/(^\s*)|(\s*$)/g, "");
      }; //判断是否为8位整数


      this.validNumber = function (str) {
        str = str.toString();
        return str.match(/(^\d{1,8}$)/g);
      };

      this.getReturnError = function (errorInfo, errorCode) {
        if (!errorCode) {
          errorCode = -100;
        }

        var error = {
          'ActionStatus': ACTION_STATUS.FAIL,
          'ErrorCode': errorCode,
          'ErrorInfo': errorInfo + "[" + errorCode + "]"
        };
        return error;
      }; //设置cookie
      //name 名字
      //value 值
      //expires 有效期(单位：秒)
      //path
      //domain 作用域


      this.setCookie = function (name, value, expires, path, domain) {
        var exp = new Date();
        exp.setTime(exp.getTime() + expires * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
      }; //获取cookie


      this.getCookie = function (name) {
        var result = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));

        if (result != null) {
          return unescape(result[2]);
        }

        return null;
      }; //删除cookie


      this.delCookie = function (name) {
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var value = this.getCookie(name);
        if (value != null) document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
      }; //根据名字获取url参数值


      this.getQueryString = function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return null;
      };
    }(); //日志对象

    var log = new function () {
      var on = true;

      this.setOn = function (onFlag) {
        on = onFlag;
      };

      this.getOn = function () {
        return on;
      };

      this.error = function (logStr) {
        try {
          on && console.error(logStr);
        } catch (e) {}
      };

      this.warn = function (logStr) {
        try {
          on && console.warn(logStr);
        } catch (e) {}
      };

      this.info = function (logStr) {
        try {
          on && console.info(logStr);
        } catch (e) {}
      };

      this.debug = function (logStr) {
        try {
          on && console.log(logStr);
        } catch (e) {}
      };
    }(); //获取unix时间戳

    var unixtime = function unixtime(d) {
      if (!d) d = new Date();
      return Math.round(d.getTime() / 1000);
    }; //时间戳转日期


    var fromunixtime = function fromunixtime(t) {
      return new Date(t * 1000);
    }; //获取下一个消息序号


    var nextSeq = function nextSeq() {
      if (curSeq) {
        curSeq = curSeq + 1;
      } else {
        curSeq = Math.round(Math.random() * 10000000);
      }

      return curSeq;
    }; //产生随机数


    var createRandom = function createRandom() {
      return Math.round(Math.random() * 4294967296);
    }; //获取ajax请求对象


    var getXmlHttp = function getXmlHttp() {
      var xmlhttp = null;

      if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
      } else {
        try {
          xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
          try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
          } catch (e) {
            return null;
          }
        }
      }

      return xmlhttp;
    }; //发起ajax请求
    //发起ajax请求


    var ajaxRequest = function ajaxRequest(meth, url, req, timeout, isLongPolling, cbOk, cbErr) {
      var xmlHttpObj = getXmlHttp();
      var error, errInfo;

      if (!xmlHttpObj) {
        errInfo = "创建请求失败";
        var error = tool.getReturnError(errInfo, -1);
        log.error(errInfo);
        if (cbErr) cbErr(error);
        return;
      } //保存ajax请求对象


      xmlHttpObjSeq++;
      xmlHttpObjMap[xmlHttpObjSeq] = xmlHttpObj;
      xmlHttpObj.open(meth, url, true);

      xmlHttpObj.onreadystatechange = function () {
        if (xmlHttpObj.readyState == 4) {
          xmlHttpObjMap[xmlHttpObjSeq] = null; //清空

          if (xmlHttpObj.status == 200) {
            if (cbOk) cbOk(xmlHttpObj.responseText);
            xmlHttpObj = null;
            curLongPollingRetErrorCount = curBigGroupLongPollingRetErrorCount = 0;
          } else {
            xmlHttpObj = null; //避免刷新的时候，由于abord ajax引起的错误回调

            setTimeout(function () {
              var errInfo = "请求服务器失败,请检查你的网络是否正常";
              var error = tool.getReturnError(errInfo, -2); //if (!isLongPolling && cbErr) cbErr(error);

              if (cbErr) cbErr(error);
            }, 16);
          }
        }
      };

      xmlHttpObj.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded'); //设置超时时间

      if (!timeout) {
        timeout = ajaxDefaultTimeOut; //设置ajax默认超时时间
      }

      if (timeout) {
        xmlHttpObj.timeout = timeout;

        xmlHttpObj.ontimeout = function (event) {
          xmlHttpObj = null; //var errInfo = "请求服务器超时";
          //var error = tool.getReturnError(errInfo, -3);
          //if (cbErr) cbErr(error);
        };
      } //


      xmlHttpObj.send(req);
    }; //发起ajax请求（json格式数据）


    var ajaxRequestJson = function ajaxRequestJson(meth, url, req, timeout, isLongPolling, cbOk, cbErr) {
      ajaxRequest(meth, url, JSON.stringify(req), timeout, isLongPolling, function (resp) {
        var json = null; //if (resp) eval('json=('+resp+');');//将返回的json字符串转换成json对象
        //if (resp) json=eval('('+resp+')');//将返回的json字符串转换成json对象

        if (resp) json = resp; //将返回的json字符串转换成json对象

        if (cbOk) cbOk(json);
      }, cbErr);
    }; //判断用户是否已登录


    var isLogin = function isLogin() {
      return ctx.sdkAppID && ctx.identifier;
    }; //检查是否登录


    var checkLogin = function checkLogin(cbErr, isNeedCallBack) {
      if (!isLogin()) {
        if (isNeedCallBack) {
          var errInfo = "请登录";
          var error = tool.getReturnError(errInfo, -4);
          if (cbErr) cbErr(error);
        }

        return false;
      }

      return true;
    }; //检查是否访问正式环境


    var isAccessFormalEnv = function isAccessFormalEnv() {
      return isAccessFormaEnvironment;
    }; //根据不同的服务名和命令，获取对应的接口地址


    var getApiUrl = function getApiUrl(srvName, cmd, cbOk, cbErr) {
      var srvHost = SRV_HOST;

      if (isAccessFormalEnv()) {
        srvHost = SRV_HOST.FORMAL.COMMON;
      } else {
        srvHost = SRV_HOST.TEST.COMMON;
      } //if (srvName == SRV_NAME.RECENT_CONTACT) {
      //    srvHost = SRV_HOST.TEST.COMMON;
      //}


      if (srvName == SRV_NAME.PIC) {
        if (isAccessFormalEnv()) {
          srvHost = SRV_HOST.FORMAL.PIC;
        } else {
          srvHost = SRV_HOST.TEST.PIC;
        }
      }

      var url = srvHost + '/' + SRV_NAME_VER[srvName] + '/' + srvName + '/' + cmd + '?websdkappid=' + SDK.APPID + "&v=" + SDK.VERSION;

      if (isLogin()) {
        if (cmd == 'login') {
          url += '&identifier=' + encodeURIComponent(ctx.identifier) + '&usersig=' + ctx.userSig;
        } else {
          if (ctx.tinyid && ctx.a2) {
            url += '&tinyid=' + ctx.tinyid + '&a2=' + ctx.a2;
          } else {
            if (cbErr) {
              log.error("tinyid或a2为空[" + srvName + "][" + cmd + "]");
              cbErr(tool.getReturnError("tinyid或a2为空[" + srvName + "][" + cmd + "]", -5));
              return false;
            }
          }
        }

        url += '&contenttype=' + ctx.contentType;
      }

      url += '&sdkappid=' + ctx.sdkAppID + '&accounttype=' + ctx.accountType + '&apn=' + ctx.apn + '&reqtime=' + unixtime();
      return url;
    }; //获取语音下载url


    var getSoundDownUrl = function getSoundDownUrl(uuid, senderId) {
      var soundUrl = null;

      if (authkey && ipList[0]) {
        soundUrl = "http://" + ipList[0] + "/asn.com/stddownload_common_file?authkey=" + authkey + "&bid=" + DOWNLOAD_FILE.BUSSINESS_ID + "&subbid=" + ctx.sdkAppID + "&fileid=" + uuid + "&filetype=" + DOWNLOAD_FILE_TYPE.SOUND + "&openid=" + senderId + "&ver=0";
      } else {
        log.error("拼接语音下载url不报错：ip或者authkey为空");
      }

      return soundUrl;
    }; //获取文件下载地址


    var getFileDownUrl = function getFileDownUrl(uuid, senderId, fileName) {
      var fileUrl = null;

      if (authkey && ipList[0]) {
        fileUrl = "http://" + ipList[0] + "/asn.com/stddownload_common_file?authkey=" + authkey + "&bid=" + DOWNLOAD_FILE.BUSSINESS_ID + "&subbid=" + ctx.sdkAppID + "&fileid=" + uuid + "&filetype=" + DOWNLOAD_FILE_TYPE.FILE + "&openid=" + senderId + "&ver=0&filename=" + encodeURIComponent(fileName);
      } else {
        log.error("拼接文件下载url不报错：ip或者authkey为空");
      }

      Resources.downloadMap["uuid_" + uuid] = fileUrl;
      return fileUrl;
    }; //获取文件下载地址


    var getFileDownUrlV2 = function getFileDownUrlV2(uuid, senderId, fileName, downFlag, receiverId, busiId, type) {
      var options = {
        "From_Account": senderId,
        //"identifer_0",       // 类型: String, 发送者tinyid
        "To_Account": receiverId,
        //"identifer_1",         // 类型: String, 接收者tinyid
        "os_platform": 10,
        // 类型: Number, 终端的类型 1(android) 2(ios) 3(windows) 10(others...)
        "Timestamp": unixtime().toString(),
        // 类型: Number, 时间戳
        "Random": createRandom().toString(),
        // 类型: Number, 随机值
        "request_info": [// 类型: Array
        {
          "busi_id": busiId,
          // 类型: Number, 群(1) C2C(2) 其他请联系sdk开发者分配
          "download_flag": downFlag,
          // 类型: Number, 申请下载地址标识  0(申请架平下载地址)  1(申请COS平台下载地址)  2(不需要申请, 直接拿url下载(这里应该不会为2))
          "type": type,
          // 类型: Number, 0(短视频缩略图), 1(文件), 2(短视频), 3(ptt), 其他待分配
          "uuid": uuid,
          // 类型: Number, 唯一标识一个文件的uuid
          "version": VERSION_INFO.SERVER_VERSION,
          // 类型: Number, 架平server版本
          "auth_key": authkey,
          // 类型: String, 认证签名
          "ip": ipList[0] // 类型: Number, 架平IP

        }]
      }; //获取下载地址

      proto_applyDownload(options, function (resp) {
        if (resp.error_code == 0 && resp.response_info) {
          Resources.downloadMap["uuid_" + options.uuid] = resp.response_info.url;
        }

        if (onAppliedDownloadUrl) {
          onAppliedDownloadUrl({
            uuid: options.uuid,
            url: resp.response_info.url,
            maps: Resources.downloadMap
          });
        }
      }, function (resp) {
        log.error("获取下载地址失败", options.uuid);
      });
    }; //重置ajax请求


    var clearXmlHttpObjMap = function clearXmlHttpObjMap() {
      //遍历xmlHttpObjMap{}
      for (var seq in xmlHttpObjMap) {
        var xmlHttpObj = xmlHttpObjMap[seq];

        if (xmlHttpObj) {
          xmlHttpObj.abort(); //中断ajax请求(长轮询)

          xmlHttpObjMap[xmlHttpObjSeq] = null; //清空
        }
      }

      xmlHttpObjSeq = 0;
      xmlHttpObjMap = {};
    }; //重置sdk全局变量


    var clearSdk = function clearSdk() {
      clearXmlHttpObjMap(); //当前登录用户

      ctx = {
        sdkAppID: null,
        appIDAt3rd: null,
        accountType: null,
        identifier: null,
        identifierNick: null,
        userSig: null,
        contentType: 'json',
        apn: 1
      };
      opt = {};
      curSeq = 0; //ie8,9采用jsonp方法解决ajax跨域限制

      jsonpRequestId = 0; //jsonp请求id
      //最新jsonp请求返回的json数据

      jsonpLastRspData = null;
      apiReportItems = [];
      MsgManager.clear(); //重置longpollingId

      LongPollingId = null;
    }; //登录


    var _login = function _login(loginInfo, listeners, options, cbOk, cbErr) {
      clearSdk();
      if (options) opt = options;

      if (opt.isAccessFormalEnv == false) {
        isAccessFormaEnvironment = opt.isAccessFormalEnv;
      }

      if (opt.isLogOn == false) {
        log.setOn(opt.isLogOn);
      }
      /*
      if(opt.emotions){
      emotions=opt.emotions;
      webim.Emotions= emotions;
      }
      if(opt.emotionDataIndexs){
      emotionDataIndexs=opt.emotionDataIndexs;
      webim.EmotionDataIndexs= emotionDataIndexs;
      }*/


      if (!loginInfo) {
        if (cbErr) {
          cbErr(tool.getReturnError("loginInfo is empty", -6));
          return;
        }
      }

      if (!loginInfo.sdkAppID) {
        if (cbErr) {
          cbErr(tool.getReturnError("loginInfo.sdkAppID is empty", -7));
          return;
        }
      }

      if (!loginInfo.accountType) {
        if (cbErr) {
          cbErr(tool.getReturnError("loginInfo.accountType is empty", -8));
          return;
        }
      }

      if (loginInfo.identifier) {
        ctx.identifier = loginInfo.identifier.toString();
      }

      if (loginInfo.identifier && !loginInfo.userSig) {
        if (cbErr) {
          cbErr(tool.getReturnError("loginInfo.userSig is empty", -9));
          return;
        }
      }

      if (loginInfo.userSig) {
        ctx.userSig = loginInfo.userSig.toString();
      }

      ctx.sdkAppID = loginInfo.sdkAppID;
      ctx.accountType = loginInfo.accountType;

      if (ctx.identifier && ctx.userSig) {
        //带登录态
        //登录
        proto_login(function (identifierNick, headurl) {
          MsgManager.init(listeners, function (mmInitResp) {
            if (cbOk) {
              mmInitResp.identifierNick = identifierNick;
              mmInitResp.headurl = headurl;
              cbOk(mmInitResp);
            }
          }, cbErr);
        }, cbErr);
      } else {
        //不带登录态，进入直播场景sdk
        MsgManager.init(listeners, cbOk, cbErr);
      }
    }; //初始化浏览器信息


    var initBrowserInfo = function initBrowserInfo() {
      //初始化浏览器类型
      BROWSER_INFO = "wechat";
    }; //接口质量上报


    var reportApiQuality = function reportApiQuality(cmd, errorCode, errorInfo) {
      if (cmd == 'longpolling' && (errorCode == longPollingTimeOutErrorCode || errorCode == longPollingKickedErrorCode)) {
        //longpolling 返回60008错误可以视为正常,可以不上报
        return;
      }

      var eventId = CMD_EVENT_ID_MAP[cmd];

      if (eventId) {
        var reportTime = unixtime();
        var uniqKey = null;
        var msgCmdErrorCode = {
          'Code': errorCode,
          'ErrMsg': errorInfo
        };

        if (ctx.a2) {
          uniqKey = ctx.a2.substring(0, 10) + "_" + reportTime + "_" + createRandom();
        } else if (ctx.userSig) {
          uniqKey = ctx.userSig.substring(0, 10) + "_" + reportTime + "_" + createRandom();
        }

        if (uniqKey) {
          var rptEvtItem = {
            "UniqKey": uniqKey,
            "EventId": eventId,
            "ReportTime": reportTime,
            "MsgCmdErrorCode": msgCmdErrorCode
          };

          if (cmd == 'login') {
            var loginApiReportItems = [];
            loginApiReportItems.push(rptEvtItem);
            var loginReportOpt = {
              "EvtItems": loginApiReportItems,
              "MainVersion": SDK.VERSION,
              "Version": "0"
            };
            proto_reportApiQuality(loginReportOpt, function (resp) {
              loginApiReportItems = null; //
            }, function (err) {
              loginApiReportItems = null; //
            });
          } else {
            apiReportItems.push(rptEvtItem);

            if (apiReportItems.length >= maxApiReportItemCount) {
              //累计一定条数再上报
              var reportOpt = {
                "EvtItems": apiReportItems,
                "MainVersion": SDK.VERSION,
                "Version": "0"
              };
              proto_reportApiQuality(reportOpt, function (resp) {
                apiReportItems = []; //清空
              }, function (err) {
                apiReportItems = []; //清空
              });
            }
          }
        }
      }
    }; // REST API calls
    //上线


    var proto_login = function proto_login(cbOk, cbErr) {
      ConnManager.apiCall(SRV_NAME.OPEN_IM, "login", {
        "State": "Online"
      }, function (loginResp) {
        if (loginResp.TinyId) {
          ctx.tinyid = loginResp.TinyId;
        } else {
          if (cbErr) {
            cbErr(tool.getReturnError("TinyId is empty", -10));
            return;
          }
        }

        if (loginResp.A2Key) {
          ctx.a2 = loginResp.A2Key;
        } else {
          if (cbErr) {
            cbErr(tool.getReturnError("A2Key is empty", -11));
            return;
          }
        }

        var tag_list = ["Tag_Profile_IM_Nick", "Tag_Profile_IM_Image"];
        var options = {
          'From_Account': ctx.identifier,
          'To_Account': [ctx.identifier],
          'LastStandardSequence': 0,
          'TagList': tag_list
        };
        proto_getProfilePortrait(options, function (resp) {
          var nick, gender, allowType;

          if (resp.UserProfileItem && resp.UserProfileItem.length > 0) {
            for (var i in resp.UserProfileItem) {
              for (var j in resp.UserProfileItem[i].ProfileItem) {
                switch (resp.UserProfileItem[i].ProfileItem[j].Tag) {
                  case 'Tag_Profile_IM_Nick':
                    var _nick = resp.UserProfileItem[i].ProfileItem[j].Value;
                    if (_nick) ctx.identifierNick = _nick;
                    break;

                  case 'Tag_Profile_IM_Image':
                    var image = resp.UserProfileItem[i].ProfileItem[j].Value;
                    if (image) ctx.headurl = image;
                    break;
                }
              }
            }
          }

          if (cbOk) cbOk(ctx.identifierNick, ctx.headurl); //回传当前用户昵称
        }, cbErr);
      }, cbErr);
    }; //下线


    var proto_logout = function proto_logout(type, cbOk, cbErr) {
      if (!checkLogin(cbErr, false)) {
        //不带登录态
        clearSdk();
        if (cbOk) cbOk({
          'ActionStatus': ACTION_STATUS.OK,
          'ErrorCode': 0,
          'ErrorInfo': 'logout success'
        });
        return;
      }

      if (type == "all") {
        ConnManager.apiCall(SRV_NAME.OPEN_IM, "logout", {}, function (resp) {
          clearSdk();
          if (cbOk) cbOk(resp);
        }, cbErr);
      } else {
        ConnManager.apiCall(SRV_NAME.OPEN_IM, "longpollinglogout", {
          LongPollingId: LongPollingId
        }, function (resp) {
          clearSdk();
          if (cbOk) cbOk(resp);
        }, cbErr);
      }
    }; //发送消息，包括私聊和群聊


    var proto_sendMsg = function proto_sendMsg(msg, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      var msgInfo = null;

      switch (msg.sess.type()) {
        case SESSION_TYPE.C2C:
          msgInfo = {
            'From_Account': ctx.identifier,
            'To_Account': msg.sess.id().toString(),
            'MsgTimeStamp': msg.time,
            'MsgSeq': msg.seq,
            'MsgRandom': msg.random,
            'MsgBody': []
          };
          break;

        case SESSION_TYPE.GROUP:
          var subType = msg.getSubType();
          msgInfo = {
            'GroupId': msg.sess.id().toString(),
            'From_Account': ctx.identifier,
            'Random': msg.random,
            'MsgBody': []
          };

          switch (subType) {
            case GROUP_MSG_SUB_TYPE.COMMON:
              msgInfo.MsgPriority = "COMMON";
              break;

            case GROUP_MSG_SUB_TYPE.REDPACKET:
              msgInfo.MsgPriority = "REDPACKET";
              break;

            case GROUP_MSG_SUB_TYPE.LOVEMSG:
              msgInfo.MsgPriority = "LOVEMSG";
              break;

            case GROUP_MSG_SUB_TYPE.TIP:
              log.error("不能主动发送群提示消息,subType=" + subType);
              break;

            default:
              log.error("发送群消息时，出现未知子消息类型：subType=" + subType);
              return;
              break;
          }

          break;

        default:
          break;
      }

      for (var i in msg.elems) {
        var elem = msg.elems[i];
        var msgContent = null;
        var msgType = elem.type;

        switch (msgType) {
          case MSG_ELEMENT_TYPE.TEXT:
            //文本
            msgContent = {
              'Text': elem.content.text
            };
            break;

          case MSG_ELEMENT_TYPE.FACE:
            //表情
            msgContent = {
              'Index': elem.content.index,
              'Data': elem.content.data
            };
            break;

          case MSG_ELEMENT_TYPE.IMAGE:
            //图片
            var ImageInfoArray = [];

            for (var j in elem.content.ImageInfoArray) {
              ImageInfoArray.push({
                'Type': elem.content.ImageInfoArray[j].type,
                'Size': elem.content.ImageInfoArray[j].size,
                'Width': elem.content.ImageInfoArray[j].width,
                'Height': elem.content.ImageInfoArray[j].height,
                'URL': elem.content.ImageInfoArray[j].url
              });
            }

            msgContent = {
              'ImageFormat': elem.content.ImageFormat,
              'UUID': elem.content.UUID,
              'ImageInfoArray': ImageInfoArray
            };
            break;

          case MSG_ELEMENT_TYPE.SOUND:
            //
            log.warn('web端暂不支持发送语音消息');
            continue;
            break;

          case MSG_ELEMENT_TYPE.LOCATION:
            //
            log.warn('web端暂不支持发送地理位置消息');
            continue;
            break;

          case MSG_ELEMENT_TYPE.FILE:
            //
            msgContent = {
              'UUID': elem.content.uuid,
              'FileName': elem.content.name,
              'FileSize': elem.content.size,
              'DownloadFlag': elem.content.downFlag
            };
            break;

          case MSG_ELEMENT_TYPE.CUSTOM:
            //
            msgContent = {
              'Data': elem.content.data,
              'Desc': elem.content.desc,
              'Ext': elem.content.ext
            };
            msgType = MSG_ELEMENT_TYPE.CUSTOM;
            break;

          default:
            log.warn('web端暂不支持发送' + elem.type + '消息');
            continue;
            break;
        }

        if (msg.PushInfoBoolean) {
          msgInfo.OfflinePushInfo = msg.PushInfo; //当android终端进程被杀掉时才走push，IOS退到后台即可
        }

        msgInfo.MsgBody.push({
          'MsgType': msgType,
          'MsgContent': msgContent
        });
      }

      if (msg.sess.type() == SESSION_TYPE.C2C) {
        //私聊
        ConnManager.apiCall(SRV_NAME.OPEN_IM, "sendmsg", msgInfo, cbOk, cbErr);
      } else if (msg.sess.type() == SESSION_TYPE.GROUP) {
        //群聊
        ConnManager.apiCall(SRV_NAME.GROUP, "send_group_msg", msgInfo, cbOk, cbErr);
      }
    }; //长轮询接口


    var proto_longPolling = function proto_longPolling(options, cbOk, cbErr) {
      if (!isAccessFormaEnvironment && typeof stopPolling != "undefined" && stopPolling == true) {
        return;
      }

      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.OPEN_IM, "longpolling", options, cbOk, cbErr, longPollingDefaultTimeOut, true);
    }; //长轮询接口(拉取直播聊天室新消息)


    var proto_bigGroupLongPolling = function proto_bigGroupLongPolling(options, cbOk, cbErr, timeout) {
      ConnManager.apiCall(SRV_NAME.BIG_GROUP_LONG_POLLING, "get_msg", options, cbOk, cbErr, timeout);
    }; //拉取未读c2c消息接口


    var proto_getMsgs = function proto_getMsgs(cookie, syncFlag, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.OPEN_IM, "getmsg", {
        'Cookie': cookie,
        'SyncFlag': syncFlag
      }, function (resp) {
        if (resp.MsgList && resp.MsgList.length) {
          for (var i in resp.MsgList) {
            tempC2CMsgList.push(resp.MsgList[i]);
          }
        }

        if (resp.SyncFlag == 1) {
          proto_getMsgs(resp.Cookie, resp.SyncFlag, cbOk, cbErr);
        } else {
          resp.MsgList = tempC2CMsgList;
          tempC2CMsgList = [];
          if (cbOk) cbOk(resp);
        }
      }, cbErr);
    }; //C2C消息已读上报接口


    var proto_c2CMsgReaded = function proto_c2CMsgReaded(cookie, c2CMsgReadedItem, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      var tmpC2CMsgReadedItem = [];

      for (var i in c2CMsgReadedItem) {
        var item = {
          'To_Account': c2CMsgReadedItem[i].toAccount,
          'LastedMsgTime': c2CMsgReadedItem[i].lastedMsgTime
        };
        tmpC2CMsgReadedItem.push(item);
      }

      ConnManager.apiCall(SRV_NAME.OPEN_IM, "msgreaded", {
        C2CMsgReaded: {
          'Cookie': cookie,
          'C2CMsgReadedItem': tmpC2CMsgReadedItem
        }
      }, cbOk, cbErr);
    }; //删除c2c消息


    var proto_deleteC2CMsg = function proto_deleteC2CMsg(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.OPEN_IM, "deletemsg", options, cbOk, cbErr);
    }; //拉取c2c历史消息接口


    var proto_getC2CHistoryMsgs = function proto_getC2CHistoryMsgs(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.OPEN_IM, "getroammsg", options, function (resp) {
        var reqMsgCount = options.MaxCnt;
        var complete = resp.Complete;
        var rspMsgCount = resp.MaxCnt;
        var msgKey = resp.MsgKey;
        var lastMsgTime = resp.LastMsgTime;

        if (resp.MsgList && resp.MsgList.length) {
          for (var i in resp.MsgList) {
            tempC2CHistoryMsgList.push(resp.MsgList[i]);
          }
        }

        var netxOptions = null;

        if (complete == 0) {
          //还有历史消息可拉取
          if (rspMsgCount < reqMsgCount) {
            netxOptions = {
              'Peer_Account': options.Peer_Account,
              'MaxCnt': reqMsgCount - rspMsgCount,
              'LastMsgTime': lastMsgTime,
              'MsgKey': msgKey
            };
          }
        }

        if (netxOptions) {
          //继续拉取
          proto_getC2CHistoryMsgs(netxOptions, cbOk, cbErr);
        } else {
          resp.MsgList = tempC2CHistoryMsgList;
          tempC2CHistoryMsgList = [];
          if (cbOk) cbOk(resp);
        }
      }, cbErr);
    }; //群组接口
    //创建群组
    //协议参考：https://www.qcloud.com/doc/product/269/1615


    var proto_createGroup = function proto_createGroup(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      var opt = {
        //必填    群组形态，包括Public（公开群），Private（私有群），ChatRoom（聊天室），AVChatRoom（互动直播聊天室）。
        'Type': options.Type,
        //必填    群名称，最长30字节。
        'Name': options.Name
      };
      var member_list = []; //Array 选填  初始群成员列表，最多500个。成员信息字段详情参见：群成员资料。

      for (var i = 0; i < options.MemberList.length; i++) {
        member_list.push({
          'Member_Account': options.MemberList[i]
        });
      }

      opt.MemberList = member_list; //选填    为了使得群组ID更加简单，便于记忆传播，腾讯云支持APP在通过REST API创建群组时自定义群组ID。详情参见：自定义群组ID。

      if (options.GroupId) {
        opt.GroupId = options.GroupId;
      } //选填    群主id，自动添加到群成员中。如果不填，群没有群主。


      if (options.Owner_Account) {
        opt.Owner_Account = options.Owner_Account;
      } //选填    群简介，最长240字节。


      if (options.Introduction) {
        opt.Introduction = options.Introduction;
      } //选填    群公告，最长300字节。


      if (options.Notification) {
        opt.Notification = options.Notification;
      } //选填    最大群成员数量，最大为10000，不填默认为2000个。


      if (options.MaxMemberCount) {
        opt.MaxMemberCount = options.MaxMemberCount;
      } //选填    申请加群处理方式。包含FreeAccess（自由加入），NeedPermission（需要验证），DisableApply（禁止加群），不填默认为NeedPermission（需要验证）。


      if (options.ApplyJoinOption) {
        //
        opt.ApplyJoinOption = options.ApplyJoinOption;
      } //Array 选填  群组维度的自定义字段，默认情况是没有的，需要开通，详情参见：自定义字段。


      if (options.AppDefinedData) {
        opt.AppDefinedData = options.AppDefinedData;
      } //选填    群头像URL，最长100字节。


      if (options.FaceUrl) {
        opt.FaceUrl = options.FaceUrl;
      }

      ConnManager.apiCall(SRV_NAME.GROUP, "create_group", opt, cbOk, cbErr);
    }; //创建群组-高级接口
    //协议参考：https://www.qcloud.com/doc/product/269/1615


    var proto_createGroupHigh = function proto_createGroupHigh(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "create_group", options, cbOk, cbErr);
    }; //修改群组基本资料
    //协议参考：https://www.qcloud.com/doc/product/269/1620


    var proto_modifyGroupBaseInfo = function proto_modifyGroupBaseInfo(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "modify_group_base_info", options, cbOk, cbErr);
    }; //申请加群


    var proto_applyJoinGroup = function proto_applyJoinGroup(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "apply_join_group", {
        'GroupId': options.GroupId,
        'ApplyMsg': options.ApplyMsg,
        'UserDefinedField': options.UserDefinedField
      }, cbOk, cbErr);
    }; //申请加入大群


    var proto_applyJoinBigGroup = function proto_applyJoinBigGroup(options, cbOk, cbErr) {
      var srvName;

      if (!checkLogin(cbErr, false)) {
        //未登录
        srvName = SRV_NAME.BIG_GROUP;
      } else {
        //已登录
        srvName = SRV_NAME.GROUP;
      }

      ConnManager.apiCall(srvName, "apply_join_group", {
        'GroupId': options.GroupId,
        'ApplyMsg': options.ApplyMsg,
        'UserDefinedField': options.UserDefinedField
      }, function (resp) {
        if (resp.JoinedStatus && resp.JoinedStatus == 'JoinedSuccess') {
          if (resp.LongPollingKey) {
            MsgManager.setBigGroupLongPollingOn(true); //开启长轮询

            MsgManager.setBigGroupLongPollingKey(resp.LongPollingKey); //更新大群长轮询key

            MsgManager.setBigGroupLongPollingMsgMap(options.GroupId, 0); //收到的群消息置0

            MsgManager.bigGroupLongPolling(); //开启长轮询
          } else {
            //没有返回LongPollingKey，说明申请加的群不是直播聊天室(AVChatRoom)
            cbErr && cbErr(tool.getReturnError("Join Group succeed; But the type of group is not AVChatRoom: groupid=" + options.GroupId, -12));
            return;
          }
        }

        if (cbOk) cbOk(resp);
      }, function (err) {
        if (cbErr) cbErr(err);
      });
    }; //处理加群申请(同意或拒绝)


    var proto_handleApplyJoinGroupPendency = function proto_handleApplyJoinGroupPendency(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "handle_apply_join_group", {
        'GroupId': options.GroupId,
        'Applicant_Account': options.Applicant_Account,
        'HandleMsg': options.HandleMsg,
        'Authentication': options.Authentication,
        'MsgKey': options.MsgKey,
        'ApprovalMsg': options.ApprovalMsg,
        'UserDefinedField': options.UserDefinedField
      }, cbOk, function (err) {
        if (err.ErrorCode == 10024) {
          //apply has be handled
          if (cbOk) {
            var resp = {
              'ActionStatus': ACTION_STATUS.OK,
              'ErrorCode': 0,
              'ErrorInfo': '该申请已经被处理过'
            };
            cbOk(resp);
          }
        } else {
          if (cbErr) cbErr(err);
        }
      });
    }; //获取群组未决列表


    var proto_getPendencyGroup = function proto_getPendencyGroup(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "get_pendency", {
        'StartTime': options.StartTime,
        'Limit': options.Limit,
        'Handle_Account': ctx.identifier
      }, cbOk, function (err) {});
    }; //群组未决已经上报


    var proto_getPendencyGroupRead = function proto_getPendencyGroupRead(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "report_pendency", {
        'ReportTime': options.ReportTime,
        'From_Account': ctx.identifier
      }, cbOk, function (err) {});
    }; //处理被邀请进群申请(同意或拒绝)


    var proto_handleInviteJoinGroupRequest = function proto_handleInviteJoinGroupRequest(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "handle_invite_join_group", {
        'GroupId': options.GroupId,
        'Inviter_Account': options.Inviter_Account,
        'HandleMsg': options.HandleMsg,
        'Authentication': options.Authentication,
        'MsgKey': options.MsgKey,
        'ApprovalMsg': options.ApprovalMsg,
        'UserDefinedField': options.UserDefinedField
      }, cbOk, function (err) {});
    }; //主动退群


    var proto_quitGroup = function proto_quitGroup(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "quit_group", {
        'GroupId': options.GroupId
      }, cbOk, cbErr);
    }; //退出大群


    var proto_quitBigGroup = function proto_quitBigGroup(options, cbOk, cbErr) {
      var srvName;

      if (!checkLogin(cbErr, false)) {
        //未登录
        srvName = SRV_NAME.BIG_GROUP;
      } else {
        //已登录
        srvName = SRV_NAME.GROUP;
      }

      ConnManager.apiCall(srvName, "quit_group", {
        'GroupId': options.GroupId
      }, function (resp) {
        //重置当前再请求中的ajax
        //clearXmlHttpObjMap();
        //退出大群成功之后需要重置长轮询信息
        MsgManager.resetBigGroupLongPollingInfo();
        if (cbOk) cbOk(resp);
      }, cbErr);
    }; //查找群(按名称)


    var proto_searchGroupByName = function proto_searchGroupByName(options, cbOk, cbErr) {
      ConnManager.apiCall(SRV_NAME.GROUP, "search_group", options, cbOk, cbErr);
    }; //获取群组公开资料


    var proto_getGroupPublicInfo = function proto_getGroupPublicInfo(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "get_group_public_info", {
        'GroupIdList': options.GroupIdList,
        'ResponseFilter': {
          'GroupBasePublicInfoFilter': options.GroupBasePublicInfoFilter
        }
      }, function (resp) {
        resp.ErrorInfo = '';

        if (resp.GroupInfo) {
          for (var i in resp.GroupInfo) {
            var errorCode = resp.GroupInfo[i].ErrorCode;

            if (errorCode > 0) {
              resp.ActionStatus = ACTION_STATUS.FAIL;
              resp.GroupInfo[i].ErrorInfo = "[" + errorCode + "]" + resp.GroupInfo[i].ErrorInfo;
              resp.ErrorInfo += resp.GroupInfo[i].ErrorInfo + '\n';
            }
          }
        }

        if (resp.ActionStatus == ACTION_STATUS.FAIL) {
          if (cbErr) {
            cbErr(resp);
          }
        } else if (cbOk) {
          cbOk(resp);
        }
      }, cbErr);
    }; //获取群组详细资料--高级
    //请求协议参考：https://www.qcloud.com/doc/product/269/1616


    var proto_getGroupInfo = function proto_getGroupInfo(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      var opt = {
        'GroupIdList': options.GroupIdList,
        'ResponseFilter': {
          'GroupBaseInfoFilter': options.GroupBaseInfoFilter,
          'MemberInfoFilter': options.MemberInfoFilter
        }
      };

      if (options.AppDefinedDataFilter_Group) {
        opt.ResponseFilter.AppDefinedDataFilter_Group = options.AppDefinedDataFilter_Group;
      }

      if (options.AppDefinedDataFilter_GroupMember) {
        opt.ResponseFilter.AppDefinedDataFilter_GroupMember = options.AppDefinedDataFilter_GroupMember;
      }

      ConnManager.apiCall(SRV_NAME.GROUP, "get_group_info", opt, cbOk, cbErr);
    }; //获取群组成员-高级接口
    //协议参考：https://www.qcloud.com/doc/product/269/1617


    var proto_getGroupMemberInfo = function proto_getGroupMemberInfo(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "get_group_member_info", {
        'GroupId': options.GroupId,
        'Offset': options.Offset,
        'Limit': options.Limit,
        'MemberInfoFilter': options.MemberInfoFilter,
        'MemberRoleFilter': options.MemberRoleFilter,
        'AppDefinedDataFilter_GroupMember': options.AppDefinedDataFilter_GroupMember
      }, cbOk, cbErr);
    }; //增加群组成员
    //协议参考：https://www.qcloud.com/doc/product/269/1621


    var proto_addGroupMember = function proto_addGroupMember(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "add_group_member", {
        'GroupId': options.GroupId,
        'Silence': options.Silence,
        'MemberList': options.MemberList
      }, cbOk, cbErr);
    }; //修改群组成员资料
    //协议参考：https://www.qcloud.com/doc/product/269/1623


    var proto_modifyGroupMember = function proto_modifyGroupMember(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      var opt = {};

      if (options.GroupId) {
        opt.GroupId = options.GroupId;
      }

      if (options.Member_Account) {
        opt.Member_Account = options.Member_Account;
      } //Admin或者Member


      if (options.Role) {
        opt.Role = options.Role;
      } // AcceptAndNotify代表解收并提示消息，Discard代表不接收也不提示消息，AcceptNotNotify代表接收消息但不提示


      if (options.MsgFlag) {
        opt.MsgFlag = options.MsgFlag;
      }

      if (options.ShutUpTime) {
        //禁言时间
        opt.ShutUpTime = options.ShutUpTime;
      }

      if (options.NameCard) {
        //群名片,最大不超过50个字节
        opt.NameCard = options.NameCard;
      }

      if (options.AppMemberDefinedData) {
        //群成员维度的自定义字段，默认情况是没有的，需要开通
        opt.AppMemberDefinedData = options.AppMemberDefinedData;
      }

      ConnManager.apiCall(SRV_NAME.GROUP, "modify_group_member_info", opt, cbOk, cbErr);
    }; //删除群组成员
    //协议参考：https://www.qcloud.com/doc/product/269/1622


    var proto_deleteGroupMember = function proto_deleteGroupMember(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "delete_group_member", {
        'GroupId': options.GroupId,
        'Silence': options.Silence,
        'MemberToDel_Account': options.MemberToDel_Account,
        'Reason': options.Reason
      }, cbOk, cbErr);
    }; //解散群组
    //协议参考：https://www.qcloud.com/doc/product/269/1624


    var proto_destroyGroup = function proto_destroyGroup(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "destroy_group", {
        'GroupId': options.GroupId
      }, cbOk, cbErr);
    }; //转让群组
    //协议参考：https://www.qcloud.com/doc/product/269/1633


    var proto_changeGroupOwner = function proto_changeGroupOwner(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "change_group_owner", options, cbOk, cbErr);
    }; //获取用户所加入的群组-高级接口
    //协议参考：https://www.qcloud.com/doc/product/269/1625


    var proto_getJoinedGroupListHigh = function proto_getJoinedGroupListHigh(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "get_joined_group_list", {
        'Member_Account': options.Member_Account,
        'Limit': options.Limit,
        'Offset': options.Offset,
        'GroupType': options.GroupType,
        'ResponseFilter': {
          'GroupBaseInfoFilter': options.GroupBaseInfoFilter,
          'SelfInfoFilter': options.SelfInfoFilter
        }
      }, cbOk, cbErr);
    }; //查询一组UserId在群中的身份
    //协议参考：https://www.qcloud.com/doc/product/269/1626


    var proto_getRoleInGroup = function proto_getRoleInGroup(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "get_role_in_group", {
        'GroupId': options.GroupId,
        'User_Account': options.User_Account
      }, cbOk, cbErr);
    }; //设置取消成员禁言时间
    //协议参考：https://www.qcloud.com/doc/product/269/1627


    var proto_forbidSendMsg = function proto_forbidSendMsg(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "forbid_send_msg", {
        'GroupId': options.GroupId,
        'Members_Account': options.Members_Account,
        'ShutUpTime': options.ShutUpTime //单位为秒，为0时表示取消禁言

      }, cbOk, cbErr);
    }; //发送自定义群系统通知


    var proto_sendCustomGroupNotify = function proto_sendCustomGroupNotify(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "send_group_system_notification", options, cbOk, cbErr);
    }; //拉取群消息接口


    var proto_getGroupMsgs = function proto_getGroupMsgs(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "group_msg_get", {
        "GroupId": options.GroupId,
        "ReqMsgSeq": options.ReqMsgSeq,
        "ReqMsgNumber": options.ReqMsgNumber
      }, cbOk, cbErr);
    }; //群消息已读上报接口


    var proto_groupMsgReaded = function proto_groupMsgReaded(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.GROUP, "msg_read_report", {
        'GroupId': options.GroupId,
        'MsgReadedSeq': options.MsgReadedSeq
      }, cbOk, cbErr);
    }; //end
    //好友接口
    //处理好友接口返回的错误码


    var convertErrorEn2ZhFriend = function convertErrorEn2ZhFriend(resp) {
      var errorAccount = [];

      if (resp.Fail_Account && resp.Fail_Account.length) {
        errorAccount = resp.Fail_Account;
      }

      if (resp.Invalid_Account && resp.Invalid_Account.length) {
        for (var k in resp.Invalid_Account) {
          errorAccount.push(resp.Invalid_Account[k]);
        }
      }

      if (errorAccount.length) {
        resp.ActionStatus = ACTION_STATUS.FAIL;
        resp.ErrorCode = ERROR_CODE_CUSTOM;
        resp.ErrorInfo = '';

        for (var i in errorAccount) {
          var failCount = errorAccount[i];

          for (var j in resp.ResultItem) {
            if (resp.ResultItem[j].To_Account == failCount) {
              var resultCode = resp.ResultItem[j].ResultCode;
              resp.ResultItem[j].ResultInfo = "[" + resultCode + "]" + resp.ResultItem[j].ResultInfo;
              resp.ErrorInfo += resp.ResultItem[j].ResultInfo + "\n";
              break;
            }
          }
        }
      }

      return resp;
    }; //添加好友


    var proto_applyAddFriend = function proto_applyAddFriend(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.FRIEND, "friend_add", {
        'From_Account': ctx.identifier,
        'AddFriendItem': options.AddFriendItem
      }, function (resp) {
        var newResp = convertErrorEn2ZhFriend(resp);

        if (newResp.ActionStatus == ACTION_STATUS.FAIL) {
          if (cbErr) cbErr(newResp);
        } else if (cbOk) {
          cbOk(newResp);
        }
      }, cbErr);
    }; //删除好友


    var proto_deleteFriend = function proto_deleteFriend(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.FRIEND, "friend_delete", {
        'From_Account': ctx.identifier,
        'To_Account': options.To_Account,
        'DeleteType': options.DeleteType
      }, function (resp) {
        var newResp = convertErrorEn2ZhFriend(resp);

        if (newResp.ActionStatus == ACTION_STATUS.FAIL) {
          if (cbErr) cbErr(newResp);
        } else if (cbOk) {
          cbOk(newResp);
        }
      }, cbErr);
    }; //删除会话


    var proto_deleteChat = function proto_deleteChat(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;

      if (options.chatType == 1) {
        ConnManager.apiCall(SRV_NAME.DEL_CHAT, "delete", {
          'From_Account': ctx.identifier,
          'Type': options.chatType,
          'To_Account': options.To_Account
        }, cbOk, cbErr);
      } else {
        ConnManager.apiCall(SRV_NAME.DEL_CHAT, "delete", {
          'From_Account': ctx.identifier,
          'Type': options.chatType,
          'ToGroupid': options.To_Account
        }, cbOk, cbErr);
      }
    }; //获取好友申请


    var proto_getPendency = function proto_getPendency(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.FRIEND, "pendency_get", {
        "From_Account": ctx.identifier,
        "PendencyType": options.PendencyType,
        "StartTime": options.StartTime,
        "MaxLimited": options.MaxLimited,
        "LastSequence": options.LastSequence
      }, cbOk, cbErr);
    }; //好友申请已读上报


    var proto_getPendencyReport = function proto_getPendencyReport(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.FRIEND, "PendencyReport", {
        "From_Account": ctx.identifier,
        "LatestPendencyTimeStamp": options.LatestPendencyTimeStamp
      }, cbOk, cbErr);
    }; //删除好友申请


    var proto_deletePendency = function proto_deletePendency(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.FRIEND, "pendency_delete", {
        "From_Account": ctx.identifier,
        "PendencyType": options.PendencyType,
        "To_Account": options.To_Account
      }, function (resp) {
        var newResp = convertErrorEn2ZhFriend(resp);

        if (newResp.ActionStatus == ACTION_STATUS.FAIL) {
          if (cbErr) cbErr(newResp);
        } else if (cbOk) {
          cbOk(newResp);
        }
      }, cbErr);
    }; //处理好友申请


    var proto_responseFriend = function proto_responseFriend(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.FRIEND, "friend_response", {
        'From_Account': ctx.identifier,
        'ResponseFriendItem': options.ResponseFriendItem
      }, function (resp) {
        var newResp = convertErrorEn2ZhFriend(resp);

        if (newResp.ActionStatus == ACTION_STATUS.FAIL) {
          if (cbErr) cbErr(newResp);
        } else if (cbOk) {
          cbOk(newResp);
        }
      }, cbErr);
    }; //我的好友


    var proto_getAllFriend = function proto_getAllFriend(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.FRIEND, "friend_get_all", {
        'From_Account': ctx.identifier,
        'TimeStamp': options.TimeStamp,
        'StartIndex': options.StartIndex,
        'GetCount': options.GetCount,
        'LastStandardSequence': options.LastStandardSequence,
        'TagList': options.TagList
      }, cbOk, cbErr);
    }; //资料接口
    //查看个人资料


    var proto_getProfilePortrait = function proto_getProfilePortrait(options, cbOk, cbErr) {
      if (options.To_Account.length > 100) {
        options.To_Account.length = 100;
        log.error('获取用户资料人数不能超过100人');
      }

      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.PROFILE, "portrait_get", {
        'From_Account': ctx.identifier,
        'To_Account': options.To_Account,
        //'LastStandardSequence':options.LastStandardSequence,
        'TagList': options.TagList
      }, function (resp) {
        var errorAccount = [];

        if (resp.Fail_Account && resp.Fail_Account.length) {
          errorAccount = resp.Fail_Account;
        }

        if (resp.Invalid_Account && resp.Invalid_Account.length) {
          for (var k in resp.Invalid_Account) {
            errorAccount.push(resp.Invalid_Account[k]);
          }
        }

        if (errorAccount.length) {
          resp.ActionStatus = ACTION_STATUS.FAIL;
          resp.ErrorCode = ERROR_CODE_CUSTOM;
          resp.ErrorInfo = '';

          for (var i in errorAccount) {
            var failCount = errorAccount[i];

            for (var j in resp.UserProfileItem) {
              if (resp.UserProfileItem[j].To_Account == failCount) {
                var resultCode = resp.UserProfileItem[j].ResultCode;
                resp.UserProfileItem[j].ResultInfo = "[" + resultCode + "]" + resp.UserProfileItem[j].ResultInfo;
                resp.ErrorInfo += "账号:" + failCount + "," + resp.UserProfileItem[j].ResultInfo + "\n";
                break;
              }
            }
          }
        }

        if (resp.ActionStatus == ACTION_STATUS.FAIL) {
          if (cbErr) cbErr(resp);
        } else if (cbOk) {
          cbOk(resp);
        }
      }, cbErr);
    }; //设置个人资料


    var proto_setProfilePortrait = function proto_setProfilePortrait(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.PROFILE, "portrait_set", {
        'From_Account': ctx.identifier,
        'ProfileItem': options.ProfileItem
      }, function (resp) {
        for (var i in options.ProfileItem) {
          var profile = options.ProfileItem[i];

          if (profile.Tag == 'Tag_Profile_IM_Nick') {
            ctx.identifierNick = profile.Value; //更新昵称

            break;
          }
        }

        if (cbOk) cbOk(resp);
      }, cbErr);
    }; //增加黑名单


    var proto_addBlackList = function proto_addBlackList(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.FRIEND, "black_list_add", {
        'From_Account': ctx.identifier,
        'To_Account': options.To_Account
      }, function (resp) {
        var newResp = convertErrorEn2ZhFriend(resp);

        if (newResp.ActionStatus == ACTION_STATUS.FAIL) {
          if (cbErr) cbErr(newResp);
        } else if (cbOk) {
          cbOk(newResp);
        }
      }, cbErr);
    }; //删除黑名单


    var proto_deleteBlackList = function proto_deleteBlackList(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.FRIEND, "black_list_delete", {
        'From_Account': ctx.identifier,
        'To_Account': options.To_Account
      }, function (resp) {
        var newResp = convertErrorEn2ZhFriend(resp);

        if (newResp.ActionStatus == ACTION_STATUS.FAIL) {
          if (cbErr) cbErr(newResp);
        } else if (cbOk) {
          cbOk(newResp);
        }
      }, cbErr);
    }; //我的黑名单


    var proto_getBlackList = function proto_getBlackList(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.FRIEND, "black_list_get", {
        'From_Account': ctx.identifier,
        'StartIndex': options.StartIndex,
        'MaxLimited': options.MaxLimited,
        'LastSequence': options.LastSequence
      }, cbOk, cbErr);
    }; //获取最近联系人


    var proto_getRecentContactList = function proto_getRecentContactList(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.RECENT_CONTACT, "get", {
        'From_Account': ctx.identifier,
        'Count': options.Count
      }, cbOk, cbErr);
    }; //上传图片或文件


    var proto_uploadPic = function proto_uploadPic(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      var cmdName;

      if (isAccessFormalEnv()) {
        cmdName = 'pic_up';
      } else {
        cmdName = 'pic_up_test';
      }

      ConnManager.apiCall(SRV_NAME.PIC, cmdName, {
        'App_Version': VERSION_INFO.APP_VERSION,
        'From_Account': ctx.identifier,
        'To_Account': options.To_Account,
        'Seq': options.Seq,
        'Timestamp': options.Timestamp,
        'Random': options.Random,
        'File_Str_Md5': options.File_Str_Md5,
        'File_Size': options.File_Size,
        'File_Type': options.File_Type,
        'Server_Ver': VERSION_INFO.SERVER_VERSION,
        'Auth_Key': authkey,
        'Busi_Id': options.Busi_Id,
        'PkgFlag': options.PkgFlag,
        'Slice_Offset': options.Slice_Offset,
        'Slice_Size': options.Slice_Size,
        'Slice_Data': options.Slice_Data
      }, cbOk, cbErr);
    }; //获取语音和文件下载IP和authkey


    var proto_getIpAndAuthkey = function proto_getIpAndAuthkey(cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.OPEN_IM, "authkey", {}, cbOk, cbErr);
    }; //接口质量上报


    var proto_reportApiQuality = function proto_reportApiQuality(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.IM_OPEN_STAT, "web_report", options, cbOk, cbErr);
    };

    var proto_getLongPollingId = function proto_getLongPollingId(options, cbOk, cbErr) {
      if (!checkLogin(cbErr, true)) return;
      ConnManager.apiCall(SRV_NAME.OPEN_IM, "getlongpollingid", {}, function (resp) {
        cbOk && cbOk(resp);
      }, cbErr);
    };

    var proto_applyDownload = function proto_applyDownload(options, cbOk, cbErr) {
      //把下载地址push到map中
      ConnManager.apiCall(SRV_NAME.PIC, "apply_download", options, cbOk, cbErr);
    }; //end


    initBrowserInfo(); // singleton object ConnManager

    var ConnManager = lowerBR == false ? new function () {
      var onConnCallback = null; //回调函数

      this.init = function (onConnNotify, cbOk, cbErr) {
        if (onConnNotify) onConnCallback = onConnNotify;
      };

      this.callBack = function (info) {
        if (onConnCallback) onConnCallback(info);
      };

      this.clear = function () {
        onConnCallback = null;
      }; //请求后台服务接口


      this.apiCall = function (type, cmd, data, cbOk, cbErr, timeout, isLongPolling) {
        //封装后台服务接口地址
        var url = getApiUrl(type, cmd, cbOk, cbErr);
        if (url == false) return; //发起ajax请求

        ajaxRequestJson("POST", url, data, timeout, isLongPolling, function (resp) {
          resp = JSON.parse(resp);
          var errorCode = null,
              tempErrorInfo = '';

          if (cmd == 'pic_up') {
            data.Slice_Data = '';
          }

          var info = "\n request url: \n" + url + "\n request body: \n" + JSON.stringify(data) + "\n response: \n" + JSON.stringify(resp); //成功

          if (resp.ActionStatus == ACTION_STATUS.OK) {
            log.info("[" + type + "][" + cmd + "]success: " + info);
            if (cbOk) cbOk(resp); //回调

            errorCode = 0;
            tempErrorInfo = '';
          } else {
            errorCode = resp.ErrorCode;
            tempErrorInfo = resp.ErrorInfo; //报错

            if (cbErr) {
              resp.SrcErrorInfo = resp.ErrorInfo;
              resp.ErrorInfo = "[" + type + "][" + cmd + "]failed: " + info;

              if (cmd != 'longpolling' || resp.ErrorCode != longPollingTimeOutErrorCode) {
                log.error(resp.ErrorInfo);
              }

              cbErr(resp);
            }
          }

          reportApiQuality(cmd, errorCode, tempErrorInfo); //接口质量上报
        }, function (err) {
          cbErr && cbErr(err);
          reportApiQuality(cmd, err.ErrorCode, err.ErrorInfo); //接口质量上报
        });
      };
    }() : new function () {
      var onConnCallback = null; //回调函数

      this.init = function (onConnNotify, cbOk, cbErr) {
        if (onConnNotify) onConnCallback = onConnNotify;
      };

      this.callBack = function (info) {
        if (onConnCallback) onConnCallback(info);
      };

      this.clear = function () {
        onConnCallback = null;
      }; //请求后台服务接口


      this.apiCall = function (type, cmd, data, cbOk, cbErr, timeout, isLongPolling) {
        //封装后台服务接口地址
        var url = getApiUrl(type, cmd, cbOk, cbErr);
        if (url == false) return; //发起jsonp请求

        var reqId = jsonpRequestId++,
            cbkey = 'jsonpcallback',
            // the 'callback' key
        cbval = 'jsonpRequest' + reqId,
            // the 'callback' value
        script = document.createElement('script'),
            loaded = 0;
        window[cbval] = jsonpCallback;
        script.type = 'text/javascript';
        url = url + "&" + cbkey + "=" + cbval + "&jsonpbody=" + encodeURIComponent(JSON.stringify(data));
        script.src = url;
        script.async = true;

        if (typeof script.onreadystatechange !== 'undefined') {
          // need this for IE due to out-of-order onreadystatechange(), binding script
          // execution to an event listener gives us control over when the script
          // is executed. See http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
          script.event = 'onclick';
          script.htmlFor = script.id = '_jsonpRequest_' + reqId;
        }

        script.onload = script.onreadystatechange = function () {
          if (this.readyState && this.readyState !== 'complete' && this.readyState !== 'loaded' || loaded) {
            return false;
          }

          script.onload = script.onreadystatechange = null;
          script.onclick && script.onclick(); // Call the user callback with the last value stored and clean up values and scripts.

          var resp = jsonpLastRspData;
          var info = "\n request url: \n" + url + "\n request body: \n" + JSON.stringify(data) + "\n response: \n" + JSON.stringify(resp);

          if (resp.ActionStatus == ACTION_STATUS.OK) {
            log.info("[" + type + "][" + cmd + "]success: " + info);
            cbOk && cbOk(resp);
          } else {
            resp.ErrorInfo = "[" + type + "][" + cmd + "]failed " + info;

            if (cmd != 'longpolling' || resp.ErrorCode != longPollingTimeOutErrorCode) {
              log.error(resp.ErrorInfo);
            } else {
              log.warn("[" + type + "][" + cmd + "]success: " + info);
            }

            cbErr && cbErr(resp);
          }

          jsonpLastRspData = undefined;
          document.body.removeChild(script);
          loaded = 1;
        }; // Add the script to the DOM head


        document.body.appendChild(script);
      };
    }(); // class Session

    var Session = function Session(type, id, name, icon, time, seq) {
      this._impl = {
        skey: Session.skey(type, id),
        type: type,
        id: id,
        name: name,
        icon: icon,
        unread: 0,
        //未读消息数
        isAutoRead: false,
        time: time >= 0 ? time : 0,
        curMaxMsgSeq: seq >= 0 ? seq : 0,
        msgs: [],
        isFinished: 1
      };
    };

    Session.skey = function (type, id) {
      return type + id;
    };

    Session.prototype.type = function () {
      return this._impl.type;
    };

    Session.prototype.id = function () {
      return this._impl.id;
    };

    Session.prototype.name = function () {
      return this._impl.name;
    };

    Session.prototype.icon = function () {
      return this._impl.icon;
    };

    Session.prototype.unread = function (val) {
      if (typeof val !== 'undefined') {
        this._impl.unread = val;
      } else {
        return this._impl.unread;
      }
    };

    Session.prototype.isFinished = function (val) {
      if (typeof val !== 'undefined') {
        this._impl.isFinished = val;
      } else {
        return this._impl.isFinished;
      }
    };

    Session.prototype.time = function () {
      return this._impl.time;
    };

    Session.prototype.curMaxMsgSeq = function (seq) {
      if (typeof seq !== 'undefined') {
        this._impl.curMaxMsgSeq = seq;
      } else {
        return this._impl.curMaxMsgSeq;
      }
    };

    Session.prototype.msgCount = function () {
      return this._impl.msgs.length;
    };

    Session.prototype.msg = function (index) {
      return this._impl.msgs[index];
    };

    Session.prototype.msgs = function () {
      return this._impl.msgs;
    };

    Session.prototype._impl_addMsg = function (msg) {
      this._impl.msgs.push(msg); //if (!msg.isSend && msg.time > this._impl.time)


      if (msg.time > this._impl.time) this._impl.time = msg.time; //if (!msg.isSend && msg.seq > this._impl.curMaxMsgSeq)

      if (msg.seq > this._impl.curMaxMsgSeq) this._impl.curMaxMsgSeq = msg.seq; //自己发送的消息不计入未读数

      if (!msg.isSend && !this._impl.isAutoRead) {
        this._impl.unread++;
      }
    }; //class C2CMsgReadedItem


    var C2CMsgReadedItem = function C2CMsgReadedItem(toAccount, lastedMsgTime) {
      this.toAccount = toAccount;
      this.lastedMsgTime = lastedMsgTime;
    }; // class Msg


    var Msg = function Msg(sess, isSend, seq, random, time, fromAccount, subType, fromAccountNick) {
      this.sess = sess;
      this.subType = subType >= 0 ? subType : 0; //消息类型,c2c消息时，type取值为0；group消息时，type取值0和1，0-普通群消息，1-群提示消息

      this.fromAccount = fromAccount;
      this.fromAccountNick = fromAccountNick ? fromAccountNick : fromAccount;
      this.isSend = Boolean(isSend);
      this.seq = seq >= 0 ? seq : nextSeq();
      this.random = random >= 0 ? random : createRandom();
      this.time = time >= 0 ? time : unixtime();
      this.elems = [];
    };

    Msg.prototype.getSession = function () {
      return this.sess;
    };

    Msg.prototype.getType = function () {
      return this.subType;
    };

    Msg.prototype.getSubType = function () {
      return this.subType;
    };

    Msg.prototype.getFromAccount = function () {
      return this.fromAccount;
    };

    Msg.prototype.getFromAccountNick = function () {
      return this.fromAccountNick;
    };

    Msg.prototype.getIsSend = function () {
      return this.isSend;
    };

    Msg.prototype.getSeq = function () {
      return this.seq;
    };

    Msg.prototype.getTime = function () {
      return this.time;
    };

    Msg.prototype.getRandom = function () {
      return this.random;
    };

    Msg.prototype.getElems = function () {
      return this.elems;
    }; //文本


    Msg.prototype.addText = function (text) {
      this.addElem(new webim.Msg.Elem(MSG_ELEMENT_TYPE.TEXT, text));
    }; //表情


    Msg.prototype.addFace = function (face) {
      this.addElem(new webim.Msg.Elem(MSG_ELEMENT_TYPE.FACE, face));
    }; //图片


    Msg.prototype.addImage = function (image) {
      this.addElem(new webim.Msg.Elem(MSG_ELEMENT_TYPE.IMAGE, image));
    }; //地理位置


    Msg.prototype.addLocation = function (location) {
      this.addElem(new webim.Msg.Elem(MSG_ELEMENT_TYPE.LOCATION, location));
    }; //文件


    Msg.prototype.addFile = function (file) {
      this.addElem(new webim.Msg.Elem(MSG_ELEMENT_TYPE.FILE, file));
    }; //自定义


    Msg.prototype.addCustom = function (custom) {
      this.addElem(new webim.Msg.Elem(MSG_ELEMENT_TYPE.CUSTOM, custom));
    };

    Msg.prototype.addElem = function (elem) {
      this.elems.push(elem);
    };

    Msg.prototype.toHtml = function () {
      var html = "";

      for (var i in this.elems) {
        var elem = this.elems[i];
        html += elem.toHtml();
      }

      return html;
    }; // class Msg.Elem


    Msg.Elem = function (type, value) {
      this.type = type;
      this.content = value;
    };

    Msg.Elem.prototype.getType = function () {
      return this.type;
    };

    Msg.Elem.prototype.getContent = function () {
      return this.content;
    };

    Msg.Elem.prototype.toHtml = function () {
      var html;
      html = this.content.toHtml();
      return html;
    }; // class Msg.Elem.Text


    Msg.Elem.Text = function (text) {
      this.text = tool.xssFilter(text);
    };

    Msg.Elem.Text.prototype.getText = function () {
      return this.text;
    };

    Msg.Elem.Text.prototype.toHtml = function () {
      return this.text;
    }; // class Msg.Elem.Face


    Msg.Elem.Face = function (index, data) {
      this.index = index;
      this.data = data;
    };

    Msg.Elem.Face.prototype.getIndex = function () {
      return this.index;
    };

    Msg.Elem.Face.prototype.getData = function () {
      return this.data;
    };

    Msg.Elem.Face.prototype.toHtml = function () {
      var faceUrl = null;
      var index = emotionDataIndexs[this.data];
      var emotion = emotions[index];

      if (emotion && emotion[1]) {
        faceUrl = emotion[1];
      }

      if (faceUrl) {
        return "<img src='" + faceUrl + "'/>";
      } else {
        return this.data;
      }
    }; // 地理位置消息 class Msg.Elem.Location


    Msg.Elem.Location = function (longitude, latitude, desc) {
      this.latitude = latitude; //纬度

      this.longitude = longitude; //经度

      this.desc = desc; //描述
    };

    Msg.Elem.Location.prototype.getLatitude = function () {
      return this.latitude;
    };

    Msg.Elem.Location.prototype.getLongitude = function () {
      return this.longitude;
    };

    Msg.Elem.Location.prototype.getDesc = function () {
      return this.desc;
    };

    Msg.Elem.Location.prototype.toHtml = function () {
      return '经度=' + this.longitude + ',纬度=' + this.latitude + ',描述=' + this.desc;
    }; //图片消息
    // class Msg.Elem.Images


    Msg.Elem.Images = function (imageId, format) {
      this.UUID = imageId;

      if (typeof format !== 'number') {
        format = parseInt(IMAGE_FORMAT[format] || IMAGE_FORMAT['UNKNOWN'], 10);
      }

      this.ImageFormat = format;
      this.ImageInfoArray = [];
    };

    Msg.Elem.Images.prototype.addImage = function (image) {
      this.ImageInfoArray.push(image);
    };

    Msg.Elem.Images.prototype.toHtml = function () {
      var smallImage = this.getImage(IMAGE_TYPE.SMALL);
      var bigImage = this.getImage(IMAGE_TYPE.LARGE);
      var oriImage = this.getImage(IMAGE_TYPE.ORIGIN);

      if (!bigImage) {
        bigImage = smallImage;
      }

      if (!oriImage) {
        oriImage = smallImage;
      }

      return "<img src='" + smallImage.getUrl() + "#" + bigImage.getUrl() + "#" + oriImage.getUrl() + "' style='CURSOR: hand' id='" + this.getImageId() + "' bigImgUrl='" + bigImage.getUrl() + "' onclick='imageClick(this)' />";
    };

    Msg.Elem.Images.prototype.getImageId = function () {
      return this.UUID;
    };

    Msg.Elem.Images.prototype.getImageFormat = function () {
      return this.ImageFormat;
    };

    Msg.Elem.Images.prototype.getImage = function (type) {
      for (var i in this.ImageInfoArray) {
        if (this.ImageInfoArray[i].getType() == type) {
          return this.ImageInfoArray[i];
        }
      }

      return null;
    }; // class Msg.Elem.Images.Image


    Msg.Elem.Images.Image = function (type, size, width, height, url) {
      this.type = type;
      this.size = size;
      this.width = width;
      this.height = height;
      this.url = url;
    };

    Msg.Elem.Images.Image.prototype.getType = function () {
      return this.type;
    };

    Msg.Elem.Images.Image.prototype.getSize = function () {
      return this.size;
    };

    Msg.Elem.Images.Image.prototype.getWidth = function () {
      return this.width;
    };

    Msg.Elem.Images.Image.prototype.getHeight = function () {
      return this.height;
    };

    Msg.Elem.Images.Image.prototype.getUrl = function () {
      return this.url;
    }; // class Msg.Elem.Sound


    Msg.Elem.Sound = function (uuid, second, size, senderId, receiverId, downFlag, chatType) {
      this.uuid = uuid; //文件id

      this.second = second; //时长，单位：秒

      this.size = size; //大小，单位：字节

      this.senderId = senderId; //发送者

      this.receiverId = receiverId; //接收方id

      this.downFlag = downFlag; //下载标志位

      this.busiId = chatType == SESSION_TYPE.C2C ? 2 : 1; //busi_id ( 1：群    2:C2C)
      //根据不同情况拉取数据
      //是否需要申请下载地址  0:到架平申请  1:到cos申请  2:不需要申请, 直接拿url下载

      if (downFlag !== undefined && busiId !== undefined) {
        getFileDownUrlV2(uuid, senderId, second, downFlag, receiverId, this.busiId, UPLOAD_RES_TYPE.SOUND);
      } else {
        this.downUrl = getSoundDownUrl(uuid, senderId, second); //下载地址
      }
    };

    Msg.Elem.Sound.prototype.getUUID = function () {
      return this.uuid;
    };

    Msg.Elem.Sound.prototype.getSecond = function () {
      return this.second;
    };

    Msg.Elem.Sound.prototype.getSize = function () {
      return this.size;
    };

    Msg.Elem.Sound.prototype.getSenderId = function () {
      return this.senderId;
    };

    Msg.Elem.Sound.prototype.getDownUrl = function () {
      return this.downUrl;
    };

    Msg.Elem.Sound.prototype.toHtml = function () {
      if (BROWSER_INFO.type == 'ie' && parseInt(BROWSER_INFO.ver) <= 8) {
        return '[这是一条语音消息]demo暂不支持ie8(含)以下浏览器播放语音,语音URL:' + this.downUrl;
      }

      return '<audio id="uuid_' + this.uuid + '" src="' + this.downUrl + '" controls="controls" onplay="onChangePlayAudio(this)" preload="none"></audio>';
    }; // class Msg.Elem.File


    Msg.Elem.File = function (uuid, name, size, senderId, receiverId, downFlag, chatType) {
      this.uuid = uuid; //文件id

      this.name = name; //文件名

      this.size = size; //大小，单位：字节

      this.senderId = senderId; //发送者

      this.receiverId = receiverId; //接收方id

      this.downFlag = downFlag; //下载标志位

      this.busiId = chatType == SESSION_TYPE.C2C ? 2 : 1; //busi_id ( 1：群    2:C2C)
      //根据不同情况拉取数据
      //是否需要申请下载地址  0:到架平申请  1:到cos申请  2:不需要申请, 直接拿url下载

      if (downFlag !== undefined && busiId !== undefined) {
        getFileDownUrlV2(uuid, senderId, name, downFlag, receiverId, this.busiId, UPLOAD_RES_TYPE.FILE);
      } else {
        this.downUrl = getFileDownUrl(uuid, senderId, name); //下载地址
      }
    };

    Msg.Elem.File.prototype.getUUID = function () {
      return this.uuid;
    };

    Msg.Elem.File.prototype.getName = function () {
      return this.name;
    };

    Msg.Elem.File.prototype.getSize = function () {
      return this.size;
    };

    Msg.Elem.File.prototype.getSenderId = function () {
      return this.senderId;
    };

    Msg.Elem.File.prototype.getDownUrl = function () {
      return this.downUrl;
    };

    Msg.Elem.File.prototype.getDownFlag = function () {
      return this.downFlag;
    };

    Msg.Elem.File.prototype.toHtml = function () {
      var fileSize, unitStr;
      fileSize = this.size;
      unitStr = "Byte";

      if (this.size >= 1024) {
        fileSize = Math.round(this.size / 1024);
        unitStr = "KB";
      }

      return '<a href="javascript" onclick="webim.onDownFile("' + this.uuid + '")" title="点击下载文件" ><i class="glyphicon glyphicon-file">&nbsp;' + this.name + '(' + fileSize + unitStr + ')</i></a>';
    }; // class Msg.Elem.GroupTip 群提示消息对象


    Msg.Elem.GroupTip = function (opType, opUserId, groupId, groupName, userIdList) {
      this.opType = opType; //操作类型

      this.opUserId = opUserId; //操作者id

      this.groupId = groupId; //群id

      this.groupName = groupName; //群名称

      this.userIdList = userIdList ? userIdList : []; //被操作的用户id列表

      this.groupInfoList = []; //新的群资料信息，群资料变更时才有值

      this.memberInfoList = []; //新的群成员资料信息，群成员资料变更时才有值

      this.groupMemberNum = null; //群成员数，操作类型为加群或者退群时才有值
    };

    Msg.Elem.GroupTip.prototype.addGroupInfo = function (groupInfo) {
      this.groupInfoList.push(groupInfo);
    };

    Msg.Elem.GroupTip.prototype.addMemberInfo = function (memberInfo) {
      this.memberInfoList.push(memberInfo);
    };

    Msg.Elem.GroupTip.prototype.getOpType = function () {
      return this.opType;
    };

    Msg.Elem.GroupTip.prototype.getOpUserId = function () {
      return this.opUserId;
    };

    Msg.Elem.GroupTip.prototype.getGroupId = function () {
      return this.groupId;
    };

    Msg.Elem.GroupTip.prototype.getGroupName = function () {
      return this.groupName;
    };

    Msg.Elem.GroupTip.prototype.getUserIdList = function () {
      return this.userIdList;
    };

    Msg.Elem.GroupTip.prototype.getGroupInfoList = function () {
      return this.groupInfoList;
    };

    Msg.Elem.GroupTip.prototype.getMemberInfoList = function () {
      return this.memberInfoList;
    };

    Msg.Elem.GroupTip.prototype.getGroupMemberNum = function () {
      return this.groupMemberNum;
    };

    Msg.Elem.GroupTip.prototype.setGroupMemberNum = function (groupMemberNum) {
      return this.groupMemberNum = groupMemberNum;
    };

    Msg.Elem.GroupTip.prototype.toHtml = function () {
      var text = "[群提示消息]";
      var maxIndex = GROUP_TIP_MAX_USER_COUNT - 1;

      switch (this.opType) {
        case GROUP_TIP_TYPE.JOIN:
          //加入群
          text += this.opUserId + "邀请了";

          for (var m in this.userIdList) {
            text += this.userIdList[m] + ",";

            if (this.userIdList.length > GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
              text += "等" + this.userIdList.length + "人";
              break;
            }
          }

          text += "加入该群";
          break;

        case GROUP_TIP_TYPE.QUIT:
          //退出群
          text += this.opUserId + "主动退出该群";
          break;

        case GROUP_TIP_TYPE.KICK:
          //踢出群
          text += this.opUserId + "将";

          for (var m in this.userIdList) {
            text += this.userIdList[m] + ",";

            if (this.userIdList.length > GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
              text += "等" + this.userIdList.length + "人";
              break;
            }
          }

          text += "踢出该群";
          break;

        case GROUP_TIP_TYPE.SET_ADMIN:
          //设置管理员
          text += this.opUserId + "将";

          for (var m in this.userIdList) {
            text += this.userIdList[m] + ",";

            if (this.userIdList.length > GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
              text += "等" + this.userIdList.length + "人";
              break;
            }
          }

          text += "设为管理员";
          break;

        case GROUP_TIP_TYPE.CANCEL_ADMIN:
          //取消管理员
          text += this.opUserId + "取消";

          for (var m in this.userIdList) {
            text += this.userIdList[m] + ",";

            if (this.userIdList.length > GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
              text += "等" + this.userIdList.length + "人";
              break;
            }
          }

          text += "的管理员资格";
          break;

        case GROUP_TIP_TYPE.MODIFY_GROUP_INFO:
          //群资料变更
          text += this.opUserId + "修改了群资料：";

          for (var m in this.groupInfoList) {
            var type = this.groupInfoList[m].getType();
            var value = this.groupInfoList[m].getValue();

            switch (type) {
              case GROUP_TIP_MODIFY_GROUP_INFO_TYPE.FACE_URL:
                text += "群头像为" + value + "; ";
                break;

              case GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NAME:
                text += "群名称为" + value + "; ";
                break;

              case GROUP_TIP_MODIFY_GROUP_INFO_TYPE.OWNER:
                text += "群主为" + value + "; ";
                break;

              case GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NOTIFICATION:
                text += "群公告为" + value + "; ";
                break;

              case GROUP_TIP_MODIFY_GROUP_INFO_TYPE.INTRODUCTION:
                text += "群简介为" + value + "; ";
                break;

              default:
                text += "未知信息为:type=" + type + ",value=" + value + "; ";
                break;
            }
          }

          break;

        case GROUP_TIP_TYPE.MODIFY_MEMBER_INFO:
          //群成员资料变更(禁言时间)
          text += this.opUserId + "修改了群成员资料:";

          for (var m in this.memberInfoList) {
            var userId = this.memberInfoList[m].getUserId();
            var shutupTime = this.memberInfoList[m].getShutupTime();
            text += userId + ": ";

            if (shutupTime != null && shutupTime !== undefined) {
              if (shutupTime == 0) {
                text += "取消禁言; ";
              } else {
                text += "禁言" + shutupTime + "秒; ";
              }
            } else {
              text += " shutupTime为空";
            }

            if (this.memberInfoList.length > GROUP_TIP_MAX_USER_COUNT && m == maxIndex) {
              text += "等" + this.memberInfoList.length + "人";
              break;
            }
          }

          break;

        case GROUP_TIP_TYPE.READED:
          //消息已读

          /**/
          Log.info("消息已读同步");
          break;

        default:
          text += "未知群提示消息类型：type=" + this.opType;
          break;
      }

      return text;
    }; // class Msg.Elem.GroupTip.GroupInfo，变更的群资料信息对象


    Msg.Elem.GroupTip.GroupInfo = function (type, value) {
      this.type = type; //群资料信息类型

      this.value = value; //对应的值
    };

    Msg.Elem.GroupTip.GroupInfo.prototype.getType = function () {
      return this.type;
    };

    Msg.Elem.GroupTip.GroupInfo.prototype.getValue = function () {
      return this.value;
    }; // class Msg.Elem.GroupTip.MemberInfo，变更的群成员资料信息对象


    Msg.Elem.GroupTip.MemberInfo = function (userId, shutupTime) {
      this.userId = userId; //群成员id

      this.shutupTime = shutupTime; //群成员被禁言时间，0表示取消禁言，大于0表示被禁言时长，单位：秒
    };

    Msg.Elem.GroupTip.MemberInfo.prototype.getUserId = function () {
      return this.userId;
    };

    Msg.Elem.GroupTip.MemberInfo.prototype.getShutupTime = function () {
      return this.shutupTime;
    }; // 自定义消息类型 class Msg.Elem.Custom


    Msg.Elem.Custom = function (data, desc, ext) {
      this.data = data; //数据

      this.desc = desc; //描述

      this.ext = ext; //扩展字段
    };

    Msg.Elem.Custom.prototype.getData = function () {
      return this.data;
    };

    Msg.Elem.Custom.prototype.getDesc = function () {
      return this.desc;
    };

    Msg.Elem.Custom.prototype.getExt = function () {
      return this.ext;
    };

    Msg.Elem.Custom.prototype.toHtml = function () {
      return this.data;
    }; // singleton object MsgStore


    var MsgStore = new function () {
      var sessMap = {}; //跟所有用户或群的聊天记录MAP

      var sessTimeline = []; //按时间降序排列的会话列表

      msgCache = {}; //消息缓存，用于判重
      //C2C

      this.cookie = ""; //上一次拉取新c2c消息的cookie

      this.syncFlag = 0; //上一次拉取新c2c消息的是否继续拉取标记

      var visitSess = function visitSess(visitor) {
        for (var i in sessMap) {
          visitor(sessMap[i]);
        }
      }; // window.msgCache = msgCache;
      //消息查重


      var checkDupMsg = function checkDupMsg(msg) {
        var dup = false;
        var first_key = msg.sess._impl.skey;
        var second_key = msg.isSend + msg.seq + msg.random;
        var tempMsg = msgCache[first_key] && msgCache[first_key][second_key];

        if (tempMsg) {
          dup = true;
        }

        if (msgCache[first_key]) {
          msgCache[first_key][second_key] = {
            time: msg.time
          };
        } else {
          msgCache[first_key] = {};
          msgCache[first_key][second_key] = {
            time: msg.time
          };
        }

        return dup;
      };

      this.sessMap = function () {
        return sessMap;
      };

      this.sessCount = function () {
        return sessTimeline.length;
      };

      this.sessByTypeId = function (type, id) {
        var skey = Session.skey(type, id);
        if (skey === undefined || skey == null) return null;
        return sessMap[skey];
      };

      this.delSessByTypeId = function (type, id) {
        var skey = Session.skey(type, id);
        if (skey === undefined || skey == null) return false;

        if (sessMap[skey]) {
          delete sessMap[skey];
          delete msgCache[skey];
        }

        return true;
      };

      this.resetCookieAndSyncFlag = function () {
        this.cookie = "";
        this.syncFlag = 0;
      }; //切换将当前会话的自动读取消息标志为isOn,重置其他会话的自动读取消息标志为false


      this.setAutoRead = function (selSess, isOn, isResetAll) {
        if (isResetAll) visitSess(function (s) {
          s._impl.isAutoRead = false;
        });

        if (selSess) {
          selSess._impl.isAutoRead = isOn; //

          if (isOn) {
            //是否调用已读上报接口
            selSess._impl.unread = 0;

            if (selSess._impl.type == SESSION_TYPE.C2C) {
              //私聊消息已读上报
              var tmpC2CMsgReadedItem = [];
              tmpC2CMsgReadedItem.push(new C2CMsgReadedItem(selSess._impl.id, selSess._impl.time)); //调用C2C消息已读上报接口

              proto_c2CMsgReaded(MsgStore.cookie, tmpC2CMsgReadedItem, function (resp) {
                log.info("[setAutoRead]: c2CMsgReaded success");
              }, function (err) {
                log.error("[setAutoRead}: c2CMsgReaded failed:" + err.ErrorInfo);
              });
            } else if (selSess._impl.type == SESSION_TYPE.GROUP) {
              //群聊消息已读上报
              var tmpOpt = {
                'GroupId': selSess._impl.id,
                'MsgReadedSeq': selSess._impl.curMaxMsgSeq
              }; //调用group消息已读上报接口

              proto_groupMsgReaded(tmpOpt, function (resp) {
                log.info("groupMsgReaded success");
              }, function (err) {
                log.error("groupMsgReaded failed:" + err.ErrorInfo);
              });
            }
          }
        }
      };

      this.c2CMsgReaded = function (opts, cbOk, cbErr) {
        var tmpC2CMsgReadedItem = [];
        tmpC2CMsgReadedItem.push(new C2CMsgReadedItem(opts.To_Account, opts.LastedMsgTime)); //调用C2C消息已读上报接口

        proto_c2CMsgReaded(MsgStore.cookie, tmpC2CMsgReadedItem, function (resp) {
          if (cbOk) {
            log.info("c2CMsgReaded success");
            cbOk(resp);
          }
        }, function (err) {
          if (cbErr) {
            log.error("c2CMsgReaded failed:" + err.ErrorInfo);
            cbErr(err);
          }
        });
      };

      this.addSession = function (sess) {
        sessMap[sess._impl.skey] = sess;
      };

      this.delSession = function (sess) {
        delete sessMap[sess._impl.skey];
      };

      this.addMsg = function (msg) {
        if (checkDupMsg(msg)) return false;
        var sess = msg.sess;
        if (!sessMap[sess._impl.skey]) this.addSession(sess);

        sess._impl_addMsg(msg);

        return true;
      };

      this.updateTimeline = function () {
        var arr = new Array();
        visitSess(function (sess) {
          arr.push(sess);
        });
        arr.sort(function (a, b) {
          return b.time - a.time;
        });
        sessTimeline = arr;
      };
    }(); // singleton object MsgManager

    var MsgManager = new function () {
      var onMsgCallback = null; //新消息(c2c和group)回调

      var onGroupInfoChangeCallback = null; //群资料变化回调
      //收到新群系统消息回调列表

      var onGroupSystemNotifyCallbacks = {
        "1": null,
        "2": null,
        "3": null,
        "4": null,
        "5": null,
        "6": null,
        "7": null,
        "8": null,
        "9": null,
        "10": null,
        "11": null,
        "15": null,
        "255": null,
        "12": null
      }; //监听好友系统通知函数

      var onFriendSystemNotifyCallbacks = {
        "1": null,
        "2": null,
        "3": null,
        "4": null,
        "5": null,
        "6": null,
        "7": null,
        "8": null
      };
      var onProfileSystemNotifyCallbacks = {
        "1": null
      }; //普通长轮询

      var longPollingOn = false; //是否开启普通长轮询

      var isLongPollingRequesting = false; //是否在长轮询ing

      var notifySeq = 0; //c2c通知seq

      var noticeSeq = 0; //群消息seq
      //大群长轮询

      var onBigGroupMsgCallback = null; //大群消息回调

      var bigGroupLongPollingOn = false; //是否开启长轮询

      var bigGroupLongPollingStartSeq = 0; //请求拉消息的起始seq(大群长轮询)

      var bigGroupLongPollingHoldTime = 90; //客户端长轮询的超时时间，单位是秒(大群长轮询)

      var bigGroupLongPollingKey = null; //客户端加入群组后收到的的Key(大群长轮询)

      var bigGroupLongPollingMsgMap = {}; //记录收到的群消息数

      var onC2cEventCallbacks = {
        "92": null,
        //消息已读通知,
        "96": null
      };
      ;
      var onKickedEventCall = null; //多实例登录回调

      var onAppliedDownloadUrl = null;
      var getLostGroupMsgCount = 0; //补拉丢失的群消息次数
      //我的群当前最大的seq

      var myGroupMaxSeqs = {}; //用于补拉丢失的群消息

      var groupSystemMsgsCache = {}; //群组系统消息缓存,用于判重
      //设置长轮询开关
      //isOn=true 开启
      //isOn=false 停止

      this.setLongPollingOn = function (isOn) {
        longPollingOn = isOn;
      };

      this.getLongPollingOn = function () {
        return longPollingOn;
      }; //重置长轮询变量


      this.resetLongPollingInfo = function () {
        longPollingOn = false;
        notifySeq = 0;
        noticeSeq = 0;
      }; //设置大群长轮询开关
      //isOn=true 开启
      //isOn=false 停止


      this.setBigGroupLongPollingOn = function (isOn) {
        bigGroupLongPollingOn = isOn;
      }; //设置大群长轮询key


      this.setBigGroupLongPollingKey = function (key) {
        bigGroupLongPollingKey = key;
      }; //重置大群长轮询变量


      this.resetBigGroupLongPollingInfo = function () {
        bigGroupLongPollingOn = false;
        bigGroupLongPollingStartSeq = 0;
        bigGroupLongPollingKey = null;
        bigGroupLongPollingMsgMap = {};
      }; //设置群消息数据条数


      this.setBigGroupLongPollingMsgMap = function (groupId, count) {
        var bigGroupLongPollingMsgCount = bigGroupLongPollingMsgMap[groupId];

        if (bigGroupLongPollingMsgCount) {
          bigGroupLongPollingMsgCount = parseInt(bigGroupLongPollingMsgCount) + count;
          bigGroupLongPollingMsgMap[groupId] = bigGroupLongPollingMsgCount;
        } else {
          bigGroupLongPollingMsgMap[groupId] = count;
        }
      }; //重置


      this.clear = function () {
        onGroupInfoChangeCallback = null;
        onGroupSystemNotifyCallbacks = {
          "1": null,
          //申请加群请求（只有管理员会收到）
          "2": null,
          //申请加群被同意（只有申请人能够收到）
          "3": null,
          //申请加群被拒绝（只有申请人能够收到）
          "4": null,
          //被管理员踢出群(只有被踢者接收到)
          "5": null,
          //群被解散(全员接收)
          "6": null,
          //创建群(创建者接收)
          "7": null,
          //邀请加群(被邀请者接收)
          "8": null,
          //主动退群(主动退出者接收)
          "9": null,
          //设置管理员(被设置者接收)
          "10": null,
          //取消管理员(被取消者接收)
          "11": null,
          //群已被回收(全员接收)
          "15": null,
          //群已被回收(全员接收)
          "255": null,
          //用户自定义通知(默认全员接收)
          "12": null //邀请加群(被邀请者需要同意)

        };
        onFriendSystemNotifyCallbacks = {
          "1": null,
          //好友表增加
          "2": null,
          //好友表删除
          "3": null,
          //未决增加
          "4": null,
          //未决删除
          "5": null,
          //黑名单增加
          "6": null,
          //黑名单删除
          "7": null,
          //未决已读上报
          "8": null //好友信息(备注，分组)变更

        };
        onProfileSystemNotifyCallbacks = {
          "1": null //资料修改

        }; //重置普通长轮询参数

        onMsgCallback = null;
        longPollingOn = false;
        notifySeq = 0; //c2c新消息通知seq

        noticeSeq = 0; //group新消息seq
        //重置大群长轮询参数

        onBigGroupMsgCallback = null;
        bigGroupLongPollingOn = false;
        bigGroupLongPollingStartSeq = 0;
        bigGroupLongPollingKey = null;
        bigGroupLongPollingMsgMap = {};
        groupSystemMsgsCache = {};
        ipList = []; //文件下载地址

        authkey = null; //文件下载票据

        expireTime = null; //票据超时时间
      }; //初始化文件下载ip和票据


      var initIpAndAuthkey = function initIpAndAuthkey(cbOk, cbErr) {
        proto_getIpAndAuthkey(function (resp) {
          ipList = resp.IpList;
          authkey = resp.AuthKey;
          expireTime = resp.ExpireTime;
          if (cbOk) cbOk(resp);
        }, function (err) {
          log.error("initIpAndAuthkey failed:" + err.ErrorInfo);
          if (cbErr) cbErr(err);
        });
      }; //初始化我的群当前最大的seq，用于补拉丢失的群消息


      var initMyGroupMaxSeqs = function initMyGroupMaxSeqs(cbOk, cbErr) {
        var opts = {
          'Member_Account': ctx.identifier,
          'Limit': 1000,
          'Offset': 0,
          'GroupBaseInfoFilter': ['NextMsgSeq']
        };
        proto_getJoinedGroupListHigh(opts, function (resp) {
          if (!resp.GroupIdList || resp.GroupIdList.length == 0) {
            log.info("initMyGroupMaxSeqs: 目前还没有加入任何群组");
            if (cbOk) cbOk(resp);
            return;
          }

          for (var i = 0; i < resp.GroupIdList.length; i++) {
            var group_id = resp.GroupIdList[i].GroupId;
            var curMaxSeq = resp.GroupIdList[i].NextMsgSeq - 1;
            myGroupMaxSeqs[group_id] = curMaxSeq;
          }

          if (cbOk) cbOk(resp);
        }, function (err) {
          log.error("initMyGroupMaxSeqs failed:" + err.ErrorInfo);
          if (cbErr) cbErr(err);
        });
      }; //补拉群消息


      var getLostGroupMsgs = function getLostGroupMsgs(groupId, reqMsgSeq, reqMsgNumber) {
        getLostGroupMsgCount++; //发起一个拉群群消息请求

        var tempOpts = {
          'GroupId': groupId,
          'ReqMsgSeq': reqMsgSeq,
          'ReqMsgNumber': reqMsgNumber
        }; //发起一个拉群群消息请求

        log.warn("第" + getLostGroupMsgCount + "次补齐群消息,参数=" + JSON.stringify(tempOpts));
        MsgManager.syncGroupMsgs(tempOpts);
      }; //更新群当前最大消息seq


      var updateMyGroupCurMaxSeq = function updateMyGroupCurMaxSeq(groupId, msgSeq) {
        //更新myGroupMaxSeqs中的群最大seq
        var curMsgSeq = myGroupMaxSeqs[groupId];

        if (curMsgSeq) {
          //如果存在，比较大小
          if (msgSeq > curMsgSeq) {
            myGroupMaxSeqs[groupId] = msgSeq;
          }
        } else {
          //不存在，新增
          myGroupMaxSeqs[groupId] = msgSeq;
        }
      }; //添加群消息列表


      var addGroupMsgList = function addGroupMsgList(msgs, new_group_msgs) {
        for (var p in msgs) {
          var newGroupMsg = msgs[p]; //发群消息时，长轮询接口会返回用户自己发的群消息
          //if(newGroupMsg.From_Account && newGroupMsg.From_Account!=ctx.identifier ){

          if (newGroupMsg.From_Account) {
            //false-不是主动拉取的历史消息
            //true-需要保存到sdk本地session,并且需要判重
            var msg = handlerGroupMsg(newGroupMsg, false, true);

            if (msg) {
              //不为空，加到新消息里
              new_group_msgs.push(msg);
            } //更新myGroupMaxSeqs中的群最大seq


            updateMyGroupCurMaxSeq(newGroupMsg.ToGroupId, newGroupMsg.MsgSeq);
          }
        }

        return new_group_msgs;
      }; //处理收到的群普通和提示消息


      var handlerOrdinaryAndTipC2cMsgs = function handlerOrdinaryAndTipC2cMsgs(eventType, groupMsgArray) {
        var groupMsgMap = {}; //保存收到的C2c消息信息（群号，最小，最大消息seq，消息列表）

        var new_group_msgs = [];
        var minGroupMsgSeq = 99999999;
        var maxGroupMsgSeq = -1;

        for (var j in groupMsgArray) {
          var groupMsgs = groupMsgMap[groupMsgArray[j].ToGroupId];

          if (!groupMsgs) {
            groupMsgs = groupMsgMap[groupMsgArray[j].ToGroupId] = {
              "min": minGroupMsgSeq,
              //收到新消息最小seq
              "max": maxGroupMsgSeq,
              //收到新消息最大seq
              "msgs": [] //收到的新消息

            };
          } //更新长轮询的群NoticeSeq


          if (groupMsgArray[j].NoticeSeq > noticeSeq) {
            log.warn("noticeSeq=" + noticeSeq + ",msgNoticeSeq=" + groupMsgArray[j].NoticeSeq);
            noticeSeq = groupMsgArray[j].NoticeSeq;
          }

          groupMsgArray[j].Event = eventType;
          groupMsgMap[groupMsgArray[j].ToGroupId].msgs.push(groupMsgArray[j]); //新增一条消息

          if (groupMsgArray[j].MsgSeq < groupMsgs.min) {
            //记录最小的消息seq
            groupMsgMap[groupMsgArray[j].ToGroupId].min = groupMsgArray[j].MsgSeq;
          }

          if (groupMsgArray[j].MsgSeq > groupMsgs.max) {
            //记录最大的消息seq
            groupMsgMap[groupMsgArray[j].ToGroupId].max = groupMsgArray[j].MsgSeq;
          }
        }

        for (var groupId in groupMsgMap) {
          var tempCount = groupMsgMap[groupId].max - groupMsgMap[groupId].min + 1; //收到的新的群消息数

          var curMaxMsgSeq = myGroupMaxSeqs[groupId]; //获取本地保存的群最大消息seq

          if (curMaxMsgSeq) {
            //存在这个群的最大消息seq
            //高并发情况下，长轮询可能存在丢消息，这时需要客户端通过拉取群消息接口补齐下
            //1、如果收到的新消息最小seq比当前最大群消息seq大于1，则表示收到的群消息发生跳跃，需要补齐
            //2、收到的新群消息seq存在不连续情况，也需要补齐
            if (groupMsgMap[groupId].min - curMaxMsgSeq > 1 || groupMsgMap[groupId].msgs.length < tempCount) {
              //发起一个拉群群消息请求
              log.warn("发起一次补齐群消息请求,curMaxMsgSeq=" + curMaxMsgSeq + ", minMsgSeq=" + groupMsgMap[groupId].min + ", maxMsgSeq=" + groupMsgMap[groupId].max + ", msgs.length=" + groupMsgMap[groupId].msgs.length + ", tempCount=" + tempCount);
              getLostGroupMsgs(groupId, groupMsgMap[groupId].max, groupMsgMap[groupId].max - curMaxMsgSeq); //更新myGroupMaxSeqs中的群最大seq

              updateMyGroupCurMaxSeq(groupId, groupMsgMap[groupId].max);
            } else {
              new_group_msgs = addGroupMsgList(groupMsgMap[groupId].msgs, new_group_msgs);
            }
          } else {
            //不存在该群的最大消息seq
            log.warn("不存在该群的最大消息seq，群id=" + groupId); //高并发情况下，长轮询可能存在丢消息，这时需要客户端通过拉取群消息接口补齐下
            //1、收到的新群消息seq存在不连续情况，也需要补齐

            if (groupMsgMap[groupId].msgs.length < tempCount) {
              //发起一个拉群群消息请求
              log.warn("发起一次补齐群消息请求,minMsgSeq=" + groupMsgMap[groupId].min + ", maxMsgSeq=" + groupMsgMap[groupId].max + ", msgs.length=" + groupMsgMap[groupId].msgs.length + ", tempCount=" + tempCount);
              getLostGroupMsgs(groupId, groupMsgMap[groupId].max, tempCount); //更新myGroupMaxSeqs中的群最大seq

              updateMyGroupCurMaxSeq(groupId, groupMsgMap[groupId].max);
            } else {
              new_group_msgs = addGroupMsgList(groupMsgMap[groupId].msgs, new_group_msgs);
            }
          }
        }

        if (new_group_msgs.length) {
          MsgStore.updateTimeline();
        }

        if (onMsgCallback && new_group_msgs.length) onMsgCallback(new_group_msgs);
      }; //处理收到的群普通和提示消息


      var handlerOrdinaryAndTipGroupMsgs = function handlerOrdinaryAndTipGroupMsgs(eventType, groupMsgArray) {
        var groupMsgMap = {}; //保存收到的群消息信息（群号，最小，最大消息seq，消息列表）

        var new_group_msgs = [];
        var minGroupMsgSeq = 99999999;
        var maxGroupMsgSeq = -1;

        for (var j in groupMsgArray) {
          var groupMsgs = groupMsgMap[groupMsgArray[j].ToGroupId];

          if (!groupMsgs) {
            groupMsgs = groupMsgMap[groupMsgArray[j].ToGroupId] = {
              "min": minGroupMsgSeq,
              //收到新消息最小seq
              "max": maxGroupMsgSeq,
              //收到新消息最大seq
              "msgs": [] //收到的新消息

            };
          } //更新长轮询的群NoticeSeq


          if (groupMsgArray[j].NoticeSeq > noticeSeq) {
            log.warn("noticeSeq=" + noticeSeq + ",msgNoticeSeq=" + groupMsgArray[j].NoticeSeq);
            noticeSeq = groupMsgArray[j].NoticeSeq;
          }

          groupMsgArray[j].Event = eventType;
          groupMsgMap[groupMsgArray[j].ToGroupId].msgs.push(groupMsgArray[j]); //新增一条消息

          if (groupMsgArray[j].MsgSeq < groupMsgs.min) {
            //记录最小的消息seq
            groupMsgMap[groupMsgArray[j].ToGroupId].min = groupMsgArray[j].MsgSeq;
          }

          if (groupMsgArray[j].MsgSeq > groupMsgs.max) {
            //记录最大的消息seq
            groupMsgMap[groupMsgArray[j].ToGroupId].max = groupMsgArray[j].MsgSeq;
          }
        }

        for (var groupId in groupMsgMap) {
          var tempCount = groupMsgMap[groupId].max - groupMsgMap[groupId].min + 1; //收到的新的群消息数

          var curMaxMsgSeq = myGroupMaxSeqs[groupId]; //获取本地保存的群最大消息seq

          if (curMaxMsgSeq) {
            //存在这个群的最大消息seq
            //高并发情况下，长轮询可能存在丢消息，这时需要客户端通过拉取群消息接口补齐下
            //1、如果收到的新消息最小seq比当前最大群消息seq大于1，则表示收到的群消息发生跳跃，需要补齐
            //2、收到的新群消息seq存在不连续情况，也需要补齐
            if (groupMsgMap[groupId].min - curMaxMsgSeq > 1 || groupMsgMap[groupId].msgs.length < tempCount) {
              //发起一个拉群群消息请求
              log.warn("发起一次补齐群消息请求,curMaxMsgSeq=" + curMaxMsgSeq + ", minMsgSeq=" + groupMsgMap[groupId].min + ", maxMsgSeq=" + groupMsgMap[groupId].max + ", msgs.length=" + groupMsgMap[groupId].msgs.length + ", tempCount=" + tempCount);
              getLostGroupMsgs(groupId, groupMsgMap[groupId].max, groupMsgMap[groupId].max - curMaxMsgSeq); //更新myGroupMaxSeqs中的群最大seq

              updateMyGroupCurMaxSeq(groupId, groupMsgMap[groupId].max);
            } else {
              new_group_msgs = addGroupMsgList(groupMsgMap[groupId].msgs, new_group_msgs);
            }
          } else {
            //不存在该群的最大消息seq
            log.warn("不存在该群的最大消息seq，群id=" + groupId); //高并发情况下，长轮询可能存在丢消息，这时需要客户端通过拉取群消息接口补齐下
            //1、收到的新群消息seq存在不连续情况，也需要补齐

            if (groupMsgMap[groupId].msgs.length < tempCount) {
              //发起一个拉群群消息请求
              log.warn("发起一次补齐群消息请求,minMsgSeq=" + groupMsgMap[groupId].min + ", maxMsgSeq=" + groupMsgMap[groupId].max + ", msgs.length=" + groupMsgMap[groupId].msgs.length + ", tempCount=" + tempCount);
              getLostGroupMsgs(groupId, groupMsgMap[groupId].max, tempCount); //更新myGroupMaxSeqs中的群最大seq

              updateMyGroupCurMaxSeq(groupId, groupMsgMap[groupId].max);
            } else {
              new_group_msgs = addGroupMsgList(groupMsgMap[groupId].msgs, new_group_msgs);
            }
          }
        }

        if (new_group_msgs.length) {
          MsgStore.updateTimeline();
        }

        if (onMsgCallback && new_group_msgs.length) onMsgCallback(new_group_msgs);
      }; //处理新的群提示消息


      var handlerGroupTips = function handlerGroupTips(groupTips) {
        var new_group_msgs = [];

        for (var o in groupTips) {
          var groupTip = groupTips[o]; //添加event字段

          groupTip.Event = LONG_POLLINNG_EVENT_TYPE.GROUP_TIP; //更新群消息通知seq

          if (groupTip.NoticeSeq > noticeSeq) {
            noticeSeq = groupTip.NoticeSeq;
          }

          var msg = handlerGroupMsg(groupTip, false, true);

          if (msg) {
            new_group_msgs.push(msg);
          }
        }

        if (new_group_msgs.length) {
          MsgStore.updateTimeline();
        }

        if (onMsgCallback && new_group_msgs.length) onMsgCallback(new_group_msgs);
      }; //处理新的群系统消息
      //isNeedValidRepeatMsg 是否需要判重


      var handlerGroupSystemMsgs = function handlerGroupSystemMsgs(groupSystemMsgs, isNeedValidRepeatMsg) {
        for (var k in groupSystemMsgs) {
          var groupTip = groupSystemMsgs[k];
          var groupReportTypeMsg = groupTip.MsgBody;
          var reportType = groupReportTypeMsg.ReportType; //当长轮询返回的群系统消息，才需要更新群消息通知seq

          if (isNeedValidRepeatMsg == false && groupTip.NoticeSeq && groupTip.NoticeSeq > noticeSeq) {
            noticeSeq = groupTip.NoticeSeq;
          }

          var toAccount = groupTip.GroupInfo.To_Account; //过滤本不应该给自己的系统消息

          /*if (!toAccount || toAccount != ctx.identifier) {
          log.error("收到本不应该给自己的系统消息: To_Account=" + toAccount);
          continue;
          }*/

          if (isNeedValidRepeatMsg) {
            //var key=groupTip.ToGroupId+"_"+reportType+"_"+groupTip.MsgTimeStamp+"_"+groupReportTypeMsg.Operator_Account;
            var key = groupTip.ToGroupId + "_" + reportType + "_" + groupReportTypeMsg.Operator_Account;
            var isExist = groupSystemMsgsCache[key];

            if (isExist) {
              log.warn("收到重复的群系统消息：key=" + key);
              continue;
            }

            groupSystemMsgsCache[key] = true;
          }

          var notify = {
            "SrcFlag": 0,
            "ReportType": reportType,
            "GroupId": groupTip.ToGroupId,
            "GroupName": groupTip.GroupInfo.GroupName,
            "Operator_Account": groupReportTypeMsg.Operator_Account,
            "MsgTime": groupTip.MsgTimeStamp,
            "groupReportTypeMsg": groupReportTypeMsg
          };

          switch (reportType) {
            case GROUP_SYSTEM_TYPE.JOIN_GROUP_REQUEST:
              //申请加群(只有管理员会接收到)
              notify["RemarkInfo"] = groupReportTypeMsg.RemarkInfo;
              notify["MsgKey"] = groupReportTypeMsg.MsgKey;
              notify["Authentication"] = groupReportTypeMsg.Authentication;
              notify["UserDefinedField"] = groupTip.UserDefinedField;
              notify["From_Account"] = groupTip.From_Account;
              notify["MsgSeq"] = groupTip.ClientSeq;
              notify["MsgRandom"] = groupTip.MsgRandom;
              break;

            case GROUP_SYSTEM_TYPE.JOIN_GROUP_ACCEPT: //申请加群被同意(只有申请人自己接收到)

            case GROUP_SYSTEM_TYPE.JOIN_GROUP_REFUSE:
              //申请加群被拒绝(只有申请人自己接收到)
              notify["RemarkInfo"] = groupReportTypeMsg.RemarkInfo;
              break;

            case GROUP_SYSTEM_TYPE.KICK: //被管理员踢出群(只有被踢者接收到)

            case GROUP_SYSTEM_TYPE.DESTORY: //群被解散(全员接收)

            case GROUP_SYSTEM_TYPE.CREATE: //创建群(创建者接收, 不展示)

            case GROUP_SYSTEM_TYPE.INVITED_JOIN_GROUP_REQUEST: //邀请加群(被邀请者接收)

            case GROUP_SYSTEM_TYPE.INVITED_JOIN_GROUP_REQUEST_AGREE: //邀请加群(被邀请者需同意)

            case GROUP_SYSTEM_TYPE.QUIT: //主动退群(主动退出者接收, 不展示)

            case GROUP_SYSTEM_TYPE.SET_ADMIN: //群设置管理员(被设置者接收)

            case GROUP_SYSTEM_TYPE.CANCEL_ADMIN: //取消管理员(被取消者接收)

            case GROUP_SYSTEM_TYPE.REVOKE:
              //群已被回收(全员接收, 不展示)
              break;

            case GROUP_SYSTEM_TYPE.READED:
              //群消息已读同步
              break;

            case GROUP_SYSTEM_TYPE.CUSTOM:
              //用户自定义通知(默认全员接收)
              notify["MsgSeq"] = groupTip.MsgSeq;
              notify["UserDefinedField"] = groupReportTypeMsg.UserDefinedField;
              break;

            default:
              log.error("未知群系统消息类型：reportType=" + reportType);
              break;
          }

          if (isNeedValidRepeatMsg) {
            if (reportType == GROUP_SYSTEM_TYPE.JOIN_GROUP_REQUEST) {
              //回调
              if (onGroupSystemNotifyCallbacks[reportType]) onGroupSystemNotifyCallbacks[reportType](notify);
            }
          } else {
            //回调
            if (onGroupSystemNotifyCallbacks[reportType]) {
              if (reportType == GROUP_SYSTEM_TYPE.READED) {
                var arr = notify.groupReportTypeMsg.GroupReadInfoArray;

                for (var i = 0, l = arr.length; i < l; i++) {
                  var item = arr[i];
                  onGroupSystemNotifyCallbacks[reportType](item);
                }
              } else {
                onGroupSystemNotifyCallbacks[reportType](notify);
              }
            }
          }
        } //loop

      }; //处理新的好友系统通知
      //isNeedValidRepeatMsg 是否需要判重


      var handlerFriendSystemNotices = function handlerFriendSystemNotices(friendSystemNotices, isNeedValidRepeatMsg) {
        var friendNotice, type, notify;

        for (var k in friendSystemNotices) {
          friendNotice = friendSystemNotices[k];
          type = friendNotice.PushType; //当长轮询返回的群系统消息，才需要更新通知seq

          if (isNeedValidRepeatMsg == false && friendNotice.NoticeSeq && friendNotice.NoticeSeq > noticeSeq) {
            noticeSeq = friendNotice.NoticeSeq;
          }

          notify = {
            'Type': type
          };

          switch (type) {
            case FRIEND_NOTICE_TYPE.FRIEND_ADD:
              //好友表增加
              notify["Accounts"] = friendNotice.FriendAdd_Account;
              break;

            case FRIEND_NOTICE_TYPE.FRIEND_DELETE:
              //好友表删除
              notify["Accounts"] = friendNotice.FriendDel_Account;
              break;

            case FRIEND_NOTICE_TYPE.PENDENCY_ADD:
              //未决增加
              notify["PendencyList"] = friendNotice.PendencyAdd;
              break;

            case FRIEND_NOTICE_TYPE.PENDENCY_DELETE:
              //未决删除
              notify["Accounts"] = friendNotice.FrienPencydDel_Account;
              break;

            case FRIEND_NOTICE_TYPE.BLACK_LIST_ADD:
              //黑名单增加
              notify["Accounts"] = friendNotice.BlackListAdd_Account;
              break;

            case FRIEND_NOTICE_TYPE.BLACK_LIST_DELETE:
              //黑名单删除
              notify["Accounts"] = friendNotice.BlackListDel_Account;
              break;

            /*case FRIEND_NOTICE_TYPE.PENDENCY_REPORT://未决已读上报
            break;
            case FRIEND_NOTICE_TYPE.FRIEND_UPDATE://好友数据更新
            break;
            */

            default:
              log.error("未知好友系统通知类型：friendNotice=" + JSON.stringify(friendNotice));
              break;
          }

          if (isNeedValidRepeatMsg) {
            if (type == FRIEND_NOTICE_TYPE.PENDENCY_ADD) {
              //回调
              if (onFriendSystemNotifyCallbacks[type]) onFriendSystemNotifyCallbacks[type](notify);
            }
          } else {
            //回调
            if (onFriendSystemNotifyCallbacks[type]) onFriendSystemNotifyCallbacks[type](notify);
          }
        } //loop

      }; //处理新的资料系统通知
      //isNeedValidRepeatMsg 是否需要判重


      var handlerProfileSystemNotices = function handlerProfileSystemNotices(profileSystemNotices, isNeedValidRepeatMsg) {
        var profileNotice, type, notify;

        for (var k in profileSystemNotices) {
          profileNotice = profileSystemNotices[k];
          type = profileNotice.PushType; //当长轮询返回的群系统消息，才需要更新通知seq

          if (isNeedValidRepeatMsg == false && profileNotice.NoticeSeq && profileNotice.NoticeSeq > noticeSeq) {
            noticeSeq = profileNotice.NoticeSeq;
          }

          notify = {
            'Type': type
          };

          switch (type) {
            case PROFILE_NOTICE_TYPE.PROFILE_MODIFY:
              //资料修改
              notify["Profile_Account"] = profileNotice.Profile_Account;
              notify["ProfileList"] = profileNotice.ProfileList;
              break;

            default:
              log.error("未知资料系统通知类型：profileNotice=" + JSON.stringify(profileNotice));
              break;
          }

          if (isNeedValidRepeatMsg) {
            if (type == PROFILE_NOTICE_TYPE.PROFILE_MODIFY) {
              //回调
              if (onProfileSystemNotifyCallbacks[type]) onProfileSystemNotifyCallbacks[type](notify);
            }
          } else {
            //回调
            if (onProfileSystemNotifyCallbacks[type]) onProfileSystemNotifyCallbacks[type](notify);
          }
        } //loop

      }; //处理新的群系统消息(用于直播大群长轮询)


      var handlerGroupSystemMsg = function handlerGroupSystemMsg(groupTip) {
        var groupReportTypeMsg = groupTip.MsgBody;
        var reportType = groupReportTypeMsg.ReportType;
        var toAccount = groupTip.GroupInfo.To_Account; //过滤本不应该给自己的系统消息
        //if(!toAccount || toAccount!=ctx.identifier){
        //    log.error("收到本不应该给自己的系统消息: To_Account="+toAccount);
        //    continue;
        //}

        var notify = {
          "SrcFlag": 1,
          "ReportType": reportType,
          "GroupId": groupTip.ToGroupId,
          "GroupName": groupTip.GroupInfo.GroupName,
          "Operator_Account": groupReportTypeMsg.Operator_Account,
          "MsgTime": groupTip.MsgTimeStamp
        };

        switch (reportType) {
          case GROUP_SYSTEM_TYPE.JOIN_GROUP_REQUEST:
            //申请加群(只有管理员会接收到)
            notify["RemarkInfo"] = groupReportTypeMsg.RemarkInfo;
            notify["MsgKey"] = groupReportTypeMsg.MsgKey;
            notify["Authentication"] = groupReportTypeMsg.Authentication;
            notify["UserDefinedField"] = groupTip.UserDefinedField;
            notify["From_Account"] = groupTip.From_Account;
            notify["MsgSeq"] = groupTip.ClientSeq;
            notify["MsgRandom"] = groupTip.MsgRandom;
            break;

          case GROUP_SYSTEM_TYPE.JOIN_GROUP_ACCEPT: //申请加群被同意(只有申请人自己接收到)

          case GROUP_SYSTEM_TYPE.JOIN_GROUP_REFUSE:
            //申请加群被拒绝(只有申请人自己接收到)
            notify["RemarkInfo"] = groupReportTypeMsg.RemarkInfo;
            break;

          case GROUP_SYSTEM_TYPE.KICK: //被管理员踢出群(只有被踢者接收到)

          case GROUP_SYSTEM_TYPE.DESTORY: //群被解散(全员接收)

          case GROUP_SYSTEM_TYPE.CREATE: //创建群(创建者接收, 不展示)

          case GROUP_SYSTEM_TYPE.INVITED_JOIN_GROUP_REQUEST: //邀请加群(被邀请者接收)

          case GROUP_SYSTEM_TYPE.INVITED_JOIN_GROUP_REQUEST_AGREE: //邀请加群(被邀请者需要同意)

          case GROUP_SYSTEM_TYPE.QUIT: //主动退群(主动退出者接收, 不展示)

          case GROUP_SYSTEM_TYPE.SET_ADMIN: //群设置管理员(被设置者接收)

          case GROUP_SYSTEM_TYPE.CANCEL_ADMIN: //取消管理员(被取消者接收)

          case GROUP_SYSTEM_TYPE.REVOKE:
            //群已被回收(全员接收, 不展示)
            break;

          case GROUP_SYSTEM_TYPE.CUSTOM:
            //用户自定义通知(默认全员接收)
            notify["MsgSeq"] = groupTip.MsgSeq;
            notify["UserDefinedField"] = groupReportTypeMsg.UserDefinedField;
            break;

          default:
            log.error("未知群系统消息类型：reportType=" + reportType);
            break;
        } //回调


        if (onGroupSystemNotifyCallbacks[reportType]) onGroupSystemNotifyCallbacks[reportType](notify);
      }; //处理C2C EVENT 消息通道Array


      var handlerC2cNotifyMsgArray = function handlerC2cNotifyMsgArray(arr) {
        for (var i = 0, l = arr.length; i < l; i++) {
          handlerC2cEventMsg(arr[i]);
        }
      }; //处理C2C EVENT 消息通道Item


      var handlerC2cEventMsg = function handlerC2cEventMsg(notify) {
        var subType = notify.SubMsgType;

        switch (subType) {
          case C2C_EVENT_SUB_TYPE.READED:
            //已读通知
            // stopPolling = true;
            //回调onMsgReadCallback
            if (notify.ReadC2cMsgNotify.UinPairReadArray && onC2cEventCallbacks[subType]) {
              for (var i = 0, l = notify.ReadC2cMsgNotify.UinPairReadArray.length; i < l; i++) {
                var item = notify.ReadC2cMsgNotify.UinPairReadArray[i];
                onC2cEventCallbacks[subType](item);
              }
            }

            break;

          case C2C_EVENT_SUB_TYPE.KICKEDOUT:
            //已读通知
            if (onC2cEventCallbacks[subType]) {
              onC2cEventCallbacks[subType]();
            }

            break;

          default:
            log.error("未知C2c系统消息：subType=" + subType);
            break;
        }
      }; //长轮询


      this.longPolling = function (cbOk, cbErr) {
        var opts = {
          'Timeout': longPollingDefaultTimeOut / 1000,
          'Cookie': {
            'NotifySeq': notifySeq,
            'NoticeSeq': noticeSeq
          }
        };

        if (LongPollingId) {
          opts.Cookie.LongPollingId = LongPollingId;
          doPolling();
        } else {
          proto_getLongPollingId({}, function (resp) {
            LongPollingId = opts.Cookie.LongPollingId = resp.LongPollingId; //根据回包设置超时时间，超时时长不能>60秒，因为webkit手机端的最长超时时间不能大于60s

            longPollingDefaultTimeOut = resp.Timeout > 60 ? longPollingDefaultTimeOut : resp.Timeout * 1000;
            doPolling();
          });
        }

        function doPolling() {
          proto_longPolling(opts, function (resp) {
            for (var i in resp.EventArray) {
              var e = resp.EventArray[i];

              switch (e.Event) {
                case LONG_POLLINNG_EVENT_TYPE.C2C:
                  //c2c消息通知
                  //更新C2C消息通知seq
                  notifySeq = e.NotifySeq;
                  log.warn("longpolling: received new c2c msg"); //获取新消息

                  MsgManager.syncMsgs();
                  break;

                case LONG_POLLINNG_EVENT_TYPE.GROUP_COMMON:
                  //普通群消息通知
                  log.warn("longpolling: received new group msgs");
                  handlerOrdinaryAndTipGroupMsgs(e.Event, e.GroupMsgArray);
                  break;

                case LONG_POLLINNG_EVENT_TYPE.GROUP_TIP:
                  //（全员广播）群提示消息
                  log.warn("longpolling: received new group tips");
                  handlerOrdinaryAndTipGroupMsgs(e.Event, e.GroupTips);
                  break;

                case LONG_POLLINNG_EVENT_TYPE.GROUP_TIP2:
                  //群提示消息
                  log.warn("longpolling: received new group tips");
                  handlerOrdinaryAndTipGroupMsgs(e.Event, e.GroupTips);
                  break;

                case LONG_POLLINNG_EVENT_TYPE.GROUP_SYSTEM:
                  //（多终端同步）群系统消息
                  log.warn("longpolling: received new group system msgs"); //false 表示 通过长轮询收到的群系统消息，可以不判重

                  handlerGroupSystemMsgs(e.GroupTips, false);
                  break;

                case LONG_POLLINNG_EVENT_TYPE.FRIEND_NOTICE:
                  //好友系统通知
                  log.warn("longpolling: received new friend system notice"); //false 表示 通过长轮询收到的好友系统通知，可以不判重

                  handlerFriendSystemNotices(e.FriendListMod, false);
                  break;

                case LONG_POLLINNG_EVENT_TYPE.PROFILE_NOTICE:
                  //资料系统通知
                  log.warn("longpolling: received new profile system notice"); //false 表示 通过长轮询收到的资料系统通知，可以不判重

                  handlerProfileSystemNotices(e.ProfileDataMod, false);
                  break;

                case LONG_POLLINNG_EVENT_TYPE.C2C_COMMON:
                  //c2c消息通知
                  noticeSeq = e.C2cMsgArray[0].NoticeSeq; //更新C2C消息通知seq

                  log.warn("longpolling: received new c2c_common msg", noticeSeq);
                  handlerOrdinaryAndTipC2cMsgs(e.Event, e.C2cMsgArray);
                  break;

                case LONG_POLLINNG_EVENT_TYPE.C2C_EVENT:
                  //c2c已读消息通知
                  noticeSeq = e.C2cNotifyMsgArray[0].NoticeSeq;
                  log.warn("longpolling: received new c2c_event msg");
                  handlerC2cNotifyMsgArray(e.C2cNotifyMsgArray);
                  break;

                default:
                  log.error("longpolling收到未知新消息类型: Event=" + e.Event);
                  break;
              }
            }

            var successInfo = {
              'ActionStatus': ACTION_STATUS.OK,
              'ErrorCode': 0
            };
            updatecLongPollingStatus(successInfo);
          }, function (err) {
            //log.error(err);
            updatecLongPollingStatus(err);
            if (cbErr) cbErr(err);
          });
        }
      }; //大群 长轮询


      this.bigGroupLongPolling = function (cbOk, cbErr) {
        var opts = {
          'StartSeq': bigGroupLongPollingStartSeq,
          //请求拉消息的起始seq
          'HoldTime': bigGroupLongPollingHoldTime,
          //客户端长轮询的超时时间，单位是秒
          'Key': bigGroupLongPollingKey //客户端加入群组后收到的的Key

        };
        proto_bigGroupLongPolling(opts, function (resp) {
          var msgObjList = [];
          bigGroupLongPollingStartSeq = resp.NextSeq;
          bigGroupLongPollingHoldTime = resp.HoldTime;
          bigGroupLongPollingKey = resp.Key;

          if (resp.RspMsgList && resp.RspMsgList.length > 0) {
            var msgCount = 0,
                msgInfo,
                event,
                msg;

            for (var i = resp.RspMsgList.length - 1; i >= 0; i--) {
              msgInfo = resp.RspMsgList[i]; //如果是已经删除的消息或者发送者帐号为空或者消息内容为空
              //IsPlaceMsg=1

              if (msgInfo.IsPlaceMsg || !msgInfo.From_Account || !msgInfo.MsgBody || msgInfo.MsgBody.length == 0) {
                continue;
              }

              event = msgInfo.Event; //群消息类型

              switch (event) {
                case LONG_POLLINNG_EVENT_TYPE.GROUP_COMMON:
                  //群普通消息
                  log.info("bigGroupLongPolling: return new group msg");
                  msg = handlerGroupMsg(msgInfo, false, false);
                  msg && msgObjList.push(msg);
                  msgCount = msgCount + 1;
                  break;

                case LONG_POLLINNG_EVENT_TYPE.GROUP_TIP: //群提示消息

                case LONG_POLLINNG_EVENT_TYPE.GROUP_TIP2:
                  //群提示消息
                  log.info("bigGroupLongPolling: return new group tip");
                  msg = handlerGroupMsg(msgInfo, false, false);
                  msg && msgObjList.push(msg); //msgCount=msgCount+1;

                  break;

                case LONG_POLLINNG_EVENT_TYPE.GROUP_SYSTEM:
                  //群系统消息
                  log.info("bigGroupLongPolling: new group system msg");
                  handlerGroupSystemMsg(msgInfo);
                  break;

                default:
                  log.error("bigGroupLongPolling收到未知新消息类型: Event=" + event);
                  break;
              }
            } // for loop


            if (msgCount > 0) {
              MsgManager.setBigGroupLongPollingMsgMap(msgInfo.ToGroupId, msgCount); //

              log.warn("current bigGroupLongPollingMsgMap: " + JSON.stringify(bigGroupLongPollingMsgMap));
            }
          }

          curBigGroupLongPollingRetErrorCount = 0; //返回连接状态

          var successInfo = {
            'ActionStatus': ACTION_STATUS.OK,
            'ErrorCode': CONNECTION_STATUS.ON,
            'ErrorInfo': 'connection is ok...'
          };
          ConnManager.callBack(successInfo);
          if (cbOk) cbOk(msgObjList);else if (onBigGroupMsgCallback) onBigGroupMsgCallback(msgObjList); //返回新消息
          //重新启动长轮询

          bigGroupLongPollingOn && MsgManager.bigGroupLongPolling();
        }, function (err) {
          //
          if (err.ErrorCode != longPollingTimeOutErrorCode) {
            log.error(err.ErrorInfo); //记录长轮询返回错误次数

            curBigGroupLongPollingRetErrorCount++;
          }

          if (err.ErrorCode == longPollingKickedErrorCode) {
            //登出
            log.error("多实例登录，被kick");

            if (onKickedEventCall) {
              onKickedEventCall();
            }
          } //累计超过一定次数，不再发起长轮询请求


          if (curBigGroupLongPollingRetErrorCount < LONG_POLLING_MAX_RET_ERROR_COUNT) {
            bigGroupLongPollingOn && MsgManager.bigGroupLongPolling();
          } else {
            var errInfo = {
              'ActionStatus': ACTION_STATUS.FAIL,
              'ErrorCode': CONNECTION_STATUS.OFF,
              'ErrorInfo': 'connection is off'
            };
            ConnManager.callBack(errInfo);
          }

          if (cbErr) cbErr(err);
        }, bigGroupLongPollingHoldTime * 1000);
      }; //更新连接状态


      var updatecLongPollingStatus = function updatecLongPollingStatus(errObj) {
        if (errObj.ErrorCode == 0 || errObj.ErrorCode == longPollingTimeOutErrorCode) {
          curLongPollingRetErrorCount = 0;
          longPollingOffCallbackFlag = false;
          var errorInfo;
          var isNeedCallback = false;

          switch (curLongPollingStatus) {
            case CONNECTION_STATUS.INIT:
              isNeedCallback = true;
              curLongPollingStatus = CONNECTION_STATUS.ON;
              errorInfo = "create connection successfully(INIT->ON)";
              break;

            case CONNECTION_STATUS.ON:
              errorInfo = "connection is on...(ON->ON)";
              break;

            case CONNECTION_STATUS.RECONNECT:
              curLongPollingStatus = CONNECTION_STATUS.ON;
              errorInfo = "connection is on...(RECONNECT->ON)";
              break;

            case CONNECTION_STATUS.OFF:
              isNeedCallback = true;
              curLongPollingStatus = CONNECTION_STATUS.RECONNECT;
              errorInfo = "reconnect successfully(OFF->RECONNECT)";
              break;
          }

          var successInfo = {
            'ActionStatus': ACTION_STATUS.OK,
            'ErrorCode': curLongPollingStatus,
            'ErrorInfo': errorInfo
          };
          isNeedCallback && ConnManager.callBack(successInfo);
          longPollingOn && MsgManager.longPolling();
        } else if (errObj.ErrorCode == longPollingKickedErrorCode) {
          //登出
          log.error("多实例登录，被kick");

          if (onKickedEventCall) {
            onKickedEventCall();
          }
        } else {
          //记录长轮询返回解析json错误次数
          curLongPollingRetErrorCount++;
          log.warn("longPolling接口第" + curLongPollingRetErrorCount + "次报错: " + errObj.ErrorInfo); //累计超过一定次数

          if (curLongPollingRetErrorCount <= LONG_POLLING_MAX_RET_ERROR_COUNT) {
            setTimeout(startNextLongPolling, 100); //
          } else {
            curLongPollingStatus = CONNECTION_STATUS.OFF;
            var errInfo = {
              'ActionStatus': ACTION_STATUS.FAIL,
              'ErrorCode': CONNECTION_STATUS.OFF,
              'ErrorInfo': 'connection is off'
            };
            longPollingOffCallbackFlag == false && ConnManager.callBack(errInfo);
            longPollingOffCallbackFlag = true;
            log.warn(longPollingIntervalTime + "毫秒之后,SDK会发起新的longPolling请求...");
            setTimeout(startNextLongPolling, longPollingIntervalTime); //长轮询接口报错次数达到一定值，每间隔5s发起新的长轮询
          }
        }
      }; //处理收到的普通C2C消息


      var handlerOrdinaryAndTipC2cMsgs = function handlerOrdinaryAndTipC2cMsgs(eventType, C2cMsgArray) {
        //处理c2c消息
        var notifyInfo = [];
        var msgInfos = [];
        msgInfos = C2cMsgArray; //返回的消息列表
        // MsgStore.cookie = resp.Cookie;//cookies，记录当前读到的最新消息位置

        for (var i in msgInfos) {
          var msgInfo = msgInfos[i];
          var isSendMsg, id, headUrl;

          if (msgInfo.From_Account == ctx.identifier) {
            //当前用户发送的消息
            isSendMsg = true;
            id = msgInfo.To_Account; //读取接收者信息

            headUrl = '';
          } else {
            //当前用户收到的消息
            isSendMsg = false;
            id = msgInfo.From_Account; //读取发送者信息

            headUrl = '';
          }

          var sess = MsgStore.sessByTypeId(SESSION_TYPE.C2C, id);

          if (!sess) {
            sess = new Session(SESSION_TYPE.C2C, id, id, headUrl, 0, 0);
          }

          var msg = new Msg(sess, isSendMsg, msgInfo.MsgSeq, msgInfo.MsgRandom, msgInfo.MsgTimeStamp, msgInfo.From_Account);
          var msgBody = null;
          var msgContent = null;
          var msgType = null;

          for (var mi in msgInfo.MsgBody) {
            msgBody = msgInfo.MsgBody[mi];
            msgType = msgBody.MsgType;

            switch (msgType) {
              case MSG_ELEMENT_TYPE.TEXT:
                msgContent = new Msg.Elem.Text(msgBody.MsgContent.Text);
                break;

              case MSG_ELEMENT_TYPE.FACE:
                msgContent = new Msg.Elem.Face(msgBody.MsgContent.Index, msgBody.MsgContent.Data);
                break;

              case MSG_ELEMENT_TYPE.IMAGE:
                msgContent = new Msg.Elem.Images(msgBody.MsgContent.UUID, msgBody.MsgContent.ImageFormat || "");

                for (var j in msgBody.MsgContent.ImageInfoArray) {
                  var tempImg = msgBody.MsgContent.ImageInfoArray[j];
                  msgContent.addImage(new Msg.Elem.Images.Image(tempImg.Type, tempImg.Size, tempImg.Width, tempImg.Height, tempImg.URL));
                }

                break;

              case MSG_ELEMENT_TYPE.SOUND:
                if (msgBody.MsgContent) {
                  msgContent = new Msg.Elem.Sound(msgBody.MsgContent.UUID, msgBody.MsgContent.Second, msgBody.MsgContent.Size, msgInfo.From_Account, msgInfo.To_Account, msgBody.MsgContent.Download_Flag, SESSION_TYPE.C2C);
                } else {
                  msgType = MSG_ELEMENT_TYPE.TEXT;
                  msgContent = new Msg.Elem.Text('[语音消息]下载地址解析出错');
                }

                break;

              case MSG_ELEMENT_TYPE.LOCATION:
                msgContent = new Msg.Elem.Location(msgBody.MsgContent.Longitude, msgBody.MsgContent.Latitude, msgBody.MsgContent.Desc);
                break;

              case MSG_ELEMENT_TYPE.FILE:
              case MSG_ELEMENT_TYPE.FILE + " ":
                msgType = MSG_ELEMENT_TYPE.FILE;

                if (msgBody.MsgContent) {
                  msgContent = new Msg.Elem.File(msgBody.MsgContent.UUID, msgBody.MsgContent.FileName, msgBody.MsgContent.FileSize, msgInfo.From_Account, msgInfo.To_Account, msgBody.MsgContent.Download_Flag, SESSION_TYPE.C2C);
                } else {
                  msgType = MSG_ELEMENT_TYPE.TEXT;
                  msgContent = new Msg.Elem.Text('[文件消息下载地址解析出错]');
                }

                break;

              case MSG_ELEMENT_TYPE.CUSTOM:
                try {
                  var data = JSON.parse(msgBody.MsgContent.Data);

                  if (data && data.userAction && data.userAction == FRIEND_WRITE_MSG_ACTION.ING) {
                    //过滤安卓或ios的正在输入自定义消息
                    continue;
                  }
                } catch (e) {}

                msgType = MSG_ELEMENT_TYPE.CUSTOM;
                msgContent = new Msg.Elem.Custom(msgBody.MsgContent.Data, msgBody.MsgContent.Desc, msgBody.MsgContent.Ext);
                break;

              default:
                msgType = MSG_ELEMENT_TYPE.TEXT;
                msgContent = new Msg.Elem.Text('web端暂不支持' + msgBody.MsgType + '消息');
                break;
            }

            msg.elems.push(new Msg.Elem(msgType, msgContent));
          }

          if (msg.elems.length > 0 && MsgStore.addMsg(msg)) {
            notifyInfo.push(msg);
          }
        } // for loop


        if (notifyInfo.length > 0) MsgStore.updateTimeline();

        if (notifyInfo.length > 0) {
          if (onMsgCallback) onMsgCallback(notifyInfo);
        }
      }; //发起新的长轮询请求


      var startNextLongPolling = function startNextLongPolling() {
        longPollingOn && MsgManager.longPolling();
      }; //处理未决的加群申请消息列表


      var handlerApplyJoinGroupSystemMsgs = function handlerApplyJoinGroupSystemMsgs(eventArray) {
        for (var i in eventArray) {
          var e = eventArray[i];
          handlerGroupSystemMsgs(e.GroupTips, true);

          switch (e.Event) {
            case LONG_POLLINNG_EVENT_TYPE.GROUP_SYSTEM:
              //（多终端同步）群系统消息
              log.warn("handlerApplyJoinGroupSystemMsgs： handler new group system msg"); //true 表示 解决加群申请通知存在重复的问题（已处理的通知，下次登录还会拉到），需要判重

              handlerGroupSystemMsgs(e.GroupTips, true);
              break;

            default:
              log.error("syncMsgs收到未知的群系统消息类型: Event=" + e.Event);
              break;
          }
        }
      }; //拉取c2c消息(包含加群未决消息，需要处理)


      this.syncMsgs = function (cbOk, cbErr) {
        var notifyInfo = [];
        var msgInfos = []; //读取C2C消息

        proto_getMsgs(MsgStore.cookie, MsgStore.syncFlag, function (resp) {
          //拉取完毕
          if (resp.SyncFlag == 2) {
            MsgStore.syncFlag = 0;
          } //处理c2c消息


          msgInfos = resp.MsgList; //返回的消息列表

          MsgStore.cookie = resp.Cookie; //cookies，记录当前读到的最新消息位置

          for (var i in msgInfos) {
            var msgInfo = msgInfos[i];
            var isSendMsg, id, headUrl;

            if (msgInfo.From_Account == ctx.identifier) {
              //当前用户发送的消息
              isSendMsg = true;
              id = msgInfo.To_Account; //读取接收者信息

              headUrl = '';
            } else {
              //当前用户收到的消息
              isSendMsg = false;
              id = msgInfo.From_Account; //读取发送者信息

              headUrl = '';
            }

            var sess = MsgStore.sessByTypeId(SESSION_TYPE.C2C, id);

            if (!sess) {
              sess = new Session(SESSION_TYPE.C2C, id, id, headUrl, 0, 0);
            }

            var msg = new Msg(sess, isSendMsg, msgInfo.MsgSeq, msgInfo.MsgRandom, msgInfo.MsgTimeStamp, msgInfo.From_Account);
            var msgBody = null;
            var msgContent = null;
            var msgType = null;

            for (var mi in msgInfo.MsgBody) {
              msgBody = msgInfo.MsgBody[mi];
              msgType = msgBody.MsgType;

              switch (msgType) {
                case MSG_ELEMENT_TYPE.TEXT:
                  msgContent = new Msg.Elem.Text(msgBody.MsgContent.Text);
                  break;

                case MSG_ELEMENT_TYPE.FACE:
                  msgContent = new Msg.Elem.Face(msgBody.MsgContent.Index, msgBody.MsgContent.Data);
                  break;

                case MSG_ELEMENT_TYPE.IMAGE:
                  msgContent = new Msg.Elem.Images(msgBody.MsgContent.UUID, msgBody.MsgContent.ImageFormat);

                  for (var j in msgBody.MsgContent.ImageInfoArray) {
                    var tempImg = msgBody.MsgContent.ImageInfoArray[j];
                    msgContent.addImage(new Msg.Elem.Images.Image(tempImg.Type, tempImg.Size, tempImg.Width, tempImg.Height, tempImg.URL));
                  }

                  break;

                case MSG_ELEMENT_TYPE.SOUND:
                  // var soundUrl = getSoundDownUrl(msgBody.MsgContent.UUID, msgInfo.From_Account);
                  if (msgBody.MsgContent) {
                    msgContent = new Msg.Elem.Sound(msgBody.MsgContent.UUID, msgBody.MsgContent.Second, msgBody.MsgContent.Size, msgInfo.From_Account, msgInfo.To_Account, msgBody.MsgContent.Download_Flag, SESSION_TYPE.C2C);
                  } else {
                    msgType = MSG_ELEMENT_TYPE.TEXT;
                    msgContent = new Msg.Elem.Text('[语音消息]下载地址解析出错');
                  }

                  break;

                case MSG_ELEMENT_TYPE.LOCATION:
                  msgContent = new Msg.Elem.Location(msgBody.MsgContent.Longitude, msgBody.MsgContent.Latitude, msgBody.MsgContent.Desc);
                  break;

                case MSG_ELEMENT_TYPE.FILE:
                case MSG_ELEMENT_TYPE.FILE + " ":
                  msgType = MSG_ELEMENT_TYPE.FILE; // var fileUrl = getFileDownUrl(msgBody.MsgContent.UUID, msgInfo.From_Account, msgBody.MsgContent.FileName);

                  if (msgBody.MsgContent) {
                    msgContent = new Msg.Elem.File(msgBody.MsgContent.UUID, msgBody.MsgContent.FileName, msgBody.MsgContent.FileSize, msgInfo.From_Account, msgInfo.To_Account, msgBody.MsgContent.Download_Flag, SESSION_TYPE.C2C);
                  } else {
                    msgType = MSG_ELEMENT_TYPE.TEXT;
                    msgContent = new Msg.Elem.Text('[文件消息下载地址解析出错]');
                  }

                  break;

                case MSG_ELEMENT_TYPE.CUSTOM:
                  try {
                    var data = JSON.parse(msgBody.MsgContent.Data);

                    if (data && data.userAction && data.userAction == FRIEND_WRITE_MSG_ACTION.ING) {
                      //过滤安卓或ios的正在输入自定义消息
                      continue;
                    }
                  } catch (e) {}

                  msgType = MSG_ELEMENT_TYPE.CUSTOM;
                  msgContent = new Msg.Elem.Custom(msgBody.MsgContent.Data, msgBody.MsgContent.Desc, msgBody.MsgContent.Ext);
                  break;

                default:
                  msgType = MSG_ELEMENT_TYPE.TEXT;
                  msgContent = new Msg.Elem.Text('web端暂不支持' + msgBody.MsgType + '消息');
                  break;
              }

              msg.elems.push(new Msg.Elem(msgType, msgContent));
            }

            if (msg.elems.length > 0 && MsgStore.addMsg(msg)) {
              notifyInfo.push(msg);
            }
          } // for loop
          //处理加群未决申请消息


          handlerApplyJoinGroupSystemMsgs(resp.EventArray);
          if (notifyInfo.length > 0) MsgStore.updateTimeline();
          if (cbOk) cbOk(notifyInfo);else if (notifyInfo.length > 0) {
            if (onMsgCallback) onMsgCallback(notifyInfo);
          }
        }, function (err) {
          log.error("getMsgs failed:" + err.ErrorInfo);
          if (cbErr) cbErr(err);
        });
      }; //拉取C2C漫游消息


      this.getC2CHistoryMsgs = function (options, cbOk, cbErr) {
        if (!options.Peer_Account) {
          if (cbErr) {
            cbErr(tool.getReturnError("Peer_Account is empty", -13));
            return;
          }
        }

        if (!options.MaxCnt) {
          options.MaxCnt = 15;
        }

        if (options.MaxCnt <= 0) {
          if (cbErr) {
            cbErr(tool.getReturnError("MaxCnt should be greater than 0", -14));
            return;
          }
        }

        if (options.MaxCnt > 15) {
          if (cbErr) {
            cbErr(tool.getReturnError("MaxCnt can not be greater than 15", -15));
            return;
          }

          return;
        }

        if (options.MsgKey == null || options.MsgKey === undefined) {
          options.MsgKey = '';
        }

        var opts = {
          'Peer_Account': options.Peer_Account,
          'MaxCnt': options.MaxCnt,
          'LastMsgTime': options.LastMsgTime,
          'MsgKey': options.MsgKey
        }; //读取c2c漫游消息

        proto_getC2CHistoryMsgs(opts, function (resp) {
          var msgObjList = [];
          var msgInfos = []; //处理c2c消息

          msgInfos = resp.MsgList; //返回的消息列表

          var sess = MsgStore.sessByTypeId(SESSION_TYPE.C2C, options.Peer_Account);

          if (!sess) {
            sess = new Session(SESSION_TYPE.C2C, options.Peer_Account, options.Peer_Account, '', 0, 0);
          }

          for (var i in msgInfos) {
            var msgInfo = msgInfos[i];
            var isSendMsg, id, headUrl;

            if (msgInfo.From_Account == ctx.identifier) {
              //当前用户发送的消息
              isSendMsg = true;
              id = msgInfo.To_Account; //读取接收者信息

              headUrl = '';
            } else {
              //当前用户收到的消息
              isSendMsg = false;
              id = msgInfo.From_Account; //读取发送者信息

              headUrl = '';
            }

            var msg = new Msg(sess, isSendMsg, msgInfo.MsgSeq, msgInfo.MsgRandom, msgInfo.MsgTimeStamp, msgInfo.From_Account);
            var msgBody = null;
            var msgContent = null;
            var msgType = null;

            for (var mi in msgInfo.MsgBody) {
              msgBody = msgInfo.MsgBody[mi];
              msgType = msgBody.MsgType;

              switch (msgType) {
                case MSG_ELEMENT_TYPE.TEXT:
                  msgContent = new Msg.Elem.Text(msgBody.MsgContent.Text);
                  break;

                case MSG_ELEMENT_TYPE.FACE:
                  msgContent = new Msg.Elem.Face(msgBody.MsgContent.Index, msgBody.MsgContent.Data);
                  break;

                case MSG_ELEMENT_TYPE.IMAGE:
                  msgContent = new Msg.Elem.Images(msgBody.MsgContent.UUID, msgBody.MsgContent.ImageFormat);

                  for (var j in msgBody.MsgContent.ImageInfoArray) {
                    var tempImg = msgBody.MsgContent.ImageInfoArray[j];
                    msgContent.addImage(new Msg.Elem.Images.Image(tempImg.Type, tempImg.Size, tempImg.Width, tempImg.Height, tempImg.URL));
                  }

                  break;

                case MSG_ELEMENT_TYPE.SOUND:
                  // var soundUrl = getSoundDownUrl(msgBody.MsgContent.UUID, msgInfo.From_Account);
                  if (msgBody.MsgContent) {
                    msgContent = new Msg.Elem.Sound(msgBody.MsgContent.UUID, msgBody.MsgContent.Second, msgBody.MsgContent.Size, msgInfo.From_Account, msgInfo.To_Account, msgBody.MsgContent.Download_Flag, SESSION_TYPE.C2C);
                  } else {
                    msgType = MSG_ELEMENT_TYPE.TEXT;
                    msgContent = new Msg.Elem.Text('[语音消息]下载地址解析出错');
                  }

                  break;

                case MSG_ELEMENT_TYPE.LOCATION:
                  msgContent = new Msg.Elem.Location(msgBody.MsgContent.Longitude, msgBody.MsgContent.Latitude, msgBody.MsgContent.Desc);
                  break;

                case MSG_ELEMENT_TYPE.FILE:
                case MSG_ELEMENT_TYPE.FILE + " ":
                  msgType = MSG_ELEMENT_TYPE.FILE; // var fileUrl = getFileDownUrl(msgBody.MsgContent.UUID, msgInfo.From_Account, msgBody.MsgContent.FileName);

                  if (msgBody.MsgContent) {
                    msgContent = new Msg.Elem.File(msgBody.MsgContent.UUID, msgBody.MsgContent.FileName, msgBody.MsgContent.FileSize, msgInfo.From_Account, msgInfo.To_Account, msgBody.MsgContent.Download_Flag, SESSION_TYPE.C2C);
                  } else {
                    msgType = MSG_ELEMENT_TYPE.TEXT;
                    msgContent = new Msg.Elem.Text('[文件消息下载地址解析出错]');
                  }

                  break;

                case MSG_ELEMENT_TYPE.CUSTOM:
                  msgType = MSG_ELEMENT_TYPE.CUSTOM;
                  msgContent = new Msg.Elem.Custom(msgBody.MsgContent.Data, msgBody.MsgContent.Desc, msgBody.MsgContent.Ext);
                  break;

                default:
                  msgType = MSG_ELEMENT_TYPE.TEXT;
                  msgContent = new Msg.Elem.Text('web端暂不支持' + msgBody.MsgType + '消息');
                  break;
              }

              msg.elems.push(new Msg.Elem(msgType, msgContent));
            }

            MsgStore.addMsg(msg);
            msgObjList.push(msg);
          } // for loop


          MsgStore.updateTimeline();

          if (cbOk) {
            var newResp = {
              'Complete': resp.Complete,
              'MsgCount': msgObjList.length,
              'LastMsgTime': resp.LastMsgTime,
              'MsgKey': resp.MsgKey,
              'MsgList': msgObjList
            };
            sess.isFinished(resp.Complete);
            cbOk(newResp);
          }
        }, function (err) {
          log.error("getC2CHistoryMsgs failed:" + err.ErrorInfo);
          if (cbErr) cbErr(err);
        });
      }; //拉群历史消息
      //不传cbOk 和 cbErr，则会调用新消息回调函数


      this.syncGroupMsgs = function (options, cbOk, cbErr) {
        if (options.ReqMsgSeq <= 0) {
          if (cbErr) {
            var errInfo = "ReqMsgSeq must be greater than 0";
            var error = tool.getReturnError(errInfo, -16);
            cbErr(error);
          }

          return;
        }

        var opts = {
          'GroupId': options.GroupId,
          'ReqMsgSeq': options.ReqMsgSeq,
          'ReqMsgNumber': options.ReqMsgNumber
        }; //读群漫游消息

        proto_getGroupMsgs(opts, function (resp) {
          var notifyInfo = [];
          var group_id = resp.GroupId; //返回的群id

          var msgInfos = resp.RspMsgList; //返回的消息列表

          var isFinished = resp.IsFinished;

          if (msgInfos == null || msgInfos === undefined) {
            if (cbOk) {
              cbOk([]);
            }

            return;
          }

          for (var i = msgInfos.length - 1; i >= 0; i--) {
            var msgInfo = msgInfos[i]; //如果是已经删除的消息或者发送者帐号为空或者消息内容为空
            //IsPlaceMsg=1

            if (msgInfo.IsPlaceMsg || !msgInfo.From_Account || !msgInfo.MsgBody || msgInfo.MsgBody.length == 0) {
              continue;
            }

            var msg = handlerGroupMsg(msgInfo, true, true, isFinished);

            if (msg) {
              notifyInfo.push(msg);
            }
          } // for loop


          if (notifyInfo.length > 0) MsgStore.updateTimeline();
          if (cbOk) cbOk(notifyInfo);else if (notifyInfo.length > 0) {
            if (onMsgCallback) onMsgCallback(notifyInfo);
          }
        }, function (err) {
          log.error("getGroupMsgs failed:" + err.ErrorInfo);
          if (cbErr) cbErr(err);
        });
      }; //处理群消息(普通消息+提示消息)
      //isSyncGroupMsgs 是否主动拉取群消息标志
      //isAddMsgFlag 是否需要保存到MsgStore，如果需要，这里会存在判重逻辑


      var handlerGroupMsg = function handlerGroupMsg(msgInfo, isSyncGroupMsgs, isAddMsgFlag, isFinished) {
        if (msgInfo.IsPlaceMsg || !msgInfo.From_Account || !msgInfo.MsgBody || msgInfo.MsgBody.length == 0) {
          return null;
        }

        var isSendMsg, id, headUrl, fromAccountNick, fromAccountHeadurl;
        var group_id = msgInfo.ToGroupId;
        var group_name = group_id;

        if (msgInfo.GroupInfo) {
          //取出群名称
          if (msgInfo.GroupInfo.GroupName) {
            group_name = msgInfo.GroupInfo.GroupName;
          }
        } //取出成员昵称


        fromAccountNick = msgInfo.From_Account; //fromAccountHeadurl = msgInfo.GroupInfo.From_AccountHeadurl;

        if (msgInfo.GroupInfo) {
          if (msgInfo.GroupInfo.From_AccountNick) {
            fromAccountNick = msgInfo.GroupInfo.From_AccountNick;
          }

          if (msgInfo.GroupInfo.From_AccountHeadurl) {
            fromAccountHeadurl = msgInfo.GroupInfo.From_AccountHeadurl;
          } else {
            fromAccountHeadurl = null;
          }
        }

        if (msgInfo.From_Account == ctx.identifier) {
          //当前用户发送的消息
          isSendMsg = true;
          id = msgInfo.From_Account; //读取接收者信息

          headUrl = '';
        } else {
          //当前用户收到的消息
          isSendMsg = false;
          id = msgInfo.From_Account; //读取发送者信息

          headUrl = '';
        }

        var sess = MsgStore.sessByTypeId(SESSION_TYPE.GROUP, group_id);

        if (!sess) {
          sess = new Session(SESSION_TYPE.GROUP, group_id, group_name, headUrl, 0, 0);
        }

        if (typeof isFinished !== "undefined") {
          sess.isFinished(isFinished || 0);
        }

        var subType = GROUP_MSG_SUB_TYPE.COMMON; //消息类型
        //群提示消息,重新封装下

        if (LONG_POLLINNG_EVENT_TYPE.GROUP_TIP == msgInfo.Event || LONG_POLLINNG_EVENT_TYPE.GROUP_TIP2 == msgInfo.Event) {
          subType = GROUP_MSG_SUB_TYPE.TIP;
          var groupTip = msgInfo.MsgBody;
          msgInfo.MsgBody = [];
          msgInfo.MsgBody.push({
            "MsgType": MSG_ELEMENT_TYPE.GROUP_TIP,
            "MsgContent": groupTip
          });
        } else if (msgInfo.MsgPriority) {
          //群点赞消息
          if (msgInfo.MsgPriority == GROUP_MSG_PRIORITY_TYPE.REDPACKET) {
            subType = GROUP_MSG_SUB_TYPE.REDPACKET;
          } else if (msgInfo.MsgPriority == GROUP_MSG_PRIORITY_TYPE.LOVEMSG) {
            subType = GROUP_MSG_SUB_TYPE.LOVEMSG;
          }
        }

        var msg = new Msg(sess, isSendMsg, msgInfo.MsgSeq, msgInfo.MsgRandom, msgInfo.MsgTimeStamp, msgInfo.From_Account, subType, fromAccountNick, fromAccountHeadurl);
        var msgBody = null;
        var msgContent = null;
        var msgType = null;

        for (var mi in msgInfo.MsgBody) {
          msgBody = msgInfo.MsgBody[mi];
          msgType = msgBody.MsgType;

          switch (msgType) {
            case MSG_ELEMENT_TYPE.TEXT:
              msgContent = new Msg.Elem.Text(msgBody.MsgContent.Text);
              break;

            case MSG_ELEMENT_TYPE.FACE:
              msgContent = new Msg.Elem.Face(msgBody.MsgContent.Index, msgBody.MsgContent.Data);
              break;

            case MSG_ELEMENT_TYPE.IMAGE:
              msgContent = new Msg.Elem.Images(msgBody.MsgContent.UUID, msgBody.MsgContent.ImageFormat || "");

              for (var j in msgBody.MsgContent.ImageInfoArray) {
                msgContent.addImage(new Msg.Elem.Images.Image(msgBody.MsgContent.ImageInfoArray[j].Type, msgBody.MsgContent.ImageInfoArray[j].Size, msgBody.MsgContent.ImageInfoArray[j].Width, msgBody.MsgContent.ImageInfoArray[j].Height, msgBody.MsgContent.ImageInfoArray[j].URL));
              }

              break;

            case MSG_ELEMENT_TYPE.SOUND:
              if (msgBody.MsgContent) {
                msgContent = new Msg.Elem.Sound(msgBody.MsgContent.UUID, msgBody.MsgContent.Second, msgBody.MsgContent.Size, msgInfo.From_Account, msgInfo.To_Account, msgBody.MsgContent.Download_Flag, SESSION_TYPE.GROUP);
              } else {
                msgType = MSG_ELEMENT_TYPE.TEXT;
                msgContent = new Msg.Elem.Text('[语音消息]下载地址解析出错');
              }

              break;

            case MSG_ELEMENT_TYPE.LOCATION:
              msgContent = new Msg.Elem.Location(msgBody.MsgContent.Longitude, msgBody.MsgContent.Latitude, msgBody.MsgContent.Desc);
              break;

            case MSG_ELEMENT_TYPE.FILE:
            case MSG_ELEMENT_TYPE.FILE + " ":
              msgType = MSG_ELEMENT_TYPE.FILE;
              var fileUrl = getFileDownUrl(msgBody.MsgContent.UUID, msgInfo.From_Account, msgBody.MsgContent.FileName);

              if (msgBody.MsgContent) {
                msgContent = new Msg.Elem.File(msgBody.MsgContent.UUID, msgBody.MsgContent.FileName, msgBody.MsgContent.FileSize, msgInfo.From_Account, msgInfo.To_Account, msgBody.MsgContent.Download_Flag, SESSION_TYPE.GROUP);
              } else {
                msgType = MSG_ELEMENT_TYPE.TEXT;
                msgContent = new Msg.Elem.Text('[文件消息]地址解析出错');
              }

              break;

            case MSG_ELEMENT_TYPE.GROUP_TIP:
              var opType = msgBody.MsgContent.OpType;
              msgContent = new Msg.Elem.GroupTip(opType, msgBody.MsgContent.Operator_Account, group_id, msgInfo.GroupInfo.GroupName, msgBody.MsgContent.List_Account);

              if (GROUP_TIP_TYPE.JOIN == opType || GROUP_TIP_TYPE.QUIT == opType) {
                //加群或退群时，设置最新群成员数
                msgContent.setGroupMemberNum(msgBody.MsgContent.MemberNum);
              } else if (GROUP_TIP_TYPE.MODIFY_GROUP_INFO == opType) {
                //群资料变更
                var tempIsCallbackFlag = false;
                var tempNewGroupInfo = {
                  "GroupId": group_id,
                  "GroupFaceUrl": null,
                  "GroupName": null,
                  "OwnerAccount": null,
                  "GroupNotification": null,
                  "GroupIntroduction": null
                };
                var msgGroupNewInfo = msgBody.MsgContent.MsgGroupNewInfo;

                if (msgGroupNewInfo.GroupFaceUrl) {
                  var tmpNGIFaceUrl = new Msg.Elem.GroupTip.GroupInfo(GROUP_TIP_MODIFY_GROUP_INFO_TYPE.FACE_URL, msgGroupNewInfo.GroupFaceUrl);
                  msgContent.addGroupInfo(tmpNGIFaceUrl);
                  tempIsCallbackFlag = true;
                  tempNewGroupInfo.GroupFaceUrl = msgGroupNewInfo.GroupFaceUrl;
                }

                if (msgGroupNewInfo.GroupName) {
                  var tmpNGIName = new Msg.Elem.GroupTip.GroupInfo(GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NAME, msgGroupNewInfo.GroupName);
                  msgContent.addGroupInfo(tmpNGIName);
                  tempIsCallbackFlag = true;
                  tempNewGroupInfo.GroupName = msgGroupNewInfo.GroupName;
                }

                if (msgGroupNewInfo.Owner_Account) {
                  var tmpNGIOwner = new Msg.Elem.GroupTip.GroupInfo(GROUP_TIP_MODIFY_GROUP_INFO_TYPE.OWNER, msgGroupNewInfo.Owner_Account);
                  msgContent.addGroupInfo(tmpNGIOwner);
                  tempIsCallbackFlag = true;
                  tempNewGroupInfo.OwnerAccount = msgGroupNewInfo.Owner_Account;
                }

                if (msgGroupNewInfo.GroupNotification) {
                  var tmpNGINotification = new Msg.Elem.GroupTip.GroupInfo(GROUP_TIP_MODIFY_GROUP_INFO_TYPE.NOTIFICATION, msgGroupNewInfo.GroupNotification);
                  msgContent.addGroupInfo(tmpNGINotification);
                  tempIsCallbackFlag = true;
                  tempNewGroupInfo.GroupNotification = msgGroupNewInfo.GroupNotification;
                }

                if (msgGroupNewInfo.GroupIntroduction) {
                  var tmpNGIIntroduction = new Msg.Elem.GroupTip.GroupInfo(GROUP_TIP_MODIFY_GROUP_INFO_TYPE.INTRODUCTION, msgGroupNewInfo.GroupIntroduction);
                  msgContent.addGroupInfo(tmpNGIIntroduction);
                  tempIsCallbackFlag = true;
                  tempNewGroupInfo.GroupIntroduction = msgGroupNewInfo.GroupIntroduction;
                } //回调群资料变化通知方法


                if (isSyncGroupMsgs == false && tempIsCallbackFlag && onGroupInfoChangeCallback) {
                  onGroupInfoChangeCallback(tempNewGroupInfo);
                }
              } else if (GROUP_TIP_TYPE.MODIFY_MEMBER_INFO == opType) {
                //群成员变更
                var memberInfos = msgBody.MsgContent.MsgMemberInfo;

                for (var n in memberInfos) {
                  var memberInfo = memberInfos[n];
                  msgContent.addMemberInfo(new Msg.Elem.GroupTip.MemberInfo(memberInfo.User_Account, memberInfo.ShutupTime));
                }
              }

              break;

            case MSG_ELEMENT_TYPE.CUSTOM:
              msgType = MSG_ELEMENT_TYPE.CUSTOM;
              msgContent = new Msg.Elem.Custom(msgBody.MsgContent.Data, msgBody.MsgContent.Desc, msgBody.MsgContent.Ext);
              break;

            default:
              msgType = MSG_ELEMENT_TYPE.TEXT;
              msgContent = new Msg.Elem.Text('web端暂不支持' + msgBody.MsgType + '消息');
              break;
          }

          msg.elems.push(new Msg.Elem(msgType, msgContent));
        }

        if (isAddMsgFlag == false) {
          //不需要保存消息
          return msg;
        }

        if (MsgStore.addMsg(msg)) {
          return msg;
        } else {
          return null;
        }
      }; //初始化


      this.init = function (listeners, cbOk, cbErr) {
        if (!listeners.onMsgNotify) {
          log.warn('listeners.onMsgNotify is empty');
        }

        onMsgCallback = listeners.onMsgNotify;

        if (listeners.onBigGroupMsgNotify) {
          onBigGroupMsgCallback = listeners.onBigGroupMsgNotify;
        } else {
          log.warn('listeners.onBigGroupMsgNotify is empty');
        }

        if (listeners.onC2cEventNotifys) {
          onC2cEventCallbacks = listeners.onC2cEventNotifys;
        } else {
          log.warn('listeners.onC2cEventNotifys is empty');
        }

        if (listeners.onGroupSystemNotifys) {
          onGroupSystemNotifyCallbacks = listeners.onGroupSystemNotifys;
        } else {
          log.warn('listeners.onGroupSystemNotifys is empty');
        }

        if (listeners.onGroupInfoChangeNotify) {
          onGroupInfoChangeCallback = listeners.onGroupInfoChangeNotify;
        } else {
          log.warn('listeners.onGroupInfoChangeNotify is empty');
        }

        if (listeners.onFriendSystemNotifys) {
          onFriendSystemNotifyCallbacks = listeners.onFriendSystemNotifys;
        } else {
          log.warn('listeners.onFriendSystemNotifys is empty');
        }

        if (listeners.onProfileSystemNotifys) {
          onProfileSystemNotifyCallbacks = listeners.onProfileSystemNotifys;
        } else {
          log.warn('listeners.onProfileSystemNotifys is empty');
        }

        if (listeners.onKickedEventCall) {
          onKickedEventCall = listeners.onKickedEventCall;
        } else {
          log.warn('listeners.onKickedEventCall is empty');
        }

        if (listeners.onAppliedDownloadUrl) {
          onAppliedDownloadUrl = listeners.onAppliedDownloadUrl;
        } else {
          log.warn('listeners.onAppliedDownloadUrl is empty');
        }

        if (!ctx.identifier || !ctx.userSig) {
          if (cbOk) {
            var success = {
              'ActionStatus': ACTION_STATUS.OK,
              'ErrorCode': 0,
              'ErrorInfo': "login success(no login state)"
            };
            cbOk(success);
          }

          return;
        } //初始化


        initMyGroupMaxSeqs(function (resp) {
          log.info('initMyGroupMaxSeqs success'); //初始化文件

          initIpAndAuthkey(function (initIpAndAuthkeyResp) {
            log.info('initIpAndAuthkey success');

            if (cbOk) {
              log.info('login success(have login state))');
              var success = {
                'ActionStatus': ACTION_STATUS.OK,
                'ErrorCode': 0,
                'ErrorInfo': "login success"
              };
              cbOk(success);
            }

            MsgManager.setLongPollingOn(true); //开启长轮询

            longPollingOn && MsgManager.longPolling(cbOk);
          }, cbErr);
        }, cbErr);
      }; //发消息（私聊或群聊）


      this.sendMsg = function (msg, cbOk, cbErr) {
        proto_sendMsg(msg, function (resp) {
          //私聊时，加入自己的发的消息，群聊时，由于seq和服务器的seq不一样，所以不作处理
          if (msg.sess.type() == SESSION_TYPE.C2C) {
            if (!MsgStore.addMsg(msg)) {
              var errInfo = "sendMsg: addMsg failed!";
              var error = tool.getReturnError(errInfo, -17);
              log.error(errInfo);
              if (cbErr) cbErr(error);
              return;
            } //更新信息流时间


            MsgStore.updateTimeline();
          }

          if (cbOk) cbOk(resp);
        }, function (err) {
          if (cbErr) cbErr(err);
        });
      };
    }(); //上传文件

    var FileUploader = new function () {
      this.fileMd5 = null; //获取文件MD5

      var getFileMD5 = function getFileMD5(file, cbOk, cbErr) {
        //FileReader pc浏览器兼容性
        //Feature   Firefox (Gecko) Chrome  Internet Explorer   Opera   Safari
        //Basic support 3.6 7   10                      12.02   6.0.2
        var fileReader = null;

        try {
          fileReader = new FileReader(); //分块读取文件对象
        } catch (e) {
          if (cbErr) {
            cbErr(tool.getReturnError('当前浏览器不支持FileReader', -18));
            return;
          }
        } //file的slice方法，注意它的兼容性，在不同浏览器的写法不同


        var blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice;

        if (!blobSlice) {
          if (cbErr) {
            cbErr(tool.getReturnError('当前浏览器不支持FileAPI', -19));
            return;
          }
        }

        var chunkSize = 2 * 1024 * 1024; //分块大小，2M

        var chunks = Math.ceil(file.size / chunkSize); //总块数

        var currentChunk = 0; //当前块数

        var spark = new SparkMD5(); //获取MD5对象

        fileReader.onload = function (e) {
          //数据加载完毕事件
          var binaryStr = "";
          var bytes = new Uint8Array(e.target.result);
          var length = bytes.byteLength;

          for (var i = 0; i < length; i++) {
            binaryStr += String.fromCharCode(bytes[i]); //二进制转换字符串
          }

          spark.appendBinary(binaryStr);
          currentChunk++;

          if (currentChunk < chunks) {
            loadNext(); //读取下一块数据
          } else {
            this.fileMd5 = spark.end(); //得到文件MD5值

            if (cbOk) {
              cbOk(this.fileMd5);
            }
          }
        }; //分片读取文件


        function loadNext() {
          var start = currentChunk * chunkSize,
              end = start + chunkSize >= file.size ? file.size : start + chunkSize; //根据开始和结束位置，切割文件

          var b = blobSlice.call(file, start, end); //readAsBinaryString ie浏览器不兼容此方法
          //fileReader.readAsBinaryString(blobSlice.call(file, start, end));

          fileReader.readAsArrayBuffer(b); //ie，chrome，firefox等主流浏览器兼容此方法
        }

        loadNext(); //开始读取
      }; //提交上传图片表单(用于低版本IE9以下)


      this.submitUploadFileForm = function (options, cbOk, cbErr) {
        var errInfo;
        var error;
        var formId = options.formId;
        var fileId = options.fileId;
        var iframeNum = uploadResultIframeId++;
        var iframeName = "uploadResultIframe_" + iframeNum;
        var toAccount = options.To_Account;
        var businessType = options.businessType;
        var form = document.getElementById(formId);

        if (!form) {
          errInfo = "获取表单对象为空: formId=" + formId + "(formId非法)";
          error = tool.getReturnError(errInfo, -20);
          if (cbErr) cbErr(error);
          return;
        }

        var fileObj = document.getElementById(fileId);

        if (!fileObj) {
          errInfo = "获取文件对象为空: fileId=" + fileId + "(没有选择文件或者fileId非法)";
          error = tool.getReturnError(errInfo, -21);
          if (cbErr) cbErr(error);
          return;
        } //fileObj.type="file";//ie8下不起作用，必须由业务自己设置


        fileObj.name = "file";
        var iframe = document.createElement("iframe");
        iframe.name = iframeName;
        iframe.id = iframeName;
        iframe.style.display = "none";
        document.body.appendChild(iframe);
        var cmdName;

        if (isAccessFormalEnv()) {
          cmdName = 'pic_up';
        } else {
          cmdName = 'pic_up_test';
        }

        var uploadApiUrl = "https://pic.tim.qq.com/v4/openpic/" + cmdName + "?tinyid=" + ctx.tinyid + "&a2=" + ctx.a2 + "&sdkappid=" + ctx.sdkAppID + "&accounttype=" + ctx.accountType + "&contenttype=http";
        form.action = uploadApiUrl;
        form.method = 'post'; //form.enctype='multipart/form-data';//ie8下不起作用，必须由业务自己设置

        form.target = iframeName;

        function createFormInput(name, value) {
          var tempInput = document.createElement("input");
          tempInput.type = "hidden";
          tempInput.name = name;
          tempInput.value = value;
          form.appendChild(tempInput);
        }

        createFormInput("App_Version", VERSION_INFO.APP_VERSION);
        createFormInput("From_Account", ctx.identifier);
        createFormInput("To_Account", toAccount);
        createFormInput("Seq", nextSeq().toString());
        createFormInput("Timestamp", unixtime().toString());
        createFormInput("Random", createRandom().toString());
        createFormInput("Busi_Id", businessType);
        createFormInput("PkgFlag", UPLOAD_RES_PKG_FLAG.RAW_DATA.toString());
        createFormInput("Auth_Key", authkey);
        createFormInput("Server_Ver", VERSION_INFO.SERVER_VERSION.toString());
        createFormInput("File_Type", options.fileType); //检测iframe.contentWindow.name是否有值

        function checkFrameName() {
          var resp;

          try {
            resp = JSON.parse(iframe.contentWindow.name) || {};
          } catch (e) {
            resp = {};
          }

          if (resp.ActionStatus) {
            //上传接口返回
            // We've got what we need. Stop the iframe from loading further content.
            iframe.src = "about:blank";
            iframe.parentNode.removeChild(iframe);
            iframe = null;

            if (resp.ActionStatus == ACTION_STATUS.OK) {
              cbOk && cbOk(resp);
            } else {
              cbErr && cbErr(resp);
            }
          } else {
            setTimeout(checkFrameName, 100);
          }
        }

        setTimeout(checkFrameName, 500);
        form.submit(); //提交上传图片表单
      }; //上传图片或文件(用于高版本浏览器，支持FileAPI)


      this.uploadFile = function (options, cbOk, cbErr) {
        var file_upload = {
          //初始化
          init: function init(options, cbOk, cbErr) {
            var me = this;
            me.file = options.file; //分片上传进度回调事件

            me.onProgressCallBack = options.onProgressCallBack; //停止上传图片按钮

            if (options.abortButton) {
              options.abortButton.onclick = me.abortHandler;
            }

            me.total = me.file.size; //文件总大小

            me.loaded = 0; //已读取字节数

            me.step = 1080 * 1024; //分块大小，1080K

            me.sliceSize = 0; //分片大小

            me.sliceOffset = 0; //当前分片位置

            me.timestamp = unixtime(); //当前时间戳

            me.seq = nextSeq(); //请求seq

            me.random = createRandom(); //请求随机数

            me.fromAccount = ctx.identifier; //发送者

            me.toAccount = options.To_Account; //接收者

            me.fileMd5 = options.fileMd5; //文件MD5

            me.businessType = options.businessType; //图片或文件的业务类型，群消息:1; c2c消息:2; 个人头像：3; 群头像：4;

            me.fileType = options.fileType; //文件类型，不填为默认认为上传的是图片；1：图片；2：文件；3：短视频；4：PTT

            me.cbOk = cbOk; //上传成功回调事件

            me.cbErr = cbErr; //上传失败回调事件

            me.reader = new FileReader(); //读取文件对象

            me.blobSlice = File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice; //file的slice方法,不同浏览器不一样

            me.reader.onloadstart = me.onLoadStart; //开始读取回调事件

            me.reader.onprogress = me.onProgress; //读取文件进度回调事件

            me.reader.onabort = me.onAbort; //停止读取回调事件

            me.reader.onerror = me.onerror; //读取发生错误回调事件

            me.reader.onload = me.onLoad; //分片加载完毕回调事件

            me.reader.onloadend = me.onLoadEnd; //读取文件完毕回调事件
          },
          //上传方法
          upload: function upload() {
            var me = file_upload; //读取第一块

            me.readBlob(0);
          },
          onLoadStart: function onLoadStart() {
            var me = file_upload;
          },
          onProgress: function onProgress(e) {
            var me = file_upload;
            me.loaded += e.loaded;

            if (me.onProgressCallBack) {
              me.onProgressCallBack(me.loaded, me.total);
            }
          },
          onAbort: function onAbort() {
            var me = file_upload;
          },
          onError: function onError() {
            var me = file_upload;
          },
          onLoad: function onLoad(e) {
            var me = file_upload;

            if (e.target.readyState == FileReader.DONE) {
              var slice_data_base64 = e.target.result; //注意，一定要去除base64编码头部

              var pos = slice_data_base64.indexOf(",");

              if (pos != -1) {
                slice_data_base64 = slice_data_base64.substr(pos + 1);
              } //封装上传图片接口的请求参数


              var opt = {
                'From_Account': me.fromAccount,
                'To_Account': me.toAccount,
                'Busi_Id': me.businessType,
                'File_Type': me.fileType,
                'File_Str_Md5': me.fileMd5,
                'PkgFlag': UPLOAD_RES_PKG_FLAG.BASE64_DATA,
                'File_Size': me.total,
                'Slice_Offset': me.sliceOffset,
                'Slice_Size': me.sliceSize,
                'Slice_Data': slice_data_base64,
                'Seq': me.seq,
                'Timestamp': me.timestamp,
                'Random': me.random
              }; //上传成功的成功回调

              var succCallback = function succCallback(resp) {
                if (resp.IsFinish == 0) {
                  me.loaded = resp.Next_Offset;

                  if (me.loaded < me.total) {
                    me.readBlob(me.loaded);
                  } else {
                    me.loaded = me.total;
                  }
                } else {
                  if (me.cbOk) {
                    var tempResp = {
                      'ActionStatus': resp.ActionStatus,
                      'ErrorCode': resp.ErrorCode,
                      'ErrorInfo': resp.ErrorInfo,
                      'File_UUID': resp.File_UUID,
                      'File_Size': resp.Next_Offset,
                      'URL_INFO': resp.URL_INFO,
                      'Download_Flag': resp.Download_Flag
                    };

                    if (me.fileType == UPLOAD_RES_TYPE.FILE) {
                      //如果上传的是文件，下载地址需要sdk内部拼接
                      tempResp.URL_INFO = getFileDownUrl(resp.File_UUID, ctx.identifier, me.file.name);
                    }

                    me.cbOk(tempResp);
                  }
                }

                Upload_Retry_Times = 0;
              }; //上传失败的回调


              var errorCallback = function errorCallback(resp) {
                if (Upload_Retry_Times < Upload_Retry_Max_Times) {
                  Upload_Retry_Times++;
                  setTimeout(function () {
                    proto_uploadPic(opt, succCallback, errorCallback);
                  }, 1000);
                } else {
                  me.cbErr(resp);
                } //me.cbErr

              }; //分片上传图片接口


              proto_uploadPic(opt, succCallback, errorCallback);
            }
          },
          onLoadEnd: function onLoadEnd() {
            var me = file_upload;
          },
          //分片读取文件方法
          readBlob: function readBlob(start) {
            var me = file_upload;
            var blob,
                file = me.file;
            var end = start + me.step;

            if (end > me.total) {
              end = me.total;
              me.sliceSize = end - start;
            } else {
              me.sliceSize = me.step;
            }

            me.sliceOffset = start; //根据起始和结束位置，分片读取文件

            blob = me.blobSlice.call(file, start, end); //将分片的二进制数据转换为base64编码

            me.reader.readAsDataURL(blob);
          },
          abortHandler: function abortHandler() {
            var me = file_upload;

            if (me.reader) {
              me.reader.abort();
            }
          }
        }; //读取文件MD5

        getFileMD5(options.file, function (fileMd5) {
          log.info('fileMd5: ' + fileMd5);
          options.fileMd5 = fileMd5; //初始化上传参数

          file_upload.init(options, cbOk, cbErr); //开始上传文件

          file_upload.upload();
        }, cbErr);
      };
    }(); //web im 基础对象
    //常量对象
    //会话类型

    webim.SESSION_TYPE = SESSION_TYPE;
    webim.MSG_MAX_LENGTH = MSG_MAX_LENGTH; //c2c消息子类型

    webim.C2C_MSG_SUB_TYPE = C2C_MSG_SUB_TYPE; //群消息子类型

    webim.GROUP_MSG_SUB_TYPE = GROUP_MSG_SUB_TYPE; //消息元素类型

    webim.MSG_ELEMENT_TYPE = MSG_ELEMENT_TYPE; //群提示消息类型

    webim.GROUP_TIP_TYPE = GROUP_TIP_TYPE; //图片类型

    webim.IMAGE_TYPE = IMAGE_TYPE; //群系统消息类型

    webim.GROUP_SYSTEM_TYPE = GROUP_SYSTEM_TYPE; //好友系统通知子类型

    webim.FRIEND_NOTICE_TYPE = FRIEND_NOTICE_TYPE; //群提示消息-群资料变更类型

    webim.GROUP_TIP_MODIFY_GROUP_INFO_TYPE = GROUP_TIP_MODIFY_GROUP_INFO_TYPE; //浏览器信息

    webim.BROWSER_INFO = BROWSER_INFO; //表情对象

    webim.Emotions = webim.EmotionPicData = emotions; //表情标识符和index Map

    webim.EmotionDataIndexs = webim.EmotionPicDataIndex = emotionDataIndexs; //腾讯登录服务错误码(托管模式)

    webim.TLS_ERROR_CODE = TLS_ERROR_CODE; //连接状态

    webim.CONNECTION_STATUS = CONNECTION_STATUS; //上传图片业务类型

    webim.UPLOAD_PIC_BUSSINESS_TYPE = UPLOAD_PIC_BUSSINESS_TYPE; //最近联系人类型

    webim.RECENT_CONTACT_TYPE = RECENT_CONTACT_TYPE; //上传资源类型

    webim.UPLOAD_RES_TYPE = UPLOAD_RES_TYPE;
    /**************************************/
    //类对象
    //
    //工具对象

    webim.Tool = tool; //控制台打印日志对象

    webim.Log = log; //消息对象

    webim.Msg = Msg; //会话对象

    webim.Session = Session; //会话存储对象

    webim.MsgStore = {
      sessMap: function sessMap() {
        return MsgStore.sessMap();
      },
      sessCount: function sessCount() {
        return MsgStore.sessCount();
      },
      sessByTypeId: function sessByTypeId(type, id) {
        return MsgStore.sessByTypeId(type, id);
      },
      delSessByTypeId: function delSessByTypeId(type, id) {
        return MsgStore.delSessByTypeId(type, id);
      },
      resetCookieAndSyncFlag: function resetCookieAndSyncFlag() {
        return MsgStore.resetCookieAndSyncFlag();
      }
    };
    webim.Resources = Resources;
    /**************************************/
    // webim API impl
    //
    //基本接口
    //登录

    webim.login = webim.init = function (loginInfo, listeners, opts, cbOk, cbErr) {
      //初始化连接状态回调函数
      ConnManager.init(listeners.onConnNotify, cbOk, cbErr); //设置ie9以下浏览器jsonp回调

      if (listeners.jsonpCallback) jsonpCallback = listeners.jsonpCallback; //登录

      _login(loginInfo, listeners, opts, cbOk, cbErr);
    }; //登出
    //需要传长轮询id
    //这样登出之后其他的登录实例还可以继续收取消息


    webim.logout = webim.offline = function (cbOk, cbErr) {
      return proto_logout('instance', cbOk, cbErr);
    }; //登出
    //这种登出方式，所有的实例都将不会收到消息推送，直到重新登录


    webim.logoutAll = function (cbOk, cbErr) {
      return proto_logout('all', cbOk, cbErr);
    }; //消息管理接口
    //发消息接口（私聊和群聊）


    webim.sendMsg = function (msg, cbOk, cbErr) {
      return MsgManager.sendMsg(msg, cbOk, cbErr);
    }; //拉取未读c2c消息


    webim.syncMsgs = function (cbOk, cbErr) {
      return MsgManager.syncMsgs(cbOk, cbErr);
    }; //拉取C2C漫游消息


    webim.getC2CHistoryMsgs = function (options, cbOk, cbErr) {
      return MsgManager.getC2CHistoryMsgs(options, cbOk, cbErr);
    }; //拉取群漫游消息


    webim.syncGroupMsgs = function (options, cbOk, cbErr) {
      return MsgManager.syncGroupMsgs(options, cbOk, cbErr);
    }; //上报c2c消息已读


    webim.c2CMsgReaded = function (options, cbOk, cbErr) {
      return MsgStore.c2CMsgReaded(options, cbOk, cbErr);
    }; //上报群消息已读


    webim.groupMsgReaded = function (options, cbOk, cbErr) {
      return proto_groupMsgReaded(options, cbOk, cbErr);
    }; //设置聊天会话自动标记已读


    webim.setAutoRead = function (selSess, isOn, isResetAll) {
      return MsgStore.setAutoRead(selSess, isOn, isResetAll);
    }; //群组管理接口
    //
    //创建群


    webim.createGroup = function (options, cbOk, cbErr) {
      return proto_createGroup(options, cbOk, cbErr);
    }; //创建群-高级接口


    webim.createGroupHigh = function (options, cbOk, cbErr) {
      return proto_createGroupHigh(options, cbOk, cbErr);
    }; //申请加群


    webim.applyJoinGroup = function (options, cbOk, cbErr) {
      return proto_applyJoinGroup(options, cbOk, cbErr);
    }; //处理加群申请(同意或拒绝)


    webim.handleApplyJoinGroupPendency = function (options, cbOk, cbErr) {
      return proto_handleApplyJoinGroupPendency(options, cbOk, cbErr);
    }; //获取群组未决列表


    webim.getPendencyGroup = function (options, cbOk, cbErr) {
      return proto_getPendencyGroup(options, cbOk, cbErr);
    }; //群未决已读上报


    webim.getPendencyGroupRead = function (options, cbOk, cbErr) {
      return proto_getPendencyGroupRead(options, cbOk, cbErr);
    }; //处理邀请进群申请(同意或拒绝)


    webim.handleInviteJoinGroupRequest = function (options, cbOk, cbErr) {
      return proto_handleInviteJoinGroupRequest(options, cbOk, cbErr);
    }; //删除加群申请


    webim.deleteApplyJoinGroupPendency = function (options, cbOk, cbErr) {
      return proto_deleteC2CMsg(options, cbOk, cbErr);
    }; //主动退群


    webim.quitGroup = function (options, cbOk, cbErr) {
      return proto_quitGroup(options, cbOk, cbErr);
    }; //搜索群组(根据名称)


    webim.searchGroupByName = function (options, cbOk, cbErr) {
      return proto_searchGroupByName(options, cbOk, cbErr);
    }; //获取群组公开资料(根据群id搜索)


    webim.getGroupPublicInfo = function (options, cbOk, cbErr) {
      return proto_getGroupPublicInfo(options, cbOk, cbErr);
    }; //获取群组详细资料-高级接口


    webim.getGroupInfo = function (options, cbOk, cbErr) {
      return proto_getGroupInfo(options, cbOk, cbErr);
    }; //修改群基本资料


    webim.modifyGroupBaseInfo = function (options, cbOk, cbErr) {
      return proto_modifyGroupBaseInfo(options, cbOk, cbErr);
    }; //获取群成员列表


    webim.getGroupMemberInfo = function (options, cbOk, cbErr) {
      return proto_getGroupMemberInfo(options, cbOk, cbErr);
    }; //邀请好友加群


    webim.addGroupMember = function (options, cbOk, cbErr) {
      return proto_addGroupMember(options, cbOk, cbErr);
    }; //修改群成员资料


    webim.modifyGroupMember = function (options, cbOk, cbErr) {
      return proto_modifyGroupMember(options, cbOk, cbErr);
    }; //删除群成员


    webim.deleteGroupMember = function (options, cbOk, cbErr) {
      return proto_deleteGroupMember(options, cbOk, cbErr);
    }; //解散群


    webim.destroyGroup = function (options, cbOk, cbErr) {
      return proto_destroyGroup(options, cbOk, cbErr);
    }; //转让群组


    webim.changeGroupOwner = function (options, cbOk, cbErr) {
      return proto_changeGroupOwner(options, cbOk, cbErr);
    }; //获取我的群组列表-高级接口


    webim.getJoinedGroupListHigh = function (options, cbOk, cbErr) {
      return proto_getJoinedGroupListHigh(options, cbOk, cbErr);
    }; //获取群成员角色


    webim.getRoleInGroup = function (options, cbOk, cbErr) {
      return proto_getRoleInGroup(options, cbOk, cbErr);
    }; //设置群成员禁言时间


    webim.forbidSendMsg = function (options, cbOk, cbErr) {
      return proto_forbidSendMsg(options, cbOk, cbErr);
    }; //发送自定义群系统通知


    webim.sendCustomGroupNotify = function (options, cbOk, cbErr) {
      return proto_sendCustomGroupNotify(options, cbOk, cbErr);
    }; //进入大群


    webim.applyJoinBigGroup = function (options, cbOk, cbErr) {
      return proto_applyJoinBigGroup(options, cbOk, cbErr);
    }; //退出大群


    webim.quitBigGroup = function (options, cbOk, cbErr) {
      return proto_quitBigGroup(options, cbOk, cbErr);
    }; //资料关系链管理接口
    //
    //获取个人资料接口，可用于搜索用户


    webim.getProfilePortrait = function (options, cbOk, cbErr) {
      return proto_getProfilePortrait(options, cbOk, cbErr);
    }; //设置个人资料


    webim.setProfilePortrait = function (options, cbOk, cbErr) {
      return proto_setProfilePortrait(options, cbOk, cbErr);
    }; //申请加好友


    webim.applyAddFriend = function (options, cbOk, cbErr) {
      return proto_applyAddFriend(options, cbOk, cbErr);
    }; //获取好友申请列表


    webim.getPendency = function (options, cbOk, cbErr) {
      return proto_getPendency(options, cbOk, cbErr);
    }; //好友申请列表已读上报


    webim.getPendencyReport = function (options, cbOk, cbErr) {
      return proto_getPendencyReport(options, cbOk, cbErr);
    }; //删除好友申请


    webim.deletePendency = function (options, cbOk, cbErr) {
      return proto_deletePendency(options, cbOk, cbErr);
    }; //处理好友申请


    webim.responseFriend = function (options, cbOk, cbErr) {
      return proto_responseFriend(options, cbOk, cbErr);
    }; //获取我的好友


    webim.getAllFriend = function (options, cbOk, cbErr) {
      return proto_getAllFriend(options, cbOk, cbErr);
    }; //删除会话


    webim.deleteChat = function (options, cbOk, cbErr) {
      return proto_deleteChat(options, cbOk, cbErr);
    }; //删除好友


    webim.deleteFriend = function (options, cbOk, cbErr) {
      return proto_deleteFriend(options, cbOk, cbErr);
    }; //拉黑


    webim.addBlackList = function (options, cbOk, cbErr) {
      return proto_addBlackList(options, cbOk, cbErr);
    }; //删除黑名单


    webim.deleteBlackList = function (options, cbOk, cbErr) {
      return proto_deleteBlackList(options, cbOk, cbErr);
    }; //获取我的黑名单


    webim.getBlackList = function (options, cbOk, cbErr) {
      return proto_getBlackList(options, cbOk, cbErr);
    }; //获取最近会话


    webim.getRecentContactList = function (options, cbOk, cbErr) {
      return proto_getRecentContactList(options, cbOk, cbErr);
    }; //图片或文件服务接口
    //
    //上传文件接口（高版本浏览器）


    webim.uploadFile = webim.uploadPic = function (options, cbOk, cbErr) {
      return FileUploader.uploadFile(options, cbOk, cbErr);
    }; //提交上传图片表单接口（用于低版本ie）


    webim.submitUploadFileForm = function (options, cbOk, cbErr) {
      return FileUploader.submitUploadFileForm(options, cbOk, cbErr);
    }; //上传图片或文件(Base64)接口


    webim.uploadFileByBase64 = webim.uploadPicByBase64 = function (options, cbOk, cbErr) {
      //请求参数
      var opt = {
        'To_Account': options.toAccount,
        'Busi_Id': options.businessType,
        'File_Type': options.File_Type,
        'File_Str_Md5': options.fileMd5,
        'PkgFlag': UPLOAD_RES_PKG_FLAG.BASE64_DATA,
        'File_Size': options.totalSize,
        'Slice_Offset': 0,
        'Slice_Size': options.totalSize,
        'Slice_Data': options.base64Str,
        'Seq': nextSeq(),
        'Timestamp': unixtime(),
        'Random': createRandom()
      };
      return proto_uploadPic(opt, cbOk, cbErr);
    }; //设置jsonp返回的值


    webim.setJsonpLastRspData = function (rspData) {
      jsonpLastRspData = typeof rspData == "string" ? JSON.parse(rspData) : rspData;
    }; //获取长轮询ID


    webim.getLongPollingId = function (options, cbOk, cbErr) {
      return proto_getLongPollingId(options, cbOk, cbErr);
    }; //获取下载地址


    webim.applyDownload = function (options, cbOk, cbErr) {
      return proto_applyDownload(options, cbOk, cbErr);
    }; //获取下载地址


    webim.onDownFile = function (uuid) {
      window.open(Resources.downloadMap["uuid_" + uuid]);
    }; //检查是否登录


    webim.checkLogin = function (cbErr, isNeedCallBack) {
      return checkLogin(cbErr, isNeedCallBack);
    };
  })(webim);

  return webim;
}();
});
define('static/js/weCropper.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
"use strict";

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.weCropper = factory();
})(void 0, function () {
  'use strict';
  /**
   * Created by sail on 2017/6/11.
   */

  var device = void 0;
  var TOUCH_STATE = ['touchstarted', 'touchmoved', 'touchended'];

  function firstLetterUpper(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function setTouchState(instance) {
    for (var _len = arguments.length, arg = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      arg[_key - 1] = arguments[_key];
    }

    TOUCH_STATE.forEach(function (key, i) {
      if (arg[i] !== undefined) {
        instance[key] = arg[i];
      }
    });
  }

  function validator(instance, o) {
    Object.defineProperties(instance, o);
  }

  function getDevice() {
    if (!device) {
      device = wx.getSystemInfoSync();
    }

    return device;
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var classCallCheck = function classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var tmp = {};
  var DEFAULT = {
    id: {
      default: 'cropper',
      get: function get$$1() {
        return tmp.id;
      },
      set: function set$$1(value) {
        if (typeof value !== 'string') {}

        tmp.id = value;
      }
    },
    width: {
      default: 750,
      get: function get$$1() {
        return tmp.width;
      },
      set: function set$$1(value) {
        tmp.width = value;
      }
    },
    height: {
      default: 750,
      get: function get$$1() {
        return tmp.height;
      },
      set: function set$$1(value) {
        tmp.height = value;
      }
    },
    scale: {
      default: 2.5,
      get: function get$$1() {
        return tmp.scale;
      },
      set: function set$$1(value) {
        tmp.scale = value;
      }
    },
    zoom: {
      default: 5,
      get: function get$$1() {
        return tmp.zoom;
      },
      set: function set$$1(value) {
        tmp.zoom = value;
      }
    },
    src: {
      default: 'cropper',
      get: function get$$1() {
        return tmp.src;
      },
      set: function set$$1(value) {
        tmp.src = value;
      }
    },
    cut: {
      default: {},
      get: function get$$1() {
        return tmp.cut;
      },
      set: function set$$1(value) {
        tmp.cut = value;
      }
    },
    onReady: {
      default: null,
      get: function get$$1() {
        return tmp.ready;
      },
      set: function set$$1(value) {
        tmp.ready = value;
      }
    },
    onBeforeImageLoad: {
      default: null,
      get: function get$$1() {
        return tmp.beforeImageLoad;
      },
      set: function set$$1(value) {
        tmp.beforeImageLoad = value;
      }
    },
    onImageLoad: {
      default: null,
      get: function get$$1() {
        return tmp.imageLoad;
      },
      set: function set$$1(value) {
        tmp.imageLoad = value;
      }
    },
    onBeforeDraw: {
      default: null,
      get: function get$$1() {
        return tmp.beforeDraw;
      },
      set: function set$$1(value) {
        tmp.beforeDraw = value;
      }
    }
  };
  /**
   * Created by sail on 2017/6/11.
   */

  function prepare() {
    var self = this;

    var _getDevice = getDevice(),
        windowWidth = _getDevice.windowWidth;

    self.attachPage = function () {
      var pages = getCurrentPages //  获取到当前page上下文
      ();
      var pageContext = pages[pages.length - 1]; //  把this依附在Page上下文的wecropper属性上，便于在page钩子函数中访问

      pageContext.wecropper = self;
    };

    self.createCtx = function () {
      var id = self.id;

      if (id) {
        self.ctx = wx.createCanvasContext(id);
      }
    };

    self.deviceRadio = windowWidth / 750;
    self.deviceRadio = self.deviceRadio.toFixed(2);
  }
  /**
   *
   */


  function observer() {
    var self = this;
    var EVENT_TYPE = ['ready', 'beforeImageLoad', 'beforeDraw', 'imageLoad'];

    self.on = function (event, fn) {
      if (EVENT_TYPE.indexOf(event) > -1) {
        if (typeof fn === 'function') {
          event === 'ready' ? fn(self) : self['on' + firstLetterUpper(event)] = fn;
        }
      }

      return self;
    };
  }
  /**
   * Created by sail on 2017/6/11.
   */


  function methods() {
    var self = this;
    var deviceRadio = self.deviceRadio; // console.log(JSON.stringify(self));

    var boundWidth = self.width; // 裁剪框默认宽度，即整个画布宽度

    var boundHeight = self.height; // 裁剪框默认高度，即整个画布高度

    var _self$cut = self.cut,
        _self$cut$x = _self$cut.x,
        x = _self$cut$x === undefined ? 0 : _self$cut$x,
        _self$cut$y = _self$cut.y,
        y = _self$cut$y === undefined ? 0 : _self$cut$y,
        _self$cut$width = _self$cut.width,
        width = _self$cut$width === undefined ? boundWidth : _self$cut$width,
        _self$cut$height = _self$cut.height,
        height = _self$cut$height === undefined ? boundHeight : _self$cut$height;

    self.updateCanvas = function () {
      if (self.croperTarget) {
        //  画布绘制图片
        self.ctx.drawImage(self.croperTarget, self.imgLeft, self.imgTop, self.scaleWidth, self.scaleHeight);
      }

      typeof self.onBeforeDraw === 'function' && self.onBeforeDraw(self.ctx, self);
      self.setBoundStyle //	设置边界样式
      ();
      self.ctx.draw();
      return self;
    };

    self.pushOrign = function (src) {
      self.src = src;
      typeof self.onBeforeImageLoad === 'function' && self.onBeforeImageLoad(self.ctx, self);
      uni.getImageInfo({
        src: src,
        success: function success(res) {
          var innerAspectRadio = res.width / res.height;
          self.croperTarget = res.path || src;

          if (innerAspectRadio < width / height) {
            self.rectX = x;
            self.baseWidth = width;
            self.baseHeight = width / innerAspectRadio;
            self.rectY = y - Math.abs((height - self.baseHeight) / 2);
          } else {
            self.rectY = y;
            self.baseWidth = height * innerAspectRadio;
            self.baseHeight = height;
            self.rectX = x - Math.abs((width - self.baseWidth) / 2);
          }

          self.imgLeft = self.rectX;
          self.imgTop = self.rectY;
          self.scaleWidth = self.baseWidth;
          self.scaleHeight = self.baseHeight;
          self.updateCanvas();
          typeof self.onImageLoad === 'function' && self.onImageLoad(self.ctx, self);
        }
      });
      self.update();
      return self;
    };

    self.getCropperImage = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var id = self.id;
      var ARG_TYPE = toString.call(args[0]);

      switch (ARG_TYPE) {
        case '[object Object]':
          var _args$0$quality = args[0].quality,
              quality = _args$0$quality === undefined ? 10 : _args$0$quality;
          console.log("quality--" + quality);
          uni.canvasToTempFilePath({
            canvasId: id,
            x: x,
            y: y,
            width: width,
            height: height,
            destWidth: width * quality / (deviceRadio * 10),
            destHeight: height * quality / (deviceRadio * 10),
            success: function success(res) {
              console.log(res);
              typeof args[args.length - 1] === 'function' && args[args.length - 1](res.tempFilePath);
            }
          });
          break;

        case '[object Function]':
          uni.canvasToTempFilePath({
            canvasId: id,
            x: x,
            y: y,
            fileType: "jpg",
            width: width,
            height: height,
            destWidth: width,
            destHeight: height,
            success: function success(res) {
              typeof args[args.length - 1] === 'function' && args[args.length - 1](res.tempFilePath);
            }
          });
          break;
      }

      return self;
    };
  }
  /**
   * Created by sail on 2017/6/11.
   */


  function update() {
    var self = this;
    if (!self.src) return;

    self.__oneTouchStart = function (touch) {
      self.touchX0 = touch.x;
      self.touchY0 = touch.y;
    };

    self.__oneTouchMove = function (touch) {
      var xMove = void 0,
          yMove = void 0; //计算单指移动的距离

      if (self.touchended) {
        return self.updateCanvas();
      }

      xMove = touch.x - self.touchX0;
      yMove = touch.y - self.touchY0;
      var imgLeft = self.rectX + xMove;
      var imgTop = self.rectY + yMove;
      self.outsideBound(imgLeft, imgTop);
      self.updateCanvas();
    };

    self.__twoTouchStart = function (touch0, touch1) {
      var xMove = void 0,
          yMove = void 0,
          oldDistance = void 0;
      self.touchX1 = self.rectX + self.scaleWidth / 2;
      self.touchY1 = self.rectY + self.scaleHeight / 2; //计算两指距离

      xMove = touch1.x - touch0.x;
      yMove = touch1.y - touch0.y;
      oldDistance = Math.sqrt(xMove * xMove + yMove * yMove);
      self.oldDistance = oldDistance;
    };

    self.__twoTouchMove = function (touch0, touch1) {
      var xMove = void 0,
          yMove = void 0,
          newDistance = void 0;
      var scale = self.scale,
          zoom = self.zoom; // 计算二指最新距离

      xMove = touch1.x - touch0.x;
      yMove = touch1.y - touch0.y;
      newDistance = Math.sqrt(xMove * xMove + yMove * yMove //  使用0.005的缩放倍数具有良好的缩放体验
      );
      self.newScale = self.oldScale + 0.001 * zoom * (newDistance - self.oldDistance); //  设定缩放范围

      self.newScale <= 1 && (self.newScale = 1);
      self.newScale >= scale && (self.newScale = scale);
      self.scaleWidth = self.newScale * self.baseWidth;
      self.scaleHeight = self.newScale * self.baseHeight;
      var imgLeft = self.touchX1 - self.scaleWidth / 2;
      var imgTop = self.touchY1 - self.scaleHeight / 2;
      self.outsideBound(imgLeft, imgTop);
      self.updateCanvas();
    };

    self.__xtouchEnd = function () {
      self.oldScale = self.newScale;
      self.rectX = self.imgLeft;
      self.rectY = self.imgTop;
    };
  }
  /**
   * Created by sail on 2017/6/11.
   */


  var handle = {
    //  图片手势初始监测
    touchStart: function touchStart(e) {
      var self = this;

      var _e$touches = slicedToArray(e.touches, 2),
          touch0 = _e$touches[0],
          touch1 = _e$touches[1]; // console.log(JSON.stringify(touch1));


      if (!touch0.x) {
        touch0.x = touch0.clientX;
        touch0.y = touch0.clientY;

        if (touch1) {
          touch1.x = touch1.clientX;
          touch1.y = touch1.clientY;
        }
      }

      setTouchState(self, true, null, null //计算第一个触摸点的位置，并参照改点进行缩放
      );

      self.__oneTouchStart(touch0 // 两指手势触发
      );

      if (e.touches.length >= 2) {
        self.__twoTouchStart(touch0, touch1);
      }
    },
    //  图片手势动态缩放
    touchMove: function touchMove(e) {
      var self = this;

      var _e$touches2 = slicedToArray(e.touches, 2),
          touch0 = _e$touches2[0],
          touch1 = _e$touches2[1];

      if (!touch0.x) {
        touch0.x = touch0.clientX;
        touch0.y = touch0.clientY;

        if (touch1) {
          touch1.x = touch1.clientX;
          touch1.y = touch1.clientY;
        }
      }

      setTouchState(self, null, true // 单指手势时触发
      );

      if (e.touches.length === 1) {
        self.__oneTouchMove(touch0);
      } // 两指手势触发


      if (e.touches.length >= 2) {
        self.__twoTouchMove(touch0, touch1);
      }
    },
    touchEnd: function touchEnd(e) {
      var self = this;
      setTouchState(self, false, false, true);

      self.__xtouchEnd();
    }
  };
  /**
   * Created by sail on 1017/6/12.
   */

  function cut() {
    var self = this;
    var deviceRadio = self.deviceRadio;
    var boundWidth = self.width; // 裁剪框默认宽度，即整个画布宽度

    var boundHeight = self.height; // 裁剪框默认高度，即整个画布高度

    var _self$cut = self.cut,
        _self$cut$x = _self$cut.x,
        x = _self$cut$x === undefined ? 0 : _self$cut$x,
        _self$cut$y = _self$cut.y,
        y = _self$cut$y === undefined ? 0 : _self$cut$y,
        _self$cut$width = _self$cut.width,
        width = _self$cut$width === undefined ? boundWidth : _self$cut$width,
        _self$cut$height = _self$cut.height,
        height = _self$cut$height === undefined ? boundHeight : _self$cut$height;
    /**
     * 设置边界
     * @param imgLeft 图片左上角横坐标值
     * @param imgTop 图片左上角纵坐标值
     */

    self.outsideBound = function (imgLeft, imgTop) {
      self.imgLeft = imgLeft >= x ? x : self.scaleWidth + imgLeft - x <= width ? x + width - self.scaleWidth : imgLeft;
      self.imgTop = imgTop >= y ? y : self.scaleHeight + imgTop - y <= height ? y + height - self.scaleHeight : imgTop;
    };
    /**
     * 设置边界样式
     * @param color	边界颜色
     */


    self.setBoundStyle = function () {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$color = _ref.color,
          color = _ref$color === undefined ? '#04b00f' : _ref$color,
          _ref$mask = _ref.mask,
          mask = _ref$mask === undefined ? 'rgba(0, 0, 0, 0.3)' : _ref$mask,
          _ref$lineWidth = _ref.lineWidth,
          lineWidth = _ref$lineWidth === undefined ? 1 : _ref$lineWidth; // 绘制半透明层


      self.ctx.beginPath();
      self.ctx.setFillStyle(mask);
      self.ctx.fillRect(0, 0, x, boundHeight);
      self.ctx.fillRect(x, 0, width, y);
      self.ctx.fillRect(x, y + height, width, boundHeight - y - height);
      self.ctx.fillRect(x + width, 0, boundWidth - x - width, boundHeight);
      self.ctx.fill // 设置边界左上角样式
      // 为使边界样式处于边界外边缘，此时x、y均要减少lineWidth
      ();
      self.ctx.beginPath();
      self.ctx.setStrokeStyle(color);
      self.ctx.setLineWidth(lineWidth);
      self.ctx.moveTo(x - lineWidth, y + 10 - lineWidth);
      self.ctx.lineTo(x - lineWidth, y - lineWidth);
      self.ctx.lineTo(x + 10 - lineWidth, y - lineWidth);
      self.ctx.stroke // 设置边界左下角样式
      // 为使边界样式处于边界外边缘，此时x要减少lineWidth、y要增加lineWidth
      ();
      self.ctx.beginPath();
      self.ctx.setStrokeStyle(color);
      self.ctx.setLineWidth(lineWidth);
      self.ctx.moveTo(x - lineWidth, y + height - 10 + lineWidth);
      self.ctx.lineTo(x - lineWidth, y + height + lineWidth);
      self.ctx.lineTo(x + 10 - lineWidth, y + height + lineWidth);
      self.ctx.stroke // 设置边界右上角样式
      // 为使边界样式处于边界外边缘，此时x要增加lineWidth、y要减少lineWidth
      ();
      self.ctx.beginPath();
      self.ctx.setStrokeStyle(color);
      self.ctx.setLineWidth(lineWidth);
      self.ctx.moveTo(x + width - 10 + lineWidth, y - lineWidth);
      self.ctx.lineTo(x + width + lineWidth, y - lineWidth);
      self.ctx.lineTo(x + width + lineWidth, y + 10 - lineWidth);
      self.ctx.stroke // 设置边界右下角样式
      // 为使边界样式处于边界外边缘，此时x、y均要增加lineWidth
      ();
      self.ctx.beginPath();
      self.ctx.setStrokeStyle(color);
      self.ctx.setLineWidth(lineWidth);
      self.ctx.moveTo(x + width + lineWidth, y + height - 10 + lineWidth);
      self.ctx.lineTo(x + width + lineWidth, y + height + lineWidth);
      self.ctx.lineTo(x + width - 10 + lineWidth, y + height + lineWidth);
      self.ctx.stroke();
    };
  }

  var __version__ = '1.1.4';

  var weCropper = function () {
    function weCropper(params) {
      classCallCheck(this, weCropper);
      var self = this;
      var _default = {};
      validator(self, DEFAULT);
      Object.keys(DEFAULT).forEach(function (key) {
        _default[key] = DEFAULT[key].default;
      });
      Object.assign(self, _default, params);
      self.prepare();
      self.attachPage();
      self.createCtx();
      self.observer();
      self.cutt();
      self.methods();
      self.init();
      self.update();
      return self;
    }

    createClass(weCropper, [{
      key: 'init',
      value: function init() {
        var self = this;
        var src = self.src;
        self.version = __version__;
        typeof self.onReady === 'function' && self.onReady(self.ctx, self);

        if (src) {
          self.pushOrign(src);
        }

        setTouchState(self, false, false, false);
        self.oldScale = 1;
        self.newScale = 1;
        return self;
      }
    }]);
    return weCropper;
  }();

  Object.assign(weCropper.prototype, handle);
  weCropper.prototype.prepare = prepare;
  weCropper.prototype.observer = observer;
  weCropper.prototype.methods = methods;
  weCropper.prototype.cutt = cut;
  weCropper.prototype.update = update;
  return weCropper;
});
});

define('app.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
require('./common/runtime.js')
require('./common/vendor.js')
require('./common/main.js')
});
require('app.js');

__wxRoute = 'colorui/components/cu-custom';__wxRouteBegin = true;__wxAppCurrentFile__ = 'colorui/components/cu-custom.js';

define('colorui/components/cu-custom.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
"use strict";

(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["colorui/components/cu-custom"], {
  "16f0": function f0(t, a, n) {
    "use strict";

    n.r(a);
    var e = n("bc5b"),
        u = n("7eab");

    for (var c in u) {
      "default" !== c && function (t) {
        n.d(a, t, function () {
          return u[t];
        });
      }(c);
    }

    n("6aef");
    var o = n("2877"),
        r = Object(o["a"])(u["default"], e["a"], e["b"], !1, null, null, null);
    a["default"] = r.exports;
  },
  "6aef": function aef(t, a, n) {
    "use strict";

    var e = n("9332"),
        u = n.n(e);
    u.a;
  },
  "7eab": function eab(t, a, n) {
    "use strict";

    n.r(a);
    var e = n("8950"),
        u = n.n(e);

    for (var c in e) {
      "default" !== c && function (t) {
        n.d(a, t, function () {
          return e[t];
        });
      }(c);
    }

    a["default"] = u.a;
  },
  8950: function _(t, a, n) {
    "use strict";

    (function (t) {
      Object.defineProperty(a, "__esModule", {
        value: !0
      }), a.default = void 0;
      var n = {
        data: function data() {
          return {
            StatusBar: this.StatusBar,
            CustomBar: this.CustomBar
          };
        },
        name: "cu-custom",
        computed: {
          style: function style() {
            var t = this.StatusBar,
                a = this.CustomBar,
                n = this.bgImage,
                e = "height:".concat(a, "px;padding-top:").concat(t, "px;");
            return this.bgImage && (e = "".concat(e, "background-image:url(").concat(n, ");")), e;
          }
        },
        props: {
          bgColor: {
            type: String,
            default: ""
          },
          isBack: {
            type: [Boolean, String],
            default: !1
          },
          bgImage: {
            type: String,
            default: ""
          }
        },
        methods: {
          BackPage: function BackPage() {
            t.navigateBack({
              delta: 1
            });
          }
        }
      };
      a.default = n;
    }).call(this, n("6e42")["default"]);
  },
  9332: function _(t, a, n) {},
  bc5b: function bc5b(t, a, n) {
    "use strict";

    var e = function e() {
      var t = this,
          a = t.$createElement;
      t._self._c;
    },
        u = [];

    n.d(a, "a", function () {
      return e;
    }), n.d(a, "b", function () {
      return u;
    });
  }
}]);
;
(global["webpackJsonp"] = global["webpackJsonp"] || []).push(['colorui/components/cu-custom-create-component', {
  'colorui/components/cu-custom-create-component': function coloruiComponentsCuCustomCreateComponent(module, exports, __webpack_require__) {
    __webpack_require__('6e42')['createComponent'](__webpack_require__("16f0"));
  }
}, [['colorui/components/cu-custom-create-component']]]);
});
require('colorui/components/cu-custom.js');
__wxRoute = 'components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox-item';__wxRouteBegin = true;__wxAppCurrentFile__ = 'components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox-item.js';

define('components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox-item.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
"use strict";

(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox-item"], {
  "5e95": function e95(e, t, n) {
    "use strict";

    n.r(t);
    var u = n("a750"),
        a = n("6ae2");

    for (var o in a) {
      "default" !== o && function (e) {
        n.d(t, e, function () {
          return a[e];
        });
      }(o);
    }

    n("6953");
    var r = n("2877"),
        c = Object(r["a"])(a["default"], u["a"], u["b"], !1, null, null, null);
    t["default"] = c.exports;
  },
  6953: function _(e, t, n) {
    "use strict";

    var u = n("f7fe"),
        a = n.n(u);
    a.a;
  },
  "6ae2": function ae2(e, t, n) {
    "use strict";

    n.r(t);
    var u = n("b3ad"),
        a = n.n(u);

    for (var o in u) {
      "default" !== o && function (e) {
        n.d(t, e, function () {
          return u[e];
        });
      }(o);
    }

    t["default"] = a.a;
  },
  a750: function a750(e, t, n) {
    "use strict";

    var u = function u() {
      var e = this,
          t = e.$createElement;
      e._self._c;
    },
        a = [];

    n.d(t, "a", function () {
      return u;
    }), n.d(t, "b", function () {
      return a;
    });
  },
  b3ad: function b3ad(e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0;

    var u = function u(e, t, n) {
      var u,
          a,
          o,
          r,
          c = function c() {
        var i = new Date().getTime(),
            l = i - a;
        l < t && l >= 0 ? (clearTimeout(u), u = setTimeout(c, t - l)) : (clearTimeout(u), u = null, n || (e.apply(o, r), u || (o = r = null)));
      };

      return function () {
        o = this, r = arguments, a = new Date().getTime();
        var i = n && !u;
        u || (u = setTimeout(c, t)), i && (e.apply(o, r), o = r = null);
      };
    },
        a = {
      props: {
        name: {
          type: String,
          default: ""
        },
        value: {
          default: null
        },
        checked: {
          type: [Boolean, Number],
          default: !1
        }
      },
      computed: {
        widthDefault: function widthDefault() {
          return this.name.length <= 3;
        },
        activeStyle: function activeStyle() {
          return "background: #d5e4fd;color: #3c7ef6;border-color: #3c7ef6;";
        },
        itemStyle: function itemStyle() {
          return "background: #f7f7f7;color: #7d7d7d;";
        }
      },
      data: function data() {
        return {};
      },
      methods: {
        handleChange: u(o, 200, !0)
      }
    };

    function o() {
      this.$emit("change", this.value);
    }

    t.default = a;
  },
  f7fe: function f7fe(e, t, n) {}
}]);
;
(global["webpackJsonp"] = global["webpackJsonp"] || []).push(['components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox-item-create-component', {
  'components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox-item-create-component': function componentsAxbCheckbox_v20ComponentsAxbCheckboxAxbCheckboxItemCreateComponent(module, exports, __webpack_require__) {
    __webpack_require__('6e42')['createComponent'](__webpack_require__("5e95"));
  }
}, [['components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox-item-create-component']]]);
});
require('components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox-item.js');
__wxRoute = 'components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox';__wxRouteBegin = true;__wxAppCurrentFile__ = 'components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox.js';

define('components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
"use strict";

(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox"], {
  "011d": function d(e, t, n) {
    "use strict";

    n.r(t);
    var c = n("5950"),
        i = n("c9e7");

    for (var a in i) {
      "default" !== a && function (e) {
        n.d(t, e, function () {
          return i[e];
        });
      }(a);
    }

    n("8ab5");
    var s = n("2877"),
        u = Object(s["a"])(i["default"], c["a"], c["b"], !1, null, null, null);
    t["default"] = u.exports;
  },
  5884: function _(e, t, n) {},
  5950: function _(e, t, n) {
    "use strict";

    var c = function c() {
      var e = this,
          t = e.$createElement;
      e._self._c;
    },
        i = [];

    n.d(t, "a", function () {
      return c;
    }), n.d(t, "b", function () {
      return i;
    });
  },
  "8ab5": function ab5(e, t, n) {
    "use strict";

    var c = n("5884"),
        i = n.n(c);
    i.a;
  },
  a608: function a608(e, t, n) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0;

    var c = function c() {
      return n.e("components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox-item").then(n.bind(null, "5e95"));
    },
        i = {
      props: {
        list: {
          type: Array,
          default: []
        },
        multi: {
          type: Boolean,
          default: !1
        }
      },
      components: {
        filterRadioItem: c
      },
      data: function data() {
        return {
          items: this.list,
          resMulti: []
        };
      },
      created: function created() {},
      computed: {},
      methods: {
        handleChange: function handleChange(e) {
          var t = [];

          if ("all" === e) {
            var n = this.items.find(function (t) {
              return t.value === e;
            });
            this.items.forEach(function (e) {
              var c = {};
              c.name = e.name, c.value = e.value, c.checked = !n.checked, t.push(c);
            });
          } else for (var c = 0; c < this.items.length; c++) {
            var i = {};
            i.name = this.items[c].name, i.value = this.items[c].value, this.multi ? this.items[c].value === e ? i.checked = !this.items[c].checked : i.checked = this.items[c].checked : this.items[c].value === e ? i.checked = !this.items[c].checked : i.checked = !1, t.push(i);
          }

          if (this.multi && "all" === t[0].value) {
            var a = t.slice(1),
                s = a.every(function (e) {
              return e.checked;
            });
            t[0].checked = s;
          }

          this.items = t;
        },
        radioChange: function radioChange(e) {
          console.log("radio发生change事件，携带value值为：" + e, " at components\\axb-checkbox_v2.0\\components\\axb-checkbox\\axb-checkbox.vue:79"), this.handleChange(e);
          var t = [];
          this.multi && this.items.forEach(function (e) {
            e.checked && t.push(e.value);
          });
          var n = this.items.find(function (t) {
            return t.value === e;
          }),
              c = this.multi ? t : n.checked ? e : null;
          this.$emit("change", c);
        },
        reset: function reset() {
          this.items = this.list;
        },
        setItems: function setItems(e) {
          this.items = e;
        }
      }
    };

    t.default = i;
  },
  c9e7: function c9e7(e, t, n) {
    "use strict";

    n.r(t);
    var c = n("a608"),
        i = n.n(c);

    for (var a in c) {
      "default" !== a && function (e) {
        n.d(t, e, function () {
          return c[e];
        });
      }(a);
    }

    t["default"] = i.a;
  }
}]);
;
(global["webpackJsonp"] = global["webpackJsonp"] || []).push(['components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox-create-component', {
  'components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox-create-component': function componentsAxbCheckbox_v20ComponentsAxbCheckboxAxbCheckboxCreateComponent(module, exports, __webpack_require__) {
    __webpack_require__('6e42')['createComponent'](__webpack_require__("011d"));
  }
}, [['components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox-create-component']]]);
});
require('components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox.js');
__wxRoute = 'components/code/number-keyboard';__wxRouteBegin = true;__wxAppCurrentFile__ = 'components/code/number-keyboard.js';

define('components/code/number-keyboard.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
"use strict";

(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/code/number-keyboard"], {
  "0239": function _(e, n, u) {
    "use strict";

    var t = u("db00"),
        r = u.n(t);
    r.a;
  },
  "0610": function _(e, n, u) {
    "use strict";

    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.default = void 0;
    var t = {
      name: "number-keyboard",
      props: {
        open: {
          type: Boolean,
          default: !1
        },
        color: {
          type: String,
          default: "#04BE02"
        }
      },
      data: function data() {
        return {
          config: {
            loop: [{
              number: 1,
              key: "number-1"
            }, {
              number: 2,
              key: "number-2"
            }, {
              number: 3,
              key: "number-3"
            }, {
              number: 4,
              key: "number-4"
            }, {
              number: 5,
              key: "number-5"
            }, {
              number: 6,
              key: "number-6"
            }, {
              number: 7,
              key: "number-7"
            }, {
              number: 8,
              key: "number-8"
            }, {
              number: 9,
              key: "number-9"
            }]
          },
          numberKeyboardPopupVisible: this.open
        };
      },
      watch: {
        numberKeyboardPopupVisible: function numberKeyboardPopupVisible(e, n) {
          0 == e && this.$emit("close");
        },
        open: function open(e, n) {
          console.log(e, " at components\\code\\number-keyboard.vue:83"), this.numberKeyboardPopupVisible = e;
        }
      },
      methods: {
        close: function close() {
          this.numberKeyboardPopupVisible = !1, this.$emit("close");
        },
        del: function del() {
          this.$emit("delete");
        },
        number: function number(e) {
          this.$emit("number", e);
        }
      }
    };
    n.default = t;
  },
  "2b33": function b33(e, n, u) {
    "use strict";

    u.r(n);
    var t = u("c5e1"),
        r = u("9bb9");

    for (var o in r) {
      "default" !== o && function (e) {
        u.d(n, e, function () {
          return r[e];
        });
      }(o);
    }

    u("0239");
    var b = u("2877"),
        i = Object(b["a"])(r["default"], t["a"], t["b"], !1, null, "457da818", null);
    n["default"] = i.exports;
  },
  "9bb9": function bb9(e, n, u) {
    "use strict";

    u.r(n);
    var t = u("0610"),
        r = u.n(t);

    for (var o in t) {
      "default" !== o && function (e) {
        u.d(n, e, function () {
          return t[e];
        });
      }(o);
    }

    n["default"] = r.a;
  },
  c5e1: function c5e1(e, n, u) {
    "use strict";

    var t = function t() {
      var e = this,
          n = e.$createElement;
      e._self._c;
    },
        r = [];

    u.d(n, "a", function () {
      return t;
    }), u.d(n, "b", function () {
      return r;
    });
  },
  db00: function db00(e, n, u) {}
}]);
;
(global["webpackJsonp"] = global["webpackJsonp"] || []).push(['components/code/number-keyboard-create-component', {
  'components/code/number-keyboard-create-component': function componentsCodeNumberKeyboardCreateComponent(module, exports, __webpack_require__) {
    __webpack_require__('6e42')['createComponent'](__webpack_require__("2b33"));
  }
}, [['components/code/number-keyboard-create-component']]]);
});
require('components/code/number-keyboard.js');
__wxRoute = 'components/collapse/uni-collapse-item';__wxRouteBegin = true;__wxAppCurrentFile__ = 'components/collapse/uni-collapse-item.js';

define('components/collapse/uni-collapse-item.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
"use strict";

(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/collapse/uni-collapse-item"], {
  "0724": function _(n, t, e) {
    "use strict";

    var i = function i() {
      var n = this,
          t = n.$createElement;
      n._self._c;
    },
        a = [];

    e.d(t, "a", function () {
      return i;
    }), e.d(t, "b", function () {
      return a;
    });
  },
  "32b7": function b7(n, t, e) {
    "use strict";

    (function (n) {
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = void 0;

      var i = function i() {
        return e.e("components/collapse/uni-icon").then(e.bind(null, "8d79"));
      },
          a = {
        name: "uni-collapse-item",
        components: {
          uniIcon: i
        },
        data: function data() {
          var n = "Uni_".concat(Math.ceil(1e6 * Math.random()).toString(36));
          return {
            isOpen: this.open,
            height: 0,
            elId: n
          };
        },
        watch: {
          open: function open(n) {
            this.isOpen = n;
          }
        },
        computed: {
          index: function index() {
            return this.$parent.$children.indexOf(this);
          },
          nameSync: function nameSync() {
            return 0 === this.name ? this.index : this.name;
          },
          setCollapseCellClass: function setCollapseCellClass() {
            var n = ["uni-collapse-cell"];
            return !0 !== this.disabled && "true" !== this.disabled || n.push("uni-collapse-cell--disabled"), !0 !== this.isOpen && "true" !== this.isOpen || n.push("uni-collapse-cell--open"), n;
          },
          setActive: function setActive() {
            var n = [];
            return !0 !== this.isOpen && "true" !== this.isOpen || n.push("uni-active"), n;
          },
          setContClass: function setContClass() {
            var n = [];
            return !0 !== this.isOpen && "true" !== this.isOpen || n.push("uni-active"), "inner" === this.animation && n.push("uni-collapse-cell__inner"), n;
          }
        },
        props: {
          animation: {
            type: String,
            default: "outer"
          },
          title: String,
          name: {
            type: [Number, String],
            default: 0
          },
          disabled: {
            type: [Boolean, String],
            default: !1
          },
          open: {
            type: [Boolean, String],
            default: !1
          },
          thumb: String
        },
        created: function created() {
          var n = this.$parent || this.$root,
              t = n.$options.name;

          while (n && "uni-collapse" !== t) {
            n = n.$parent, n && (t = n.$options.name);
          }

          this.parent = n;
        },
        onReady: function onReady() {
          var t = this,
              e = n.createSelectorQuery().select("#".concat(this.elId));
          e.fields({
            size: !0
          }, function (n) {
            t.height = n.height;
          }).exec();
        },
        methods: {
          onClick: function onClick() {
            var n = this;

            if (!this.disabled) {
              var t = !!this.parent.accordion && this.parent.accordion;
              !0 !== t && "true" !== t || this.$parent.$children.forEach(function (t) {
                t !== n && (t.isOpen = !1);
              }), this.isOpen = !this.isOpen, this.parent.onChange && this.parent.onChange(this);
            }
          }
        }
      };

      t.default = a;
    }).call(this, e("6e42")["default"]);
  },
  "4aa0": function aa0(n, t, e) {
    "use strict";

    var i = e("f001"),
        a = e.n(i);
    a.a;
  },
  "726b": function b(n, t, e) {
    "use strict";

    e.r(t);
    var i = e("0724"),
        a = e("fb75");

    for (var s in a) {
      "default" !== s && function (n) {
        e.d(t, n, function () {
          return a[n];
        });
      }(s);
    }

    e("4aa0");
    var o = e("2877"),
        r = Object(o["a"])(a["default"], i["a"], i["b"], !1, null, null, null);
    t["default"] = r.exports;
  },
  f001: function f001(n, t, e) {},
  fb75: function fb75(n, t, e) {
    "use strict";

    e.r(t);
    var i = e("32b7"),
        a = e.n(i);

    for (var s in i) {
      "default" !== s && function (n) {
        e.d(t, n, function () {
          return i[n];
        });
      }(s);
    }

    t["default"] = a.a;
  }
}]);
;
(global["webpackJsonp"] = global["webpackJsonp"] || []).push(['components/collapse/uni-collapse-item-create-component', {
  'components/collapse/uni-collapse-item-create-component': function componentsCollapseUniCollapseItemCreateComponent(module, exports, __webpack_require__) {
    __webpack_require__('6e42')['createComponent'](__webpack_require__("726b"));
  }
}, [['components/collapse/uni-collapse-item-create-component']]]);
});
require('components/collapse/uni-collapse-item.js');
__wxRoute = 'components/collapse/uni-collapse';__wxRouteBegin = true;__wxAppCurrentFile__ = 'components/collapse/uni-collapse.js';

define('components/collapse/uni-collapse.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
"use strict";

(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/collapse/uni-collapse"], {
  "1acc": function acc(n, t, e) {},
  "2c64": function c64(n, t, e) {
    "use strict";

    e.r(t);
    var i = e("f56f"),
        c = e.n(i);

    for (var o in i) {
      "default" !== o && function (n) {
        e.d(t, n, function () {
          return i[n];
        });
      }(o);
    }

    t["default"] = c.a;
  },
  "3f8b": function f8b(n, t, e) {
    "use strict";

    var i = e("1acc"),
        c = e.n(i);
    c.a;
  },
  "7d87": function d87(n, t, e) {
    "use strict";

    e.r(t);
    var i = e("be14"),
        c = e("2c64");

    for (var o in c) {
      "default" !== o && function (n) {
        e.d(t, n, function () {
          return c[n];
        });
      }(o);
    }

    e("3f8b");
    var r = e("2877"),
        a = Object(r["a"])(c["default"], i["a"], i["b"], !1, null, null, null);
    t["default"] = a.exports;
  },
  be14: function be14(n, t, e) {
    "use strict";

    var i = function i() {
      var n = this,
          t = n.$createElement;
      n._self._c;
    },
        c = [];

    e.d(t, "a", function () {
      return i;
    }), e.d(t, "b", function () {
      return c;
    });
  },
  f56f: function f56f(n, t, e) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0;
    var i = {
      name: "uni-collapse",
      props: {
        accordion: {
          type: [Boolean, String],
          default: !1
        }
      },
      data: function data() {
        return {};
      },
      mounted: function mounted() {
        var n = this.$children,
            t = [];
        this.getChildren(n, t), this.childrens = t, !0 !== this.accordion && "true" !== this.accordion || t.forEach(function (n, e) {
          t.forEach(function (t, i) {
            e >= i || t.isOpen && (n.isOpen = !1);
          });
        });
      },
      methods: {
        onChange: function onChange(n) {
          var t = [];
          this.childrens.forEach(function (n, e) {
            n.isOpen && t.push(n.nameSync);
          }), this.$emit("change", t);
        },
        getChildren: function getChildren(n, t) {
          for (var e = 0, i = n.length; e < i; e++) {
            var c = n[e].$options.name;
            "uni-collapse-item" !== c ? n[e].$children && this.getChildren(n[e].$children, t) : t.push(n[e]);
          }
        }
      }
    };
    t.default = i;
  }
}]);
;
(global["webpackJsonp"] = global["webpackJsonp"] || []).push(['components/collapse/uni-collapse-create-component', {
  'components/collapse/uni-collapse-create-component': function componentsCollapseUniCollapseCreateComponent(module, exports, __webpack_require__) {
    __webpack_require__('6e42')['createComponent'](__webpack_require__("7d87"));
  }
}, [['components/collapse/uni-collapse-create-component']]]);
});
require('components/collapse/uni-collapse.js');
__wxRoute = 'components/collapse/uni-icon';__wxRouteBegin = true;__wxAppCurrentFile__ = 'components/collapse/uni-icon.js';

define('components/collapse/uni-icon.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
"use strict";

(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/collapse/uni-icon"], {
  "1aa6": function aa6(n, t, e) {
    "use strict";

    var u = function u() {
      var n = this,
          t = n.$createElement;
      n._self._c;
    },
        i = [];

    e.d(t, "a", function () {
      return u;
    }), e.d(t, "b", function () {
      return i;
    });
  },
  3993: function _(n, t, e) {
    "use strict";

    e.r(t);
    var u = e("8d1e"),
        i = e.n(u);

    for (var o in u) {
      "default" !== o && function (n) {
        e.d(t, n, function () {
          return u[n];
        });
      }(o);
    }

    t["default"] = i.a;
  },
  "4b8a": function b8a(n, t, e) {
    "use strict";

    var u = e("f651"),
        i = e.n(u);
    i.a;
  },
  "8d1e": function d1e(n, t, e) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0;
    var u = {
      name: "uni-icon",
      props: {
        type: String,
        color: String,
        size: [Number, String]
      },
      computed: {
        fontSize: function fontSize() {
          return "".concat(this.size, "px");
        }
      },
      methods: {
        onClick: function onClick() {
          this.$emit("click");
        }
      }
    };
    t.default = u;
  },
  "8d79": function d79(n, t, e) {
    "use strict";

    e.r(t);
    var u = e("1aa6"),
        i = e("3993");

    for (var o in i) {
      "default" !== o && function (n) {
        e.d(t, n, function () {
          return i[n];
        });
      }(o);
    }

    e("4b8a");
    var r = e("2877"),
        c = Object(r["a"])(i["default"], u["a"], u["b"], !1, null, null, null);
    t["default"] = c.exports;
  },
  f651: function f651(n, t, e) {}
}]);
;
(global["webpackJsonp"] = global["webpackJsonp"] || []).push(['components/collapse/uni-icon-create-component', {
  'components/collapse/uni-icon-create-component': function componentsCollapseUniIconCreateComponent(module, exports, __webpack_require__) {
    __webpack_require__('6e42')['createComponent'](__webpack_require__("8d79"));
  }
}, [['components/collapse/uni-icon-create-component']]]);
});
require('components/collapse/uni-icon.js');
__wxRoute = 'components/head-tab';__wxRouteBegin = true;__wxAppCurrentFile__ = 'components/head-tab.js';

define('components/head-tab.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
"use strict";

(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/head-tab"], {
  "03c2": function c2(t, n, e) {
    "use strict";

    e.r(n);
    var u = e("49de"),
        a = e.n(u);

    for (var r in u) {
      "default" !== r && function (t) {
        e.d(n, t, function () {
          return u[t];
        });
      }(r);
    }

    n["default"] = a.a;
  },
  "3edb": function edb(t, n, e) {
    "use strict";

    e.r(n);
    var u = e("f9de"),
        a = e("03c2");

    for (var r in a) {
      "default" !== r && function (t) {
        e.d(n, t, function () {
          return a[t];
        });
      }(r);
    }

    e("a756");
    var c = e("2877"),
        i = Object(c["a"])(a["default"], u["a"], u["b"], !1, null, null, null);
    n["default"] = i.exports;
  },
  "49de": function de(t, n, e) {
    "use strict";

    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.default = void 0;
    var u = {
      props: ["title"],
      data: function data() {
        return {};
      },
      methods: {
        goBack: function goBack() {
          this.$emit("goBack");
        }
      },
      created: function created() {
        this.title = this.title;
      }
    };
    n.default = u;
  },
  "9d02": function d02(t, n, e) {},
  a756: function a756(t, n, e) {
    "use strict";

    var u = e("9d02"),
        a = e.n(u);
    a.a;
  },
  f9de: function f9de(t, n, e) {
    "use strict";

    var u = function u() {
      var t = this,
          n = t.$createElement;
      t._self._c;
    },
        a = [];

    e.d(n, "a", function () {
      return u;
    }), e.d(n, "b", function () {
      return a;
    });
  }
}]);
;
(global["webpackJsonp"] = global["webpackJsonp"] || []).push(['components/head-tab-create-component', {
  'components/head-tab-create-component': function componentsHeadTabCreateComponent(module, exports, __webpack_require__) {
    __webpack_require__('6e42')['createComponent'](__webpack_require__("3edb"));
  }
}, [['components/head-tab-create-component']]]);
});
require('components/head-tab.js');
__wxRoute = 'components/jm-address/jm-address';__wxRouteBegin = true;__wxAppCurrentFile__ = 'components/jm-address/jm-address.js';

define('components/jm-address/jm-address.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
"use strict";

(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/jm-address/jm-address"], {
  "0d97": function d97(a, t, e) {
    "use strict";

    e.r(t);
    var d = e("91e8"),
        s = e("36f8");

    for (var c in s) {
      "default" !== c && function (a) {
        e.d(t, a, function () {
          return s[a];
        });
      }(c);
    }

    e("3c66");
    var n = e("2877"),
        r = Object(n["a"])(s["default"], d["a"], d["b"], !1, null, null, null);
    t["default"] = r.exports;
  },
  "36f8": function f8(a, t, e) {
    "use strict";

    e.r(t);
    var d = e("8d07"),
        s = e.n(d);

    for (var c in d) {
      "default" !== c && function (a) {
        e.d(t, a, function () {
          return d[a];
        });
      }(c);
    }

    t["default"] = s.a;
  },
  "39e2": function e2(a, t, e) {},
  "3c66": function c66(a, t, e) {
    "use strict";

    var d = e("39e2"),
        s = e.n(d);
    s.a;
  },
  "8d07": function d07(a, t, e) {
    "use strict";

    (function (a) {
      var e;
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = void 0;
      var d = {
        data: function data() {
          return {
            showFlag: !1,
            addressd1: [],
            addressd2: [],
            addressd3: [],
            co: "65",
            coname: "",
            coObj: {},
            ct: "64",
            ctname: "",
            ctObj: {},
            cs: "575",
            csname: "",
            csObj: {}
          };
        },
        props: {
          addressd: Array
        },
        mounted: function mounted() {
          e = this, this.getadd(1, 0), this.getadd(2, this.co), this.getadd(3, this.ct), this.emitData();
        },
        methods: {
          showAddress: function showAddress() {
            this.showFlag = !0;
          },
          hideAddress: function hideAddress() {
            this.showFlag = null, this.emitData();
          },
          emitData: function emitData() {
            var a = {
              province: e.coname,
              provinceID: e.co,
              city: e.ctname,
              cityID: e.ct,
              district: e.csname,
              districtID: e.cs
            };
            e.$emit("changes", a);
          },
          clickAddress: function clickAddress(a, t, d) {
            switch (a) {
              case 1:
                e.coname = d, e.co = t, e.getadd(2, t);
                break;

              case 2:
                e.ctname = d, e.ct = t, e.getadd(3, t);
                break;

              case 3:
                e.csname = d, e.cs = t, e.emitData(), e.hideAddress();
                break;

              default:
                return;
            }
          },
          getadd: function getadd(t, d) {
            a.request({
              url: this.$store.state.url + "Districts",
              data: {
                parent: d,
                userId: 49,
                owner: 18
              },
              success: function success(a) {
                switch (t) {
                  case 1:
                    e.addressd1 = a.data.data;
                    break;

                  case 2:
                    e.addressd2 = a.data.data, e.ctname = a.data.data[0] ? a.data.data[0].name : "", e.ct = a.data.data[0] ? a.data.data[0].id : 1208, e.getadd(3, e.ct);
                    break;

                  case 3:
                    e.addressd3 = a.data.data, e.csname = a.data.data[0] ? a.data.data[0].name : "", e.cs = a.data.data[0] ? a.data.data[0].id : 1220;
                    break;

                  default:
                    return;
                }
              }
            });
          }
        }
      };
      t.default = d;
    }).call(this, e("6e42")["default"]);
  },
  "91e8": function e8(a, t, e) {
    "use strict";

    var d = function d() {
      var a = this,
          t = a.$createElement;
      a._self._c;
    },
        s = [];

    e.d(t, "a", function () {
      return d;
    }), e.d(t, "b", function () {
      return s;
    });
  }
}]);
;
(global["webpackJsonp"] = global["webpackJsonp"] || []).push(['components/jm-address/jm-address-create-component', {
  'components/jm-address/jm-address-create-component': function componentsJmAddressJmAddressCreateComponent(module, exports, __webpack_require__) {
    __webpack_require__('6e42')['createComponent'](__webpack_require__("0d97"));
  }
}, [['components/jm-address/jm-address-create-component']]]);
});
require('components/jm-address/jm-address.js');
__wxRoute = 'components/NAUI-card/NAUI-card';__wxRouteBegin = true;__wxAppCurrentFile__ = 'components/NAUI-card/NAUI-card.js';

define('components/NAUI-card/NAUI-card.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
"use strict";

(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/NAUI-card/NAUI-card"], {
  2864: function _(t, e, n) {
    "use strict";

    n.r(e);
    var a = n("45fb"),
        r = n.n(a);

    for (var c in a) {
      "default" !== c && function (t) {
        n.d(e, t, function () {
          return a[t];
        });
      }(c);
    }

    e["default"] = r.a;
  },
  "2fb7": function fb7(t, e, n) {},
  "45fb": function fb(t, e, n) {
    "use strict";

    (function (t) {
      Object.defineProperty(e, "__esModule", {
        value: !0
      }), e.default = void 0;
      var n = {
        name: "NAUI-card",
        props: {
          listData: {
            type: Object
          }
        },
        created: function created(t) {
          this.listData.creat_time = this.dateTimeFormatter(1e3 * parseInt(this.listData.creat_time));
        },
        methods: {
          previewimg: function previewimg(e) {
            t.previewImage({
              urls: e,
              indicator: "number",
              loop: !0
            });
          },
          dateTimeFormatter: function dateTimeFormatter(t) {
            t = new Date(t).getTime(), t = new Date(t);
            var e = t.getFullYear(),
                n = t.getMonth() + 1;
            n = this.checkAddZone(n);
            var a = t.getDate();
            a = this.checkAddZone(a);
            var r = t.getHours();
            r = this.checkAddZone(r);
            var c = t.getMinutes();
            c = this.checkAddZone(c);
            var i = t.getSeconds();
            return i = this.checkAddZone(i), e + "-" + n + "-" + a + " " + r + ":" + c + ":" + i;
          },
          checkAddZone: function checkAddZone(t) {
            return t < 10 ? "0" + t.toString() : t;
          }
        }
      };
      e.default = n;
    }).call(this, n("6e42")["default"]);
  },
  "5dab": function dab(t, e, n) {
    "use strict";

    var a = function a() {
      var t = this,
          e = t.$createElement;
      t._self._c;
    },
        r = [];

    n.d(e, "a", function () {
      return a;
    }), n.d(e, "b", function () {
      return r;
    });
  },
  6196: function _(t, e, n) {
    "use strict";

    var a = n("2fb7"),
        r = n.n(a);
    r.a;
  },
  c54a: function c54a(t, e, n) {
    "use strict";

    n.r(e);
    var a = n("5dab"),
        r = n("2864");

    for (var c in r) {
      "default" !== c && function (t) {
        n.d(e, t, function () {
          return r[t];
        });
      }(c);
    }

    n("6196");
    var i = n("2877"),
        u = Object(i["a"])(r["default"], a["a"], a["b"], !1, null, null, null);
    e["default"] = u.exports;
  }
}]);
;
(global["webpackJsonp"] = global["webpackJsonp"] || []).push(['components/NAUI-card/NAUI-card-create-component', {
  'components/NAUI-card/NAUI-card-create-component': function componentsNAUICardNAUICardCreateComponent(module, exports, __webpack_require__) {
    __webpack_require__('6e42')['createComponent'](__webpack_require__("c54a"));
  }
}, [['components/NAUI-card/NAUI-card-create-component']]]);
});
require('components/NAUI-card/NAUI-card.js');
__wxRoute = 'components/popmodal';__wxRouteBegin = true;__wxAppCurrentFile__ = 'components/popmodal.js';

define('components/popmodal.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
"use strict";

(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/popmodal"], {
  2685: function _(n, t, e) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0;
    var u = {
      props: {
        isShow: {
          type: [Boolean, String],
          default: !1
        }
      },
      name: "pop-modal",
      data: function data() {
        return {};
      }
    };
    t.default = u;
  },
  "92f5": function f5(n, t, e) {
    "use strict";

    var u = function u() {
      var n = this,
          t = n.$createElement;
      n._self._c;
    },
        a = [];

    e.d(t, "a", function () {
      return u;
    }), e.d(t, "b", function () {
      return a;
    });
  },
  "9d67": function d67(n, t, e) {
    "use strict";

    e.r(t);
    var u = e("2685"),
        a = e.n(u);

    for (var o in u) {
      "default" !== o && function (n) {
        e.d(t, n, function () {
          return u[n];
        });
      }(o);
    }

    t["default"] = a.a;
  },
  e269: function e269(n, t, e) {
    "use strict";

    e.r(t);
    var u = e("92f5"),
        a = e("9d67");

    for (var o in a) {
      "default" !== o && function (n) {
        e.d(t, n, function () {
          return a[n];
        });
      }(o);
    }

    var r = e("2877"),
        f = Object(r["a"])(a["default"], u["a"], u["b"], !1, null, null, null);
    t["default"] = f.exports;
  }
}]);
;
(global["webpackJsonp"] = global["webpackJsonp"] || []).push(['components/popmodal-create-component', {
  'components/popmodal-create-component': function componentsPopmodalCreateComponent(module, exports, __webpack_require__) {
    __webpack_require__('6e42')['createComponent'](__webpack_require__("e269"));
  }
}, [['components/popmodal-create-component']]]);
});
require('components/popmodal.js');
__wxRoute = 'components/start/App';__wxRouteBegin = true;__wxAppCurrentFile__ = 'components/start/App.js';

define('components/start/App.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
"use strict";

(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/start/App"], {
  "2d5d": function d5d(n, t, o) {
    "use strict";

    Object.defineProperty(t, "__esModule", {
      value: !0
    }), t.default = void 0;
    var e = {
      onLaunch: function onLaunch() {
        console.log("App Launch", " at components\\start\\App.vue:4");
      },
      onShow: function onShow() {
        console.log("App Show", " at components\\start\\App.vue:7");
      },
      onHide: function onHide() {
        console.log("App Hide", " at components\\start\\App.vue:10");
      }
    };
    t.default = e;
  },
  "63ad": function ad(n, t, o) {},
  6982: function _(n, t, o) {
    "use strict";

    o.r(t);
    var e = o("2d5d"),
        u = o.n(e);

    for (var a in e) {
      "default" !== a && function (n) {
        o.d(t, n, function () {
          return e[n];
        });
      }(a);
    }

    t["default"] = u.a;
  },
  f268: function f268(n, t, o) {
    "use strict";

    var e = o("63ad"),
        u = o.n(e);
    u.a;
  },
  f971: function f971(n, t, o) {
    "use strict";

    o.r(t);
    var e = o("6982");

    for (var u in e) {
      "default" !== u && function (n) {
        o.d(t, n, function () {
          return e[n];
        });
      }(u);
    }

    o("f268");
    var a,
        c,
        r = o("2877"),
        f = Object(r["a"])(e["default"], a, c, !1, null, null, null);
    t["default"] = f.exports;
  }
}]);
;
(global["webpackJsonp"] = global["webpackJsonp"] || []).push(['components/start/App-create-component', {
  'components/start/App-create-component': function componentsStartAppCreateComponent(module, exports, __webpack_require__) {
    __webpack_require__('6e42')['createComponent'](__webpack_require__("f971"));
  }
}, [['components/start/App-create-component']]]);
});
require('components/start/App.js');
__wxRoute = 'components/uni-grid/uni-grid';__wxRouteBegin = true;__wxAppCurrentFile__ = 'components/uni-grid/uni-grid.js';

define('components/uni-grid/uni-grid.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
"use strict";

(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/uni-grid/uni-grid"], {
  3642: function _(t, n, u) {
    "use strict";

    Object.defineProperty(n, "__esModule", {
      value: !0
    }), n.default = void 0;
    var e = {
      name: "uni-grid",
      props: {
        options: Array,
        type: {
          type: String,
          default: "square"
        },
        columnNum: {
          type: [Number, String],
          default: 3
        },
        showOutBorder: {
          type: [Boolean, String],
          default: !0
        },
        showBorder: {
          type: [Boolean, String],
          default: !0
        }
      },
      data: function data() {
        return {};
      },
      created: function created() {
        this.columnNumber = this.gridGroup[0] ? this.gridGroup[0].length : "";
      },
      computed: {
        gridGroup: function gridGroup() {
          var t = this,
              n = [],
              u = [];

          if (this.options && this.options.forEach(function (e, r) {
            u.push(e), r % t.columnNum === t.columnNum - 1 && (n.push(u), u = []);
          }), u.length > 0) {
            if (this.columnNum > u.length) for (var e = 0, r = u.length; e < this.columnNum - r; e++) {
              u.push({
                seize: !0
              });
            }
            n.push(u);
          }

          return u = null, n;
        }
      },
      methods: {
        onClick: function onClick(t, n) {
          this.$emit("click", {
            index: t * this.columnNumber + n
          });
        }
      }
    };
    n.default = e;
  },
  9262: function _(t, n, u) {
    "use strict";

    var e = u("a702"),
        r = u.n(e);
    r.a;
  },
  9704: function _(t, n, u) {
    "use strict";

    u.r(n);
    var e = u("9af2"),
        r = u("fe37");

    for (var i in r) {
      "default" !== i && function (t) {
        u.d(n, t, function () {
          return r[t];
        });
      }(i);
    }

    u("9262");
    var o = u("2877"),
        a = Object(o["a"])(r["default"], e["a"], e["b"], !1, null, null, null);
    n["default"] = a.exports;
  },
  "9af2": function af2(t, n, u) {
    "use strict";

    var e = function e() {
      var t = this,
          n = t.$createElement;
      t._self._c;
    },
        r = [];

    u.d(n, "a", function () {
      return e;
    }), u.d(n, "b", function () {
      return r;
    });
  },
  a702: function a702(t, n, u) {},
  fe37: function fe37(t, n, u) {
    "use strict";

    u.r(n);
    var e = u("3642"),
        r = u.n(e);

    for (var i in e) {
      "default" !== i && function (t) {
        u.d(n, t, function () {
          return e[t];
        });
      }(i);
    }

    n["default"] = r.a;
  }
}]);
;
(global["webpackJsonp"] = global["webpackJsonp"] || []).push(['components/uni-grid/uni-grid-create-component', {
  'components/uni-grid/uni-grid-create-component': function componentsUniGridUniGridCreateComponent(module, exports, __webpack_require__) {
    __webpack_require__('6e42')['createComponent'](__webpack_require__("9704"));
  }
}, [['components/uni-grid/uni-grid-create-component']]]);
});
require('components/uni-grid/uni-grid.js');
__wxRoute = 'components/uni/mx-datepicker/mx-datepicker';__wxRouteBegin = true;__wxAppCurrentFile__ = 'components/uni/mx-datepicker/mx-datepicker.js';

define('components/uni/mx-datepicker/mx-datepicker.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
"use strict";

(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/uni/mx-datepicker/mx-datepicker"], {
  "00e5": function e5(e, t, i) {
    "use strict";

    i.r(t);
    var n = i("5c9b"),
        s = i.n(n);

    for (var a in n) {
      "default" !== a && function (e) {
        i.d(t, e, function () {
          return n[e];
        });
      }(a);
    }

    t["default"] = s.a;
  },
  "08f9": function f9(e, t, i) {
    "use strict";

    var n = i("1787"),
        s = i.n(n);
    s.a;
  },
  1787: function _(e, t, i) {},
  "51fd": function fd(e, t, i) {
    "use strict";

    i.r(t);
    var n = i("59b1"),
        s = i("00e5");

    for (var a in s) {
      "default" !== a && function (e) {
        i.d(t, e, function () {
          return s[e];
        });
      }(a);
    }

    i("08f9");
    var r = i("2877"),
        o = Object(r["a"])(s["default"], n["a"], n["b"], !1, null, "67ced56c", null);
    t["default"] = o.exports;
  },
  "59b1": function b1(e, t, i) {
    "use strict";

    var n = function n() {
      var e = this,
          t = e.$createElement;
      e._self._c;
    },
        s = [];

    i.d(t, "a", function () {
      return n;
    }), i.d(t, "b", function () {
      return s;
    });
  },
  "5c9b": function c9b(e, t, i) {
    "use strict";

    (function (e) {
      function i(e) {
        return a(e) || s(e) || n();
      }

      function n() {
        throw new TypeError("Invalid attempt to spread non-iterable instance");
      }

      function s(e) {
        if (Symbol.iterator in Object(e) || "[object Arguments]" === Object.prototype.toString.call(e)) return Array.from(e);
      }

      function a(e) {
        if (Array.isArray(e)) {
          for (var t = 0, i = new Array(e.length); t < e.length; t++) {
            i[t] = e[t];
          }

          return i;
        }
      }

      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.default = void 0;
      var r = {
        getHoliday: function getHoliday(e) {
          var t = {
            "0101": "元旦",
            "0214": "情人",
            "0308": "妇女",
            "0312": "植树",
            "0401": "愚人",
            "0501": "劳动",
            "0504": "青年",
            "0601": "儿童",
            "0701": "建党",
            "0801": "建军",
            "0903": "抗日",
            "0910": "教师",
            1001: "国庆",
            1031: "万圣",
            1224: "平安",
            1225: "圣诞"
          },
              i = this.format(e, "mmdd");
          return !!t[i] && t[i];
        },
        parse: function parse(e) {
          return new Date(e.replace(/(年|月|-)/g, "/").replace(/(日)/g, ""));
        },
        isSameDay: function isSameDay(e, t) {
          return e.getMonth() == t.getMonth() && e.getFullYear() == t.getFullYear() && e.getDate() == t.getDate();
        },
        format: function format(e, t) {
          var i = {
            "m+": e.getMonth() + 1,
            "d+": e.getDate(),
            "h+": e.getHours(),
            "i+": e.getMinutes(),
            "s+": e.getSeconds(),
            "q+": Math.floor((e.getMonth() + 3) / 3)
          };

          for (var n in /(y+)/.test(t) && (t = t.replace(RegExp.$1, (e.getFullYear() + "").substr(4 - RegExp.$1.length))), i) {
            new RegExp("(" + n + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[n] : ("00" + i[n]).substr(("" + i[n]).length)));
          }

          return t;
        },
        inverse: function inverse(e, t) {
          var i = {
            y: "",
            m: "",
            d: "",
            h: "",
            i: "",
            s: ""
          },
              n = new Date();
          if (e.length != t.length) return n;

          for (var s in t) {
            void 0 != i[t[s]] && (i[t[s]] += e[s]);
          }

          return i.y && n.setFullYear(i.y.length < 4 ? (n.getFullYear() + "").substr(0, 4 - i.y.length) + i.y : i.y), i.m && n.setMonth(i.m - 1, 1), i.d && n.setDate(i.d - 0), i.h && n.setHours(i.h - 0), i.i && n.setMinutes(i.i - 0), i.s && n.setSeconds(i.s - 0), n;
        },
        getCalendar: function getCalendar(e, t) {
          var i = new Date(e),
              n = [];
          i.setDate(1), i.setDate(i.getDate() - ((0 == i.getDay() ? 7 : i.getDay()) - 1));

          for (var s = 0; s < 42; s++) {
            var a = {
              dateObj: new Date(i),
              title: i.getDate(),
              isOtherMonth: i.getMonth() < e.getMonth() || i.getMonth() > e.getMonth()
            };
            n.push(Object.assign(a, t ? t(a) : {})), i.setDate(i.getDate() + 1);
          }

          return n;
        },
        getDateToMonth: function getDateToMonth(e, t) {
          var i = new Date(e);
          return i.setMonth(t, 1), i;
        },
        formatTimeArray: function formatTimeArray(e, t) {
          var n = i(e);
          return t || (n.length = 2), n.forEach(function (e, t) {
            return n[t] = ("0" + e).slice(-2);
          }), n.join(":");
        }
      },
          o = {
        props: {
          color: {
            type: String,
            default: "#409eff"
          },
          showSeconds: {
            type: Boolean,
            default: !1
          },
          value: [String, Array],
          type: {
            type: String,
            default: "range"
          },
          show: {
            type: Boolean,
            default: !1
          },
          format: {
            type: String,
            default: ""
          },
          showHoliday: {
            type: Boolean,
            default: !0
          },
          showTips: {
            type: Boolean,
            default: !1
          },
          beginText: {
            type: String,
            default: "开始"
          },
          endText: {
            type: String,
            default: "结束"
          }
        },
        data: function data() {
          return {
            isShow: !1,
            isMultiSelect: !1,
            isContainTime: !1,
            date: {},
            weeks: ["一", "二", "三", "四", "五", "六", "日"],
            title: "初始化",
            calendars: [[], [], []],
            calendarIndex: 1,
            checkeds: [],
            showTimePicker: !1,
            timeValue: [0, 0, 0],
            timeType: "begin",
            beginTime: [0, 0, 0],
            endTime: [0, 0, 0]
          };
        },
        methods: {
          setValue: function setValue(e) {
            var t = this;
            this.date = new Date(), this.checkeds = [], this.isMultiSelect = this.type.indexOf("range") >= 0, this.isContainTime = this.type.indexOf("time") >= 0;

            var n = function n(e) {
              return t.format ? r.inverse(e, t.format) : r.parse(e);
            };

            if (e) {
              if (this.isMultiSelect) Array.isArray(e) && e.forEach(function (e, i) {
                var s = n(e),
                    a = [s.getHours(), s.getMinutes(), s.getSeconds()];
                0 == i ? t.beginTime = a : t.endTime = a, t.checkeds.push(s);
              });else if ("time" == this.type) {
                var s = n("2019/1/1 " + e);
                this.beginTime = [s.getHours(), s.getMinutes(), s.getSeconds()], this.onShowTimePicker("begin");
              } else this.checkeds.push(n(e)), this.isContainTime && (this.beginTime = [this.checkeds[0].getHours(), this.checkeds[0].getMinutes(), this.checkeds[0].getSeconds()]);
              this.checkeds.length && (this.date = new Date(this.checkeds[0]));
            } else this.isContainTime && (this.beginTime = [this.date.getHours(), this.date.getMinutes(), this.date.getSeconds()], this.isMultiSelect && (this.endTime = i(this.beginTime))), this.checkeds.push(new Date(this.date));

            "time" != this.type ? this.refreshCalendars(!0) : this.onShowTimePicker("begin");
          },
          onSetYear: function onSetYear(e) {
            this.date.setFullYear(this.date.getFullYear() + parseInt(e)), this.refreshCalendars(!0);
          },
          onSetMonth: function onSetMonth(e) {
            this.date.setMonth(this.date.getMonth() + parseInt(e)), this.refreshCalendars(!0);
          },
          onTimeChange: function onTimeChange(e) {
            this.timeValue = e.detail.value;
          },
          onShowTimePicker: function onShowTimePicker(e) {
            this.showTimePicker = !0, this.timeType = e, this.timeValue = i("begin" == e ? this.beginTime : this.endTime);
          },
          procCalendar: function procCalendar(e) {
            var t = this;

            if (e.statusStyle = {
              opacity: 1,
              color: e.isOtherMonth ? "#ddd" : "#000",
              background: "transparent"
            }, e.bgStyle = {
              type: "",
              background: "transparent"
            }, e.dotStyle = {
              opacity: 1,
              background: "transparent"
            }, e.tips = "", r.isSameDay(new Date(), e.dateObj) && (e.statusStyle.color = this.color, e.isOtherMonth && (e.statusStyle.opacity = .3)), this.checkeds.forEach(function (i) {
              r.isSameDay(i, e.dateObj) && (e.statusStyle.background = t.color, e.statusStyle.color = "#fff", e.statusStyle.opacity = 1, t.isMultiSelect && t.showTips && (e.tips = t.beginText));
            }), e.statusStyle.background != this.color) {
              var i = !!this.showHoliday && r.getHoliday(e.dateObj);
              (i || r.isSameDay(new Date(), e.dateObj)) && (e.title = i || e.title, e.dotStyle.background = this.color, e.isOtherMonth && (e.dotStyle.opacity = .2));
            } else e.title = e.dateObj.getDate();

            2 == this.checkeds.length && (r.isSameDay(this.checkeds[0], e.dateObj) && (e.bgStyle.type = "bgbegin"), r.isSameDay(this.checkeds[1], e.dateObj) && (this.isMultiSelect && this.showTips && (e.tips = e.bgStyle.type ? this.beginText + " / " + this.endText : this.endText), e.bgStyle.type ? e.bgStyle.type = "" : e.bgStyle.type = "bgend"), !e.bgStyle.type && +e.dateObj > +this.checkeds[0] && +e.dateObj < +this.checkeds[1] && (e.bgStyle.type = "bg", e.statusStyle.color = this.color), e.bgStyle.type && (e.bgStyle.background = this.color, e.dotStyle.opacity = 1, e.statusStyle.opacity = 1));
          },
          refreshCalendars: function refreshCalendars() {
            var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0],
                t = new Date(this.date),
                i = r.getDateToMonth(t, t.getMonth() - 1),
                n = r.getDateToMonth(t, t.getMonth() + 1);
            0 == this.calendarIndex ? (e && this.calendars.splice(0, 1, r.getCalendar(t, this.procCalendar)), this.calendars.splice(1, 1, r.getCalendar(n, this.procCalendar)), this.calendars.splice(2, 1, r.getCalendar(i, this.procCalendar))) : 1 == this.calendarIndex ? (this.calendars.splice(0, 1, r.getCalendar(i, this.procCalendar)), e && this.calendars.splice(1, 1, r.getCalendar(t, this.procCalendar)), this.calendars.splice(2, 1, r.getCalendar(n, this.procCalendar))) : 2 == this.calendarIndex && (this.calendars.splice(0, 1, r.getCalendar(n, this.procCalendar)), this.calendars.splice(1, 1, r.getCalendar(i, this.procCalendar)), e && this.calendars.splice(2, 1, r.getCalendar(t, this.procCalendar))), this.title = r.format(this.date, "yyyy年mm月");
          },
          onSwiperChange: function onSwiperChange(e) {
            this.calendarIndex = e.detail.current;
            var t = this.calendars[this.calendarIndex];
            this.date = new Date(t[22].dateObj), this.refreshCalendars();
          },
          onSelectDate: function onSelectDate(e) {
            var t = this;
            ~this.type.indexOf("range") && 2 == this.checkeds.length ? this.checkeds = [] : !~this.type.indexOf("range") && this.checkeds.length && (this.checkeds = []), this.checkeds.push(new Date(e.dateObj)), this.checkeds.sort(function (e, t) {
              return e - t;
            }), this.calendars.forEach(function (e) {
              e.forEach(t.procCalendar);
            });
          },
          onCancelTime: function onCancelTime() {
            this.showTimePicker = !1, "time" == this.type && this.onCancel();
          },
          onConfirmTime: function onConfirmTime() {
            "begin" == this.timeType ? this.beginTime = this.timeValue : this.endTime = this.timeValue, this.showTimePicker = !1, "time" == this.type && this.onConfirm();
          },
          onCancel: function onCancel() {
            this.$emit("cancel", !1);
          },
          onConfirm: function onConfirm() {
            var t = this,
                i = {
              value: null,
              date: null
            },
                n = {
              date: "yyyy/mm/dd",
              time: "hh:ii" + (this.showSeconds ? ":ss" : ""),
              datetime: ""
            };
            n["datetime"] = n.date + " " + n.time;

            var s = function s(e, i) {
              e.setHours(i[0], i[1]), t.showSeconds && e.setSeconds(i[2]);
            };

            if ("time" == this.type) {
              var a = new Date();
              s(a, this.beginTime), i.value = r.format(a, this.format ? this.format : n.time), i.date = a;
            } else if (this.isMultiSelect) {
              var o = [],
                  h = [];
              if (this.checkeds.length < 2) return e.showToast({
                icon: "none",
                title: "请选择两个日期"
              });
              this.checkeds.forEach(function (e, i) {
                var a = new Date(e);

                if (t.isContainTime) {
                  var c = [t.beginTime, t.endTime];
                  s(a, c[i]);
                }

                o.push(r.format(a, t.format ? t.format : n[t.isContainTime ? "datetime" : "date"])), h.push(a);
              }), i.value = o, i.date = h;
            } else {
              var c = new Date(this.checkeds[0]);
              this.isContainTime && (c.setHours(this.beginTime[0], this.beginTime[1]), this.showSeconds && c.setSeconds(this.beginTime[2])), i.value = r.format(c, this.format ? this.format : n[this.isContainTime ? "datetime" : "date"]), i.date = c;
            }

            this.$emit("confirm", i);
          }
        },
        computed: {
          BeginTitle: function BeginTitle() {
            var e = "未选择";
            return this.checkeds.length && (e = r.format(this.checkeds[0], "yy-mm-dd")), e;
          },
          EndTitle: function EndTitle() {
            var e = "未选择";
            return 2 == this.checkeds.length && (e = r.format(this.checkeds[1], "yy-mm-dd")), e;
          },
          PickerTimeTitle: function PickerTimeTitle() {
            return r.formatTimeArray(this.timeValue, this.showSeconds);
          },
          BeginTimeTitle: function BeginTimeTitle() {
            return "未选择" != this.BeginTitle ? r.formatTimeArray(this.beginTime, this.showSeconds) : "";
          },
          EndTimeTitle: function EndTimeTitle() {
            return "未选择" != this.EndTitle ? r.formatTimeArray(this.endTime, this.showSeconds) : "";
          }
        },
        watch: {
          show: function show(e, t) {
            e && this.setValue(this.value), this.isShow = e;
          },
          value: function value(e, t) {
            var i = this;
            setTimeout(function () {
              i.setValue(e);
            }, 0);
          }
        }
      };
      t.default = o;
    }).call(this, i("6e42")["default"]);
  }
}]);
;
(global["webpackJsonp"] = global["webpackJsonp"] || []).push(['components/uni/mx-datepicker/mx-datepicker-create-component', {
  'components/uni/mx-datepicker/mx-datepicker-create-component': function componentsUniMxDatepickerMxDatepickerCreateComponent(module, exports, __webpack_require__) {
    __webpack_require__('6e42')['createComponent'](__webpack_require__("51fd"));
  }
}, [['components/uni/mx-datepicker/mx-datepicker-create-component']]]);
});
require('components/uni/mx-datepicker/mx-datepicker.js');
__wxRoute = 'components/uni/uni-tag/uni-tag';__wxRouteBegin = true;__wxAppCurrentFile__ = 'components/uni/uni-tag/uni-tag.js';

define('components/uni/uni-tag/uni-tag.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
"use strict";

(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/uni/uni-tag/uni-tag"], {
  "2f43": function f43(t, e, n) {
    "use strict";

    n.r(e);
    var u = n("6e81"),
        i = n("8262");

    for (var a in i) {
      "default" !== a && function (t) {
        n.d(e, t, function () {
          return i[t];
        });
      }(a);
    }

    n("8c4e");
    var r = n("2877"),
        l = Object(r["a"])(i["default"], u["a"], u["b"], !1, null, null, null);
    e["default"] = l.exports;
  },
  "4fc7": function fc7(t, e, n) {},
  "6e81": function e81(t, e, n) {
    "use strict";

    var u = function u() {
      var t = this,
          e = t.$createElement;
      t._self._c;
    },
        i = [];

    n.d(e, "a", function () {
      return u;
    }), n.d(e, "b", function () {
      return i;
    });
  },
  8262: function _(t, e, n) {
    "use strict";

    n.r(e);
    var u = n("8e93"),
        i = n.n(u);

    for (var a in u) {
      "default" !== a && function (t) {
        n.d(e, t, function () {
          return u[t];
        });
      }(a);
    }

    e["default"] = i.a;
  },
  "8c4e": function c4e(t, e, n) {
    "use strict";

    var u = n("4fc7"),
        i = n.n(u);
    i.a;
  },
  "8e93": function e93(t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: !0
    }), e.default = void 0;
    var u = {
      name: "uni-tag",
      props: {
        type: {
          type: String,
          default: "default"
        },
        size: {
          type: String,
          default: "normal"
        },
        text: String,
        disabled: {
          type: [String, Boolean],
          defalut: !1
        },
        inverted: {
          type: [String, Boolean],
          defalut: !1
        },
        circle: {
          type: [String, Boolean],
          defalut: !1
        }
      },
      methods: {
        onClick: function onClick() {
          !0 !== this.disabled && "true" !== this.disabled && this.$emit("click");
        }
      }
    };
    e.default = u;
  }
}]);
;
(global["webpackJsonp"] = global["webpackJsonp"] || []).push(['components/uni/uni-tag/uni-tag-create-component', {
  'components/uni/uni-tag/uni-tag-create-component': function componentsUniUniTagUniTagCreateComponent(module, exports, __webpack_require__) {
    __webpack_require__('6e42')['createComponent'](__webpack_require__("2f43"));
  }
}, [['components/uni/uni-tag/uni-tag-create-component']]]);
});
require('components/uni/uni-tag/uni-tag.js');

__wxRoute = 'pages/login-design/login/login';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/login-design/login/login.js';

define('pages/login-design/login/login.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login-design/login/login"],{"09f2":function(n,t,o){},"0ddc":function(n,t,o){"use strict";var e=function(){var n=this,t=n.$createElement;n._self._c},i=[];o.d(t,"a",function(){return e}),o.d(t,"b",function(){return i})},"1bee":function(n,t,o){"use strict";o.r(t);var e=o("0ddc"),i=o("52bc");for(var s in i)"default"!==s&&function(n){o.d(t,n,function(){return i[n]})}(s);o("cb20");var a=o("2877"),u=Object(a["a"])(i["default"],e["a"],e["b"],!1,null,null,null);t["default"]=u.exports},"52bc":function(n,t,o){"use strict";o.r(t);var e=o("8271"),i=o.n(e);for(var s in e)"default"!==s&&function(n){o.d(t,n,function(){return e[n]})}(s);t["default"]=i.a},8271:function(n,t,o){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e=function(){return o.e("components/popmodal").then(o.bind(null,"e269"))},i={data:function(){return{designer:{account:"",token:""},isShow:!1,isShowPwd:!0}},components:{popModal:e},onLoad:function(n){n&&(this.designer.account=n.account,this.designer.token=n.token,this.isShow=!0)},methods:{noShowPwd:function(){this.isShowPwd=!0},showPwd:function(){this.isShowPwd=!1},inputAccount:function(n){this.isShow=!0},inputPwd:function(n){this.isShow=!0},toDesign:function(){n.navigateTo({url:"../design/design"})},toFindPassword:function(){n.navigateTo({url:"../find-password/find-password"})},loginEvent:function(){var t=this;n.request({url:this.$store.state.url+"Login",data:{user:this.designer.account,token:this.designer.token},success:function(o){-1==o.data.code?n.showToast({title:"账号或者密码错误",mask:!1,icon:"none",duration:1500}):4!=o.data.data.type?n.showToast({title:"您的账号无法在“门店助手”登录",mask:!1,icon:"none",duration:1500}):(t.$store.commit("setUserInfo",o.data.data),n.setStorage({key:"userInfo",data:o.data.data,success:function(t){n.showToast({title:"登录成功",icon:"none"}),setTimeout(function(){n.switchTab({url:"../../tab-item/index/index"})},500)}}))}})}}};t.default=i}).call(this,o("6e42")["default"])},cb20:function(n,t,o){"use strict";var e=o("09f2"),i=o.n(e);i.a}},[["23ae","common/runtime","common/vendor"]]]);
});
require('pages/login-design/login/login.js');
__wxRoute = 'pages/tab-item-content/shop-center/search-more-shop/search-more-shop';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/shop-center/search-more-shop/search-more-shop.js';

define('pages/tab-item-content/shop-center/search-more-shop/search-more-shop.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/shop-center/search-more-shop/search-more-shop"],{"0c0e":function(t,n,o){"use strict";o.r(n);var e=o("846c"),s=o.n(e);for(var a in e)"default"!==a&&function(t){o.d(n,t,function(){return e[t]})}(a);n["default"]=s.a},3408:function(t,n,o){"use strict";var e=o("66fb"),s=o.n(e);s.a},"66fb":function(t,n,o){},7482:function(t,n,o){"use strict";var e=function(){var t=this,n=t.$createElement,o=(t._self._c,t.shopList.map(function(n,o){var e=t._f("shopStatus")(n.status);return{$orig:t.__get_orig(n),f0:e}}));t.$mp.data=Object.assign({},{$root:{l0:o}})},s=[];o.d(n,"a",function(){return e}),o.d(n,"b",function(){return s})},"846c":function(t,n,o){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{brandList:[],shopList:[],tabIndex:-1,shopIndex:-1,shopStatus:this.$store.state.shopStatusZn}},components:{},methods:{chooseShop:function(t,n){this.shopIndex=t.id,console.log(t," at pages\\tab-item-content\\shop-center\\search-more-shop\\search-more-shop.vue:57")},showShopList:function(t,n){var o=this;this.tabIndex=n,this.$ajax("ProprietorShops",{brand:t.id,offset:0,zone:-1},function(t){t.forEach(function(t){t.isChecked=!1}),o.shopList=t})},getBrandList:function(){var t=this;this.$ajax("Constants",{type:this.$store.state.constants.brand_type,parent:0,objects:1},function(n){t.brandList=n})}},onLoad:function(){this.getBrandList()}};n.default=e},af53:function(t,n,o){"use strict";o.r(n);var e=o("7482"),s=o("0c0e");for(var a in s)"default"!==a&&function(t){o.d(n,t,function(){return s[t]})}(a);o("3408");var r=o("2877"),i=Object(r["a"])(s["default"],e["a"],e["b"],!1,null,null,null);n["default"]=i.exports}},[["22bd","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/shop-center/search-more-shop/search-more-shop.js');
__wxRoute = 'pages/tab-item/mine/mine';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item/mine/mine.js';

define('pages/tab-item/mine/mine.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item/mine/mine"],{4475:function(t,e,n){},"580c":function(t,e,n){"use strict";n.r(e);var i=n("bcf0"),a=n("b2ca");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);n("6730");var s=n("2877"),c=Object(s["a"])(a["default"],i["a"],i["b"],!1,null,null,null);e["default"]=c.exports},6730:function(t,e,n){"use strict";var i=n("4475"),a=n.n(i);a.a},b2ca:function(t,e,n){"use strict";n.r(e);var i=n("fe4b"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);e["default"]=a.a},bcf0:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},fe4b:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){return n.e("components/popmodal").then(n.bind(null,"e269"))},a={data:function(){return{isQuit:!1,avatar:"",userInfo:"",operateList:[{image:"../../../static/img/mine/icon-shezhi@2x.png",index:0,text:"基本设置"},{image:"../../../static/img/mine/icon-xiugaimima@2x.png",index:1,text:"修改密码"},{image:"../../../static/img/mine/icon-fankui@2x.png",index:2,text:"意见反馈"},{image:"../../../static/img/mine/tuichu.png",index:3,text:"退出登录"}]}},components:{popModal:i},methods:{hideModal:function(e){this.isQuit=!1,console.log("11111"," at pages\\tab-item\\mine\\mine.vue:105"),"agree"==e&&(t.clearStorage(),setTimeout(function(){t.navigateTo({url:"../../login-design/login/login"})},500))},showWorkClick:function(){t.navigateTo({url:"../work/work"})},showMessageClick:function(){t.navigateTo({url:"../message/message"})},showIndexClick:function(){t.navigateTo({url:"../index/index"})},getUserInfo:function(){var e=this;t.getStorage({key:"userInfo",success:function(t){e.userInfo=t.data}})},operateItem:function(e){switch(e){case 0:t.navigateTo({url:"../../tab-item-content/mine-center/basic-setting/basic-setting"});break;case 1:t.navigateTo({url:"../../tab-item-content/mine-center/edit-password/edit-password"});break;case 2:t.navigateTo({url:"../../tab-item-content/mine-center/suggestion-list/suggestion-list"});break;case 3:this.isQuit=!0}},getAvater:function(e){var n=this;this.$ajax("File",{id:e},function(e){n.avatar=e,t.setStorage({key:"logo",data:n.avatar})})}},onLoad:function(){var e=this;this.getUserInfo(),t.getStorage({key:"logo",success:function(t){e.avatar=t.data,console.log(e.avatar," at pages\\tab-item\\mine\\mine.vue:189")}}),this.$fire.on("image",function(t){t&&e.getAvater(t)})}};e.default=a}).call(this,n("6e42")["default"])}},[["a1b7","common/runtime","common/vendor"]]]);
});
require('pages/tab-item/mine/mine.js');
__wxRoute = 'pages/tab-item-content/work-center/express-center/express-index/express-index';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/work-center/express-center/express-index/express-index.js';

define('pages/tab-item-content/work-center/express-center/express-index/express-index.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/work-center/express-center/express-index/express-index"],{"016b":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{radio:"radio1",TabCur:0,scrollLeft:0,showExpress:!1,chose:-1,tabList:[{text:"全部"},{text:"待揽件"},{text:"已取件"},{text:"已签收"}],expressList:[{name:"速递订单",id:0},{name:"物流订单",id:1},{name:"调拨订单",id:2}]}},methods:{choseExpress:function(t){this.chose=t.id,e.navigateTo({url:"../create-express/create-express?express="+this.chose})},RadioChange:function(e){console.log(e," at pages\\tab-item-content\\work-center\\express-center\\express-index\\express-index.vue:62")},createExpress:function(){this.showExpress=!0},tabSelect:function(e){this.TabCur=e.currentTarget.dataset.id,this.scrollLeft=60*(e.currentTarget.dataset.id-1),console.log(this.TabCur," at pages\\tab-item-content\\work-center\\express-center\\express-index\\express-index.vue:71")}}};t.default=n}).call(this,n("6e42")["default"])},4189:function(e,t,n){"use strict";n.r(t);var r=n("f921"),s=n("5937");for(var a in s)"default"!==a&&function(e){n.d(t,e,function(){return s[e]})}(a);n("d97e");var o=n("2877"),i=Object(o["a"])(s["default"],r["a"],r["b"],!1,null,null,null);t["default"]=i.exports},5937:function(e,t,n){"use strict";n.r(t);var r=n("016b"),s=n.n(r);for(var a in r)"default"!==a&&function(e){n.d(t,e,function(){return r[e]})}(a);t["default"]=s.a},7651:function(e,t,n){},d97e:function(e,t,n){"use strict";var r=n("7651"),s=n.n(r);s.a},f921:function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;e._self._c},s=[];n.d(t,"a",function(){return r}),n.d(t,"b",function(){return s})}},[["a357","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/work-center/express-center/express-index/express-index.js');
__wxRoute = 'pages/tab-item-content/work-center/express-center/create-address/create-address';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/work-center/express-center/create-address/create-address.js';

define('pages/tab-item-content/work-center/express-center/create-address/create-address.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/work-center/express-center/create-address/create-address"],{"2be0":function(e,t,n){"use strict";n.r(t);var r=n("d6c2"),c=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,function(){return r[e]})}(o);t["default"]=c.a},"74b2":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;e._self._c},c=[];n.d(t,"a",function(){return r}),n.d(t,"b",function(){return c})},a7d1:function(e,t,n){"use strict";n.r(t);var r=n("74b2"),c=n("2be0");for(var o in c)"default"!==o&&function(e){n.d(t,e,function(){return c[e]})}(o);var s=n("2877"),i=Object(s["a"])(c["default"],r["a"],r["b"],!1,null,null,null);t["default"]=i.exports},d6c2:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(){return n.e("components/jm-address/jm-address").then(n.bind(null,"0d97"))},c={data:function(){return{isShow:!1,shop:{province:"",city:"",district:""}}},components:{addressed:r},methods:{childClick:function(e){console.log(e," at pages\\tab-item-content\\work-center\\express-center\\create-address\\create-address.vue:53"),this.shop.province=e.provinceID,this.shop.city=e.cityID,this.shop.district=e.districtID},chooseCity:function(){this.isShow=!0}}};t.default=c}},[["7b7d","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/work-center/express-center/create-address/create-address.js');
__wxRoute = 'pages/tab-item-content/work-center/express-center/create-express/create-express';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/work-center/express-center/create-express/create-express.js';

define('pages/tab-item-content/work-center/express-center/create-express/create-express.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/work-center/express-center/create-express/create-express"],{"37df":function(e,t,n){"use strict";n.r(t);var a=n("6bcd"),s=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,function(){return a[e]})}(r);t["default"]=s.a},3875:function(e,t,n){"use strict";var a=n("ae6f"),s=n.n(a);s.a},"4dbf":function(e,t,n){"use strict";n.r(t);var a=n("9e3e"),s=n("37df");for(var r in s)"default"!==r&&function(e){n.d(t,e,function(){return s[e]})}(r);n("3875");var o=n("2877"),i=Object(o["a"])(s["default"],a["a"],a["b"],!1,null,null,null);t["default"]=i.exports},"6bcd":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{expressObj:{id:"",name:""},sender:{name:""},modalName:null,radio:"radio1",express:{id:"",name:""},obj:{id:"",name:""},expressList:[{name:"顺丰快递"},{name:"邦德快递"}],objectList:[{name:"消费者"},{name:"门店"}],shopItem:""}},methods:{goBack:function(){e.navigateBack({delta:1})},choseSender:function(){e.navigateTo({url:"../../../shop-center/near-shop-list/near-shop-list?type=express"})},choseReceiver:function(){},showModal:function(e){this.modalName=e.currentTarget.dataset.target,console.log(this.modalName," at pages\\tab-item-content\\work-center\\express-center\\create-express\\create-express.vue:137")},hideModal:function(e){this.modalName=null},RadioChange:function(e){this.radio=e.detail.value},getShopInfo:function(e){var t=this;this.$ajax("ProprietorShop",{id:e},function(e){t.shopItem=e,console.log(t.shopItem," at pages\\tab-item-content\\work-center\\express-center\\create-express\\create-express.vue:150")})}},onLoad:function(e){var t=this;console.log(e," at pages\\tab-item-content\\work-center\\express-center\\create-express\\create-express.vue:156"),e&&(0==e.express?this.expressObj={id:0,name:"速递订单"}:1==e.express?this.expressObj={id:1,name:"物流订单"}:2==e.express&&(this.expressObj={id:1,name:"调拨订单"})),this.$fire.on("shop",function(e){e.id&&t.getShopInfo(e.id)})}};t.default=n}).call(this,n("6e42")["default"])},"9e3e":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;e._self._c},s=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return s})},ae6f:function(e,t,n){}},[["b26c","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/work-center/express-center/create-express/create-express.js');
__wxRoute = 'pages/tab-item-content/mine-center/basic-setting/basic-setting';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/mine-center/basic-setting/basic-setting.js';

define('pages/tab-item-content/mine-center/basic-setting/basic-setting.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/mine-center/basic-setting/basic-setting"],{"18dd":function(t,e,n){"use strict";n.r(e);var i=n("958f"),o=n("3f75");for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);n("a749");var s=n("2877"),r=Object(s["a"])(o["default"],i["a"],i["b"],!1,null,null,null);e["default"]=r.exports},"3f75":function(t,e,n){"use strict";n.r(e);var i=n("5f64"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);e["default"]=o.a},"5f64":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){return n.e("components/uni/mx-datepicker/mx-datepicker").then(n.bind(null,"51fd"))},o={data:function(){return{isShow:!0,value:"",type:"rangetime",radio:"radio1",sexList:["男","女"],isChangeSex:!1,userInfo:{},token:"",avatar:"",birthday:"",showPicker:!1}},methods:{writeMotto:function(){t.navigateTo({url:"../write-motto/write-motto"})},onSelected:function(t){this.showPicker=!1,t&&(this.isShow=!1,this[this.type]=t.value,this.birthday=t.value.replace(/\//g,"-"))},RadioChange:function(t){this.radio=t.detail.value.substr(5,1),this.userInfo.gender=1==this.radio?"男":"女"},hideModal:function(){this.isChangeSex=!1},tochangeMobile:function(){t.navigateTo({url:"../account-manager/account-manager"})},changeName:function(){t.navigateTo({url:"../change-name/change-name"})},goBack:function(){t.navigateBack({delta:1})},getUserInfo:function(){var e=this;t.getStorage({key:"userInfo",success:function(t){e.userInfo=t.data,console.log(e.userInfo," at pages\\tab-item-content\\mine-center\\basic-setting\\basic-setting.vue:189")}})},getUserInfoAvatar:function(){var e=this;t.getStorage({key:"logo",success:function(t){e.avatar=t.data}})},changeGender:function(){this.isChangeSex=!0},uploadAvatar:function(){t.chooseImage({count:1,sizeType:["compressed"],sourceType:["album","camera"],success:function(e){var n=e.tempFilePaths[0];t.navigateTo({url:"../cut-image/cut-image?src="+n})}})},getAvater:function(e){var n=this;this.$ajax("File",{id:e},function(e){n.avatar=e,t.setStorage({key:"logo",data:n.avatar})})},getUploadToken:function(){var t=this;this.$ajax("UploadToken",{},function(e){t.token=e})},quitEvent:function(){t.removeStorage({key:"userInfo",success:function(e){t.navigateTo({url:"../../../login-design/login/login"})}})},onShowDatePicker:function(t){this.type=t,this.showPicker=!0,this.value=this[t]},setUserInfo:function(){console.log(this.userInfo.name,this.userInfo.mobile,this.radio,this.birthday,this.userInfo.motto," at pages\\tab-item-content\\mine-center\\basic-setting\\basic-setting.vue:255"),this.$ajax("SetProfile",{gender:"radio1"==this.radio?1:2,mobile:this.userInfo.mobile,name:this.userInfo.name,motto:this.userInfo.motto,birthday:this.birthday?this.birthday:this.userInfo.birthday},function(e){t.showToast({title:"编辑基本信息成功",icon:"none"}),setTimeout(function(){t.navigateBack({delta:1})},500)})}},components:{MxDatePicker:i},onLoad:function(){var t=this;this.getUserInfo(),this.getUserInfoAvatar(),this.$fire.on("image",function(e){e&&t.getAvater(e)}),this.$fire.on("name",function(e){e&&(t.userInfo.name=e)}),this.$fire.on("motto",function(e){e&&(t.userInfo.motto=e)})}};e.default=o}).call(this,n("6e42")["default"])},"64e8":function(t,e,n){},"958f":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=(t._self._c,t._f("formatTime")(t.userInfo.birthday,"YMD"));t.$mp.data=Object.assign({},{$root:{f0:n}})},o=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return o})},a749:function(t,e,n){"use strict";var i=n("64e8"),o=n.n(i);o.a}},[["63c2","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/mine-center/basic-setting/basic-setting.js');
__wxRoute = 'pages/tab-item-content/mine-center/suggestion-list/suggestion-list';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/mine-center/suggestion-list/suggestion-list.js';

define('pages/tab-item-content/mine-center/suggestion-list/suggestion-list.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/mine-center/suggestion-list/suggestion-list"],{"0063":function(t,n,e){},"0bae":function(t,n,e){"use strict";e.r(n);var u=e("69e0"),a=e.n(u);for(var o in u)"default"!==o&&function(t){e.d(n,t,function(){return u[t]})}(o);n["default"]=a.a},"2d20":function(t,n,e){"use strict";var u=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"a",function(){return u}),e.d(n,"b",function(){return a})},"32af":function(t,n,e){"use strict";e.r(n);var u=e("2d20"),a=e("0bae");for(var o in a)"default"!==o&&function(t){e.d(n,t,function(){return a[t]})}(o);e("38fc");var i=e("2877"),c=Object(i["a"])(a["default"],u["a"],u["b"],!1,null,null,null);n["default"]=c.exports},"38fc":function(t,n,e){"use strict";var u=e("0063"),a=e.n(u);a.a},"69e0":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=function(){return e.e("components/head-tab").then(e.bind(null,"3edb"))},a={data:function(){return{title:"建议列表"}},methods:{goBack:function(){t.navigateBack({delta:1})},addSuggestion:function(){t.navigateTo({url:"../create-suggestion/create-suggestion"})}},components:{headTab:u}};n.default=a}).call(this,e("6e42")["default"])}},[["2798","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/mine-center/suggestion-list/suggestion-list.js');
__wxRoute = 'pages/tab-item-content/mine-center/edit-password/edit-password';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/mine-center/edit-password/edit-password.js';

define('pages/tab-item-content/mine-center/edit-password/edit-password.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/mine-center/edit-password/edit-password"],{5840:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){return e.e("components/head-tab").then(e.bind(null,"3edb"))},a={data:function(){return{title:"设置登录密码",userInfo:{},user:{pwd:"",confirmPwd:"",newPwd:""}}},components:{headTab:o},methods:{changePassword:function(){this.$ajax("ResetPwd",{token:this.user.confirmPwd,original:this.user.pwd},function(n){console.log(n," at pages\\tab-item-content\\mine-center\\edit-password\\edit-password.vue:61")})},checkConfirmpwdEvent:function(t){t.detail.value==this.user.newPwd||n.showToast({title:"两次输入的密码不相同",icon:"none"})},goBack:function(){n.navigateBack({delta:1})},getUserInfo:function(){var t=this;n.getStorage({key:"userInfo",success:function(n){t.userInfo=n.data}})},forgetPwd:function(){n.navigateTo({url:"../../../login-design/find-password/find-password"})}},onLoad:function(){this.getUserInfo()}};t.default=a}).call(this,e("6e42")["default"])},6943:function(n,t,e){"use strict";var o=e("9010"),a=e.n(o);a.a},"6d07":function(n,t,e){"use strict";e.r(t);var o=e("5840"),a=e.n(o);for(var i in o)"default"!==i&&function(n){e.d(t,n,function(){return o[n]})}(i);t["default"]=a.a},9010:function(n,t,e){},c568:function(n,t,e){"use strict";e.r(t);var o=e("d4a5"),a=e("6d07");for(var i in a)"default"!==i&&function(n){e.d(t,n,function(){return a[n]})}(i);e("6943");var r=e("2877"),u=Object(r["a"])(a["default"],o["a"],o["b"],!1,null,null,null);t["default"]=u.exports},d4a5:function(n,t,e){"use strict";var o=function(){var n=this,t=n.$createElement;n._self._c},a=[];e.d(t,"a",function(){return o}),e.d(t,"b",function(){return a})}},[["b504","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/mine-center/edit-password/edit-password.js');
__wxRoute = 'pages/tab-item/index/index';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item/index/index.js';

define('pages/tab-item/index/index.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item/index/index"],{"3b74":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){return e.e("components/uni-grid/uni-grid").then(e.bind(null,"9704"))},i=function(){return e.e("components/NAUI-card/NAUI-card").then(e.bind(null,"c54a"))},a=function(){return e.e("components/axb-checkbox_v2.0/components/axb-checkbox/axb-checkbox").then(e.bind(null,"011d"))},s={data:function(){return{userInfo:"",eid:"",companyObj:"",dotStyle:!1,cardCur:0,shopList:[{id:0,url:"../../../static/img/shop-img/shop1.jpg"},{id:1,url:"../../../static/img/shop-img/shop2.jpg"},{id:2,url:"../../../static/img/shop-img/shop3.jpg"},{id:3,url:"../../../static/img/shop-img/shop4.jpg"},{id:4,url:"../../../static/img/shop-img/shop5.jpg"},{id:5,url:"../../../static/img/shop-img/shop6.jpg"}],company:{name:"",cover:""},isShowJoinModal:!1,isShowJoinCompany:!1,current:1,noticeList1:[],noticeList2:[],options:[{image:"../../../static/img/index-tab/tab1.png",text:"通知公告",num:1},{image:"../../../static/img/index-tab/tab2.png",text:"门店报修"},{image:"../../../static/img/index-tab/tab4.png",text:"快递包裹"},{image:"../../../static/img/index-tab/tab3.png",text:"我的门店"}],noticeID:0,todoNum:0,shop:{shopID:"",shopName:""}}},computed:{},methods:{getTodoList:function(){var t=this;this.$ajax("MyEventNumbers",{},function(n){t.todoNum=n})},joinCompanyEvent:function(){this.isShowJoinCompany=!0},showArticles:function(){var t=this;this.$ajax("Articles",{zone:-1},function(n){var e=[],o=[];n.forEach(function(t){1==t.type?e.push(t):2==t.type&&o.push(t)}),e.length<=3?t.noticeList1=e:t.noticeList1=e.splice(0,3),o.length<=3?t.noticeList2=o:t.noticeList1=o.splice(0,3),console.log(t.noticeList1," at pages\\tab-item\\index\\index.vue:259"),console.log(t.noticeList2," at pages\\tab-item\\index\\index.vue:260")})},joinCompany:function(){var n=this;t.getStorage({key:"userInfo",success:function(e){n.$ajax("ApplyOrInvite2Join",{user:e.data.id,org:n.companyObj.id},function(e){t.showToast({title:"申请结果将会发您手机，请注意查收",icon:"none"}),n.hideModal("company")})}})},searchCompany:function(){var t=this;this.$ajax("Customer",{eid:this.eid},function(n){t.companyObj=n})},showWorkClick:function(){t.navigateTo({url:"../work/work"})},showMessageClick:function(){t.navigateTo({url:"../message/message"})},showMineClick:function(){t.navigateTo({url:"../mine/mine"})},DotStyle:function(t){this.dotStyle=t.detail.value},change:function(t){this.current=t.detail.current},radioChangeType:function(t){},aggressJoin:function(){var n=this;t.getStorage({key:"userInfo",success:function(e){n.$ajax("JoinOrg",{user:e.data.id},function(e){t.showToast({title:"您已成功加入该门店",icon:"none"}),n.isShowJoinModal=!1})}})},toNoticeContent:function(n){this.noticeID=id,t.navigateTo({url:"../../all-item-content/index-more/index-more?value="+n.value})},showMoreInfo:function(n){"skill"==n?t.navigateTo({url:"../../all-item-content/index-more/index-more?value="+n}):"example"==n&&t.navigateTo({url:"../../all-item-content/index-more/index-more?value="+n})},hideModal:function(t){"company"==t?this.isShowJoinCompany=!1:"shop"==t&&(this.isShowJoinModal=!1)},cardSwiper:function(t){this.cardCur=t.detail.current},detailContent:function(n,e){t.navigateTo({url:"../../all-item-content/detail-content/detail-content?type="+n+"&id="+e.id})},toJoinShop:function(){t.navigateTo({url:"../../tab-item-content/shop-center/join-shop/join-shop"})},showOperateItem:function(n){switch(n){case 0:t.navigateTo({url:"../../tab-item-content/notice-center/notice-center"});break;case 1:t.navigateTo({url:"../../tab-item-content/shop-center/shop-center?type=all"});break;case 2:t.navigateTo({url:"../../tab-item-content/work-center/express-center/express-index/express-index"});break;case 3:t.navigateTo({url:"../../tab-item-content/shop-center/shop-list/shop-list"})}},getShopInfo:function(t){var n=this;this.$ajax("ProprietorShop",{id:t},function(t){n.shop.shopName=t.name,console.log(n.shop.shopName," at pages\\tab-item\\index\\index.vue:456")})}},components:{axbCheckBox:a,uniGrid:o,NAUIcard:i},onLoad:function(){var n=this;this.getTodoList(),this.showArticles(),t.getStorage({key:"userInfo",success:function(t){n.userInfo=t.data,0==t.data.owner?n.isShowJoinCompany=!0:0!=t.data.owner&&3==t.data.status?(n.isShowJoinModal=!0,n.shop.shopID=t.data.department,n.getShopInfo(n.shop.shopID)):n.company={name:t.data.ownerName,cover:t.data.ownerLogoUrl}}})}};n.default=s}).call(this,e("6e42")["default"])},"42e0":function(t,n,e){"use strict";var o=e("d7b7"),i=e.n(o);i.a},"47b4":function(t,n,e){"use strict";e.r(n);var o=e("3b74"),i=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,function(){return o[t]})}(a);n["default"]=i.a},a963:function(t,n,e){"use strict";e.r(n);var o=e("f0de"),i=e("47b4");for(var a in i)"default"!==a&&function(t){e.d(n,t,function(){return i[t]})}(a);e("42e0");var s=e("2877"),c=Object(s["a"])(i["default"],o["a"],o["b"],!1,null,null,null);n["default"]=c.exports},d7b7:function(t,n,e){},f0de:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement,e=(t._self._c,t.noticeList2.map(function(n,e){var o=t._f("formatTime")(n.createdate,"YMD","/");return{$orig:t.__get_orig(n),f0:o}}));t.$mp.data=Object.assign({},{$root:{l0:e}})},i=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return i})}},[["1877","common/runtime","common/vendor"]]]);
});
require('pages/tab-item/index/index.js');
__wxRoute = 'pages/all-item-content/index-more/index-more';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/all-item-content/index-more/index-more.js';

define('pages/all-item-content/index-more/index-more.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/all-item-content/index-more/index-more"],{"62fe":function(t,e,n){"use strict";var i=n("edf7"),a=n.n(i);a.a},d843:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){return n.e("components/head-tab").then(n.bind(null,"3edb"))},a={data:function(){return{exampleList:[],skillList:[],title:"",value:""}},components:{headTab:i},methods:{checkItemInfo:function(e){t.navigateTo({url:"../detail-content/detail-content?id="+e.id+"&type="+this.value})},goBack:function(){t.navigateBack({delta:1})},getArticleList:function(){var t=this;this.$ajax("Articles",{zone:-1},function(e){e.forEach(function(e){"skill"==t.value&&1==e.type?t.skillList.push(e):"example"==t.value&&2==e.type&&(console.log("----"," at pages\\all-item-content\\index-more\\index-more.vue:122"),t.skillList.push(e))}),console.log(t.skillList," at pages\\all-item-content\\index-more\\index-more.vue:126")})}},onLoad:function(t){"skill"==t.value?(this.title="销售技巧",this.value=t.value):"example"==t.value&&(this.title="陈述案例",this.value=t.value),this.getArticleList()}};e.default=a}).call(this,n("6e42")["default"])},da09:function(t,e,n){"use strict";n.r(e);var i=n("db21"),a=n("f2a7");for(var l in a)"default"!==l&&function(t){n.d(e,t,function(){return a[t]})}(l);n("62fe");var o=n("2877"),u=Object(o["a"])(a["default"],i["a"],i["b"],!1,null,null,null);e["default"]=u.exports},db21:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement,n=(t._self._c,t.skillList.map(function(e,n){var i=t._f("formatTime")(e.createdate,"YMD","/");return{$orig:t.__get_orig(e),f0:i}}));t.$mp.data=Object.assign({},{$root:{l0:n}})},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},edf7:function(t,e,n){},f2a7:function(t,e,n){"use strict";n.r(e);var i=n("d843"),a=n.n(i);for(var l in i)"default"!==l&&function(t){n.d(e,t,function(){return i[t]})}(l);e["default"]=a.a}},[["725b","common/runtime","common/vendor"]]]);
});
require('pages/all-item-content/index-more/index-more.js');
__wxRoute = 'pages/tab-item-content/shop-center/shop-list/shop-list';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/shop-center/shop-list/shop-list.js';

define('pages/tab-item-content/shop-center/shop-list/shop-list.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/shop-center/shop-list/shop-list"],{"01ba":function(t,n,e){"use strict";e.r(n);var o=e("2a33"),i=e("ec98");for(var a in i)"default"!==a&&function(t){e.d(n,t,function(){return i[t]})}(a);e("4146");var s=e("2877"),u=Object(s["a"])(i["default"],o["a"],o["b"],!1,null,null,null);n["default"]=u.exports},"2a33":function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return i})},4146:function(t,n,e){"use strict";var o=e("ea2d"),i=e.n(o);i.a},c966:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){return e.e("components/head-tab").then(e.bind(null,"3edb"))},i={data:function(){return{title:"门店列表",CustomBar:0,inputValue:0,shopList:[],fromType:""}},components:{headTab:o},methods:{goBack:function(){t.navigateBack({delta:1})},InputFocus:function(t){this.inputValue=t.detail.height},InputBlur:function(t){this.inputValue=0},searchShop:function(t){for(var n=t.detail.value.toLowerCase(),e=this.icon,o=0;o<e.length;o++){var i=n,a=e[o].name.toLowerCase();-1!=a.search(i)?e[o].isShow=!0:e[o].isShow=!1}this.icon=e},systemInfo:function(){var n=this;t.getSystemInfo({success:function(t){n.CustomBar=t.windowTop}})},recordShop:function(){t.navigateTo({url:"../record-shop/record-shop"})},checkShopDetail:function(n){t.navigateTo({url:"../clerk-list/clerk-list?shopID="+n.id})},getShopList:function(){var t=this;this.$ajax("MyShops",{address:""},function(n){t.shopList=n})}},onLoad:function(t){var n=this;this.systemInfo(),this.getShopList(),this.$fire.on("record-shop",function(t){n.getShopList()})}};n.default=i}).call(this,e("6e42")["default"])},ea2d:function(t,n,e){},ec98:function(t,n,e){"use strict";e.r(n);var o=e("c966"),i=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,function(){return o[t]})}(a);n["default"]=i.a}},[["1c26","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/shop-center/shop-list/shop-list.js');
__wxRoute = 'pages/tab-item-content/mine-center/create-suggestion/create-suggestion';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/mine-center/create-suggestion/create-suggestion.js';

define('pages/tab-item-content/mine-center/create-suggestion/create-suggestion.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/mine-center/create-suggestion/create-suggestion"],{"3f29":function(e,t,n){"use strict";var o=n("4440"),i=n.n(o);i.a},"3f3e":function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return i})},4440:function(e,t,n){},"5d32":function(e,t,n){"use strict";n.r(t);var o=n("3f3e"),i=n("84fe");for(var a in i)"default"!==a&&function(e){n.d(t,e,function(){return i[e]})}(a);n("3f29");var s=n("2877"),c=Object(s["a"])(i["default"],o["a"],o["b"],!1,null,null,null);t["default"]=c.exports},"811b":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){return n.e("components/head-tab").then(n.bind(null,"3edb"))},i={data:function(){return{imgList:[],suggestion:"",files:[]}},components:{headTab:o},methods:{createSuggestion:function(){this.suggestion||e.showToast({title:"请填写反馈建议",icon:"none"})},ViewImage:function(t,n){e.previewImage({urls:this.imgList,current:t})},DelImg:function(t,n){var o=this;e.showModal({content:"确定删除？",cancelText:"取消",confirmText:"确定",success:function(n){o.imgList.splice(t,1),o.$ajax("RemoveFiles",{id:o.files[t]},function(n){o.files.splice(t,1),e.showToast({title:"删除成功",icon:"none"})})}})},getUploadToken:function(){var e=this;this.$ajax("UploadToken",{},function(t){e.token=t})},chooseImageEvent:function(){var t=this;e.chooseImage({count:9,sizeType:["original","compressed"],sourceType:["album"],success:function(n){var o=n.tempFilePaths;0!=t.imgList.length?t.imgList=t.imgList.concat(n.tempFilePaths):t.imgList=n.tempFilePaths,e.getStorage({key:"userInfo",success:function(i){for(var a=0;a<n.tempFilePaths.length;a++){var s=e.uploadFile({url:t.$store.state.uploadHostUrl+t.token,filePath:o[a],name:"file",formData:{"x:type":26,"x:owner":i.data.owner,"x:creator":i.data.id},success:function(e){var n=JSON.parse(e.data);t.files.push(n.data)}});s.onProgressUpdate(function(t){100==t.progress&&e.showToast({title:"上传成功",icon:"none"})},function(t){e.showToast({title:"上传失败",icon:"none"})})}}})}})},goBack:function(){e.navigateBack({delta:1})}}};t.default=i}).call(this,n("6e42")["default"])},"84fe":function(e,t,n){"use strict";n.r(t);var o=n("811b"),i=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,function(){return o[e]})}(a);t["default"]=i.a}},[["e223","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/mine-center/create-suggestion/create-suggestion.js');
__wxRoute = 'pages/tab-item-content/shop-center/create-comment/create-comment';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/shop-center/create-comment/create-comment.js';

define('pages/tab-item-content/shop-center/create-comment/create-comment.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/shop-center/create-comment/create-comment"],{1018:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;n("c4e7");var i=function(){return n.e("components/uni-grid/uni-grid").then(n.bind(null,"9704"))},o=function(){return n.e("components/start/App").then(n.bind(null,"f971"))},s={data:function(){return{filesList:[],imgList:[],cur1:5,cur2:5,cur3:5,flag:!1,repaitItem:"",files:[],summary:"",detail1:"非常满意",detail2:"非常满意",detail3:"非常满意",orderID:""}},components:{myIssue:o,uniGrid:i},methods:{viewImg:function(){var t=[];this.repaitItem.files.forEach(function(e){e.postfix&&t.push(e.url)}),console.log(t," at pages\\tab-item-content\\shop-center\\create-comment\\create-comment.vue:108"),e.previewImage({urls:t})},getOrderInfo:function(e){var t=this;this.$ajax("ServiceOrder",{id:e},function(e){t.repaitItem=e,console.log(t.repaitItem," at pages\\tab-item-content\\shop-center\\create-comment\\create-comment.vue:120"),e.files&&e.files.forEach(function(e){e.postfix&&t.filesList.push({image:e.url,text:""})})})},ChooseImage:function(t){var n=this;e.chooseImage({count:9,sizeType:["original","compressed"],sourceType:["album"],success:function(t){var i=t.tempFilePaths;0!=n.imgList.length?n.imgList=n.imgList.concat(t.tempFilePaths):n.imgList=t.tempFilePaths,e.getStorage({key:"userInfo",success:function(o){for(var s=0;s<t.tempFilePaths.length;s++){var a=e.uploadFile({url:n.$store.state.uploadHostUrl+n.token,filePath:i[s],name:"file",formData:{"x:type":n.$store.state.constants.serviceorder_file,"x:owner":o.data.owner,"x:creator":o.data.id},success:function(e){var t=JSON.parse(e.data);n.files.push(t.data)}});a.onProgressUpdate(function(t){100==t.progress&&e.showToast({title:"上传成功",icon:"none"})},function(t){e.showToast({title:"上传失败",icon:"none"})})}}})}})},ViewImage:function(t){e.previewImage({urls:this.imgList,current:t})},DelImg:function(t){var n=this;e.showModal({content:"确定删除？",cancelText:"取消",confirmText:"确定",success:function(i){i.confirm&&(n.imgList.splice(t,1),n.$ajax("RemoveFiles",{id:n.files[t]},function(i){n.files.splice(t,1),e.showToast({title:"删除成功",icon:"none"})}))}})},getUploadToken:function(){var t=this;e.request({url:this.$store.state.url+"UploadToken",success:function(e){t.token=e.data.data}})},selected:function(e,t){this.flag=!0,"service"==t&&(this.cur1=e,this.detail1=e>=5?"非常满意":e>=3?"满意":e>=1?"一般":"不满意"),"timely"==t&&(this.cur2=e,this.detail2=e>=5?"非常满意":e>=3?"满意":e>=1?"一般":"不满意"),"quantity"==t&&(this.cur3=e,this.detail3=e>=5?"非常满意":e>=3?"满意":e>=1?"一般":"不满意")},createComment:function(){this.$ajax("NewServiceOrderComments",{comment:this.summary,id:this.orderID,service:this.cur1,timely:this.cur2,quality:this.cur3,files:this.files?this.files.join(","):""},function(t){e.showToast({title:"验收评价成功",icon:"none"}),setTimeout(function(){e.navigateBack({delta:1})},500)})}},onLoad:function(e){console.log(e," at pages\\tab-item-content\\shop-center\\create-comment\\create-comment.vue:343"),this.getUploadToken(),this.orderID=e.orderID,this.getOrderInfo(e.orderID),console.log(this.repaitItem," at pages\\tab-item-content\\shop-center\\create-comment\\create-comment.vue:347")}};t.default=s}).call(this,n("6e42")["default"])},5518:function(e,t,n){"use strict";n.r(t);var i=n("1018"),o=n.n(i);for(var s in i)"default"!==s&&function(e){n.d(t,e,function(){return i[e]})}(s);t["default"]=o.a},"65a0":function(e,t,n){"use strict";var i=n("7ffe"),o=n.n(i);o.a},"7ffe":function(e,t,n){},abb9:function(e,t,n){"use strict";n.r(t);var i=n("d928"),o=n("5518");for(var s in o)"default"!==s&&function(e){n.d(t,e,function(){return o[e]})}(s);n("65a0");var a=n("2877"),r=Object(a["a"])(o["default"],i["a"],i["b"],!1,null,null,null);t["default"]=r.exports},d928:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement;e._self._c},o=[];n.d(t,"a",function(){return i}),n.d(t,"b",function(){return o})}},[["96f3","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/shop-center/create-comment/create-comment.js');
__wxRoute = 'pages/tab-item/message/message';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item/message/message.js';

define('pages/tab-item/message/message.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item/message/message"],{"0ca6":function(t,e,n){"use strict";n.r(e);var o=n("83a4"),a=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);e["default"]=a.a},"83a4":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("c451"));function a(t){return t&&t.__esModule?t:{default:t}}var i={data:function(){return{chatList:[],modalName:null,listTouchStart:0,listTouchDirection:null}},onLoad:function(){this.getLoginInfo(),this.$fire.on("group",function(t){console.log(t," at pages\\tab-item\\message\\message.vue:121")})},methods:{showWorkClick:function(){t.navigateTo({url:"../work/work"})},chat:function(e){console.log(e," at pages\\tab-item\\message\\message.vue:132"),t.navigateTo({url:"../../tab-item-content/message-center/chat/chat"})},ListTouchStart:function(t){this.listTouchStart=t.touches[0].pageX},ListTouchMove:function(t){this.listTouchDirection=t.touches[0].pageX-this.listTouchStart>0?"right":"left"},ListTouchEnd:function(t){"left"==this.listTouchDirection?this.modalName=t.currentTarget.dataset.target:this.modalName=null,this.listTouchDirection=null},showGroupList:function(e){t.navigateTo({url:"../../tab-item-content/message-center/group-list/group-list?type="+e})},getAllFriendEvent:function(){var t={From_Account:this.$store.state.loginInfo.identifier,TimeStamp:0,StartIndex:0,GetCount:2e4,LastStandardSequence:0,TagList:["Tag_Profile_IM_Nick","Tag_SNS_IM_Remark","Tag_Profile_IM_Gender"]};o.default.getAllFriend(t,function(t){},function(t){})},getRecentContactList:function(){var t=this,e={Count:1};o.default.getRecentContactList(e,function(e){t.chatList=e.SessionItem})},showIndexClick:function(){t.navigateTo({url:"../index/index"})},showMineClick:function(){t.navigateTo({url:"../mine/mine"})},getLoginInfo:function(){var e=this;t.request({url:this.$store.state.url+"Login",data:{user:"13167233205",token:"abc123456"},success:function(t){if(1==t.data.data.status){var n=function(e){var n;switch(e.ErrorCode){case o.default.CONNECTION_STATUS.ON:o.default.Log.warn("建立连接成功:"+e.ErrorInfo);break;case o.default.CONNECTION_STATUS.OFF:n="连接已断开，无法收到新消息，请检查下您的网络是否正常:"+e.ErrorInfo,o.default.Log.warn(n);break;case o.default.CONNECTION_STATUS.RECONNECT:n="连接状态恢复正常:"+t.ErrorInfo,o.default.Log.warn(n);break;default:o.default.Log.error("未知连接状态:"+e.ErrorInfo);break}},a=function(t){var e;for(var n in t)if(e=t[n],e.getSession().type()==o.default.SESSION_TYPE.GROUP&&e.isSend)return},i={sdkAppID:e.$store.state.IMSDKAPPID,appIDAt3rd:e.$store.state.IMSDKAPPID,identifier:t.data.data.imUser,identifierNick:t.data.data.name,accountType:39016,userSig:t.data.data.extprops},r={onConnNotify:n,jsonpCallback:function(){},onMsgNotify:a,onBigGroupMsgNotify:{},onGroupSystemNotifys:{},onGroupInfoChangeNotify:{},onFriendSystemNotifys:{},onProfileSystemNotifys:{},onKickedEventCall:function(){},onC2cEventNotifys:function(){}},s={isAccessFormalEnv:!0,isLogOn:!1};o.default.login(i,r,s,function(t){e.$store.commit("setLoginInfo",i),e.getAllFriendEvent(),e.getRecentContactList()},function(t){})}},fail:function(e){t.showToast({title:e,icon:"none"})}})}}};e.default=i}).call(this,n("6e42")["default"])},a5fc:function(t,e,n){"use strict";var o=n("a86b"),a=n.n(o);a.a},a86b:function(t,e,n){},bc80:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=(t._self._c,t.chatList.map(function(e,n){var o=t._f("formatTime")(e.MsgTimeStamp,"HMS");return{$orig:t.__get_orig(e),f0:o}}));t.$mp.data=Object.assign({},{$root:{l0:n}})},a=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a})},f0d8:function(t,e,n){"use strict";n.r(e);var o=n("bc80"),a=n("0ca6");for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);n("a5fc");var r=n("2877"),s=Object(r["a"])(a["default"],o["a"],o["b"],!1,null,null,null);e["default"]=s.exports}},[["49b1","common/runtime","common/vendor"]]]);
});
require('pages/tab-item/message/message.js');
__wxRoute = 'pages/tab-item-content/message-center/chat/chat';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/message-center/chat/chat.js';

define('pages/tab-item-content/message-center/chat/chat.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/message-center/chat/chat"],{"12ce":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("c451"));function a(t){return t&&t.__esModule?t:{default:t}}var c={data:function(){return{chatObj:{name:"",To_Account:""}}},components:{},onLoad:function(){this.getChatObjInfo()},methods:{getChatObjInfo:function(){var t=this,e=["Tag_Profile_IM_Nick","Tag_Profile_IM_Gender","Tag_Profile_IM_AllowType","Tag_Profile_IM_Image"],n={To_Account:["LX17621233017"],TagList:e};o.default.getProfilePortrait(n,function(e){"OK"==e.ActionStatus&&(t.chatObj={name:e.UserProfileItem[0].ProfileItem[0].Value,To_Account:e.UserProfileItem[0].To_Account})},function(t){console.log(t," at pages\\tab-item-content\\message-center\\chat\\chat.vue:51")})}}};e.default=c},2421:function(t,e,n){"use strict";n.r(e);var o=n("62c7"),a=n("ab74");for(var c in a)"default"!==c&&function(t){n.d(e,t,function(){return a[t]})}(c);n("f69d");var u=n("2877"),r=Object(u["a"])(a["default"],o["a"],o["b"],!1,null,null,null);e["default"]=r.exports},3311:function(t,e,n){},"62c7":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a})},ab74:function(t,e,n){"use strict";n.r(e);var o=n("12ce"),a=n.n(o);for(var c in o)"default"!==c&&function(t){n.d(e,t,function(){return o[t]})}(c);e["default"]=a.a},f69d:function(t,e,n){"use strict";var o=n("3311"),a=n.n(o);a.a}},[["84f4","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/message-center/chat/chat.js');
__wxRoute = 'pages/login-design/design/design';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/login-design/design/design.js';

define('pages/login-design/design/design.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login-design/design/design"],{"31a1":function(e,n,o){"use strict";o.r(n);var t=o("3948"),i=o.n(t);for(var s in t)"default"!==s&&function(e){o.d(n,e,function(){return t[e]})}(s);n["default"]=i.a},"330a":function(e,n,o){"use strict";var t=o("5d55"),i=o.n(t);i.a},3948:function(e,n,o){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t=function(){return o.e("components/popmodal").then(o.bind(null,"e269"))},i={data:function(){return{designr:{name:"",mobile:"",token:"",vcode:""},isShow:!1,modalName:"",checkTel:!1,checkPwd:!1}},components:{popModal:t},onLoad:function(){},methods:{toLogin:function(){e.navigateTo({url:"../login/login"})},design:function(){var n=this;this.checkPwd&&this.checkTel?e.request({url:this.$store.state.url,data:{name:this.designr.name,token:this.designr.token,mobile:this.designr.mobile,gender:1,type:4,vcode:this.designr.vcode,f:"Signup"},success:function(o){-2==o.data.data?(n.isShow=!0,n.modalName="exit",setTimeout(function(){this.isShow=!1,this.modalName=""},2e3)):(console.log(o," at pages\\login-design\\design\\design.vue:118"),console.log(n.designr," at pages\\login-design\\design\\design.vue:119"),n.isShow=!0,n.modalName="success",setTimeout(function(){n.isShow=!1,n.modalName="",console.log("1111"," at pages\\login-design\\design\\design.vue:125"),console.log(n.designr.mobile," at pages\\login-design\\design\\design.vue:126"),e.navigateTo({url:"../login/login?account="+n.designr.mobile+"&token="+n.designr.token})},500))}}):e.showToast({title:"所填内容不符合规则",icon:"none"})},hideModal:function(e){this.modalName=null,this.isShow=!1},clearPwd:function(e){this.designr.token=""},checkTelEvent:function(n){console.log(n," at pages\\login-design\\design\\design.vue:151"),n&&(/^1[34578]\d{9}$/.test(n)?this.checkTel=!0:e.showToast({title:"电话号码不存在",icon:"none"}))},checkPwdEvent:function(n){if(n){var o=/^[a-zA-Z0-9]{6,12}$/;0==o.test(n)?e.showToast({title:"密码不能含有非法字符，长度在6-12之间",icon:"none"}):this.checkPwd=!0}}}};n.default=i}).call(this,o("6e42")["default"])},"5d55":function(e,n,o){},bde5:function(e,n,o){"use strict";var t=function(){var e=this,n=e.$createElement;e._self._c},i=[];o.d(n,"a",function(){return t}),o.d(n,"b",function(){return i})},dceb:function(e,n,o){"use strict";o.r(n);var t=o("bde5"),i=o("31a1");for(var s in i)"default"!==s&&function(e){o.d(n,e,function(){return i[e]})}(s);o("330a");var a=o("2877"),c=Object(a["a"])(i["default"],t["a"],t["b"],!1,null,null,null);n["default"]=c.exports}},[["7c40","common/runtime","common/vendor"]]]);
});
require('pages/login-design/design/design.js');
__wxRoute = 'pages/tab-item-content/shop-center/create-order/create-order';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/shop-center/create-order/create-order.js';

define('pages/tab-item-content/shop-center/create-order/create-order.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/shop-center/create-order/create-order"],{"0178":function(e,t,n){"use strict";var a=n("edff"),i=n.n(a);i.a},"036f":function(e,t,n){"use strict";n.r(t);var a=n("f8cc"),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,function(){return a[e]})}(o);t["default"]=i.a},"4cba":function(e,t,n){"use strict";n.r(t);var a=n("62e2"),i=n("036f");for(var o in i)"default"!==o&&function(e){n.d(t,e,function(){return i[e]})}(o);n("0178");var s=n("2877"),r=Object(s["a"])(i["default"],a["a"],a["b"],!1,null,null,null);t["default"]=r.exports},"62e2":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"a",function(){return a}),n.d(t,"b",function(){return i})},edff:function(e,t,n){},f8cc:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;a(n("df5e"));function a(e){return e&&e.__esModule?e:{default:e}}var i=function(){return n.e("components/uni/mx-datepicker/mx-datepicker").then(n.bind(null,"51fd"))},o={data:function(){return{showPicker:!1,isShow:!1,modalName:null,value:"",CustomBar:this.CustomBar,shop:{id:"",name:""},amapPlugin:null,key:"4c523fb1857f99ba7f2d683d9e88ec1e",shopList:[],designer:{name:"",telephone:"",date:""},repairObj:{bigName:"",bigID:"",subName:"",subID:"",summary:""},type:"rangetime",files:[],imgList:[],address:"",token:""}},components:{MxDatePicker:i},getOpenDate:function(){var e=new Date;return this.format(e,"YMD")},onLoad:function(){var t=this;this.getUploadToken(),this.$fire.on("shop",function(e){t.shop.id=e.id,t.shop.name=e.name}),this.$fire.on("repair",function(e){t.repairObj={bigID:e.bigID,bigName:e.bigName,subID:e.subID,subName:e.subName}}),e.getStorage({key:"userInfo",success:function(e){t.designer.name=e.data.name,t.designer.telephone=e.data.account}})},methods:{createOrder:function(){var t=this;this.repairObj.bigID?this.repairObj.summary?e.getStorage({key:"userInfo",success:function(n){t.$ajax("NewServiceOrder",{catalog:t.repairObj.subID?t.repairObj.subID:t.repairObj.bigID,creator:n.data.id,shop:t.shop.id,appointdate:t.designer.date?t.designer.date:t.getOpenDate,summary:t.repairObj.summary,files:t.files?t.files.join(","):"",contractor:t.designer.name?t.designer.name:n.data.name,telephone:t.designer.telephone?t.designer.telephone:n.data.account},function(t){e.showToast({title:"新增报修成功",icon:"success"}),setTimeout(function(){e.navigateBack({delta:1})},500)})}}):e.showToast({title:"请输入报修描述",icon:"none"}):e.showToast({title:"请选择报修类别",icon:"none"})},toRepairItem:function(){e.navigateTo({url:"../repair-item/repair-item"})},getUploadToken:function(){var t=this;e.request({url:this.$store.state.url+"UploadToken",success:function(e){t.token=e.data.data}})},ChooseImageEvent:function(){var t=this;e.chooseImage({count:9,sizeType:["original","compressed"],sourceType:["album"],success:function(n){var a=n.tempFilePaths;0!=t.imgList.length?t.imgList=t.imgList.concat(n.tempFilePaths):t.imgList=n.tempFilePaths;for(var i=0;i<n.tempFilePaths.length;i++){var o=e.uploadFile({url:t.$store.state.uploadHostUrl+t.token,filePath:a[i],name:"file",formData:{"x:type":18,"x:owner":18,"x:creator":49},success:function(e){var n=JSON.parse(e.data);t.files.push(n.data)}});o.onProgressUpdate(function(t){100==t.progress&&e.showToast({title:"上传成功",icon:"none"})},function(t){e.showToast({title:"上传失败",icon:"none"})})}}})},DelImg:function(t){e.previewImage({urls:this.imgList,current:t})},ViewImage:function(t){var n=this;e.showModal({content:"确定删除？",cancelText:"取消",confirmText:"确定",success:function(a){a.confirm&&(n.imgList.splice(t,1),n.$ajax("RemoveFiles",{id:n.files[t]},function(a){n.files.splice(t,1),e.showToast({title:"删除成功",icon:"none"})}))}})},onSelected:function(e){this.showPicker=!1,e&&(this[this.type]=e.value,this.designer.date=e.value.replace(/\//g,"-"),console.log(this.designer.date," at pages\\tab-item-content\\shop-center\\create-order\\create-order.vue:346"))},onShowDatePicker:function(e){this.type=e,this.showPicker=!0,this.value=this[e]},toNearShopList:function(){e.navigateTo({url:"../near-shop-list/near-shop-list"})},showModal:function(e){console.log(e," at pages\\tab-item-content\\shop-center\\create-order\\create-order.vue:385"),this.modalName=e.currentTarget.dataset.target},hideModal:function(){this.modalName=""},checkTelEvent:function(t){if(!/^1[3|5|7|8][0-9]\d{4,8}$/.test(t))return e.showToast({title:"手机号码不存在",icon:"none"}),!1}}};t.default=o}).call(this,n("6e42")["default"])}},[["56aa","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/shop-center/create-order/create-order.js');
__wxRoute = 'pages/tab-item-content/shop-center/record-shop/record-shop';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/shop-center/record-shop/record-shop.js';

define('pages/tab-item-content/shop-center/record-shop/record-shop.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/shop-center/record-shop/record-shop"],{"02a0":function(t,e,o){"use strict";o.r(e);var a=o("434b"),n=o.n(a);for(var i in a)"default"!==i&&function(t){o.d(e,t,function(){return a[t]})}(i);e["default"]=n.a},"434b":function(t,e,o){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=function(){return o.e("components/jm-address/jm-address").then(o.bind(null,"0d97"))},n=(o("c4e7"),function(){return o.e("components/uni/mx-datepicker/mx-datepicker").then(o.bind(null,"51fd"))}),i={components:{addressed:a,MxDatePicker:n},data:function(){return{isShow:!1,provinceDataList:[],cityDataList:[],areaDataList:[],shop:{province:"",city:"",area:"",name:"",address:"",openDate:"",summary:"",contractor:"",telephone:"",coverID:""},category:{id:"",name:""},index:-1,imgList:[],coverList:[],cityLobal:"",titleValue:"",catalogList:[],type:"rangetime",showPicker:!1,value:"",openType:"",token:"",files:[]}},computed:{getOpenDate:function(){var t=new Date;return this.format(t,"YMD")}},onLoad:function(e){var o=this;this.getProvinceData(),this.getUploadToken(),t.getStorage({key:"userInfo",success:function(t){console.log(t.data," at pages\\tab-item-content\\shop-center\\record-shop\\record-shop.vue:189"),o.shop.contractor=t.data.name,o.shop.telephone=t.data.account}}),e&&e.subID?this.category={id:e.subID,name:e.subName}:e&&e.bigID&&!e.subID&&(this.category={id:e.bigID,name:e.bigName}),this.$fire.on("category",function(t){o.category.name=t.name,o.category.id=t.id})},methods:{uploadCover:function(){var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(o){var a=o.tempFilePaths;e.coverList=o.tempFilePaths,t.getStorage({key:"userInfo",success:function(o){var n=t.uploadFile({url:e.$store.state.uploadHostUrl+e.token,filePath:a[0],name:"file",formData:{"x:type":26,"x:owner":o.data.owner,"x:creator":o.data.id},success:function(t){var o=JSON.parse(t.data);e.shop.coverID=o.data,console.log(e.shop.coverID," at pages\\tab-item-content\\shop-center\\record-shop\\record-shop.vue:240")}});n.onProgressUpdate(function(e){100==e.progress&&t.showToast({title:"上传成功",icon:"none"})},function(e){t.showToast({title:"上传失败",icon:"none"})})}})}})},childClick:function(t){console.log(t," at pages\\tab-item-content\\shop-center\\record-shop\\record-shop.vue:266"),this.shop.province=t.provinceID,this.shop.city=t.cityID,this.shop.district=t.districtID},hideModal:function(){this.isShow=!1,this.cityLobal=this.province.name+"-"+this.city.name+"-"+this.area.name},areaChange:function(){var t=this,e=document.getElementById("city").value;this.areaDataList.forEach(function(o){o.id==e&&(t.area=o)})},cityChange:function(){var t=this,e=document.getElementById("city").value;this.$ajax("Districts",{parent:e},function(o){t.areaDataList=o,t.area=t.areaDataList[0],t.cityDataList.forEach(function(o){o.id==e&&(t.city=o,console.log(o.name," at pages\\tab-item-content\\shop-center\\record-shop\\record-shop.vue:293"))})})},provinceChange:function(){var t=this,e=document.getElementById("province").value;this.$ajax("Districts",{parent:e},function(o){t.cityDataList=o.data.data,t.city=t.cityDataList[0],t.provinceDataList.forEach(function(o){o.id==e&&(t.province=o)})})},checkTelEvent:function(e){console.log(e," at pages\\tab-item-content\\shop-center\\record-shop\\record-shop.vue:432"),e&&/^[1][3,4,5,7,8][0-9]{9}$/.test(e)&&t.showToast({title:"电话号码不存在",icon:"none"})},showShopCatalog:function(){t.navigateTo({url:"../category-item/category-item"})},getCatalog:function(){var t=this;this.$ajax("Constants",{type:this.$store.state.constants.repair_type,parent:-1,objects:1},function(e){t.catalogList=e})},onSelected:function(t){this.showPicker=!1,t&&(this[this.type]=t.value,this.shop.openDate=t.value.replace(/\//g,"-"))},onShowDatePicker:function(t){this.type=t,this.showPicker=!0,this.value=this[t]},showMulLinkageThreePicker:function(){this.isShow=!0},recordShop:function(){var e=this;t.getStorage({key:"userInfo",success:function(o){e.category.id&&e.shop.name&&e.shop.province&&e.shop.address?e.$ajax("NewProprietorShop",{manager:o.data.id,brand:e.category.id,name:e.shop.name,area:e.shop.area,address:e.shop.address,duedate:e.shop.openDate?e.shop.openDate:e.getOpenDate,summary:e.shop.summary?e.shop.summary:"",province:e.shop.province,city:e.shop.city,district:e.shop.district,coverurl:e.shop.coverID,status:3,type:2},function(o){t.showToast({title:"录入门店成功",icon:"none"}),setTimeout(function(){t.navigateBack({delta:1,success:function(t){e.$fire.fire("record-shop")}})},500)}):t.showToast({title:"请填写完整信息",icon:"none"})}})},getProvinceData:function(){var t=this;this.$ajax("Districts",{parent:0},function(e){t.provinceDataList=e,t.province=t.provinceDataList[0]})},goBack:function(){t.navigateBack({delta:1})},chooseImageEvent:function(){var e=this;t.chooseImage({count:9,sizeType:["original","compressed"],sourceType:["album"],success:function(o){var a=o.tempFilePaths;0!=e.imgList.length?e.imgList=e.imgList.concat(o.tempFilePaths):e.imgList=o.tempFilePaths,t.getStorage({key:"userInfo",success:function(n){for(var i=0;i<o.tempFilePaths.length;i++){var s=t.uploadFile({url:e.$store.state.uploadHostUrl+e.token,filePath:a[i],name:"file",formData:{"x:type":26,"x:owner":n.data.owner,"x:creator":n.data.id},success:function(t){var o=JSON.parse(t.data);e.files.push(o.data)}});s.onProgressUpdate(function(e){100==e.progress&&t.showToast({title:"上传成功",icon:"none"})},function(e){t.showToast({title:"上传失败",icon:"none"})})}}})}})},ViewImage:function(e,o){"cover"==o?t.previewImage({urls:this.coverList,current:2}):"file"==o&&t.previewImage({urls:this.imgList,current:e})},DelImg:function(e,o){var a=this;t.showModal({content:"确定删除？",cancelText:"取消",confirmText:"确定",success:function(n){n.confirm&&("cover"==o?(a.coverList.splice(e,1),a.$ajax("RemoveFiles",{id:a.files[e]},function(o){a.files.splice(e,1),t.showToast({title:"删除成功",icon:"none"})})):"file"==o&&(a.imgList.splice(e,1),a.$ajax("RemoveFiles",{id:a.files[e]},function(o){a.files.splice(e,1),t.showToast({title:"删除成功",icon:"none"})})))}})},getUploadToken:function(){var t=this;this.$ajax("UploadToken",{},function(e){t.token=e})}}};e.default=i}).call(this,o("6e42")["default"])},"46c3":function(t,e,o){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},n=[];o.d(e,"a",function(){return a}),o.d(e,"b",function(){return n})},"8b40":function(t,e,o){"use strict";o.r(e);var a=o("46c3"),n=o("02a0");for(var i in n)"default"!==i&&function(t){o.d(e,t,function(){return n[t]})}(i);o("caa2");var s=o("2877"),c=Object(s["a"])(n["default"],a["a"],a["b"],!1,null,null,null);e["default"]=c.exports},"8c2b":function(t,e,o){},caa2:function(t,e,o){"use strict";var a=o("8c2b"),n=o.n(a);n.a}},[["f9f7","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/shop-center/record-shop/record-shop.js');
__wxRoute = 'pages/tab-item-content/shop-center/repair-item/repair-item';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/shop-center/repair-item/repair-item.js';

define('pages/tab-item-content/shop-center/repair-item/repair-item.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/shop-center/repair-item/repair-item"],{9344:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},r=[];i.d(e,"a",function(){return a}),i.d(e,"b",function(){return r})},c547:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=function(){return i.e("components/uni/uni-tag/uni-tag").then(i.bind(null,"2f43"))},r={data:function(){return{categoryList:[],subCategoryList:[],height:0,categoryActive:0,categorySubActive:1e3,scrollTop:0,scrollHeight:0,repairObj:{bigID:"",subID:"",bigName:"",subName:""},list:[]}},components:{uniTag:a},methods:{choseRepair:function(){var e=this;t.navigateBack({delta:1,success:function(t){e.$fire.fire("repair",e.repairObj)}})},scroll:function(t){this.scrollHeight=t.detail.scrollHeight},categoryClickMain:function(t,e){this.categoryActive=e,this.categorySubActive=1e3,this.subCategoryList=t.subCategoryList,this.scrollTop=-this.scrollHeight*e,this.repairObj={bigName:t.obj.val,bigID:t.obj.id,subID:"",subName:""}},categoryClickSub:function(t,e){this.categorySubActive=e,this.scrollTop=-this.scrollHeight*e,this.repairObj={bigName:this.repairObj.bigName,bigID:this.repairObj.bigID,subID:t.obj.id,subName:t.obj.val}},getCategory:function(){var e=this;t.request({url:this.$store.state.url+"Constants",data:{owner:18,type:this.$store.state.constants.repair_type,parent:-1,objects:1},success:function(t){e.list=t.data.data;var i=[],a=[];t.data.data.forEach(function(t){0==t.parent?i.push(t):a.push(t)}),e.repairObj.subID=a[0].id;for(var r=0;r<i.length;r++){for(var s=[],n=0;n<a.length;n++)a[n].parent==i[r].id&&s.push({name:a[n].val,obj:a[n]});e.categoryList.push({name:i[r].val,subCategoryList:s,obj:i[r]})}e.subCategoryList=e.categoryList[0].subCategoryList,e.repairObj={bigName:e.categoryList[0].obj.val,bigID:e.categoryList[0].obj.id,subID:"",subName:""}}})}},onLoad:function(){var e=this;this.getCategory(),t.getSystemInfo({success:function(t){e.height=t.screenHeight}})}};e.default=r}).call(this,i("6e42")["default"])},cc4b:function(t,e,i){"use strict";i.r(e);var a=i("9344"),r=i("d7c4");for(var s in r)"default"!==s&&function(t){i.d(e,t,function(){return r[t]})}(s);i("db13");var n=i("2877"),o=Object(n["a"])(r["default"],a["a"],a["b"],!1,null,null,null);e["default"]=o.exports},d7c4:function(t,e,i){"use strict";i.r(e);var a=i("c547"),r=i.n(a);for(var s in a)"default"!==s&&function(t){i.d(e,t,function(){return a[t]})}(s);e["default"]=r.a},db13:function(t,e,i){"use strict";var a=i("f242"),r=i.n(a);r.a},f242:function(t,e,i){}},[["a192","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/shop-center/repair-item/repair-item.js');
__wxRoute = 'pages/tab-item-content/mine-center/input-code/input-code';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/mine-center/input-code/input-code.js';

define('pages/tab-item-content/mine-center/input-code/input-code.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/mine-center/input-code/input-code"],{"0501":function(e,n,t){"use strict";t.r(n);var o=t("6e49"),i=t.n(o);for(var c in o)"default"!==c&&function(e){t.d(n,e,function(){return o[e]})}(c);n["default"]=i.a},"2f4c":function(e,n,t){"use strict";var o=t("5e2f"),i=t.n(o);i.a},"5e2f":function(e,n,t){},"6aa6":function(e,n,t){},"6dbe":function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement;e._self._c;e._isMounted||(e.e0=function(n){e.keyboardVisible=!1})},i=[];t.d(n,"a",function(){return o}),t.d(n,"b",function(){return i})},"6e49":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){return t.e("components/code/number-keyboard").then(t.bind(null,"2b33"))},i={components:{NumberKeyboard:o},data:function(){return{config:{count:[{index:1,key:"valid-code-input-1"},{index:2,key:"valid-code-input-2"},{index:3,key:"valid-code-input-3"},{index:4,key:"valid-code-input-4"},{index:5,key:"valid-code-input-5"},{index:6,key:"valid-code-input-6"}]},keyboardVisible:!0,currentFocus:1,mobile:"",code:[],validCode:"",style:{inputWidth:"40upx",inputHeight:"100upx"}}},methods:{inputCode:function(e){console.log(e," at pages\\tab-item-content\\mine-center\\input-code\\input-code.vue:89"),this.code[this.currentFocus-1]=e,this.currentFocus,this.currentFocus<=6&&this.currentFocus++},deleteCode:function(){this.currentFocus--,this.code.splice(-1,1)},hanldeOpenKeyboard:function(){console.log("kkkk"," at pages\\tab-item-content\\mine-center\\input-code\\input-code.vue:125"),this.keyboardVisible=!0},sendMessage:function(){e.showToast({title:"验证码发送成功",icon:"none"})}},onReady:function(){},onShow:function(){},onLoad:function(e){this.mobile=e.mobile}};n.default=i}).call(this,t("6e42")["default"])},"9ead":function(e,n,t){"use strict";t.r(n);var o=t("6dbe"),i=t("0501");for(var c in i)"default"!==c&&function(e){t.d(n,e,function(){return i[e]})}(c);t("2f4c"),t("ed6c");var u=t("2877"),d=Object(u["a"])(i["default"],o["a"],o["b"],!1,null,"43bf5d20",null);n["default"]=d.exports},ed6c:function(e,n,t){"use strict";var o=t("6aa6"),i=t.n(o);i.a}},[["6cb3","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/mine-center/input-code/input-code.js');
__wxRoute = 'pages/tab-item-content/mine-center/change-telephone/change-telephone';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/mine-center/change-telephone/change-telephone.js';

define('pages/tab-item-content/mine-center/change-telephone/change-telephone.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/mine-center/change-telephone/change-telephone"],{"3aae":function(n,e,t){"use strict";var o=function(){var n=this,e=n.$createElement;n._self._c},c=[];t.d(e,"a",function(){return o}),t.d(e,"b",function(){return c})},"57a6":function(n,e,t){"use strict";t.r(e);var o=t("3aae"),c=t("798c");for(var i in c)"default"!==i&&function(n){t.d(e,n,function(){return c[n]})}(i);t("852b");var u=t("2877"),a=Object(u["a"])(c["default"],o["a"],o["b"],!1,null,null,null);e["default"]=a.exports},"798c":function(n,e,t){"use strict";t.r(e);var o=t("8759"),c=t.n(o);for(var i in o)"default"!==i&&function(n){t.d(e,n,function(){return o[n]})}(i);e["default"]=c.a},"852b":function(n,e,t){"use strict";var o=t("bcc8"),c=t.n(o);c.a},8759:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=function(){return t.e("components/popmodal").then(t.bind(null,"e269"))},c={data:function(){return{telephone:"",checked:!0,isShow:!1,userInfo:""}},components:{popModal:o},onLoad:function(){var e=this;n.getStorage({key:"userInfo",success:function(n){e.userInfo=n.data}})},methods:{refuse:function(){this.checked=!1},changeTelephone:function(){this.telephone||n.showToast({title:"请输入电话号码",icon:"none"})},hideModal:function(){this.isShow=!1},checkTelEvent:function(e){/^1[345678]\d{9}$/.test(e)?(n.showToast({title:"输入电话号码有误",icon:"none"}),this.isShow=!1):this.isShow=!0},inputCheckCard:function(){n.navigateTo({url:"../input-code/input-code?mobile="+this.userInfo.mobile})}}};e.default=c}).call(this,t("6e42")["default"])},bcc8:function(n,e,t){}},[["6193","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/mine-center/change-telephone/change-telephone.js');
__wxRoute = 'pages/tab-item-content/mine-center/account-manager/account-manager';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/mine-center/account-manager/account-manager.js';

define('pages/tab-item-content/mine-center/account-manager/account-manager.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/mine-center/account-manager/account-manager"],{"28d3":function(n,e,t){"use strict";var a=function(){var n=this,e=n.$createElement;n._self._c},u=[];t.d(e,"a",function(){return a}),t.d(e,"b",function(){return u})},"4d7f":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={data:function(){return{}},methods:{changeTel:function(){n.navigateTo({url:"../change-telephone/change-telephone"})}}};e.default=t}).call(this,t("6e42")["default"])},"5b93":function(n,e,t){"use strict";t.r(e);var a=t("4d7f"),u=t.n(a);for(var c in a)"default"!==c&&function(n){t.d(e,n,function(){return a[n]})}(c);e["default"]=u.a},a8e8:function(n,e,t){},c8ab:function(n,e,t){"use strict";t.r(e);var a=t("28d3"),u=t("5b93");for(var c in u)"default"!==c&&function(n){t.d(e,n,function(){return u[n]})}(c);t("f82b");var o=t("2877"),r=Object(o["a"])(u["default"],a["a"],a["b"],!1,null,null,null);e["default"]=r.exports},f82b:function(n,e,t){"use strict";var a=t("a8e8"),u=t.n(a);u.a}},[["7e0c","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/mine-center/account-manager/account-manager.js');
__wxRoute = 'pages/tab-item-content/work-center/work-index/work-index';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/work-center/work-index/work-index.js';

define('pages/tab-item-content/work-center/work-index/work-index.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/work-center/work-index/work-index"],{"0c2c":function(t,e,n){"use strict";n.r(e);var r=n("67bb"),a=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,function(){return r[t]})}(o);e["default"]=a.a},"179c":function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return r}),n.d(e,"b",function(){return a})},"67bb":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{TabCur:0,tabList:["工作日志","快递包裹","我的报修"]}},methods:{tabSelect:function(t){this.TabCur=t},createWork:function(e){0==e?t.navigateTo({url:"../create-log/create-log"}):1==e&&t.navigateTo({url:"../../shop-center/create-order/create-order"})},itemDetail:function(e){0==e?t.navigateTo({url:"../log-detail/log-detail"}):1==e&&t.navigateTo({url:"../../shop-center/repair-order-item/repair-order-item"})}}};e.default=n}).call(this,n("6e42")["default"])},a909:function(t,e,n){},abb8:function(t,e,n){"use strict";var r=n("a909"),a=n.n(r);a.a},d74a:function(t,e,n){"use strict";n.r(e);var r=n("179c"),a=n("0c2c");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);n("abb8");var u=n("2877"),c=Object(u["a"])(a["default"],r["a"],r["b"],!1,null,null,null);e["default"]=c.exports}},[["33f6","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/work-center/work-index/work-index.js');
__wxRoute = 'pages/tab-item-content/notice-center/notice-center';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/notice-center/notice-center.js';

define('pages/tab-item-content/notice-center/notice-center.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/notice-center/notice-center"],{1212:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.todoList.map(function(e,n){var a=t._f("formatTime")(e.occtime,"YMDHMS"),o=t._f("todoType")(e.type);return{$orig:t.__get_orig(e),f0:a,f1:o}})),a=t.todoList.map(function(e,n){var a=t._f("formatTime")(e.occtime,"YMDHMS"),o=t._f("todoType")(e.type);return{$orig:t.__get_orig(e),f2:a,f3:o}});t.$mp.data=Object.assign({},{$root:{l0:n,l1:a}})},o=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o})},"2bdc":function(t,e,n){},"38a6":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{noticeList:[],todoList:[],TabCur:0,scrollLeft:0,isCard:!1,titleList:[{name:"待办通知"},{name:"动态通知"},{name:"公司公告"}],noticeType:{}}},onLoad:function(){this.switchTabCur(0),this.noticeType=this.$store.state.noticeType},methods:{tabSelect:function(t){this.TabCur=t.currentTarget.dataset.id,this.scrollLeft=60*(t.currentTarget.dataset.id-1),this.switchTabCur(this.TabCur)},IsCard:function(t){this.isCard=t.detail.value},switchTabCur:function(t){var e=this;0==t?this.$ajax("EventFlows",{account:1,contract:0,status:1,catalog:this.$store.state.notice.todo,psize:-1},function(t){e.todoList=t}):1==t&&this.$ajax("EventFlows",{account:1,contract:0,status:0,catalog:this.$store.state.notice.info},function(t){e.todoList=t})}}};e.default=a},"6aaa":function(t,e,n){"use strict";var a=n("2bdc"),o=n.n(a);o.a},dd7b:function(t,e,n){"use strict";n.r(e);var a=n("1212"),o=n("eda3");for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);n("6aaa");var r=n("2877"),c=Object(r["a"])(o["default"],a["a"],a["b"],!1,null,null,null);e["default"]=c.exports},eda3:function(t,e,n){"use strict";n.r(e);var a=n("38a6"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=o.a}},[["efd7","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/notice-center/notice-center.js');
__wxRoute = 'pages/tab-item-content/shop-center/near-shop-list/near-shop-list';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/shop-center/near-shop-list/near-shop-list.js';

define('pages/tab-item-content/shop-center/near-shop-list/near-shop-list.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/shop-center/near-shop-list/near-shop-list"],{"1abb":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{shopList:[],shopAddress:"",type:""}},components:{},onLoad:function(t){this.type=t.type,console.log(this.type," at pages\\tab-item-content\\shop-center\\near-shop-list\\near-shop-list.vue:50"),this.getNearShopList()},methods:{searchMore:function(){t.navigateTo({url:"../search-more-shop/search-more-shop"})},createAddress:function(){t.navigateTo({url:"../../work-center/express-center/create-address/create-address"})},getNearShopList:function(){var t=this;this.$ajax("MyShops",{address:""},function(e){t.shopList=e,console.log(t.shopList," at pages\\tab-item-content\\shop-center\\near-shop-list\\near-shop-list.vue:72")})},choseShop:function(e){var n=this;t.navigateBack({delta:1,success:function(t){n.$fire.fire("shop",e)}})}}};e.default=n}).call(this,n("6e42")["default"])},3037:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},s=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return s})},"3ccc":function(t,e,n){},"97d8":function(t,e,n){"use strict";n.r(e);var o=n("3037"),s=n("bbd2");for(var a in s)"default"!==a&&function(t){n.d(e,t,function(){return s[t]})}(a);n("f8ac");var r=n("2877"),c=Object(r["a"])(s["default"],o["a"],o["b"],!1,null,null,null);e["default"]=c.exports},bbd2:function(t,e,n){"use strict";n.r(e);var o=n("1abb"),s=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);e["default"]=s.a},f8ac:function(t,e,n){"use strict";var o=n("3ccc"),s=n.n(o);s.a}},[["6221","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/shop-center/near-shop-list/near-shop-list.js');
__wxRoute = 'pages/tab-item-content/shop-center/shop-center';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/shop-center/shop-center.js';

define('pages/tab-item-content/shop-center/shop-center.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/shop-center/shop-center"],{"15bf":function(t,e,a){},"4ee6":function(t,e,a){"use strict";var r=a("15bf"),n=a.n(r);n.a},"88dd":function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=(t._self._c,t.repairList.map(function(e,a){var r=t._f("repairStatus")(e.status),n=t._f("formatTime")(e.createdate,"YMDHMS");return{$orig:t.__get_orig(e),f0:r,f1:n}}));t.$mp.data=Object.assign({},{$root:{l0:a}})},n=[];a.d(e,"a",function(){return r}),a.d(e,"b",function(){return n})},b6c4:function(t,e,a){"use strict";a.r(e);var r=a("88dd"),n=a("d131");for(var i in n)"default"!==i&&function(t){a.d(e,t,function(){return n[t]})}(i);a("4ee6");var o=a("2877"),s=Object(o["a"])(n["default"],r["a"],r["b"],!1,null,null,null);e["default"]=s.exports},d131:function(t,e,a){"use strict";a.r(e);var r=a("d706"),n=a.n(r);for(var i in r)"default"!==i&&function(t){a.d(e,t,function(){return r[t]})}(i);e["default"]=n.a},d706:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{repairStatus:this.$store.state.repairStatus,statusList:[{id:0,name:"未处理",value:"orders",status:this.$store.state.repairStatus.untreated},{id:1,name:"处理中",value:"unfinish",status:this.$store.state.repairStatus.treating},{id:2,name:"无效",value:"during",status:this.$store.state.repairStatus.refuse},{id:3,name:"已完成",value:"refuse",status:this.$store.state.repairStatus.finish}],TabCur:0,scrollLeft:0,repairList:[],userInfo:{},type:""}},components:{},computed:{},methods:{checkComment:function(e){t.navigateTo({url:"./create-comment/create-comment?orderID="+e.id+"&type=check"})},delOrder:function(t){},radioChangeType:function(t){console.log(t," at pages\\tab-item-content\\shop-center\\shop-center.vue:109")},orderDetail:function(e){t.navigateTo({url:"./repair-order-item/repair-order-item?id="+e.id})},createRepair:function(){t.navigateTo({url:"./create-order/create-order"})},tabSelect:function(t){this.TabCur=t.id,this.getRepairList(t.status)},goBack:function(){t.navigateBack({delta:1})},createComment:function(e){console.log(e," at pages\\tab-item-content\\shop-center\\shop-center.vue:137"),t.navigateTo({url:"./create-comment/create-comment?orderID="+e.id+"&type=create"})},getRepairList:function(t){var e=this;this.$ajax("ServiceOrders",{catalog:-1,status:t,stored:"all"==this.type?1:0},function(t){e.repairList=t})}},onLoad:function(t){t&&(this.type=t.type),this.getRepairList(this.$store.state.repairStatus.untreated)}};e.default=a}).call(this,a("6e42")["default"])}},[["b115","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/shop-center/shop-center.js');
__wxRoute = 'pages/tab-item-content/work-center/create-log/create-log';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/work-center/create-log/create-log.js';

define('pages/tab-item-content/work-center/create-log/create-log.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/work-center/create-log/create-log"],{"0fcd":function(t,e,n){"use strict";n.r(e);var o=n("661f"),c=n("523d");for(var i in c)"default"!==i&&function(t){n.d(e,t,function(){return c[t]})}(i);n("69fc");var u=n("2877"),a=Object(u["a"])(c["default"],o["a"],o["b"],!1,null,null,null);e["default"]=a.exports},"523d":function(t,e,n){"use strict";n.r(e);var o=n("8590"),c=n.n(o);for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);e["default"]=c.a},6007:function(t,e,n){},"661f":function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},c=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return c})},"69fc":function(t,e,n){"use strict";var o=n("6007"),c=n.n(o);c.a},8590:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{shop:"",log:{title:"",content:""},imgList:[],copyList:["喵喵喵","汪汪汪","哼唧哼唧"],index:-1}},methods:{ChooseImage:function(){var e=this;t.chooseImage({count:4,sizeType:["original","compressed"],sourceType:["album"],success:function(t){0!=e.imgList.length?e.imgList=e.imgList.concat(t.tempFilePaths):e.imgList=t.tempFilePaths}})},InputFocus:function(t){console.log("InputFocus"," at pages\\tab-item-content\\work-center\\create-log\\create-log.vue:99")},ViewImage:function(e){t.previewImage({urls:this.imgList,current:e.currentTarget.dataset.url})},DelImg:function(e){var n=this;t.showModal({content:"确定要删除？",cancelText:"取消",confirmText:"确定",success:function(t){t.confirm&&n.imgList.splice(e.currentTarget.dataset.index,1)}})},PickerChange:function(t){this.index=t.detail.value},goChoseCopy:function(){t.navigateTo({url:"../chose-copy/chose-copy"})}}};e.default=n}).call(this,n("6e42")["default"])}},[["31ef","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/work-center/create-log/create-log.js');
__wxRoute = 'pages/login-design/find-password/find-password';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/login-design/find-password/find-password.js';

define('pages/login-design/find-password/find-password.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login-design/find-password/find-password"],{"04f4":function(e,n,t){"use strict";t.r(n);var o=t("af7e"),i=t("799d");for(var s in i)"default"!==s&&function(e){t.d(n,e,function(){return i[e]})}(s);t("b9ef");var a=t("2877"),d=Object(a["a"])(i["default"],o["a"],o["b"],!1,null,null,null);n["default"]=d.exports},"42c2":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={data:function(){return{isInput:!1,checkTel:!1,isSend:!1,num:60,designer:{mobile:"",vcode:""}}},components:{},onLoad:function(){},methods:{sendMessage:function(){var n=this;console.log("kkkk"," at pages\\login-design\\find-password\\find-password.vue:80"),this.designer.mobile?(this.isSend=!0,this.$ajax("SendVerCode",{mobile:this.designer.mobile},function(n){console.log(n," at pages\\login-design\\find-password\\find-password.vue:89"),e.showToast({title:"短信已发送，请注意接受",icon:"none"})},!1),setInterval(function(){n.num>=0&&(n.num--,0==n.num&&(n.isSend=!1))},1e3)):e.showToast({title:"请输入电话号码",icon:"none"})},toResetPassword:function(){this.designer.vcode?e.navigateTo({url:"../reset-password/reset-password?mobile="+this.designer.mobile+"&vcode="+this.designer.vcode}):e.showToast({title:"请输入验证码",icon:"none"})},checkTelEvent:function(n){if(n){if(!/^1[34578]\d{9}$/.test(n))return e.showToast({title:"电话号码不存在",icon:"none"}),void(this.checkTel=!0);this.checkTel=!1}}}};n.default=t}).call(this,t("6e42")["default"])},6712:function(e,n,t){},"799d":function(e,n,t){"use strict";t.r(n);var o=t("42c2"),i=t.n(o);for(var s in o)"default"!==s&&function(e){t.d(n,e,function(){return o[e]})}(s);n["default"]=i.a},af7e:function(e,n,t){"use strict";var o=function(){var e=this,n=e.$createElement;e._self._c},i=[];t.d(n,"a",function(){return o}),t.d(n,"b",function(){return i})},b9ef:function(e,n,t){"use strict";var o=t("6712"),i=t.n(o);i.a}},[["f3b0","common/runtime","common/vendor"]]]);
});
require('pages/login-design/find-password/find-password.js');
__wxRoute = 'pages/login-design/reset-password/reset-password';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/login-design/reset-password/reset-password.js';

define('pages/login-design/reset-password/reset-password.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login-design/reset-password/reset-password"],{"5ba9":function(e,n,t){"use strict";var i=t("865e"),o=t.n(i);o.a},"865e":function(e,n,t){},"888c":function(e,n,t){"use strict";var i=function(){var e=this,n=e.$createElement;e._self._c},o=[];t.d(n,"a",function(){return i}),t.d(n,"b",function(){return o})},"99b2":function(e,n,t){"use strict";t.r(n);var i=t("888c"),o=t("f161");for(var s in o)"default"!==s&&function(e){t.d(n,e,function(){return o[e]})}(s);t("5ba9");var c=t("2877"),r=Object(c["a"])(o["default"],i["a"],i["b"],!1,null,null,null);n["default"]=r.exports},b210:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={data:function(){return{isInput:!1,isSame:!0,designer:{pwd:"",confirmPwd:"",mobile:"",vcode:""},sameStyle:{color:"red"}}},components:{},onLoad:function(e){this.designer.mobile=e.mobile,this.designer.vcode=e.vcode},methods:{resetPassword:function(){this.designer.pwd&&this.designer.confirmPwd?this.$ajax("InitPwd",{vcode:this.designer.vcode,token:this.designer.confirmPwd,mobile:this.designer.mobile},function(n){e.showToast({title:"设置密码成功",icon:"none"}),setTimeout(function(){e.navigateTo({url:"../../login-design/login/login"})},800)},!1):e.showToast({title:"请输入密码",icon:"none"})},checkPwdEvent:function(n){if(n){var t=/^[a-zA-Z0-9]{6,12}$/;0==t.test(n)?e.showToast({title:"密码不能含有非法字符，长度在6-12之间",icon:"none"}):this.checkPwd=!0}},checkConfirmEvent:function(n){this.isSame||(this.isSame=!0),this.designer.pwd!=n&&(this.isSame=!1,e.showToast({title:"两次输入的密码不一致",icon:"none"}))}}};n.default=t}).call(this,t("6e42")["default"])},f161:function(e,n,t){"use strict";t.r(n);var i=t("b210"),o=t.n(i);for(var s in i)"default"!==s&&function(e){t.d(n,e,function(){return i[e]})}(s);n["default"]=o.a}},[["9ab5","common/runtime","common/vendor"]]]);
});
require('pages/login-design/reset-password/reset-password.js');
__wxRoute = 'pages/tab-item-content/shop-center/clerk-list/clerk-list';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/shop-center/clerk-list/clerk-list.js';

define('pages/tab-item-content/shop-center/clerk-list/clerk-list.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/shop-center/clerk-list/clerk-list"],{2070:function(t,e,n){},"21e5":function(t,e,n){"use strict";var i=n("2070"),o=n.n(i);o.a},3353:function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return o})},"584d":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=function(){return n.e("components/popmodal").then(n.bind(null,"e269"))},o={data:function(){return{salemanStatus:this.$store.state.userStatus,modalName:null,radio:"radio1",shopItem:"",isShow:!1,designer:{name:"",telephone:""},manager:this.$store.state.userInfo,userList:[],isWrongName:!1,isWrongTel:!1}},components:{popModal:i},methods:{SendInvitationEvent:function(e){this.$ajax("SendInvitation",{user:e.id},function(n){e.isSend=!0,t.showToast({title:"已发送短信邀请",icon:"none"})})},checkNameEvent:function(t){t||(this.isWrongName=!0)},checkTelEvent:function(t){this.isWrongTel&&(this.isWrongTel=!1),t.detail.value&&(/^1[345678]\d{9}$/.test(t.detail.value)||(this.isWrongTel=!0))},setShopManager:function(){},inviteJoin:function(){this.isShow=!0,this.designer.name="",this.designer.telephone=""},showModal:function(t){this.modalName=t.currentTarget.dataset.target},hideModal:function(){this.isShow=!1},RadioChange:function(t){this.radio=t.detail.value},checkShopDetail:function(t){var e=this;this.$ajax("ProprietorShop",{id:t},function(t){e.shopItem=t}),this.$ajax("ShopSalesmen",{shop:t},function(t){t.forEach(function(t){t.isSend=!1}),e.userList=t})},recordUser:function(){var e=this;console.log(this.isWrongName,this.isWrongTel," at pages\\tab-item-content\\shop-center\\clerk-list\\clerk-list.vue:219"),this.isWrongName||this.isWrongTel||this.$ajax("Signup",{name:this.designer.name,mobile:this.designer.telephone,type:4,team:this.shopItem.id},function(n){t.showToast({title:"录入店员成功",icon:"none"}),e.isShow=!1,e.$ajax("ShopSalesmen",{shop:e.shopItem.id},function(t){e.userList=t})})}},onLoad:function(t){t&&this.checkShopDetail(t.shopID)}};e.default=o}).call(this,n("6e42")["default"])},"8ef9":function(t,e,n){"use strict";n.r(e);var i=n("3353"),o=n("d040");for(var s in o)"default"!==s&&function(t){n.d(e,t,function(){return o[t]})}(s);n("21e5");var a=n("2877"),r=Object(a["a"])(o["default"],i["a"],i["b"],!1,null,null,null);e["default"]=r.exports},d040:function(t,e,n){"use strict";n.r(e);var i=n("584d"),o=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);e["default"]=o.a}},[["01f9","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/shop-center/clerk-list/clerk-list.js');
__wxRoute = 'pages/tab-item-content/shop-center/invite-join/invite-join';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/shop-center/invite-join/invite-join.js';

define('pages/tab-item-content/shop-center/invite-join/invite-join.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/shop-center/invite-join/invite-join"],{b3d9:function(n,t,e){"use strict";var o=function(){var n=this,t=n.$createElement;n._self._c},i=[];e.d(t,"a",function(){return o}),e.d(t,"b",function(){return i})},cbe0:function(n,t,e){"use strict";e.r(t);var o=e("b3d9"),i=e("f197");for(var u in i)"default"!==u&&function(n){e.d(t,n,function(){return i[n]})}(u);var a=e("2877"),c=Object(a["a"])(i["default"],o["a"],o["b"],!1,null,null,null);t["default"]=c.exports},de23:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={data:function(){return{designer:{name:"",telephone:""},isShow:!1}},components:{},onLoad:function(){},methods:{hideModal:function(n){this.modalName=null},checkTelEvent:function(t){console.log(t," at pages\\tab-item-content\\shop-center\\invite-join\\invite-join.vue:115"),t&&(/^1[34578]\d{9}$/.test(t)||n.showToast({title:"电话号码不存在",icon:"none"}))}}};t.default=e}).call(this,e("6e42")["default"])},f197:function(n,t,e){"use strict";e.r(t);var o=e("de23"),i=e.n(o);for(var u in o)"default"!==u&&function(n){e.d(t,n,function(){return o[n]})}(u);t["default"]=i.a}},[["d48a","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/shop-center/invite-join/invite-join.js');
__wxRoute = 'pages/tab-item-content/shop-center/join-shop/join-shop';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/shop-center/join-shop/join-shop.js';

define('pages/tab-item-content/shop-center/join-shop/join-shop.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/shop-center/join-shop/join-shop"],{"03f0":function(e,t,n){},"2b59":function(e,t,n){"use strict";n.r(t);var i=n("88b5"),c=n("a31f");for(var o in c)"default"!==o&&function(e){n.d(t,e,function(){return c[e]})}(o);n("6afa");var r=n("2877"),a=Object(r["a"])(c["default"],i["a"],i["b"],!1,null,null,null);t["default"]=a.exports},"6afa":function(e,t,n){"use strict";var i=n("03f0"),c=n.n(i);c.a},"88b5":function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement;e._self._c},c=[];n.d(t,"a",function(){return i}),n.d(t,"b",function(){return c})},a31f:function(e,t,n){"use strict";n.r(t);var i=n("ec02"),c=n.n(i);for(var o in i)"default"!==o&&function(e){n.d(t,e,function(){return i[e]})}(o);t["default"]=c.a},ec02:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={components:{},data:function(){return{index:-1,mulLinkageTwoPicker:cityData,cityPickerValueDefault:[0,0,1],cityLobal:"",themeColor:"#007AFF",mode:"",deepLength:1,pickerValueDefault:[0],pickerValueArray:[],shoplist:["喵喵喵","汪汪汪","哼唧哼唧"],titleValue:""}},onLoad:function(e){"record"==e.name?this.titleValue="录入门店":"join"==e.name&&(this.titleValue="加入门店")},methods:{showMulLinkageThreePicker:function(){this.$refs.mpvueCityPicker.show()},onConfirm:function(e){this.cityLobal=e.label,this.pickerText=JSON.stringify(e)},onCancel:function(e){},onBackPress:function(){return this.$refs.mpvuePicker.showPicker?(this.$refs.mpvuePicker.pickerCancel(),!0):this.$refs.mpvueCityPicker.showPicker?(this.$refs.mpvueCityPicker.pickerCancel(),!0):void 0},onUnload:function(){this.$refs.mpvuePicker.showPicker&&this.$refs.mpvuePicker.pickerCancel(),this.$refs.mpvueCityPicker.showPicker&&this.$refs.mpvueCityPicker.pickerCancel()},PickerChange:function(e){console.log(e," at pages\\tab-item-content\\shop-center\\join-shop\\join-shop.vue:123")},goBack:function(){e.navigateBack({delta:1})}}};t.default=n}).call(this,n("6e42")["default"])}},[["8198","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/shop-center/join-shop/join-shop.js');
__wxRoute = 'pages/all-item-content/detail-content/detail-content';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/all-item-content/detail-content/detail-content.js';

define('pages/all-item-content/detail-content/detail-content.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/all-item-content/detail-content/detail-content"],{"240f":function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement,e=(t._self._c,t._f("formatTime")(t.itemInfo.createdate,"YMD"));t.$mp.data=Object.assign({},{$root:{f0:e}})},a=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return a})},9012:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={data:function(){return{itemInfo:"",shopInfo:"",type:""}},methods:{getItemInfo:function(t){var n=this;this.$ajax("Article",{id:t},function(t){n.itemInfo=t,console.log(n.itemInfo," at pages\\all-item-content\\detail-content\\detail-content.vue:38"),n.getShopInfo(t.shop)})},getShopInfo:function(t){var n=this;this.$ajax("ProprietorShop",{id:t},function(t){n.shopInfo=t})}},onLoad:function(t){console.log(t," at pages\\all-item-content\\detail-content\\detail-content.vue:49"),t&&(this.getItemInfo(t.id),this.type=t.type)}};n.default=o},ac4b:function(t,n,e){"use strict";e.r(n);var o=e("240f"),a=e("f0cc");for(var i in a)"default"!==i&&function(t){e.d(n,t,function(){return a[t]})}(i);e("dae0");var c=e("2877"),f=Object(c["a"])(a["default"],o["a"],o["b"],!1,null,"a73cfbd2",null);n["default"]=f.exports},d597:function(t,n,e){},dae0:function(t,n,e){"use strict";var o=e("d597"),a=e.n(o);a.a},f0cc:function(t,n,e){"use strict";e.r(n);var o=e("9012"),a=e.n(o);for(var i in o)"default"!==i&&function(t){e.d(n,t,function(){return o[t]})}(i);n["default"]=a.a}},[["647e","common/runtime","common/vendor"]]]);
});
require('pages/all-item-content/detail-content/detail-content.js');
__wxRoute = 'pages/tab-item-content/shop-center/repair-order-item/repair-order-item';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/shop-center/repair-order-item/repair-order-item.js';

define('pages/tab-item-content/shop-center/repair-order-item/repair-order-item.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/shop-center/repair-order-item/repair-order-item"],{"0dbd":function(t,e,a){"use strict";var r=a("206a"),n=a.n(r);n.a},"206a":function(t,e,a){},"31b2":function(t,e,a){"use strict";a.r(e);var r=a("ce54"),n=a("7966");for(var i in n)"default"!==i&&function(t){a.d(e,t,function(){return n[t]})}(i);a("0dbd");var o=a("2877"),u=Object(o["a"])(n["default"],r["a"],r["b"],!1,null,null,null);e["default"]=u.exports},"503d":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=function(){return a.e("components/uni-grid/uni-grid").then(a.bind(null,"9704"))},n={data:function(){return{avatar:[],modalName:null,repaitItem:""}},components:{uniGrid:r},methods:{tabSelect:function(t){this.TabCur=t.currentTarget.dataset.id,this.scrollLeft=60*(t.currentTarget.dataset.id-1)},showModal:function(t){this.modalName=t.currentTarget.dataset.target},hideModal:function(){this.modalName=""},viewImg:function(){var e=[];this.repaitItem.files.forEach(function(t){t.postfix&&e.push(t.url)}),t.previewImage({urls:e})},getRepairItem:function(t){var e=this;this.$ajax("ServiceOrder",{id:t},function(t){e.repaitItem=t,t.files.forEach(function(t){e.avatar.push({image:t.url,text:""})}),console.log(e.avatar," at pages\\tab-item-content\\shop-center\\repair-order-item\\repair-order-item.vue:271")})}},onLoad:function(t){this.getRepairItem(t.id)}};e.default=n}).call(this,a("6e42")["default"])},7966:function(t,e,a){"use strict";a.r(e);var r=a("503d"),n=a.n(r);for(var i in r)"default"!==i&&function(t){a.d(e,t,function(){return r[t]})}(i);e["default"]=n.a},ce54:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=(t._self._c,t._f("formatTime")(t.repaitItem.appointdate,"YMD")),r=t._f("repairStatus")(t.repaitItem.status),n=t._f("formatTime")(t.repaitItem.createdate,"YMDHMS");t.$mp.data=Object.assign({},{$root:{f0:a,f1:r,f2:n}})},n=[];a.d(e,"a",function(){return r}),a.d(e,"b",function(){return n})}},[["8d14","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/shop-center/repair-order-item/repair-order-item.js');
__wxRoute = 'pages/tab-item-content/shop-center/search-shop/search-shop';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/shop-center/search-shop/search-shop.js';

define('pages/tab-item-content/shop-center/search-shop/search-shop.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/shop-center/search-shop/search-shop"],{"3fef":function(t,e,n){"use strict";n.r(e);var s=n("b920"),r=n.n(s);for(var i in s)"default"!==i&&function(t){n.d(e,t,function(){return s[t]})}(i);e["default"]=r.a},"44b6":function(t,e,n){},a564:function(t,e,n){"use strict";var s=n("44b6"),r=n.n(s);r.a},b17a:function(t,e,n){"use strict";n.r(e);var s=n("e303"),r=n("3fef");for(var i in r)"default"!==i&&function(t){n.d(e,t,function(){return r[t]})}(i);n("a564");var a=n("2877"),o=Object(a["a"])(r["default"],s["a"],s["b"],!1,null,null,null);e["default"]=o.exports},b920:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{index:-1,mulLinkageTwoPicker:cityData,cityPickerValueDefault:[0,0,1],cityLobal:"",themeColor:"#007AFF",mode:"",deepLength:1,pickerValueDefault:[0],pickerValueArray:[],provinceID:0,cityID:0,districtID:0,brandList:[],brandNameList:[],brandID:0}},components:{},methods:{provinceChange:function(t){conosle.log("111"),console.log(t," at pages\\tab-item-content\\shop-center\\search-shop\\search-shop.vue:66")},getProvince:function(){var e=this;t.request({url:this.$store.state.url+"Districts",data:{owner:this.$store.state.userInfo.owner,userId:this.$store.state.userInfo.id,parent:0},success:function(t){e.provinceData=t.data.data}})},bingChange:function(t){},showMulLinkageThreePicker:function(){this.$refs.mpvueCityPicker.show()},PickerChange:function(t){var e=this;this.index=t.detail.value,this.brandList.forEach(function(t){t.value==e.brandNameList[e.index]&&(e.brandID=t.id)})},onConfirm:function(e){var n=this,s=this;this.cityLobal=e.label,this.pickerText=JSON.stringify(e);var r=this.cityLobal.split("-"),i=r[0],a=r[1],o=r[2];this.provinceData.forEach(function(e){e.name==i&&(n.provinceID=e.id,t.request({url:n.$store.state.url+"Districts",data:{owner:n.$store.state.userInfo.owner,userId:n.$store.state.userInfo.id,parent:e.id},success:function(e){e.data.data.forEach(function(e){e.name==a&&(s.cityID=e.id,t.request({url:n.$store.state.url+"Districts",data:{owner:n.$store.state.userInfo.owner,userId:n.$store.state.userInfo.id,parent:e.id},success:function(t){t.data.data.forEach(function(t){t.name==o&&(s.districtID=t.id)})}}))})}}))})},onCancel:function(t){console.log(t," at pages\\tab-item-content\\shop-center\\search-shop\\search-shop.vue:150")},onBackPress:function(){return this.$refs.mpvuePicker.showPicker?(this.$refs.mpvuePicker.pickerCancel(),!0):this.$refs.mpvueCityPicker.showPicker?(this.$refs.mpvueCityPicker.pickerCancel(),!0):void 0},onUnload:function(){this.$refs.mpvuePicker.showPicker&&this.$refs.mpvuePicker.pickerCancel(),this.$refs.mpvueCityPicker.showPicker&&this.$refs.mpvueCityPicker.pickerCancel()},getBrandClass:function(){var e=this;t.request({url:this.$store.state.url+"Constants",data:{owner:this.$store.state.userInfo.owner,userId:this.$store.state.userInfo.id,type:this.$store.state.constants.brand_type,objects:-1,parent:-1},success:function(t){var n=t.data.data;for(var s in n)e.brandList.push({id:s,value:n[s]}),e.brandNameList.push(n[s]);console.log(e.brandNameList," at pages\\tab-item-content\\shop-center\\search-shop\\search-shop.vue:192")}})},goBack:function(){t.navigateTo({url:"../near-shop-list/near-shop-list?brandID="+this.brandID+"&province="+this.provinceID+"&city="+this.cityID+"&district="+this.districtID})}},onLoad:function(){this.getProvince(),this.getBrandClass()}};e.default=n}).call(this,n("6e42")["default"])},e303:function(t,e,n){"use strict";var s=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"a",function(){return s}),n.d(e,"b",function(){return r})}},[["c04a","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/shop-center/search-shop/search-shop.js');
__wxRoute = 'pages/tab-item-content/work-center/log-detail/log-detail';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/work-center/log-detail/log-detail.js';

define('pages/tab-item-content/work-center/log-detail/log-detail.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/work-center/log-detail/log-detail"],{"02a8":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return o})},"07a5":function(t,n,e){"use strict";var a=e("215a"),o=e.n(a);o.a},"215a":function(t,n,e){},"2ae7":function(t,n,e){"use strict";e.r(n);var a=e("92bf"),o=e.n(a);for(var u in a)"default"!==u&&function(t){e.d(n,t,function(){return a[t]})}(u);n["default"]=o.a},"92bf":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{log:{title:"",content:""},imgList:[],copyList:["喵喵喵","汪汪汪","哼唧哼唧"],index:-1}},methods:{deleteLog:function(){},goBack:function(){t.navigateBack({delta:1})}},onLoad:function(){}};n.default=e}).call(this,e("6e42")["default"])},b2d6:function(t,n,e){"use strict";e.r(n);var a=e("02a8"),o=e("2ae7");for(var u in o)"default"!==u&&function(t){e.d(n,t,function(){return o[t]})}(u);e("07a5");var i=e("2877"),c=Object(i["a"])(o["default"],a["a"],a["b"],!1,null,null,null);n["default"]=c.exports}},[["4d31","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/work-center/log-detail/log-detail.js');
__wxRoute = 'pages/tab-item-content/work-center/chose-copy/chose-copy';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/work-center/chose-copy/chose-copy.js';

define('pages/tab-item-content/work-center/chose-copy/chose-copy.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/work-center/chose-copy/chose-copy"],{1214:function(t,n,e){"use strict";e.r(n);var o=e("8fd8"),u=e.n(o);for(var c in o)"default"!==c&&function(t){e.d(n,t,function(){return o[t]})}(c);n["default"]=u.a},2826:function(t,n,e){"use strict";e.r(n);var o=e("4ee2"),u=e("1214");for(var c in u)"default"!==c&&function(t){e.d(n,t,function(){return u[t]})}(c);e("479a");var r=e("2877"),a=Object(r["a"])(u["default"],o["a"],o["b"],!1,null,null,null);n["default"]=a.exports},"479a":function(t,n,e){"use strict";var o=e("586c"),u=e.n(o);u.a},"4ee2":function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return u})},"586c":function(t,n,e){},"8fd8":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={data:function(){return{InputBottom:0,num:0}},methods:{InputBlur:function(t){console.log(t," at pages\\tab-item-content\\work-center\\chose-copy\\chose-copy.vue:120")}}};n.default=o}},[["0426","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/work-center/chose-copy/chose-copy.js');
__wxRoute = 'pages/tab-item-content/shop-center/category-item/category-item';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/shop-center/category-item/category-item.js';

define('pages/tab-item-content/shop-center/category-item/category-item.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/shop-center/category-item/category-item"],{"45b1":function(t,e,a){"use strict";var o=a("dc3e"),i=a.n(o);i.a},"4ec6":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=function(){return a.e("components/uni/uni-tag/uni-tag").then(a.bind(null,"2f43"))},i={data:function(){return{categoryList:[],subCategoryList:[],height:0,categoryActive:0,categorySubActive:1e4,scrollTop:0,scrollHeight:0,categoryObj:{id:"",name:""},list:[]}},components:{uniTag:o},methods:{goBack:function(){t.reLaunch({url:"../record-shop/record-shop?bigID="+this.repairObj.bigID+"&bigName="+this.repairObj.bigName+"&subID="+this.repairObj.subID+"&subName="+this.repairObj.subName})},scroll:function(t){this.scrollHeight=t.detail.scrollHeight},categoryClickMain:function(t,e){this.categoryActive=e,this.categorySubActive=1e3,this.subCategoryList=t.subCategoryList,this.scrollTop=-this.scrollHeight*e,this.categoryObj={id:t.obj.id,name:t.name}},categoryClickSub:function(t,e){this.categorySubActive=e,this.scrollTop=-this.scrollHeight*e,this.categoryObj={id:t.obj.id,name:t.name}},getCategory:function(){var e=this;t.request({url:this.$store.state.url+"Constants",data:{owner:8,type:this.$store.state.constants.brand_type,parent:-1,objects:1},success:function(t){e.list=t.data.data;var a=[],o=[];t.data.data.forEach(function(t){0==t.parent?a.push(t):o.push(t)});for(var i=0;i<a.length;i++){for(var n=[],r=0;r<o.length;r++)o[r].parent==a[i].id&&n.push({name:o[r].val,obj:o[r]});e.categoryList.push({name:a[i].val,subCategoryList:n,obj:a[i]})}e.subCategoryList=e.categoryList[0].subCategoryList,e.categoryObj.id=e.categoryList[0].obj.id,e.categoryObj.name=e.categoryList[0].name}})},choseCategory:function(){var e=this;console.log(this.categoryObj," at pages\\tab-item-content\\shop-center\\category-item\\category-item.vue:127"),t.navigateBack({delta:1,success:function(t){e.$fire.fire("category",e.categoryObj)}})}},onLoad:function(){var e=this;this.getCategory(),t.getSystemInfo({success:function(t){e.height=t.screenHeight}})}};e.default=i}).call(this,a("6e42")["default"])},7530:function(t,e,a){"use strict";a.r(e);var o=a("922b"),i=a("c9df");for(var n in i)"default"!==n&&function(t){a.d(e,t,function(){return i[t]})}(n);a("45b1");var r=a("2877"),c=Object(r["a"])(i["default"],o["a"],o["b"],!1,null,null,null);e["default"]=c.exports},"922b":function(t,e,a){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},i=[];a.d(e,"a",function(){return o}),a.d(e,"b",function(){return i})},c9df:function(t,e,a){"use strict";a.r(e);var o=a("4ec6"),i=a.n(o);for(var n in o)"default"!==n&&function(t){a.d(e,t,function(){return o[t]})}(n);e["default"]=i.a},dc3e:function(t,e,a){}},[["16a8","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/shop-center/category-item/category-item.js');
__wxRoute = 'pages/tab-item-content/message-center/group-list/group-list';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/message-center/group-list/group-list.js';

define('pages/tab-item-content/message-center/group-list/group-list.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/message-center/group-list/group-list"],{"005a":function(t,e,n){},"2afc":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=function(){return n.e("components/collapse/uni-collapse").then(n.bind(null,"7d87"))},a=function(){return n.e("components/collapse/uni-collapse-item").then(n.bind(null,"726b"))},u={data:function(){return{groupList:[],telephoneList:[],type:""}},components:{uniCollapse:o,uniCollapseItem:a},onLoad:function(t){this.type=t.type,"group"==t.type?this.getChatGroupApi():"telephone"==t.type&&this.getContactTreeModelApi()},methods:{chatToObj:function(e){var n=this;t.navigateBack({delta:1,success:function(t){n.$fire.fire("group",e)}})},getContactTreeModelApi:function(){var e=this;t.request({url:this.$store.state.url+"ContactTreeModel",data:{owner:16,userId:1},success:function(t){e.telephoneList=t.data.data,console.log(e.telephoneList," at pages\\tab-item-content\\message-center\\group-list\\group-list.vue:75")}})},getChatGroupApi:function(){var e=this;t.request({url:this.$store.state.url+"ChatGroups",data:{owner:16,userId:1,imuser:"LX13167233205",psize:100,offset:0},success:function(t){e.groupList=t.data.data}})}}};e.default=u}).call(this,n("6e42")["default"])},"2e67":function(t,e,n){"use strict";n.r(e);var o=n("de10"),a=n("5f5d");for(var u in a)"default"!==u&&function(t){n.d(e,t,function(){return a[t]})}(u);n("a69a");var s=n("2877"),r=Object(s["a"])(a["default"],o["a"],o["b"],!1,null,null,null);e["default"]=r.exports},"5f5d":function(t,e,n){"use strict";n.r(e);var o=n("2afc"),a=n.n(o);for(var u in o)"default"!==u&&function(t){n.d(e,t,function(){return o[t]})}(u);e["default"]=a.a},a69a:function(t,e,n){"use strict";var o=n("005a"),a=n.n(o);a.a},de10:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a})}},[["4361","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/message-center/group-list/group-list.js');
__wxRoute = 'pages/tab-item/work/work';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item/work/work.js';

define('pages/tab-item/work/work.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item/work/work"],{"30ea":function(e,n,t){},"70ca":function(e,n,t){"use strict";var a=function(){var e=this,n=e.$createElement;e._self._c},o=[];t.d(n,"a",function(){return a}),t.d(n,"b",function(){return o})},"8d8a":function(e,n,t){"use strict";var a=t("30ea"),o=t.n(a);o.a},"8e67":function(e,n,t){"use strict";t.r(n);var a=t("f328"),o=t.n(a);for(var r in a)"default"!==r&&function(e){t.d(n,e,function(){return a[e]})}(r);n["default"]=o.a},f328:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={data:function(){return{}},methods:{showItem:function(n){switch(n){case"log":e.navigateTo({url:"../../tab-item-content/work-center/work-log/work-log"});break;case"express":e.navigateTo({url:"../../tab-item-content/work-center/express-center/express-index/express-index"});break;case"repair":e.navigateTo({url:"../../tab-item-content/shop-center/shop-center?type=alone"})}},showMineClick:function(){e.navigateTo({url:"../mine/mine"})},showMessageClick:function(){e.navigateTo({url:"../message/message"})},showIndexClick:function(){e.navigateTo({url:"../index/index"})}}};n.default=t}).call(this,t("6e42")["default"])},fd71:function(e,n,t){"use strict";t.r(n);var a=t("70ca"),o=t("8e67");for(var r in o)"default"!==r&&function(e){t.d(n,e,function(){return o[e]})}(r);t("8d8a");var i=t("2877"),c=Object(i["a"])(o["default"],a["a"],a["b"],!1,null,null,null);n["default"]=c.exports}},[["d2c1","common/runtime","common/vendor"]]]);
});
require('pages/tab-item/work/work.js');
__wxRoute = 'pages/tab-item-content/work-center/work-log/work-log';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/work-center/work-log/work-log.js';

define('pages/tab-item-content/work-center/work-log/work-log.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/work-center/work-log/work-log"],{"2df0":function(t,e,n){"use strict";var o=n("b6eb"),a=n.n(o);a.a},5378:function(t,e,n){"use strict";n.r(e);var o=n("d138"),a=n("fe15");for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);n("2df0");var u=n("2877"),c=Object(u["a"])(a["default"],o["a"],o["b"],!1,null,null,null);e["default"]=c.exports},b44f:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{}},methods:{createWork:function(e){t.navigateTo({url:"../create-log/create-log"})},itemDetail:function(e){t.navigateTo({url:"../log-detail/log-detail"})}}};e.default=n}).call(this,n("6e42")["default"])},b6eb:function(t,e,n){},d138:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a})},fe15:function(t,e,n){"use strict";n.r(e);var o=n("b44f"),a=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,function(){return o[t]})}(r);e["default"]=a.a}},[["65af","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/work-center/work-log/work-log.js');
__wxRoute = 'pages/tab-item-content/mine-center/change-name/change-name';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/mine-center/change-name/change-name.js';

define('pages/tab-item-content/mine-center/change-name/change-name.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/mine-center/change-name/change-name"],{"0cd8":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t={data:function(){return{name:""}},methods:{goBack:function(){n.navigateBack({delta:1})},changeName:function(){var e=this;n.navigateBack({delta:1,success:function(n){e.$fire.fire("name",e.name)}})}},onLoad:function(){var e=this;n.getStorage({key:"userInfo",success:function(n){e.name=n.data.name}})}};e.default=t}).call(this,t("6e42")["default"])},"285f":function(n,e,t){"use strict";var a=t("cd13"),c=t.n(a);c.a},"63d1":function(n,e,t){"use strict";var a=function(){var n=this,e=n.$createElement;n._self._c},c=[];t.d(e,"a",function(){return a}),t.d(e,"b",function(){return c})},a8ff:function(n,e,t){"use strict";t.r(e);var a=t("63d1"),c=t("afee");for(var u in c)"default"!==u&&function(n){t.d(e,n,function(){return c[n]})}(u);t("285f");var o=t("2877"),f=Object(o["a"])(c["default"],a["a"],a["b"],!1,null,null,null);e["default"]=f.exports},afee:function(n,e,t){"use strict";t.r(e);var a=t("0cd8"),c=t.n(a);for(var u in a)"default"!==u&&function(n){t.d(e,n,function(){return a[n]})}(u);e["default"]=c.a},cd13:function(n,e,t){}},[["73eb","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/mine-center/change-name/change-name.js');
__wxRoute = 'pages/tab-item-content/mine-center/cut-image/cut-image';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/mine-center/cut-image/cut-image.js';

define('pages/tab-item-content/mine-center/cut-image/cut-image.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/mine-center/cut-image/cut-image"],{"5ac0":function(t,e,n){},"9fda":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("9d6e"));function a(t){return t&&t.__esModule?t:{default:t}}var r=t.getSystemInfoSync(),i=r.windowWidth,c=r.windowHeight-50,u={data:function(){return{cropperOpt:{id:"cropper",width:i,height:c,scale:2.5,zoom:8,cut:{x:(i-295)/2,y:(c-413)/2,width:295,height:413}},weCropper:"",token:"",avatarID:""}},methods:{back:function(){t.redirectTo({url:"../infoDetail/infoDetail"})},touchStart:function(t){this.weCropper.touchStart(t)},touchMove:function(t){this.weCropper.touchMove(t)},touchEnd:function(t){this.weCropper.touchEnd(t)},convertBase64UrlToBlob:function(t,e){for(var n=atob(t.split(",")[1]),o=[],a=0;a<n.length;a++)o.push(n.charCodeAt(a));return new Blob([new Uint8Array(o)],{type:e},{filename:"1111.jpg"})},blobToDataURL:function(t){var e=new FileReader;e.readAsDataURL(t),e.onload=function(t){var e=t.target.result;console.log(e," at pages\\tab-item-content\\mine-center\\cut-image\\cut-image.vue:77")}},getCropperImage:function(){var e=this;this.weCropper.getCropperImage(function(n){n?t.getStorage({key:"userInfo",success:function(o){var a=t.uploadFile({url:e.$store.state.uploadHostUrl+e.token,filePath:n,name:"file",formData:{"x:type":11,"x:owner":o.data.owner,"x:creator":o.data.id},success:function(t){var n=JSON.parse(t.data);e.avatarID=n.data}});a.onProgressUpdate(function(n){100==n.progress&&(t.showToast({title:"上传成功",icon:"none"}),setTimeout(function(){t.navigateBack({delta:1,success:function(t){e.$fire.fire("image",e.avatarID)}})},500))},function(e){t.showToast({title:"上传失败",icon:"none"})})}}):console.log("获取图片失败，请稍后重试"," at pages\\tab-item-content\\mine-center\\cut-image\\cut-image.vue:160")})},getUploadToken:function(){var t=this;this.$ajax("UploadToken",{},function(e){t.token=e})},uploadTap:function(){var e=this;t.chooseImage({count:1,sizeType:["compressed"],sourceType:["album","camera"],success:function(t){var n=t.tempFilePaths[0];e.weCropper.pushOrign(n)}})}},onLoad:function(e){this.getUploadToken();var n=this.cropperOpt,a=e.src;a&&(Object.assign(n,{src:a}),this.weCropper=new o.default(n).on("ready",function(t){}).on("beforeImageLoad",function(e){t.showToast({title:"上传中",icon:"loading",duration:3e3})}).on("imageLoad",function(e){t.hideToast()}))}};e.default=u}).call(this,n("6e42")["default"])},a788:function(t,e,n){"use strict";n.r(e);var o=n("9fda"),a=n.n(o);for(var r in o)"default"!==r&&function(t){n.d(e,t,function(){return o[t]})}(r);e["default"]=a.a},ba06:function(t,e,n){"use strict";n.r(e);var o=n("dc79"),a=n("a788");for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);n("f1ab");var i=n("2877"),c=Object(i["a"])(a["default"],o["a"],o["b"],!1,null,null,null);e["default"]=c.exports},dc79:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return a})},f1ab:function(t,e,n){"use strict";var o=n("5ac0"),a=n.n(o);a.a}},[["3d67","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/mine-center/cut-image/cut-image.js');
__wxRoute = 'pages/tab-item-content/mine-center/write-motto/write-motto';__wxRouteBegin = true;__wxAppCurrentFile__ = 'pages/tab-item-content/mine-center/write-motto/write-motto.js';

define('pages/tab-item-content/mine-center/write-motto/write-motto.js',function(require, module, exports, window, document, frames, self, location, navigator, localStorage, history, Caches, screen, alert, confirm, prompt, fetch, XMLHttpRequest, WebSocket, webkit, WeixinJSCore, Reporter, print, WeixinJSBridge){
(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tab-item-content/mine-center/write-motto/write-motto"],{1462:function(t,n,e){"use strict";var o=e("f109"),u=e.n(o);u.a},"3b83":function(t,n,e){"use strict";e.r(n);var o=e("6355"),u=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,function(){return o[t]})}(a);n["default"]=u.a},6355:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{motto:""}},methods:{goBack:function(){t.navigateBack({delta:1})},submit:function(){var n=this;t.navigateBack({delta:1,success:function(t){n.$fire.fire("motto",n.motto)}})}}};n.default=e}).call(this,e("6e42")["default"])},"890f":function(t,n,e){"use strict";e.r(n);var o=e("d631"),u=e("3b83");for(var a in u)"default"!==a&&function(t){e.d(n,t,function(){return u[t]})}(a);e("1462");var c=e("2877"),i=Object(c["a"])(u["default"],o["a"],o["b"],!1,null,null,null);n["default"]=i.exports},d631:function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},u=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return u})},f109:function(t,n,e){}},[["87ec","common/runtime","common/vendor"]]]);
});
require('pages/tab-item-content/mine-center/write-motto/write-motto.js');
;(function(global) {
    __uni_launch_ready(function() {
        var entryPagePath = __wxConfig.entryPagePath.replace('.html', '')
        if (entryPagePath.indexOf('/') !== 0) {
            entryPagePath = '/' + entryPagePath
        }
        wx.navigateTo({
            url: entryPagePath,
            query: {},
            openType: 'appLaunch',
            webviewId: 1
        })
        __wxConfig.__ready__ = true
    })
})(this);

