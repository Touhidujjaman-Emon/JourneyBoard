function getTotalCommentCount(tree) {
  let count = 0;
  for (const comment of tree) {
    count += 1;
    if (comment.replies && comment.replies.length > 0) {
      count += getTotalCommentCount(comment.replies);
    }
  }
  return count;
}

export default getTotalCommentCount;
