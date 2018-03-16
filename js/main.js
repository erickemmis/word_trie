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


var trie = new Trie();
trie.loadWord("amber");
trie.loadWord("ambiant");

console.log(trie);
