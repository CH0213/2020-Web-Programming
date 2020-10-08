// 필요한 전역변수 //////////////////////////////////////////////////////////////
var isOK = true;
var p_image = document.getElementById("p_image");
var p_name = document.getElementById("p_name");
var p_price = document.getElementById("p_price");
var p_number = document.getElementById("p_number");
var pattern_eng = /[a-zA-Z]/; // 영어
var pattern_kor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/; // 한글
var pattern_num = /[0-9]/; // 숫자

// 일반인지 새벽인지 구하는 함수//////////////////////////////////////////////////
function get_sel_type() {
  var p_delivery = document.getElementsByName('p_delivery');
  var sel_type = null;
  for (var i = 0; i < p_delivery.length; i++) {
    if (p_delivery[i].checked == true) {
      sel_type = p_delivery[i].value;
    }
  }

  return sel_type;
}

// 장바구니에 담기
function add_box() {

  var display = document.getElementById("addbox");

  if (display.style.display == 'none') {
    display.style.display = 'block';
  } else {
    display.style.display = 'none';
  }
  add_box_remove();
}

function add_box_remove() {
  document.getElementById("p_image").value = "";
  document.getElementById("p_name").value = "";
  document.getElementById("p_price").value = "";
  document.getElementById("p_number").value = "";
  var radio = document.getElementsByName("p_delivery");
  for (var i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      radio[i].checked = false;
    }
  }
}



// 장바구니에 추가 //////////////////////////////////////////////////////////////
function add() {

  isOK = true;
  p_image = document.getElementById("p_image");
  p_name = document.getElementById("p_name");
  p_price = document.getElementById("p_price");
  p_number = document.getElementById("p_number");
  case1and2();
  case3to6();
  addRow(get_sel_type());
  isallcheck();
  if(document.getElementsByClassName("가격").length==1){
    font_style();
  }
}

var fontSize;
var fontWeight;
function font_style(){
  var size = document.getElementsByClassName("가격")[0];
  var temp = window.getComputedStyle(size, null).getPropertyValue('font-size');
  fontSize = parseFloat(temp);
  temp = window.getComputedStyle(size, null).getPropertyValue('font-weight');
  fontWeight = parseFloat(temp);
}


// 경우1,2 ///////////////////////////////////////////////////////////////////////
function case1and2() {
  if (p_image.value == "") {
    isOK = false;
    alert("상품 이미지를 추가하시오.");
  }else {
    p_image = p_image.value;
    p_image = p_image.slice(p_image.indexOf(".") + 1).toLowerCase();
    if (p_image != "jpg" && p_image != "png" && p_image != "jpeg") {
      alert("이미지 파일이 아닙니다 . ‘jpg’, ‘jpeg’ 또는 png 을 확장자로 가진 파일을 추가하시오.");
      isOK = false;
    }
  }
  if (p_name.value == "") {
    isOK = false;
    alert("상품 이름을 입력하시오.");
  }
  if (p_price.value == "") {
    isOK = false;
    alert("상품 가격을 입력하시오.");
  }
  if (p_number.value == "") {
    isOK = false;
    alert("상품 개수를 입력하시오.");
  }
  if (get_sel_type() == null) {
    isOK = false;
    alert("배송 방법을 선택하시오.");
  }
}


// 경우3~6 ///////////////////////////////////////////////////////////////////////
function case3to6() {
  if (!(pattern_eng.test(p_name.value) || pattern_kor.test(p_name.value))) {
    isOK = false;
    alert("문자로 된 상품 이름을 입력하시오");
  }

  if (!pattern_num.test(p_price.value)) {
    isOK = false;
    alert("문자로 된 상품 이름을 입력하시오");
  }

  if (p_price.value < 1000) {
    isOK = false;
    alert("상품 가격을 1000 원 이상으로 입력하시오.");
  }

  if (p_number.value > 50) {
    isOK = false;
    alert("최대 50 개 이하로 선택하시오.");
  }

  if (!pattern_num.test(p_number.value)) {
    isOK = false;
    alert("상품 개수에 숫자를 입력하시오");
  }
}

// 테이블에  Row 추가 ///////////////////////////////////////////////////////////
function addRow(sel_type) {
  if (isOK == true) {
    var table = document.getElementById(sel_type);
    var row = table.insertRow(table.rows.length - 1);
    row.setAttribute('class', 'row' + sel_type);
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    var cell5 = row.insertCell(5);
    cell0.innerHTML = "<input type=checkbox class='check" + sel_type + "' checked>";
    cell1.innerHTML = "<image id ='preview' src ='./image/" + document.getElementById('p_image').files[0].name + "'/>";
    cell2.innerHTML = p_name.value;
    cell3.innerHTML = Number(p_price.value);
    cell4.innerHTML = Number(p_number.value);
    cell5.innerHTML = Number(p_price.value * p_number.value);
    cell2.setAttribute('class', '이름');
    cell3.setAttribute('class', '가격');
    cell5.setAttribute('class', sel_type + '합계');
    add_box_remove();
  }
}
////////////////////////////////////////////////////////////////////////////////



var check일반 = document.getElementsByClassName('check일반');
var row일반 = document.getElementsByClassName("row일반");

var check새벽 = document.getElementsByClassName('check새벽');
var row새벽 = document.getElementsByClassName("row새벽");


