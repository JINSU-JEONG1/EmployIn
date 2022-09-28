

//====================회원가입에서 serach버튼 클릭시 주소 검색====================//
function searchAddr(){
	 new daum.Postcode({
        oncomplete: function(data) {
			//도로명 주소
        	const roadAddr = data.roadAddress;
        	document.querySelector('#memberAddr').value = roadAddr;
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분입니다.
            // 예제를 참고하여 다양한 활용법을 확인해 보세요.
        }
    }).open();
}
//====================선택시 이메일 바꾸기====================

document.querySelector('#autoSizingSelect').addEventListener('change', function(){
	document.querySelector('#autoSizingInputGroup').value = document.querySelector('#autoSizingSelect').value;
	
})

//====================모달 끄면 조인모달 입력한내용 지우기====================
let join_modal = document.querySelector('#join_Modal');
join_modal.addEventListener('hidden.bs.modal', function() {

	let inputs = join_modal.querySelectorAll('input:not([type="button"])');

	for (let inputTag of inputs) {
		inputTag.value = '';
	}

})

///// 혹은 이거
//join_modal.addEventListener('hidden.bs.modal',function(){
//	
//	 join_modal.querySelector('form').reset();
//	
//})


//로그인 모달 끄면 내용지우기\
let login_modal = document.querySelector('#login_Modal');
login_modal.addEventListener('hidden.bs.modal', function() {

	let inputs = login_modal.querySelectorAll('input:not([type="button"])');

	for (let inputTag of inputs) {
		inputTag.value = '';
	}
})
///////혹은 이거
//let login_modal = document.querySelector('#login_Modal')
//login_modal.addEventListener('hidden.bs.modal',function(){
//	
//	 login_modal.querySelector('form').reset();
//	
//})

///////////////////////////로그인 ajax////////////////////

//====================로그인====================
function loginMember() {
	const memberId =login_modal.querySelector('#memId').value;
	const memberPw =login_modal.querySelector('#memPw').value; 
	
	$.ajax({
		url: '/member/login', //요청경로
		type: 'post',
		data: {'memberId': memberId, 'memberPw': memberPw }, //필요한 데이터
		success: function(result) {
			if(result){
				alert('로그인 성공');
				location.href = "/item/list";
			}
			else{
			 	alert('로그인 실패\n다시 입력해 주세요.');
				pwDelete();
			}
		},
		error: function() {
			alert('ajax 실패');

		}
	});
}

/////////////////////////////////////////////////////////
//비밀번호 지우기

function pwDelete(){
	const memPw =document.querySelector('#memPw'); 
	memPw.value = '';
}

//==================================로그아웃============================//
/* Javascript */
function logout(){
	
	// create element (form)
	var newForm = document.createElement('form');
	// set attribute (form) 
	newForm.name = 'newForm';
	newForm.method = 'post';
	newForm.action = '/member/logout';

	// create element (input)
	var input1 = document.createElement('input');
	var input2 = document.createElement('input');
	// set attribute (input)
	input1.setAttribute("type", "text");
	input1.setAttribute("name", "memberId");
	input2.setAttribute("type", "password");
	input2.setAttribute("name", "memberPw");

	// append input (to form)
	newForm.appendChild(input1);
	newForm.appendChild(input2);

	// append form (to body)
	document.body.appendChild(newForm);
	
	// submit form
	newForm.submit();
}