import _ from 'lodash';
import $ from 'jquery';

function calculateLayout() {
  console.log(1)
}
 
$(function() {
  $('button').click(_.debounce(calculateLayout, 2000));
})