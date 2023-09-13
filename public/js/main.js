$(document).ready(function () {
	$("a[href='#']").click(function (e) {
		e.preventDefault();
	});
	$("span.close").click(function () {
		$("#modal").hide();
		$("#rep-job-modal").hide();
		$("#rem-job-modal").hide();
		$(".wrapper").removeClass("open");
	});
	$(".nav.nav-tabs li").click(function () {
		$(".nav.nav-tabs li").removeClass('active');
		$(this).addClass('active');
		var id = $(this).find('a').attr('href');
		$('html, body').animate({
			scrollTop: $(id).offset().top
		});
	});

	$("#filter").keyup(function () {
		var str = '<div class="widget-content">';
		// Retrieve the input field text and reset the count to zero
		var filter = $(this).val(), count = 0;
		var err_str = '';
		var id = ['0'];
		// Loop through the comment list
		$(".tab-content .job-title").each(function () {
			if ($(this).text().search(new RegExp(filter, "i")) < 0) {
				$(".widget").fadeOut();
				if (count == 0)
					err_str = "<h2>No results found</h2>";
			}
			else {
				$(".widget").fadeOut();
				count++;
				err_str = " ";

				if (id.indexOf($(this).attr('id')) == -1) {
					id.push($(this).attr('id'));
					str = str + "<div class='job-category'>" + $(this).parents('.job-category').html() + "</div>";
				}
			}
		});
		$("#search-result").html(err_str + str + "</div>");
		if ($(this).val() == '') {
			$("#search-result").html(' ');
			$(".widget").show();
		}
	});

	$(".pagination li a#1").addClass("active");

	$(".pagination li .pre").click(function (e) {
		var pos = $(this).parents("ul").find(".active").attr("data-attr");
		if (pos == 1) {
			e.stopImmediatePropagation();
			return false;
		}
		var id = parseInt(pos) - 1;
		var page = ".page_" + id;
		var curr_id = $(this).parents("ul").find(".active").attr("id");
		curr_id = curr_id.substring(0, curr_id.length - 1)
		id = "#" + curr_id + id;
		var par_id = "#" + curr_id + "job";
		$(this).parents(par_id).find(".pagination li a").removeClass("active");
		$(this).parents(par_id).find(id).addClass("active");
		$(this).parents(par_id).find(".page").hide();
		$(this).parents(par_id).find(page).show();
		e.stopImmediatePropagation();
	});

	$(".pagination li .next").click(function (e) {
		var length = $(this).parents("ul").find("li").length;
		var pos = $(this).parents("ul").find(".active").attr("data-attr");
		if ((length - 2) == (pos)) {
			e.stopImmediatePropagation();
			return false;
		}
		var id = parseInt(pos) + 1;
		var page = ".page_" + id;
		var curr_id = $(this).parents("ul").find(".active").attr("id");
		curr_id = curr_id.substring(0, curr_id.length - 1);
		id = "#" + curr_id + id;
		var par_id = "#" + curr_id + "job";
		$(this).parents(par_id).find(".pagination li a").removeClass("active");
		$(this).parents(par_id).find(id).addClass("active");
		$(this).parents(par_id).find(".page").hide();
		$(this).parents(par_id).find(page).show();

		e.stopImmediatePropagation();
	});

	$(".pagination li a").click(function () {
		var id = $(this).attr("data-attr");
		var curr_id = $(this).attr("id");
		curr_id = curr_id.substring(0, curr_id.length - 1)
		var page = ".page_" + id;
		id = "#" + curr_id + id;
		var par_id = "#" + curr_id + "job";
		$(this).parents(par_id).find(".pagination li a").removeClass("active");
		$(this).addClass("active");
		$(this).parents(par_id).find(".page").hide();
		$(this).parents(par_id).find(page).show();
	});

	var category;
	$(".subscribe_job").on('click', function (e) {
		$("#sub_model").show();
		category = $(this).attr("id");
		e.stopImmediatePropagation();
	});
	$(".sub_model_wrapper").click(function (e) {
		e.stopImmediatePropagation();
	});
	$("html, body, #sub_model span.close").click(function () {
		$("#sub_model").hide();
		$("body").removeClass("open");
	});

	$("#form-sub").click(function () {
		var email = $("#email").val();
		if (email != null) {
			var xhr = new XMLHttpRequest();
			xhr.open("POST", "/api/subscribe");
			xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

			xhr.send("email=" + email + "&category=" + category);
		}
		$("#sub_model").hide();
		$("body, html").removeClass("open");

	});
	$("#full_name, #email").blur(function () {
		if ($("#email").val().length > 0 && $("#full_name").val().length > 0)
			$("#sendEmailDirectly").attr("disabled", false);
		else
			$("#sendEmailDirectly").attr("disabled", true);

	});
	$("#sendEmailDirectly").click(function () {
		var name = $("#full_name").val();
		var email = $("#email").val();
		var email_to = $("#email_to").val();
		var job_title = $("#job_title").val();
		var cover_letter = $("#cover_letter").val();
		var resume = $("#resume")[0].files[0];

		var formData = new FormData();
		formData.append("name", name);
		formData.append("email", email);
		formData.append("email_to", email_to);
		formData.append("job_title", job_title);
		formData.append("cover_letter", cover_letter);
		formData.append("resume", resume);

		var xhr = new XMLHttpRequest();
		xhr.open("POST", "/api/sendEmailDirectly");
		xhr.send(formData);
		$("#modal").hide();
		$(".wrapper").removeClass("open");
		alert("Thankyou for Applying on this Job");
	});

	$(".report-job").click(function () {
		$("#rep-job-modal").show();
		$(".wrapper").addClass("open");
		$('body, html').animate({
			scrollTop: $("#rep-job-modal").offset().top
		});
	});

	$(document).on('keydown', "#minrange, #maxrange", function (e) {
		console.log(1);
		if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
			// Allow: Ctrl+A, Command+A
			(e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
			// Allow: home, end, left, right, down, up
			(e.keyCode >= 35 && e.keyCode <= 40)) {
			// let it happen, don't do anything
			return;
		}
		// Ensure that it is a number and stop the keypress
		if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
			e.preventDefault();
		}
	});

});

function modal() {
	$("#modal").show();
	$("#rep-job-modal").hide();
	$(".wrapper").addClass("open");
	$('body, html').animate({
		scrollTop: $("#modal").offset().top
	});
}

function show_submit() {
	$(".show-hide, #submit").show();
	$("#subscribe").hide();
}

function check_valid() {
	$("#sub_email").removeClass('error');
	var email = $(".subscribe-email #sub_email").val();
	if (!/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi.test(email)) {
		$("#sub_email").addClass('error');
		return false;
	}

	$("#submit").attr("disabled", false);
}

function subscribe_email() {
	$("#sub_email").removeClass('error');
	var email = $(".subscribe-email #sub_email").val();
	var category = $(".subscribe-email #category").val();
	if (!/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi.test(email)) {
		$("#sub_email").addClass('error');
		return false;
	}
	if (email == "")
		return false;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/api/subscribe");
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	category = encodeURIComponent(category);
	xhr.send("category=" + category + "&email=" + email);
	alert("Thankyou for Subscribing on this Job Category");
	$(".subscribe-email #sub_email").val("");
}

function helpEmail() {
	var email = $("#rem-job-modal #help_email").val();
	var category = $("#rep-job-modal #category").val();
	var xhr = new XMLHttpRequest();
	xhr.open("POST", "/api/email_help");
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhr.send("email=" + email + "&category=" + category);
	$("#rem-job-modal").hide();
	$(".wrapper").removeClass("open");
}
