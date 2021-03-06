"use strict";

$(document).ready(function(){
  var menu = $('.shared-menu');
  var topBanner = $('.top-banner');
  var scheduleBtn = $('.schedule-btn');
  var doneBtn = $('#am-done-btn');
  var cancelBtn = $('#cancel-btn');

  var sessionActiveDiv = $('#session-active');
  var sessionDoneDiv = $('#session-done');
  var cancelSessionDiv = $('#cancel-session');
  var sessionCanceledDiv = $('#session-canceled');


  if(CURRENT_PAGE == 'dashboard'){
    setTimeout(function(){
      window.location.reload(1);
    }, 30000); //refresh every 30 seconds
  }

  /**
   * Loop through links
   * and make current page active
   */
  menu.find('li').each(function(){
    if( $(this).attr('class') == CURRENT_PAGE ){
      $(this).addClass('active');
    }
  });

  /**
   * Schedule button is clicked
   */
  scheduleBtn.on('click', function(e){
    e.preventDefault();
    $(this).attr('disabled','disabled');
    if(!$(this).hasClass('disabled')){
      var url = $(this).attr('href') + '/' + 'schedule/create';
      $.post(url, userData, function(response){
        $(this).removeAttr('disabled');
        response.status ? location.reload() : console.log(response.status);
      });
    }
  });

  /**
   * Cancel button is clicked
   */
  cancelBtn.on('click', function(e){
    e.preventDefault();
    if(CURRENT_PAGE == 'schedule'){
      $(this).attr('disabled','disabled');
      var url = $(this).attr('href') + '/' + 'schedule/cancel'; 
      var id = $(this).attr('data-sid');
      $.ajax({
        url: url,
        type: 'DELETE',
        data: {'id': id},
        success: function(response){
          if(response.successful){
            cancelSessionDiv.fadeOut('fast', function(){
              sessionCanceledDiv.fadeIn('fast');
            });
          }
        }
      });
    }
  });

  /**
   * When am done button is clicked
   */
  doneBtn.on('click', function(e){
    e.preventDefault();
    if(CURRENT_PAGE == 'schedule'){
      $(this).attr('disabled','disabled');
      var url = $(this).attr('href') + '/' + 'schedule/done'; 
      userData.schedule_id = $(this).attr('data-sid');
      $.ajax({
        url: url,
        type: 'PUT',
        data: userData,
        success: function(response){
          if(response.successful){
            sessionActiveDiv.fadeOut('fast', function(){
              sessionDoneDiv.fadeIn('fast');
            });
          }
        }
      });
    }
  });
}); 