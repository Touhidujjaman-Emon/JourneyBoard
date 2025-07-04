<details> <summary><strong>📁 Project Structure</strong></summary>

```
JourneyBoard/
├── .eslintrc.json
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── vite.config.js
├── README.md
├── public/
│   └── vite.svg
├── src/
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── router.jsx
│   ├── assets/
│   │   └── react.svg
│   ├── features/
│   │   ├── userAuth/
│   │   │   └── AuthContext.jsx
│   │   └── userEngagement/
│   │       ├── Comment.jsx
│   │       ├── commentUtils.js
│   │       ├── FilteringSorting.jsx
│   │       ├── FlatComment.jsx
│   │       └── getTotalCount.js
│   ├── pages/
│   │   ├── authPage/
│   │   │   ├── SignIn.jsx
│   │   │   ├── SignUp.jsx
│   │   │   └── UserAuth.jsx
│   │   ├── cmntPage/
│   │   │   └── CmntModal.jsx
│   │   └── homePage/
│   │       └── HomePage.jsx
│   ├── services/
│   │   ├── commentHelper.js
│   │   ├── getRoadmapItems.jsx
│   │   ├── supabase.js
│   │   ├── upVote.jsx
│   │   └── upVoteHelper.js
│   ├── ui/
│   │   ├── Button.jsx
│   │   ├── Cards.jsx
│   │   ├── CommentSection.jsx
│   │   ├── DynamicGrid.jsx
│   │   ├── IconBtn.jsx
│   │   ├── Input.jsx
│   │   ├── NavBar.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── SelectOpt.jsx
│   └── utils/
│       ├── buildCommentTree.js
│       ├── dateFormater.js
│       ├── getTotalCommentCount.js
│       └── timeFormatter.js
```

</details>

## 1. Improvements after extended deadline

**Depth level 3 nested comments**: Before the extended deadline, I couldn’t implement nested comments with depth level 3 (I did not flatten extra replies and there wasn’t a better UI to display replies, so they didn’t show up). But after getting the extended time, I implemented them. Now JourneyBoard supports nested comments up to depth level 3, with no messy infinite nesting.

**Pagination**: Now JourneyBoard has a pagination system. It shows 6 cards per page.

**Comments count**: Previously there was no comment count displayed. Now, I have implemented functionality to display the comment count per item.

**Sort by "most upvoted" BUG**:Previously my Supabase database and upvote UI were not synced with each other, which caused the "sort by most upvotes" feature to not work properly. Now, this issue is fixed.

---

## 2. Thinking Process

### Tech Selection

- **Tailwind CSS** ⟶ for rapid and utility-first styling
- **Context API** ⟶ for lightweight global state (I would have considered React Query if the app had more complex remote state handling)
- **React Router** ⟶ for protected route and client-side routing

### Feature Design

I started by designing a static version of the roadmap app (JourneyBoard), then added required functionality and states.

**User Authentication** ⟶ I used React Context API to create `AuthContext` to manage user info, signUp, signIn, and signOut throughout the app. Supabase handles backend authentication. I also used React Router to protect the HomePage route.

**Roadmap Display** ⟶ I created a roadmap item table in Supabase, fetched items using `getRoadmapItems`, and used the data in a `Cards` component to display roadmap items.

**Upvoting Feature** ⟶ I created an `upvotes` table in Supabase with `user_id` and `item_id`. Implemented three helper functions:

- `upvoteItem(itemId)` ⟶ upserts a vote (with `onConflict: ["user_id", "item_id"]` to ensure one vote per user per item)
- `removeUpvote(itemId)` ⟶ deletes the user’s upvote
- `fetchItemWithCount(itemId)` ⟶ gets item data with total upvote count

These are encapsulated inside a `useUpvotes` hook, exposing `count`, `hasUpvoted`, `loading`, `error`, and `toggle` for use in UI (like in the `Card` component).

**Commenting** ⟶ Like upvotes, I created two tables in Supabase:

- `comments`
- A **view** joining `comments` and `profiles` to show user info with comments

I implemented helper functions: `fetchComments`, `postComment`, `updateComment`, `deleteComment`.

In the UI, `CommentSection` handles comment logic and renders the tree using `buildCommentTree()`. Each comment is rendered via the `Comment` component, which supports replying, editing, and deleting. The `CommentSection` is used inside `CmntModal`.

---

## 3. Architecture Decisions

### React

I chose **React.js** because it's the most popular frontend library and I already had experience with it. I prefer JSX over template syntax (like in Vue).

### Supabase

I didn’t know any backend framework before this task. I chose **Supabase** after learning its basics because:

- I can create custom user tables
- It’s easy to use
- I didn’t need to write backend code for auth, upvotes, or comments

Even though I ran into some RLS (Row Level Security) and foreign key issues, Supabase helped me implement key backend features quickly.

---

## 4. Code Style Decisions

### Modular Component Architecture

I organized the project into folders: `pages/`, `features/`, `services/`, `utils/`, and `ui/`. This improves separation of concerns and makes the codebase scalable.

### Naming Conventions

- **PascalCase** for React components and UI files
- **camelCase** for variables and functions

### Reusable Utilities

- Reusable logic like time formatting and tree building is in `utils/`
- API and business logic is in `services/`

This approach follows the **DRY** principle and keeps logic isolated from presentation.

---

## 5. GitHub Repository

🔗 [Touhidujjaman-Emon/JourneyBoard](https://github.com/Touhidujjaman-Emon/JourneyBoard.git)
