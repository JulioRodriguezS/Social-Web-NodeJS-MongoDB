const $postComment = $('#postComment')

$postComment.hide()

$('#btnToggleComment').click((e)=>{
    e.preventDefault()
    $postComment.slideToggle()
})

$('#btnLike').click(function(e){
    e.preventDefault()
    let image_id = $(this).data('id')
    
    $.post(`/images/${image_id}/like`)
    .done(data => {
        $('.likes-count').html(data.likes)
    })
})

$('#btnDelete').click(function(e){
    e.preventDefault()
    let $this = $(this)
    const areYouSure = confirm('Are you sure you want to delete the image')
    if(areYouSure){
        let partFileName = $this.data('id')
        $.ajax({
            url:`/images/${partFileName}`,
            type: 'delete'
        })
        .done((res)=>{
            $this.removeClass('btn-danger').addClass('btn-success')
            $this.find('i').removeClass('fa-time').addClass('fa-check')
            $this.find('span').html('Deleted!')
            $('#imgRequested').attr('src','')
            $('#imgRequested').attr('alt','Image Deleted')
            setTimeout(()=>{
                window.location.href = '/'
            },3000)
            
        })
    }

})