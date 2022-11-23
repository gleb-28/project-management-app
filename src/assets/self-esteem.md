1. Task: https://github.com/rolling-scopes-school/js-fe-course-en/blob/main/tasks/angular/project-management-system.md
2. Screenshot: ![image](https://user-images.githubusercontent.com/85630053/203555778-994b9625-3e89-4940-869b-bff3e13a3648.png)
3. Deploy: [kanban-back.onrender.com](https://kanban-back.onrender.com/)
4. Score 580/620
5. Done / 27.11.2022 22:59

**Welcome route +70**
   * [x] The welcome page should contain general information about the developer, project, and course. (10)
  <!-- !(Maybe the link in the middle of the page should route to https://rs.school/angular/ like in the bottom. I think, it would be also userfriendly to add routing to the 'Welcome' or 'Main' (depends on registration) page by click on the K letter on the left top.) -->
   * [x] In the upper right corner there are 2 buttons: login and sign up. (10) 
   <!-- !(We have 'Registration' and 'Login', maybe, it's better to change names) -->
   * [x] If there is an unexpired token, the user should be redirected to the "Main route" of the application automatically. (20)  
   * [x] When the token expires - the user should be redirected to the "Welcome page" automatically. (20)    
   * [x] Pressing the Login / Sign up button redirects a user to the route with the Login / Sign up form. (10)
   <!-- !But a click on the sigUp in the Login popup doesn't navigate automatically to the singUp page) and vice versa -->
  
**Login / Sign up +80**
   * [x] Login/log out should be present on all pages. (20)
   <!-- !But they go away on the screen lower than 768px -->
   * [x] Form fields should be implemented according to the backend API. Validation should be implemented. (50)
   * [x] Upon successful login, the user should be redirected to "Main route". (10)

**Main route +80/+100**
   * [x] Board creation functionality. (20)
   * [x] Displays all created boards as a list. (10)
   * [x] Each board in the list is displayed with a small preview of available information (title, description, etc). By clicking an element the user navigates to the board item (Board route). There's also a button for board deletion. (10)
   <!-- !!!On the board page we don't see it's title -->
   * [x] When trying to delete the board, we should receive a confirmation modal. The confirmation modal must be a generic component (one for the entire application). (10)
   * [x] Global search: search for a task by a task number, name, users who participate in it, and by the text of the task description. (0)
   <!-- !!!Not implemented (costs 20 points) -->
   * [x] The user profile editing functionality is implemented. (30)
   <!-- !Ок but it's also diplayed by click on LogOut button-->

**Board route +260**
   * [x] Button for column creation is displayed. (10)
   * [x] If a board contains at least one column - a button for task creation is displayed as well. (10)
   * [x] A modal window with form is displayed for column and task creation. (30)
   <!-- !We can rename modal 'New' for 'New Task/Add Task' when button '+' is hover and add the same behaviour to 'Column +'-->
     * [x] A vertical scrollbar is displayed in the column when overflowing with the number of column tasks. (20)
   <!-- !A vertical scrollbar is activated only by arrows -->
     * [x] The page itself on the current route doesn't have a vertical scrollbar. (10)
     * [x] With the help of drag-n-drop, we can swap columns. (30)
   <!-- !Maybe it's better to increase the area of drag and drop of columns  -->
     * [x] With the help of drag-n-drop, we can change the order of tasks within a column. (30)
     * [x] With the help of drag-n-drop, we can change the task belonging to the column. (50)
     * [x] by clicking on the task, we open a modal window with the edit task form. The requirements for the form and window are the same as everywhere else. (30)
     * [x] The task must have a delete task button. On click: confirmation modal -> delete. (10)
     * [x] The top of a column should always display the column title. By clicking the title the test should turn into a form with cancel and submit buttons. After typing a text into the input and clicking the submit button the tile of the column should be updated. (20)
     * [x] The column should have a delete button. By clicking -> confirmation modal -> when approving -> deleting. (10)

**General requirements +80**
     * [x] Backend error handling - (Not found, unhandled rejection, etc) should be performed in a user-friendly way (toast, pop-up or anything else you implement). (50)
     * [x] Localization. (20)
   <!-- !Maybe we can also translate error messages to Russian -->
     * [x] Backend is deployed and publicly available. (10)

**Additional functionality +30**
     * [x] Custom preloader is implemented. (30)

**Penalties -20**
     * [x] The presence of errors and warnings in the console. Mistakes are presented in the console. (-20)
