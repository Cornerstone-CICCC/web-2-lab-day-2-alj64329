
$(function() {
  let userid = 1
  
  // your code here
  $.ajax({
      url:`https://dummyjson.com/users/${userid}`,
      method: "GET",
      success: function(response){
          displayUser(response)
      },
      error: function(error){
          console.log(error)
      }
  })
  // post
  $.ajax({
      url:`https://dummyjson.com/users/${userid}/posts`,
      method: "GET",
      success: function(response){
        const posts = response.posts
          displayPost(posts)
      },
      error: function(error){
          console.log(error)
      }
  })
  // Todos 
  $.ajax({
      url:`https://dummyjson.com/users/${userid}/todos`,
      method: "GET",
      success: function(response){
        const todos = response.todos
          displayTodos(todos)
      },
      error: function(error){
          console.log(error)
      }
  })

  //Prev Button Event 
  $('header button').first().on('click',function(){
    userid = userid -1

    if(userid <1){
      userid = 30
    }
    changeId(userid)
  })

  //Next Button Event 
  $('header button').last().on('click',function(){
    userid = userid + 1

    if(userid >30){
      userid = 1
    }
    changeId(userid)
  })

  // h3 accordion NOT DONE
  $('div h3').on('click', function(){
    $('div h3').not(this).next('ul').slideUp()
    $(this).next('ul').slideToggle()
  })

  // Display post model
  $('.posts').on('click','.post-title', function(){
    const postid = $(this).parent('li').attr('id')

    $.ajax({
    url:`https://dummyjson.com/posts/${postid}`,
    method: "GET",
    success: function(response){
      displayModal(response)
    },
    error: function(error){
        console.log(error)
    }
    })
  })

  // Modal close
  $('.posts').on('click','.modal-btn', function(){
    $('.posts div').removeClass('overlay')
    $('.modal').css({
      'display':'none'
    })
  })



})

function displayUser(userArr){
  $('.info__image img').attr('src', userArr.image)

  $('.info__content').html(`
    <h3>${userArr.firstName} ${userArr.lastName}</h3>
    <div><span>Age:</span> ${userArr.age}</div>
    <div><span>Email:</span> ${userArr.email}</div>
    <div><span>Phone:</span> ${userArr.phone}</div>
    `)

    // Set h3 heading
    $('.posts h3').text(`${userArr.firstName}'s Posts`)
    $('.todos h3').text(`${userArr.firstName}'s To Dos`)

}


function displayPost(postArr){
  const postContainer = $('.posts ul')
  // Clear the content
  postContainer.html('')


  if(postArr.length===0){
    postContainer.html('<li>User has no posts</li>')
  }else{
    postArr.forEach(element => {
      const containerDiv = $('<div></div>')
      containerDiv.addClass('post-container')
      containerDiv.html(`
        <li class="post-container" id=${element.id}>
        <div class="post-title">${element.title}</div>
        <div class ="post-body">${element.body}</div>
        </li>
        `)
      
      postContainer.append(containerDiv)
    });

    $('.post-title').css({
      'font-weight':'bold',
      'text-decoration':'underline'
    })
  }

}

function displayTodos(todos){
  const todoUl = $('.todos ul')
  // Clear the content
  todoUl.html('')

  if(todos.length===0){
    todoUl.html("<li>User has no todos</li>")
  }else{
      todos.forEach(el => {
      const li = $('<li></li>')
      li.text(`${el.todo}`)
      todoUl.append(li)
    });
  }

}

function changeId(userid){
  console.log(userid)
    $.ajax({
      url:`https://dummyjson.com/users/${userid}`,
      method: "GET",
      success: function(response){
          displayUser(response)
      },
      error: function(error){
          console.log(error)
      }
  })
  // post
  $.ajax({
      url:`https://dummyjson.com/users/${userid}/posts`,
      method: "GET",
      success: function(response){
        const posts = response.posts
        console.log(response)
          displayPost(posts)
      },
      error: function(error){
          console.log(error)
      }
  })
  // Todos 
  $.ajax({
      url:`https://dummyjson.com/users/${userid}/todos`,
      method: "GET",
      success: function(response){
        const todos = response.todos
          displayTodos(todos)
      },
      error: function(error){
          console.log(error)
      }
  })

}


function displayModal(post){
  const container = $('.posts')
  const div = $('<div></div>')
  container.append(div)
  div.addClass('overlay')

  const modal = $('<div></div>')
  modal.addClass('modal')

    modal.html(`
      <div class="modal-title">${post.title}</div>
      <div class ="modal-post">${post.body}</div>
      <div class ="modal-view">Viwes: ${post.views}</div>
      <button class ="modal-btn">Close Modal</button>
    `)

    div.append(modal)

    $('.modal-title').css({
      'font-weight':'bold',
      'font-size': '20px'
    })
    $('.modal-btn').css({
      'padding':'1rem 6rem',
      'font-weight':'bold'
    })

}