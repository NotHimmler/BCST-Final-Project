function addGoal(){
	var select_weekly, date_goal_set, goal_type, goal_statement, progress, review_dt, rating;

	select_weekly = $("#select_weekly option:selected").val();
	date_goal_set = $("#date_goal_set").val();
	goal_type = $("#goal_type option:selected").val();
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
	if(review_dt instanceof Date == false && !isNaN(review_dt)){
		alert("Please input a valid date! The date format should be dd/mm/yyyy!");
		return;
	}

	var target_date = new Date(date_goal_set);
	var review_date = new Date(review_dt);
	if(target_date > review_date || target_date < today){
		alert("Please make sure review date is after date of setting the goal and both dates are future dates!");
		return;
	}
	if(goal_type == "Global Goal"){
		let replace = "<tr><td>" + date_goal_set + "</td><td>" + goal_statement + "</td><td>" + rating + "<td/><td><td/><tr/>";
		$("#global_goal").html(replace);
	}else if(goal_type == "Sub Goal"){
		let appendix = "<tr><td>" + date_goal_set + "</td><td>" + goal_statement + "</td><td>" + rating + "<td/><td><td/><tr/>";
		$("#sub_goal").append(appendix);
	}
	if(select_weekly == "Weekly"){
		week_id = 0
		max = 0
		if(target_date > new Date(2018, 8, 17) && target_date <= new Date(2018, 8, 23)){
			week_id = 1;
		}else if(target_date >= new Date(2018, 8, 24) && target_date <= new Date(2018, 8, 30)){
			week_id = 2;
		}else if(target_date >= new Date(2018, 9, 1) && target_date <= new Date(2018, 9, 7)){
			week_id = 3;
		}else if(target_date >= new Date(2018, 9, 8) && target_date <= new Date(2018, 9, 14)){
			week_id = 4;
		}else{
			console.log("Week out of range!");
			return;
		}
		if(review_date > new Date(2018, 8, 17) && review_date < new Date(2018, 8, 24)){
			max = 1;
		}else if(review_date >= new Date(2018, 8, 24) && review_date < new Date(2018, 9, 1)){
			max = 2;
		}else if(review_date >= new Date(2018, 9, 1) && review_date < new Date(2018, 9, 8)){
			max = 3;
		}else if(review_date >= new Date(2018, 9, 8) && review_date < new Date(2018, 9, 15)){
			max = 4;
		}else{
			console.log(review_date);
		}
		console.log(max);
		console.log(week_id);
		while(max >= week_id){
			$("#"+week_id.toString()+"_week").append("<li><a href='#'>" + goal_statement + "</a></li>");
			let temp = $("#situation_"+week_id.toString()).html().split("/");
			temp[1] = (parseInt(temp[1]) + 1).toString();
			$("#situation_"+week_id.toString()).html(temp[0]+"/"+temp[1]);
			week_id++;
		}
		$("#date_goal_set").val("");
		$("#goal_statement").val("");
		$("#progress").val("");
		$("#review_date").val("");
		$("#rating").val("");
	}
	$(document).scrollTop($("#summary").scrollTop());
	/*else if(select_weekly == "Monthly"){
		let appendix = "<tr>";
		appendix += "<td>" + date_goal_set + "</td>";
		appendix += "<td>" + goal_statement + "</td>";
		appendix += "<td>" + progress + "</td>";
		appendix += "<td>" + review_dt + "</td>";
		appendix += "<td>" + rating + "</td></tr>";
		$("#future_tasks tbody").append(appendix);
		if(goal_type == "Global Goal"){
			appendix += "<td>" + date_goal_set + "</td>";
			appendix += "<td>" + goal_statement + "</td>";
			appendix += "<td>" + rating + "</td></tr>";
			appendix += "<td>" + progress + "</td>";
			$("#global_goal").appendix(appendix);
		}else{

		}
	}else{

	}*/
}

function changeDisplay(id){
	if(id == "goals"){
		$("#goals_page").show();
		$("#patient_data").hide();
	}else if(id == "graphs"){
		$("#patient_data").show();
		$("#goals_page").hide();
	}else if(id == "summary"){

	}
}