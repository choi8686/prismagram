export const COMMENT_FRAGMENT = `
    fragment CommentPrats on Comment{
        id
        text
        user {
            username
        }
    }
    
  `;