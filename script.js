var myBookData;
let allBooks = [];
const subjects = ["fiction", "nonfiction", "science", "history", "biography", "fantasy", "mystery", "romance", "horror", "self-help"];

async function fetchAllData() {
    document.getElementById('total').innerHTML = "Connecting";
    if (!(localStorage.getItem("myBookData") == null)) {
        document.getElementById('total').innerHTML = `Data is in memory`;
        myBookData = JSON.parse(localStorage.getItem("myBookData"));
    } else {
        document.getElementById('total').innerHTML = `Start downloading data`;
		for (const subject of subjects) {
			let currentPage = 0;
			const maxResults = 40; 
			while (true) {
				const booksApiUrl = `https://www.googleapis.com/books/v1/volumes?q=subject:${subject}&langRestrict=es&startIndex=${currentPage * maxResults}&maxResults=${maxResults}&key=AIzaSyCw_eC8m0bQOK509rPzwpPmOOC3HVVNlZk`;
				const booksResponse = await fetch(booksApiUrl);

				if (!booksResponse.ok) {
					document.getElementById('total').innerHTML = `Error obtaining data`;
					break;
				}

				const booksData = await booksResponse.json();

				if (Array.isArray(booksData.items)) {
					const filteredBooks = booksData.items.filter(book => {
						const publishDate = book.volumeInfo.publishedDate;
						const numberOfPages = book.volumeInfo.pageCount;
						const datePattern = /^\d{4}-\d{2}-\d{2}$/; 
						return publishDate && datePattern.test(publishDate) && new Date(publishDate) <= new Date("2022-01-01") && numberOfPages > 0;
					});
					const mappedBooks = filteredBooks.map(book => ({
						title: book.volumeInfo.title || undefined,
						authors: book.volumeInfo.authors || [],
						publish_date: book.volumeInfo.publishedDate || undefined,
						number_of_pages: book.volumeInfo.pageCount || undefined,
						subjects: book.volumeInfo.categories || []
					}));

					allBooks = allBooks.concat(mappedBooks);
					document.getElementById('total').innerHTML = "Data Loaded = " + allBooks.length;

					if (booksData.items.length < maxResults) {
						break;
					}
					currentPage++;
				} else {
					break;
				}
			}

			myBookData = allBooks;
			localStorage.setItem("myBookData", JSON.stringify(myBookData));
		}
	}
}

document.addEventListener('DOMContentLoaded', function () {
    fetchAllData().then(() => {
        exito();
    })
        .catch(error => {
            localStorage.removeItem("myBookData");
            document.getElementById('total').innerHTML = "Error: " + error;
        });
});

function exito() {
    const myButton = document.getElementById('letsGo');
    setTimeout(function () {
        myButton.disabled = false;
        const loader = document.getElementById('loader');
        const myContent = document.getElementById('myContent');
        loader.classList.add('hidden');
        setTimeout(function () {
            myContent.classList.remove('hidden');
            myContent.classList.add('content');
        }, 1000);
    }, 1000);
}

function calcula() {
    document.getElementById('e1').innerHTML = getMostCommonSubject(myBookData);
    document.getElementById('e2').innerHTML = getBooksByPageRange(myBookData, 120, 150);
    document.getElementById('e3').innerHTML = getAveragePageCount(myBookData);
    document.getElementById('e4').innerHTML = parsePublishDateToWeekday(myBookData[0].publish_date);
    document.getElementById('e5').innerHTML = getWeekdayWithMostPublications(myBookData);
    document.getElementById('e6').innerHTML = getAuthorWithMostBooks(myBookData);
    document.getElementById('e7').innerHTML = transformTitleToAcronym(myBookData[7].title);
    document.getElementById('e8').innerHTML = getMostCommonAcronym(myBookData);
}