var answers = [];
var stars;
var feedback;
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
  return this.questions[this.questionIndex]
}

Quiz.prototype.isEnded = function () {
  return this.questions.length === this.questionIndex;
}

Quiz.prototype.guess = function (answer) {

  answers.push(answer);
  console.log(answers);
  this.questionIndex++;
}






function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.correctAnswer = function (choice) {
  return choice === this.answer;
}






function populate() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    var element = document.getElementById('question');
    element.innerHTML = quiz.getQuestionIndex().text;

    //show choices
    var choices = quiz.getQuestionIndex().choices;
    for (var i = 0; i < choices.length; i++) {
      var element = document.getElementById('choice' + i);
      element.innerHTML = choices[i];

      guess("btn" + i, choices[i]);
    }

    showProgress();
  }
}


function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function () {
    quiz.guess(guess);
    populate();
  }
}


function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById('progress');
  element.innerHTML = "Questions " + currentQuestionNumber + " of " + quiz.questions.length;
}


function showScores() {
  var gameOverHTML = `

    <h2>謝謝您的回覆 以下是關於減塑的心情留言板  歡迎所有的回饋與分享 Welcome any response</h2>
    <input type="text" id="feedback_tb">
    <h2>聽完今天的簡報,幫目前的自己打個減塑的分數 Rating for yourself</h2>
     <div class="stars">
				<input type="radio" id="star10" name="rate" value="10" />
				<label for="star10" title="text">10 stars</label>
				<input type="radio" id="star9" name="star" value="9" />
				<label for="star9" title="text">9 stars</label>
				<input type="radio" id="star8" name="star" value="8" />
				<label for="star8" title="text">8 stars</label>
				<input type="radio" id="star7" name="star" value="7" />
				<label for="star7" title="text">7 stars</label>
				<input type="radio" id="star6" name="star" value="6" />
				<label for="star6" title="text">6 star</label>
				<input type="radio" id="star5" name="star" value="5" />
				<label for="star5" title="text">5 stars</label>
				<input type="radio" id="star4" name="star" value="4" />
				<label for="star4" title="text">4 stars</label>
				<input type="radio" id="star3" name="star" value="3" />
				<label for="star3" title="text">3 stars</label>
				<input type="radio" id="star2" name="star" value="2" />
				<label for="star2" title="text">2 stars</label>
				<input type="radio" id="star1" name="star" value="1" />
				<label for="star1" title="text">1 star</label>
			</div>
      <a href="javascript: quiz_next()" class="redbtn">
      繼續
      </a>
  <script>
  $('button').hover(function(){
   var $this = $(this);
   var $prevAll = $(this).prevAll();

   var className = $this.attr("class") + "-hover";

   $this.addClass(className);
   $prevAll.addClass(className);
}, function() {
   var $this = $(this);
   var $prevAll = $(this).prevAll();

   $this.removeClass("detractor-hover passive-hover promoter-hover");
   $prevAll.removeClass("detractor-hover passive-hover promoter-hover");
});
  </script>
  
  `
  var element = document.getElementById('quiz');
  element.innerHTML = gameOverHTML;
}

async function quiz_next(){
  feedback = document.getElementById('feedback_tb').value;
  for (let index = 10; index > 0; index--) {
    if (document.getElementById('star'+index).checked){
      stars=index;
    }
  }
  if (feedback.length < 1) {
    alert('回饋不可為空');
    return;
  }
  if (stars == null){
    alert('評價自己吧 還是說你覺得你沒救了 建議自己鑽進回收桶');
    return;
  }
  console.log(feedback);
  console.log(stars);
  let user = "test";
  let result = answers.toString();
  result += ","+feedback;
  result += ","+stars;
  console.log(result);
  await fetch("https://script.google.com/macros/s/AKfycbxoFCSuQPmNh4vQmoFqbikgxacyRoqOHrOI2pYauVHsqXrsrLn5I_jLvyijmqWlY1LJlQ/exec?user="+user+"&type=newrecord&result="+result, {
    mode: 'no-cors'
  });


}
var questions = [
  new Question("塑膠袋  plastic bags ", ["0", "1-2", "3-4", "more than 5"], ""),
  new Question("塑膠吸管  plastic straws ", ["0", "1-2", "3-4", "more than 5"], ""),
  new Question("塑膠叉子  plastic forks", ["0", "1-2", "3-4", "more than 5"], ""),
  new Question("塑膠杯  plastic cups", ["0", "1-2", "3-4", "more than 5"], ""),
  new Question("塑膠瓶蓋  plastic lids", ["0", "1-2", "3-4", "more than 5"], ""),
  new Question("塑膠瓶  plastic bottles", ["0", "1-2", "3-4", "more than 5"], ""),
  new Question("塑膠碗  plastic bowls", ["0", "1", "2", "more than 3"], ""),
  new Question("保麗龍類盒子或餐盤  styrofoam boxes", ["0", "1", "2", "more than 3"], ""),
  new Question("竹籤  skewers", ["0", "1", "2", "more than 3"], ""),
  new Question("免洗餐具(筷子、湯匙)  disposable tableware (chopsticks, spoons)", ["0", "1-2", "3-4", "more than 5"], ""),
  new Question("今天我攜帶幾個環保餐具在身邊使用呢?(例如不鏽鋼瓶、便當盒 、 環保筷子湯匙 ...)  How many eco-friendly utensils do I bring today", ["0", "1", "2", "3", "4", "more than 5"], ""),
  new Question("今天我有確實分類垃圾(好棒棒)    Today I do properly sort the garbage.(Good Job)", ["yes", "no"], ""),
  new Question("我已經持續攜帶環保餐具, 並開始使用多久了? How long have I been consistently carrying and using eco-friendly utensils with me?", ["1 days", "2-7 days", "7-13 days", "more than 14 days"], ""),

];

var quiz = new Quiz(questions);

populate();