import jinjaToJS from "jinja-to-js";export default function templateQuickstartTrainingCpu(ctx) {
    var __result = "";
    var __tmp;
    var __runtime = jinjaToJS.runtime;
    var __filters = jinjaToJS.filters;
    var __globals = jinjaToJS.globals;
    var context = jinjaToJS.createContext(ctx);
    __result += "\n# This is an auto-generated partial config for training a model.\n# To use it for training, auto-fill it with all default values.\n# python -m spacy init config config.cfg --base base_config.cfg\n[paths]\ntrain = \"\"\ndev = \"\"\n\n[nlp]\nlang = \"";__result += "" + __runtime.escape((__tmp = (context.lang)) == null ? "" : __tmp);__result += "\"\npipeline = ";__result += "" + ((__tmp = (context.pipeline)) == null ? "" : __tmp);__result += "\nvectors = ";__result += "" + ((__tmp = ((context.optimize==="accuracy" ? "\"en_vectors_web_lg\"" : false))) == null ? "" : __tmp);__result += "\ntokenizer = {\"@tokenizers\": \"spacy.Tokenizer.v1\"}\n\n[components]\n\n[components.tok2vec]\nfactory = \"tok2vec\"\n\n[components.tok2vec.model]\n@architectures = \"spacy.Tok2Vec.v1\"\n\n[components.tok2vec.model.embed]\n@architectures = \"spacy.MultiHashEmbed.v1\"\nwidth = ${components.tok2vec.model.encode:width}\nrows = ";__result += "" + __runtime.escape((__tmp = ((context.optimize==="efficiency" ? 2000 : 7000))) == null ? "" : __tmp);__result += "\nalso_embed_subwords = ";__result += "" + __runtime.escape((__tmp = ((context.has_letters ? true : false))) == null ? "" : __tmp);__result += "\nalso_use_static_vectors = ";__result += "" + __runtime.escape((__tmp = ((context.optimize==="accuracy" ? true : false))) == null ? "" : __tmp);__result += "\n\n[components.tok2vec.model.encode]\n@architectures = \"spacy.MaxoutWindowEncoder.v1\"\nwidth = ";__result += "" + __runtime.escape((__tmp = ((context.optimize==="efficiency" ? 96 : 256))) == null ? "" : __tmp);__result += "\ndepth = ";__result += "" + __runtime.escape((__tmp = ((context.optimize==="efficiency" ? 4 : 8))) == null ? "" : __tmp);__result += "\nwindow_size = 1\nmaxout_pieces = 3\n\n";if(context.components.includes("tagger")){__result += "\n[components.tagger]\nfactory = \"tagger\"\n\n[components.tagger.model]\n@architectures = \"spacy.Tagger.v1\"\nnO = null\n\n[components.tagger.model.tok2vec]\n@architectures = \"spacy.Tok2VecListener.v1\"\nwidth = ${components.tok2vec.model.encode:width}";}__result += "\n\n";if(context.components.includes("parser")){__result += "[components.parser]\nfactory = \"parser\"\n\n[components.parser.model]\n@architectures = \"spacy.TransitionBasedParser.v1\"\nnr_feature_tokens = 8\nhidden_width = 128\nmaxout_pieces = 3\nuse_upper = true\nnO = null\n\n[components.parser.model.tok2vec]\n@architectures = \"spacy.Tok2VecListener.v1\"\nwidth = ${components.tok2vec.model.encode:width}";}__result += "\n\n";if(context.components.includes("ner")){__result += "[components.ner]\nfactory = \"ner\"\n\n[components.ner.model]\n@architectures = \"spacy.TransitionBasedParser.v1\"\nnr_feature_tokens = 6\nhidden_width = 64\nmaxout_pieces = 2\nuse_upper = true\nnO = null\n\n[components.parser.model.tok2vec]\n@architectures = \"spacy.Tok2VecListener.v1\"\nwidth = ${components.tok2vec.model.encode:width}\n";}__result += "[training]\n\n[training.train_corpus]\n@readers = \"spacy.Corpus.v1\"\npath = ${paths:train}\n\n[training.dev_corpus]\n@readers = \"spacy.Corpus.v1\"\npath = ${paths:dev}\n\n[training.score_weights]";if(context.components.includes("tagger")){__result += "\ntag_acc = ";__result += "" + __runtime.escape((__tmp = (Math.round((1.0 / __filters.size(context.components)+ Number.EPSILON) * 100) / 100)) == null ? "" : __tmp);}if(context.components.includes("parser")){__result += "\ndep_uas = 0.0\ndep_las = ";__result += "" + __runtime.escape((__tmp = (Math.round((1.0 / __filters.size(context.components)+ Number.EPSILON) * 100) / 100)) == null ? "" : __tmp);__result += "\nsents_f = 0.0";}if(context.components.includes("ner")){__result += "\nents_f = ";__result += "" + __runtime.escape((__tmp = (Math.round((1.0 / __filters.size(context.components)+ Number.EPSILON) * 100) / 100)) == null ? "" : __tmp);__result += "\nents_p = 0.0\nents_r = 0.0";}
    return __result;
}