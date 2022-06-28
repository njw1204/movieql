import Comment from '../entities/comment';

const comments: Comment[] = [
  {
    id: '1',
    message: 'hello',
    movieId: 1,
  },
  {
    id: '2',
    message: 'world',
    movieId: 2,
  },
];

export function getComments(movieId?: number) {
  return movieId
    ? comments.filter(comment => comment.movieId === movieId)
    : comments;
}

export function getComment(id: string) {
  return comments.find(comment => comment.id === id);
}

export function postComment(movieId: number, message: string) {
  const comment: Comment = {
    id: String(Date.now()) + Math.random().toString(16).slice(2),
    message,
    movieId,
  };

  comments.push(comment);
  return comment;
}

export function deleteComment(id: string) {
  const index = comments.findIndex(comment => comment.id === id);

  if (index === -1) {
    return false;
  }

  comments.splice(index, 1);
  return true;
}
