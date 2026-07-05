export const formatWhatsAppResponse = (matches: any[]) => {
  if (matches.length === 0) {
    return (
      "😔 Sorry, I couldn't find any matching government schemes.\n\n" +
      "Please provide more details like:\n" +
      "• Age\n" +
      "• State\n" +
      "• Occupation\n" +
      "• Annual Income"
    );
  }

  let reply = "✅ *Top Matching Government Schemes*\n\n";

  matches.slice(0, 3).forEach((scheme, index) => {
    reply += `${index + 1}. *${scheme.scheme_name}*\n`;
    reply += `${scheme.summary}\n`;
    reply += `🎯 Match: ${scheme.score}%\n`;

    if (scheme.official_link) {
      reply += `🔗 ${scheme.official_link}\n`;
    }

    reply += "\n";
  });

  return reply;
};