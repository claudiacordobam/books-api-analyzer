/*****************************************************
/* EXERCISE 1 - FINAL PRACTICE - SOLUTION
/*****************************************************/
function getMostCommonSubject(books) {
	let subjectCounter = {};
  let max = 0;
  let maxSubject;
  
  
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i].subjects.length; j++) {
    let subject = books[i].subjects[j];
      if (subjectCounter[subject] == undefined) {
      subjectCounter[subject] = 1;
      }
      else {
        subjectCounter[subject] = subjectCounter[subject] + 1;
      } 
    }
  }
  
  for (let subjectName in subjectCounter) {
    if (subjectCounter[subjectName] > max) {
      max = subjectCounter[subjectName];
      maxSubject = subjectName;
    }
  }
  
  return maxSubject;
}

/*****************************************************
/* EXERCISE 2 - FINAL PRACTICE - SOLUTION
/*****************************************************/
function getBooksByPageRange(books, minPages, maxPages) {
	  let minMaxTitles = [];
  
  for (let i = 0; i < books.length; i++) {
      let titles = books[i].title;
      if (books[i].number_of_pages >= minPages && books[i].number_of_pages <= maxPages) {
      minMaxTitles.push(books[i].title);
      }
    
  }
  
  return minMaxTitles;
}

/*****************************************************
/* EXERCISE 3 - FINAL PRACTICE - SOLUTION
/*****************************************************/
function getAveragePageCount(books) {
	 let averagePages = 0;
  
  for (let i = 0; i < books.length; i++) {
    averagePages = averagePages + books[i].number_of_pages
  }
  
  averagePages = Math.round(averagePages / books.length);
  
  return averagePages;
}

/*****************************************************
/* EXERCISE 4 - FINAL PRACTICE - SOLUTION
/*****************************************************/
function parsePublishDateToWeekday(publishDate) {
	let auxDate = new Date(publishDate);
  let weekdayNumber = auxDate.getUTCDay();
  
  switch (weekdayNumber) {
  case 0:
    weekdayNumber = "Sunday";
    break;
  case 1:
    weekdayNumber = "Monday";
    break;
  case 2:
     weekdayNumber = "Tuesday";
    break;
  case 3:
    weekdayNumber = "Wednesday";
    break;
  case 4:
    weekdayNumber = "Thursday";
    break;
  case 5:
    weekdayNumber = "Friday";
    break;
  case 6:
    weekdayNumber = "Saturday";
  }
  
  return weekdayNumber;
}

/***************************************************** 
/* EXERCISE 5 - FINAL PRACTICE - SOLUTION
/*****************************************************/ 
function getWeekdayWithMostPublications(books) {
	let weekdayCounter = {};
  let max = 0;
  let maxWeekday;
  
  for (let i = 0; i < books[i].publish_date.length; i++) {
    let weekday = parsePublishDateToWeekday(books[i].publish_date);
      if (weekdayCounter[weekday] == undefined) {
      weekdayCounter[weekday] = 1;
      }
      else {
        weekdayCounter[weekday] = weekdayCounter[weekday] + 1;
      } 
  }
  
  for (let weekdayNumber in weekdayCounter) {
    if (weekdayCounter[weekdayNumber] > max) {
      max = weekdayCounter[weekdayNumber];
      maxWeekday = weekdayNumber;
    }
  }
  
  return maxWeekday;
  
}

/*****************************************************
/* EXERCISE 6 - FINAL PRACTICE - SOLUTION
/*****************************************************/
function getAuthorWithMostBooks(books) {
	let authorCounter = {};
  let max = 0;
  let maxAuthor;
  
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i].authors.length; j++) {
    let author = books[i].authors[j];
      if (authorCounter[author] == undefined) {
      authorCounter[author] = 1;
      }
      else {
        authorCounter[author] = authorCounter[author] + 1;
      } 
    }
  }
  
  for (let authorName in authorCounter) {
    if (authorCounter[authorName] > max) {
      max = authorCounter[authorName];
      maxAuthor = authorName;
    }
  }
  
  return maxAuthor;
}

/*****************************************************
/* EXERCISE 7 - FINAL PRACTICE - SOLUTION
/*****************************************************/
function transformTitleToAcronym(title) {
	let titleString = new String(title);
  let space = " ";
  let titleArray = titleString.split(space);
  let titleAcronym = new String();
  
  for (let i = 0; i < titleArray.length; i++){
    titleAcronym = titleAcronym + titleArray[i].charAt(0) 
  }
  
  return titleAcronym.toUpperCase();
}

/*****************************************************
/* EXERCISE 8 - FINAL PRACTICE - SOLUTION
/*****************************************************/
function getMostCommonAcronym(books) {
	let acronymCounter = {};
  let max = 0;
  let maxAcronym;
  
   for (let i = 0; i < books.length; i++) {
    let titleAcronym = transformTitleToAcronym(books[i].title);
      if (acronymCounter[titleAcronym] == undefined) {
      acronymCounter[titleAcronym] = 1;
      }
      else {
        acronymCounter[titleAcronym] = acronymCounter[titleAcronym] + 1;
      } 
  }
  
  for (let acronymNumber in acronymCounter) {
    if (acronymCounter[acronymNumber] > max) {
      max = acronymCounter[acronymNumber];
      maxAcronym = acronymNumber;
    }
  }
  
  return maxAcronym;
}