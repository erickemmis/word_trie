function Node() {
  this.isWord = false;
  this.children = {};
}


function Trie() {
  this.root = new Node();
}

Trie.prototype.loadWord = function(word) {
  // set cursor vairable to root
  var curs = this.root,
      letter = '';

  for(var i = 0, len = word.length; len > i; i++){

    letter = word.charAt(i);

    if (letter in curs.children) {
      curs = curs.children[letter];
      continue;
    }
    curs.children[letter] = new Node();
    curs = curs.children[letter];
  }
  curs.isWord = true;
}

Trie.prototype.checkWord = function(word) {
  var curs = this.root
      letter = '';

  for(var i = 0, len = word.length; len > i; i++) {
    letter = word.charAt(i);
    if(!(letter in curs.children)) {
      return false;
    }
    curs = curs.children[letter];
  }

  return curs.isWord ? true : false;
}

Trie.prototype.getWords = function(letters, node, word, ) {

  //if there is no wat to find the parent looks like recursion is the only way :(
  //while loop
  var end = false,
      node = this.root,
      pos = 0,
      word = '',
      childNodes = Object.keys(node.children),
      wordList = [];

  while(!end) {
    if(letters.indexOf(node.child[pos]) > -1) {
      word += childNodes[pos];


    }
  }
}




$(document).ready(function(){

  //--------Setup Trie statement----------------///
  var trie = new Trie(),
      JSON_words = [word2, word3, word4, word5, word6, word7,
               word8, word9, word10, word11, word12],
      correctWords = [];


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
  });


  $('.word-input').on('input', function(){
    var word = $(this).val();
    if(trie.checkWord(word) && correctWords.indexOf > -1) {
      console.log(word + 'isword');

    }else{
      console.log('not a sword');
    }
  });
  letters = ['a','g','r','c','b']
  trie.getWords(letters);
});
