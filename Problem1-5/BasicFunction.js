var identity = function(x) {
    return x;
};

function add(x,y) {
    return x+y;
}

function mul(x,y) {
    return x*y;
}
 
var identityf = function(x) {
    return identity(x);
}; 
console.log(identityf(1));

var addf = function(x) {
    return function(y){
        return x+y;
    };
};

console.log(addf(3)(4));

var applyf = function(x) {
    if(x==='add') {
        return function(y,z) {
            return y+z;
        };
    }
    
    else if (x==='mul'){
        return function(y,z) {
            return y*z;
        };
    }
    
    else {
        return null;
    }
};

var applyfnew = function(binary) {
  return function(x) {
      return function(y) {
          return binary(x,y);
      };
  };
};

console.log(applyf('mul')(5,6));
console.log(applyfnew(mul)(50)(6));

var curry = function(func, x) {
    return function(y) {
        return func(x,y);
    };
};

console.log(curry(mul,11)(6));

var incOne = function(x) {
    return x +1;
};

console.log(incOne(incOne(1)));

var incTwo =  function(x) {
    return identity(x+1);
}; 

console.log(incTwo(incTwo(4)));

var incThree = addf(1);
var incFour = curry(add,1);
var incFive = applyfnew(add)(1);

console.log([incThree(incThree(4)),incFour(incFour(4)),incFive(incFive(4))]);

var methodize = function(func){
    return function(y) { 
           return func(this,y); 
    };
};             

Number.prototype.add = methodize(add);
Number.prototype.mul = methodize(mul);

console.log((3).add(4));
console.log((3).mul(4));

function demethodize(func) {
    return function(x,y) {
        return func.call(x,y);
    };
}

console.log(demethodize(Number.prototype.add)(3,4));

function twice(func) {
    return function(x) {
        return func(x,x);
    };
}

var double = twice(add);
var square = twice(mul);

console.log([double(8),square(9)]);

function composeu(func1,func2) {
    return function(x) {
        return func2(func1(x));
    };
}

console.log(composeu(double,square)(3));

function composeb(func1,func2){
    return function(x,y,z) {
        return func2(func1(x,y),z);
    };
}

console.log(composeb(add,mul)(3,4,5));

function once(func) {
    return function(x,y) {
        var f = func;
        func = null;
        return f(x,y);
    };
}

var addOnce = once(add); 

console.log(addOnce(3,4));
//console.log(addOnce(3,4)); // Calling it again will throw the error

function counterf(x) {
     return {
        inc : function() {
            x = x+1;
            return x;
        },
        
        dec : function() {
            x = x-1;
            return x;
        }
    };

}

var counter = counterf(10);
console.log(counter.inc());

function revocable(func) {
    return {
        invoke : function(x){
            return func(x);
        },
        revoke: function(){
            func = null;
             return;
        }
    }
}
var temp = revocable(double);

console.log(temp.invoke(7));
//console.log(temp.revoke(8));
//console.log(temp.invoke(8));


    // your code goes here
    function check_word(word) {
    return words.hasOwnProperty(word); // better way to chck key than [] operator because of constructor string
    
    }
     
    var words = {
        'name':'saurabh',
        'team':'core'
    };
    console.log(check_word('name'));