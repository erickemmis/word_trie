
// Node object used in Trie data structure
function Node(parent) {
  this.isWord = false;
  this.parent = parent;
  this.iterator = null;
  this.children = new Map();
}

Node.prototype.initIterator = function() {
  this.iterator = this.children.keys();
}

Node.prototype.removeIterator = function() {
  this.iterator = null;
}

Node.prototype.next = function() {
  if(this.iterator){
    return this.iterator.next().value;
  }
}

// Trie data structure
function Trie() {
  //use true so root has a parent
  this.root = new Node(true);
}

// adds word to Structure by each char
Trie.prototype.loadWord = function(word) {
  // set nodeor vairable to root
  var node = this.root,
      letter = '';

  for(var i = 0, len = word.length; len > i; i++){

    letter = word.charAt(i);

    if (node.children.has(letter)) {
      node = node.children.get(letter);
      continue;
    }
    node.children.set(letter, new Node(node));
    node = node.children.get(letter);
  }
  node.isWord = true;
}

// check if word is in Trie
Trie.prototype.checkWord = function(word) {
  var node = this.root,
      letter = '';


  for(var i = 0, len = word.length; len > i; i++) {
    letter = word.charAt(i);

    if(node.children.has(letter)){
      node = node.children.get(letter);
    }else{
      return false;
    }
  }
  return node.isWord;
}

Trie.prototype.calulateWordsGiven = function(letters) {
  var words = [],
      node = this.root,
      current = null,
      word = [];

  //loop through trie to find possible words given letters
  do {

    if(!node.iterator){
      node.initIterator();
    }

    current = node.next();

    if(!current) {
      node = node.parent;
      word.pop();
      continue;
    }

    if(letters.includes(current)){
      node = node.children.get(current);
      word.push(current);
      if(node.isWord){
        words.push(word.join(''));
      }
    }
  }while(current || node.parent);

  return words;

}


// so I can debug trie at the command line
var trie;

$(document).ready(function(){

  //--------Setup Trie statement----------------///



  trie = new Trie();
  var JSON_words = [word2, word3, word4, word5,
                  word6, word7, word8, word9,
                  word10, word11, word12];
      // JSON words files
      // word2, word3, word4, word5,
      // word6, word7, word8, word9,
      // word10, word11, word12


  //build Trie using dictionary of words
  JSON_words.forEach(function(wordList){
    //add to trie statement
    for(var i = 0, len = wordList.length; i < len; i++) {
      trie.loadWord(wordList[i].word);
    }
    //dump JSON from memory
    wordList = null;
  });

  //do not refresh on submit
  $('#word-form').submit(function(e) {
    e.preventDefault();
    //reset input on enter
    $('.word-input').val('');

  });


  $('.word-input').on('input', function(){
    var word = $(this).val();
    if(trie.checkWord(word)) {
      console.log(word + ' is word!');

    }else{
      console.log('not a sword');
    }
  });
  letters = ['b','u','c','r','l','e'];
  //console.log(trie);
  var a = trie.calulateWordsGiven(letters);

  for(word in a) {
    console.log(a[word]);
  }
  console.log(a.length);

});


//TODO
// - clear whitespace and lowercase word string
// - add a list of guessed words so they cannot be duplicated
//    -possible solutions object with boolean if guessed or not { 'word': true/false }
// - create prototype function to get list of words given letters
