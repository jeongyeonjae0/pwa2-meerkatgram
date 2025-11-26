export default [
    {
      id: 1,
      postId: 11,
      user: {
        id: 1,
        profile: 'http://localhost:5173/dev/kanna.jpg',
        nick: 'Kanna_kamui',
      },
      content: '초코초코 맛있어.초코초코 맛있어.초코초코 맛있어.초코초코 맛있어.초코초코 맛있어.초코초코 맛있어.',
      replyFlg: false,
      replyId: 0,
      replies: [],
    },
    {
      id: 2,
      postId: 11,
      user: {
        id: 2,
        profile: 'http://localhost:5173/dev/kanna.jpg',
        nick: 'Kanna_kamui2',
      },
      content: '초코초코 맛있어.2',
      replyFlg: true,
      replyId: 0,
      replies: [],
    },
    {
      id: 3,
      postId: 11,
      user: {
        id: 3,
        profile: 'http://localhost:5173/dev/kanna.jpg',
        nick: 'Kanna_kamui3',
      },
      content: '초코초코 맛있어.3',
      replyFlg: true,
      replyId: 0,
      replies: [
        {
          id: 4,
          post_id: 11,
          user: {
            id: 20,
            profile: 'http://localhost:5173/dev/zayeung.jpg',
            nick: 'ZaYeungIn',
          },
          content: '3번 대댓글1',
          replyFlg: false,
          replyId: 3,
          replies: [],
        },
        {
          id: 5,
          post_id: 11,
          user: {
            id: 10,
            profile: 'http://localhost:5173/dev/osoi.jpg',
            nick: 'Osoiwa',
          },
          content: '3번 대댓글2',
          replyFlg: false,
          replyId: 3,
          replies: [],
        },
      ],
    },
  ]