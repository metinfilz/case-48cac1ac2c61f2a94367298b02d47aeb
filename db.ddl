create table "Books"
(
  id          serial primary key,
  name        varchar(64) not null,
  score       varchar(8),
  score_count integer default 0 not null,
  "createdAt" timestamp with time zone,
  "updatedAt" timestamp with time zone
);

alter table "Books"
  owner to postgres;

create table "Users"
(
  id          serial primary key,
  name        varchar(64) not null,
  "createdAt" timestamp with time zone,
  "updatedAt" timestamp with time zone
);

alter table "Users"
  owner to postgres;

create table "Borrows"
(
  id           serial primary key,
  book_id      integer references "Books",
  user_id      integer references "Users",
  score        double precision,
  has_returned boolean default false not null,
  "createdAt"  timestamp with time zone,
  "updatedAt"  timestamp with time zone
);

alter table "Borrows"
  owner to postgres;

