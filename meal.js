const searchFood = () => {
    const searchFeild = document.getElementById('button-search');
    const searchText = searchFeild.value;
    if(searchText == ''){
        window.alert('Enter something')
    }else{
    searchFeild.value = '';
    //  console.log(searchText);
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearch(data.meals))
    }

}
// searchFood();

const displaySearch = foods => {
    const searchResult = document.getElementById('search-Result');
    searchResult.innerHTML = '';
    for (const food of foods) {
        // console.log(food);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
      <div onclick='loadDetails(${food.idMeal})' class="card h-100">
            <img src="${food.strMealThumb}" class="card-img-top img-fluid" alt="...">
            <div class="card-body">
              <h5 class="card-title">${food.strMeal}</h5>
              
              <p class="card-text">${food.strInstructions.slice(0, 150)}...</p>
              <a target='_blank' class='ytube' href='${food.strYoutube}'>Watch Full Recipe</a>
            </div>
          </div>
      `
        searchResult.appendChild(div);
        //   div.innerHTML = '';
    }
}

const loadDetails = async meal => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}
    `;
    const res = await fetch(url);
    const data = await res.json();
    loadDetailsAlert(data.meals[0])

    // fetch(url)
    //     .then(res => res.json())
    //     .then(data => loadDetailsAlert(data.meals[0]))
}

const loadDetailsAlert = meals => {
    console.log(meals);
    const loadAlert = document.getElementById('load-alert');
    loadAlert.innerHTML = '';
    const div = document.createElement('div');
    // div.classList.add('col');
    div.innerHTML = `
              <div class="card mb-3 mx-auto" style="max-width: 600px;">
        <div class="row g-0">
            <div class="col-md-6">
            <img src="${meals.strMealThumb}" class="img-fluid rounded-start img-fluid" alt="...">
            </div>
            <div class="col-md-6">
            <div class="card-body">
                <h3 class="card-title">${meals.strMeal}</h3>
                <p class="card-text">Instructions: ${meals.strInstructions.slice(0, 150)}...</p>
                <p class="d-inline-block fs-4">Ingredient: 
                <li>
                ${meals.strIngredient1},
                </li>
                <li>
                ${meals.strIngredient2},
                </li>
                <li>
                ${meals.strIngredient3},
                </li>
                <li>
                ${meals.strIngredient4},
                </li>
                </p>

                <a target='_blank' class='ytube w-75 mx-auto mt-5' href='${meals.strYoutube}'>Watch Full Recipe</a>


            </div>
            </div>
        </div>
        </div>
      `
    loadAlert.appendChild(div);
}