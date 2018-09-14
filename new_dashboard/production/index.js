function addGoal(){
	var date_goal_set, goal_statement, progress, review_dt, rating;
	date_goal_set = $("#date_goal_set").val();
	goal_statement = $("#goal_statement").val();
	progress = $("#progress").val();
	review_dt = $("#review_date").val();
	rating = $("#rating").val();
	if(parseInt(rating) > 5 || parseInt(rating) < 0){
		alert("Rating should be between 1 to 5 inclusive.");
		return;
	}
	var today = new Date();
	if(date_goal_set instanceof Date == false && !isNaN(date_goal_set)){
		alert("Please input a valid date! The date format should be dd/mm/yyyy!");
		return;
	}
	if(review_date instanceof Date == false && !isNaN(review_date)){
		alert("Please input a valid date! The date format should be dd/mm/yyyy!");
		return;
	}
	var target_date = new Date(date_goal_set);
	var review_date = new Date(review_date);
	if(target_date > review_date || target_date < today){
		alert("Please make sure review date is after date of setting the goal and both dates are future dates!");
		return;
	}
	let target_day = target_date.getDay();

	let diff = Math.abs(target_date.getTime() - today.getTime());
	diff = Math.ceil(diff/(1000*3600*24));
	if(today.getDay() + diff <= 7){
		$("#"+target_day).append("<li><a href='#'>" + goal_statement + "</a></li>");
		let temp = $("#situation_"+target_day).html().split("/");
		temp[1] = (parseInt(temp[1]) + 1).toString();
		$("#situation_"+target_day).html(temp[0]+"/"+temp[1]);
		$("#date_goal_set").val("");
		$("#goal_statement").val("");
		$("#progress").val("");
		$("#review_date").val("");
		$("#rating").val("");
		$(document).scrollTop($("#1").scrollTop());
	}else{
		let appendix = "<tr>";
		appendix += "<td>" + date_goal_set + "</td>";
		appendix += "<td>" + goal_statement + "</td>";
		appendix += "<td>" + progress + "</td>";
		appendix += "<td>" + review_dt + "</td>";
		appendix += "<td>" + rating + "</td></tr>";
		$("#future_tasks tbody").append(appendix);
	}
	
}