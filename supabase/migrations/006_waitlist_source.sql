-- The app waitlist shares newsletter_subscribers.
-- source:   which site the person signed up on ('myto-moto' or 'moto-trails').
-- platform: the phone they ride with ('android', 'iphone'), so we know how much iOS demand there is.
alter table newsletter_subscribers
  add column if not exists source   text not null default 'myto-moto',
  add column if not exists platform text;
