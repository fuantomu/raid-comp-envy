export interface DiscordGuildMember {
  roles:         string[];
  nick:          null | string;
  avatar:        null;
  premium_since: null;
  joined_at:     string;
  is_pending:    boolean;
  pending:       boolean;
  user:          DiscordUser;
  mute:          boolean;
  deaf:          boolean;
}

export interface DiscordUser {
  id:            string;
  username:      string;
  avatar:        null | string;
  discriminator: string;
  public_flags:  number;
  bot?:          boolean;
}