window.onchange = (event) => {
  var ac일반 = document.getElementById("일반선택");
  var ac새벽 = document.getElementById("새벽선택");

  if (event.target == ac일반) {
    if (ac일반.checked == true) {
      for (var i = 0; i < check일반.length; i++) {
        check일반[i].checked = true;
      }
    } else {
      for (var i = 0; i < check일반.length; i++) {
        check일반[i].checked = false;
      }
    }
  } else if (event.target == ac새벽) {
    if (ac새벽.checked == true) {
      for (var i = 0; i < check새벽.length; i++) {
        check새벽[i].checked = true;
      }
    } else {
      for (var i = 0; i < check새벽.length; i++) {
        check새벽[i].checked = false;
      }
    }
  } else {
    if (all_checked("일반")) {
      ac일반.checked = true;
    } else {
      ac일반.checked = false;
    }

    if (all_checked("새벽")) {
      ac새벽.checked = true;
    } else {
      ac새벽.checked = false;
    }
  }

  calculate_sum();
}




function delete_row() {
  var ac일반 = document.getElementById("일반선택");
  var ac새벽 = document.getElementById("새벽선택");
  for (var i = 0; i < check일반.length; i++) {
    if (check일반[i].checked == true) {
      row일반[i].remove();
      i--;
    }
  }

  for (var i = 0; i < check새벽.length; i++) {
    if (check새벽[i].checked == true) {
      row새벽[i].remove();
      i--;
    }
  }
  isallcheck();
  calculate_sum();
}


function calculate_sum() {
  var sum1 = document.getElementsByClassName('일반합계');
  var sum2 = document.getElementsByClassName('새벽합계');
  var as1 = 0;
  var as2 = 0;
  if (check일반.length == 0) {
    as1 = 0;
  }
  if (check새벽.length == 0) {
    as2 = 0;
  }
  for (var i = 0; i < check일반.length; i++) {
    if (check일반[i].checked == true) {
      as1 = Number(as1) + Number(sum1[i].innerHTML);
    }
  }
  for (var i = 0; i < check새벽.length; i++) {
    if (check새벽[i].checked == true) {
      as2 = Number(as2) + Number(sum2[i].innerHTML);
    }
  }
  document.getElementById("일반총합계").innerHTML = Number(as1);
  document.getElementById("새벽총합계").innerHTML = Number(as2);
}

function all_checked(sel_type) {

  var isall1 = true;

  if (sel_type == "일반") {
    if (check일반.length < 1) {
      isall1 = false;
    }

    for (var i = 0; i < check일반.length; i++) {
      if (check일반[i].checked == false) {
        isall1 = false;
      }
    }
  }

  if (sel_type == "새벽") {
    if (check새벽.length < 1) {
      isall1 = false;
    }

    for (var i = 0; i < check새벽.length; i++) {
      if (check새벽[i].checked == false) {
        isall1 = false;
      }
    }
  }
  return isall1;
}



function move(delivery) { // deliver는 어디로 이동할지!
  var checkk;
  if (delivery == "새벽") {
    checkk = document.getElementsByClassName('check일반');
  }
  if (delivery == "일반") {
    checkk = document.getElementsByClassName('check새벽');
  }

  for (var i = 0; i < checkk.length; i++) {
    if (checkk[i].checked == true) {
      var table = document.getElementById(delivery);
      var row = table.insertRow(table.rows.length - 1);
      row.setAttribute('class', 'row' + delivery);
      var cell0 = row.insertCell(0);
      var cell1 = row.insertCell(1);
      var cell2 = row.insertCell(2);
      var cell3 = row.insertCell(3);
      var cell4 = row.insertCell(4);
      var cell5 = row.insertCell(5);
      cell0.innerHTML = "<input type=checkbox class='check" + delivery + "'>";
      cell1.innerHTML = checkk[i].parentElement.parentElement.childNodes[1].innerHTML;
      cell2.innerHTML = checkk[i].parentElement.parentElement.childNodes[2].innerHTML
      cell3.innerHTML = checkk[i].parentElement.parentElement.childNodes[3].innerHTML
      cell4.innerHTML = checkk[i].parentElement.parentElement.childNodes[4].innerHTML
      cell5.innerHTML = checkk[i].parentElement.parentElement.childNodes[5].innerHTML
      cell2.setAttribute('class', '이름');
      cell3.setAttribute('class', '가격');
      cell5.setAttribute('class', delivery + '합계');
      checkk[i].parentElement.parentElement.remove();
      i--;
    }
  }
  isallcheck();
  calculate_sum();
}





function search() {
  get_back();
  var search_name = document.getElementById('search_name').value;
  var min = document.getElementById('min').value;
  var max = document.getElementById('max').value;

  if (min == "") {
    min = 0;
  }
  if (max == "") {
    max = 999999999;
  }
  if (search_name == "") {
    search_name = "";
  }
  var color_name = document.getElementsByClassName('이름');
  var color_price = document.getElementsByClassName('가격');
  for (var i = 0; i < color_name.length; i++) {
    if (color_name[i].innerHTML.indexOf(search_name) !== -1 && min <= color_price[i].innerHTML && color_price[i].innerHTML <= max) {
      color_name[i].parentElement.style.color = 'red';
      color_name[i].parentElement.style.fontSize = '20px';
      color_name[i].parentElement.style.fontWeight = '600px';
    }
  }
}

function get_back() {
  var color_name = document.getElementsByClassName('이름');
  for (var i = 0; i < color_name.length; i++) {
    color_name[i].parentElement.style.color = 'black';
    color_name[i].parentElement.style.fontSize = fontSize+'px';
    color_name[i].parentElement.style.fontWeight = fontWeight + 'px';
  }
}

function isallcheck(){
  var ac일반 = document.getElementById("일반선택");
  var ac새벽 = document.getElementById("새벽선택");
  if (all_checked("일반")) {
    ac일반.checked = true;
  } else {
    ac일반.checked = false;
  }

  if (all_checked("새벽")) {
    ac새벽.checked = true;
  } else {
    ac새벽.checked = false;
  }
  calculate_sum();
}
