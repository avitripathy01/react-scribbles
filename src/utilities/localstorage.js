export const udpateLocalStorage = (users, userName) => {
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify(userName));
    localStorage.setItem('users',JSON.stringify(users) );
}

export const getActiveUser = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user;
}


export const signUpUser =(userName, password) => {
    if(checkUserExists(userName).length === 0){
        const users = getAllUsers();
        let user = {};
        user[''+userName] = {password : reverseAndDelimit(password, '-'), 
                            isAuth : true};
        users.push(user); 
        udpateLocalStorage(users, userName);
        return true;

    }
    else{
        console.log('User by the {} exists', userName);
        
    }
    return false;
}
 

export const signIn =(userName, password) => {
    const users = getAllUsers();
    if(checkUserExists(userName).length > 0){
        const userObj = users.filter((user => user[''+userName]));
        if(userObj.length > 0){
            const passwordMatched =  userObj[0][''+userName].password === reverseAndDelimit(password, '-');
            if(passwordMatched){
                
                const index = users.indexOf(userObj[0]);
                userObj[0][''+userName].isAuth = passwordMatched;
                users[index] = userObj[0];
                udpateLocalStorage(users, userName)
                return true;
            }
        }
        
    }
    return false;
}

export const signOut = (userName) =>{
    const users = getAllUsers();
    const userObj = users.filter((user => user[''+userName]));
    const index = users.indexOf(userObj[0]); 
    userObj[0].isAuth = false;
    users[index] = userObj[0];
    udpateLocalStorage(users, "");
}

const reverseAndDelimit = (inputString, delimiter) =>{
    const arr = [];
    for(var counter =inputString.length-1; counter >=0 ; counter-- ){
        arr.push(inputString.charAt(counter));
    }
    return arr.join(delimiter);
}


export const saveUserQuotes = (userName, quote) => {
    if(isUserAuthenticated(userName)){
        let users = getAllUsers();
        let user = users.filter(userObj => {return userObj[''+userName] != null})[0];
        const index = users.indexOf(user)
        const quoteArr = user[''+userName].quotes || [];
        quoteArr.push(quote);
        user[''+userName].quotes = quoteArr;
        users[index] = user;
        udpateLocalStorage(users, userName);
        return true;
    }
    return false;
}

const getAllUsers = () => {
    return JSON.parse(localStorage.getItem('users')) || [];
}

export const checkUserExists = (userName) => {
    let users = getAllUsers();
    return users.filter(userObj => {return userObj[''+userName] != null}) || [];

}

const isUserAuthenticated = (userName) => {
    const  users = getAllUsers();
    let userObj = users.filter(user => user[''+userName]);
    if(userObj.length > 0 )
        return userObj[0][''+userName].isAuth;
    return false;
}

export const userQuotes = (userName) => {
    let userArr = checkUserExists(userName);
    if(userArr.length > 0 ){
        return userArr[0][''+userName].quotes;
    }
    return [];
}
 
