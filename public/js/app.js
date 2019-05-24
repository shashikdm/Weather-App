window.addEventListener('load', function() {
    const form = document.querySelector('form')
    const input = document.querySelector('input')
    loading = document.querySelector('#loading')
    error = document.querySelector('#error')
    result = document.querySelector('#result')

    form.addEventListener('submit', (e) => {
        e.preventDefault()
        loading.style = 'visibility: visible'
        error.innerHTML = ''
        result.innerHTML = ''
        const search = input.value
        fetch('http://localhost:3000/weather?address='+search).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    loading.style = 'visibility: hidden'
                    error.innerHTML = 'Error: '.fontcolor('red')+data.error
                } else {
                    loading.style = 'visibility: hidden'
                    const info = 'Location: '.bold() + data.location + '<br/>'
                    +'Latitude: '.bold() + data.latitude + '<sup>o</sup><br/>'
                    +'Longitude: '.bold() + data.longitude + '<sup>o</sup><br/>'
                    +'Temperature: '.bold() + data.temperature + ' <sup>o</sup>C<br/>'
                    +'Rain Probability: '.bold() + Number(data.rainprob)*100 + '%<br/>'
                    +'Summary: <br/>'.bold() + data.summary 
                    result.innerHTML = info
                }
            })
        })
    })
})