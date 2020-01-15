alert(11);
$.ajax({
  type: 'post',
  data: {
    content: 'zf lesson'
  },
  url: '/api/addContent'
})